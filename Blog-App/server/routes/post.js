const express = require("express");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

let posts = [];

// Get all posts
app.get("/api/posts", (req, res) => {
  res.json(posts);
});

// Create a new post
app.post("/api/posts", (req, res) => {
  const { username, content } = req.body;
  if (!username || !content) {
    return res.status(400).json({ message: "Username and content are required" });
  }
  const newPost = {
    id: uuidv4(),
    username,
    content,
    likes: 0,
    comments: [],
    shares: 0,
    createdAt: new Date(),
  };
  posts.unshift(newPost); // Add to the start of the list
  res.status(201).json(newPost);
});

// Delete a post
app.delete("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  posts = posts.filter((post) => post.id !== id);
  res.json({ message: "Post deleted successfully" });
});

// Add a comment to a post
app.post("/api/posts/:id/comment", (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  const post = posts.find((p) => p.id === id);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  post.comments.push({ commentId: uuidv4(), text: comment });
  res.json(post);
});

// Reshare a post
app.post("/api/posts/:id/reshare", (req, res) => {
  const { id } = req.params;
  const post = posts.find((p) => p.id === id);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  post.shares++;
  res.json(post);
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = router;