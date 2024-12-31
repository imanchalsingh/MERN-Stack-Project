const express = require("express");
const app = express();
const PORT = 5000;
const cors = require("cors");
app.use(cors());

const posts = require("../JSON-Data/postsData.json");
const topPosts = require("../JSON-Data/topUserData.json");

app.get("/api/posts", (req, res) => {
  res.json(posts);
});
app.get("/api/top/user", (req, res) => {
  res.json(topPosts);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
