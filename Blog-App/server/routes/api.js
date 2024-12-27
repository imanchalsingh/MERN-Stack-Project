const express = require("express");
const app = express();
const PORT = 5000;
const cors = require("cors");
app.use(cors());

const posts = require("../JSON-Data/postsData.json");

app.get("/api/posts", (req, res) => {
  res.json(posts);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = router;