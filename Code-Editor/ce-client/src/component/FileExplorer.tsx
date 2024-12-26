// src/FileExplorer.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const FileExplorer = ({ onFileSelect }: { onFileSelect: (filename: string) => void }) => {
  const [files, setFiles] = useState<string[]>([]);

  // Fetch the list of files from the backend
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get("http://localhost:5000/files");
        setFiles(response.data);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchFiles();
  }, []);

  return (
    <div className="file-explorer" style={{ width: "250px", padding: "10px", backgroundColor: "#333", color: "white", height: "100vh" }}>
      <h3>Files</h3>
      <ul>
        {files.map((file, index) => (
          <li key={index} onClick={() => onFileSelect(file)} style={{ cursor: "pointer", padding: "5px" }}>
            {file}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileExplorer;
