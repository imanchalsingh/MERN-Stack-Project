const express = require("express");
const cors = require("cors");

const apiRoutes = require("./routes/api");
const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes); // Auth routes
app.use("/api/data", apiRoutes); // API routes
app.use("/api/posts", postRoutes); // Post routes

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
