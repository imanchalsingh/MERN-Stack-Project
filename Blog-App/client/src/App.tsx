import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Components/Blog App/Dashboard/Dashboard";
import MyPosts from "./Components/Blog App/Posts";
import Home from "./Components/Blog App/Home";
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route index element={<Home />} />
          /* Nested routes */
          <Route path="myposts" element={<MyPosts />} />
          <Route path="drafts" element={<div>Drafts Page</div>} />
          <Route path="articles" element={<div>Articles</div>} />
          <Route path="settings" element={<div>Settings Page</div>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
