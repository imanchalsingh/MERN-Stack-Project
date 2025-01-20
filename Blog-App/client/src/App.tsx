import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Components/Blog App/Dashboard/Dashboard";
import MyPosts from "./Components/Blog App/my post/MyPosts";
import Home from "./Components/Blog App/Home";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import { AuthProvider } from "./Components/Auth/AuthContext";
import Archive from "./Components/Blog App/Archive";
import Articles from "./Components/Blog App/Articles";
import LikedPost from "./Components/Blog App/LikedPost";

const App: React.FC = () => {
  return (
    <AuthProvider>
      {" "}
      {/* Wrap everything with LikedPostProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route index element={<Home />} />
            <Route path="/myposts" element={<MyPosts />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/likedpost" element={<LikedPost />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
