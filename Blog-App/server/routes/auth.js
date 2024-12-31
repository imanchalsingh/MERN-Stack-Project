const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("../models/user");

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/blogify", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Register route
app.post("/api/register", async (req, res) => {
  console.log(req.body);
  try {
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "error", error: "Duplicate email" });
  }
});

app.post("/api/login", async (req, res) => {
  console.log("Request body:", req.body); // Debugging request body
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (user) {
    return res.json({ status: "ok", user: true });
  } else {
    return res.json({ status: "error", user: false });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
