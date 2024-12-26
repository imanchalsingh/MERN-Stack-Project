const express = require("express");
const { exec } = require("child_process");
const app = express();
const port = 5000;
const path = require("path");

app.use(express.json());

app.post("/run", (req, res) => {
  const { code, language } = req.body;

  let command = "";
  let fileExtension = "";

  if (language === "python") {
    fileExtension = ".py";
    command = `python -c "${code}"`;
  } else if (language === "javascript") {
    fileExtension = ".js";
    command = `node -e "${code}"`;
  } else if (language === "java") {
    fileExtension = ".java";
    const fileName = path.join(__dirname, `temp${fileExtension}`);
    require("fs").writeFileSync(fileName, code);
    command = `javac ${fileName} && java ${fileName.replace(".java", "")}`;
  } else if (language === "cpp") {
    fileExtension = ".cpp";
    const fileName = path.join(__dirname, `temp${fileExtension}`);
    require("fs").writeFileSync(fileName, code);
    command = `g++ ${fileName} -o temp && ./temp`;
  } else if (language === "c") {
    fileExtension = ".c";
    const fileName = path.join(__dirname, `temp${fileExtension}`);
    require("fs").writeFileSync(fileName, code);
    command = `gcc ${fileName} -o temp && ./temp`;
  } else if (language === "html") {
    return res.send({ output: code });
  }

  exec(command, (err, stdout, stderr) => {
    if (err || stderr) {
      console.error("Execution error:", stderr || err.message); // Log execution errors
      return res
        .status(500)
        .send({ output: stderr || err.message, error: true });
    }

    console.log("Execution Output:", stdout); // Log the output
    res.send({ output: stdout, error: false });
  });
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
