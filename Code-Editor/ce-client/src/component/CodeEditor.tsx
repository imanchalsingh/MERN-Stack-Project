import React, { useState } from "react";
import MonacoEditor from "react-monaco-editor";
import axios from "axios";
import FileExplorer from "./FileExplorer";

const App = () => {
  const [code, setCode] = useState<string>("// Start coding...");
  const [filename, setFilename] = useState<string>("example.js");
  const [theme, setTheme] = useState<string>("vs-dark");
  const [language, setLanguage] = useState<string>("javascript");
  const [output, setOutput] = useState<string>("");

  const handleSave = async () => {
    try {
      const response = await axios.post("http://localhost:5000/save", {
        filename,
        content: code,
      });
      alert(response.data);
    } catch (error) {
      console.error("Error saving file:", error);
    }
  };

  const handleFileSelect = async (selectedFilename: string) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/files/${selectedFilename}`
      );
      setCode(response.data);
      setFilename(selectedFilename);
    } catch (error) {
      console.error("Error opening file:", error);
    }
  };

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  const handleRunCode = async () => {
    try {
      console.log("Sending code:", code);  // Log code being sent to the backend
      const response = await axios.post("http://localhost:5000/run", {
        code,
        language,
      });
  
      console.log("Backend Response:", response.data);  // Log backend response
  
      if (response.data.error) {
        setOutput(`Error: ${response.data.output}`);
      } else {
        setOutput(`Output: ${response.data.output}`);
      }
    } catch (error) {
      setOutput("Error running the code.");
      console.error("Error running code:", error);
    }
  };
  
  
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <FileExplorer onFileSelect={handleFileSelect} />
      <div style={{ flex: 1, padding: "10px" }}>
        <header
          style={{
            backgroundColor: "#333",
            color: "white",
            padding: "10px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <input
            type="text"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            style={{ padding: "5px 10px", border: "none", borderRadius: "4px" }}
          />
          <button
            onClick={handleSave}
            style={{
              padding: "5px 10px",
              border: "none",
              backgroundColor: "#5c6bc0",
              color: "white",
              borderRadius: "4px",
            }}
          >
            Save File
          </button>
          {/* Theme Dropdown */}
          <select
            value={theme}
            onChange={handleThemeChange}
            style={{ marginLeft: "10px", padding: "5px" }}
          >
            <option value="vs">Light</option>
            <option value="vs-dark">Dark</option>
            <option value="hc-black">High Contrast</option>
          </select>
          {/* Language Dropdown */}
          <select
            value={language}
            onChange={handleLanguageChange}
            style={{ marginLeft: "10px", padding: "5px" }}
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="c">C</option>
            <option value="cpp">C++</option>
          </select>
        </header>
        <MonacoEditor
          width="100%"
          height="60vh"
          language={language}
          theme={theme}
          value={code}
          onChange={(newValue) => setCode(newValue)}
        />
        <div>
          <button
            onClick={handleRunCode}
            style={{
              padding: "10px",
              border: "none",
              backgroundColor: "#4caf50",
              color: "white",
              borderRadius: "4px",
              marginTop: "10px",
            }}
          >
            Run Code
          </button>
          <div
            style={{
              marginTop: "20px",
              padding: "10px",
              backgroundColor: "gray",
              borderRadius: "4px",
            }}
          >
            <h4>Output:</h4>
            <pre>{output}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
