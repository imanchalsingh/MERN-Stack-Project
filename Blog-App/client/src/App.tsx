// App.tsx
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Components/Blog App/Dashboard/Dashboard";
import MyPosts from "./Components/Blog App/my post/MyPosts";
import Home from "./Components/Blog App/Home";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import { AuthProvider } from "./Components/Auth/AuthContext"; // Import AuthProvider
import Archive from "./Components/Blog App/Archive";

const App: React.FC = () => {
  return (
    <AuthProvider>
      {" "}
      {/* Wrap everything with AuthProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route index element={<Home />} />
            <Route path="/myposts" element={<MyPosts />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="articles" element={<div>Articles</div>} />
            <Route path="settings" element={<div>Settings Page</div>} />
          </Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
