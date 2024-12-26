import React from "react";
import { Outlet, useNavigate } from "react-router-dom"; // Import Outlet for rendering nested routes
import BlogifyLogo from "./Blogify.png";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="blog-page">
        {/* Upper Navbar */}
        <div className="uppar-nav-bar">
          <div className="logo-n-searchbar">
            <div className="logo">
              <img src={BlogifyLogo} alt="Blogify Logo" />
            </div>
            <div className="search-bar">
              <input type="search" placeholder="Search here" />
            </div>
          </div>
          <div className="profile-n-notification">
            <div className="right-side-uppar-nav">
              <div className="message">M</div>
              <div className="notification">N</div>
              <div className="account">A</div>
            </div>
          </div>
        </div>

        <div className="page-container" style={{ display: "flex" }}>
          <div className="left-nav" style={{ width: "250px", padding: "10px" }}>
            <p onClick={() => navigate("/myposts")}>My Posts</p>
            <p onClick={() => navigate("/articles")}>Articles</p>
            <p onClick={() => navigate("/drafts")}>Drafts</p>
            <p onClick={() => navigate("/settings")}>Settings</p>
          </div>

          <div className="route-page" style={{  padding: "20px" }}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
