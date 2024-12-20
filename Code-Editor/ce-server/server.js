const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { exec } = require("child_process");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// API to execute JavaScript code
app.post("/execute", (req, res) => {
  const code = req.body.code;

  // Execute the code using Node.js
  exec(`node -e "${code.replace(/"/g, '\\"')}"`, (error, stdout, stderr) => {
    if (error) {
      res.json({ error: stderr });
    } else {
      res.json({ output: stdout });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
