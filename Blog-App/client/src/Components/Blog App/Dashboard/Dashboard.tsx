import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import BlogifyLogo from "./Blogify.png";
import { MessageOutlined, NotificationAddOutlined } from "@mui/icons-material";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="blog-page">
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
              <div className="message">
                <MessageOutlined />
              </div>
              <div className="notification">
                <NotificationAddOutlined />
              </div>
              <div className="account login" onClick={() => navigate("/login") ? "Sign in" : "Sign out"}>
                Sign in
              </div>
            </div>
          </div>
        </div>

        <div className="page-container" style={{ display: "flex" }}>
          <div className="left-nav" style={{ padding: "10px" }}>
            <p onClick={() => navigate("/myposts")}>My Posts</p>
            <p onClick={() => navigate("/articles")}>Articles</p>
            <p onClick={() => navigate("/drafts")}>Drafts</p>
            <p onClick={() => navigate("/settings")}>Settings</p>
          </div>

          <div className="route-page" style={{ padding: "20px" }}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
