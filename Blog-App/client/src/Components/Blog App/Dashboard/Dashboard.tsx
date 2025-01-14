import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import BlogifyLogo from "./Blogify.png";
import { useAuth } from "../../Auth/AuthContext"; // Import the useAuth hook

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuth(); // Track login state
  const { isRegistered, setIsRegistered } = useAuth(); // Track login state

  const handleSignOut = () => {
    setIsLoggedIn(false); // Set isLoggedIn to false
    setIsRegistered(false); // Set isLoggedIn to false

    localStorage.setItem("isLoggedIn", "false");
    localStorage.setItem("isRegistered", "false"); // Update localStorage for persistence
    // Update localStorage for persistence
    navigate("/login"); // Redirect to login after signing out
  };

  return (
    <div className="container">
      <div className="blog-page">
        <div className="uppar-nav-bar">
          <div className="logo-n-searchbar">
            <div className="logo">
              <img
                src={BlogifyLogo}
                alt="Blogify Logo"
                onClick={() => navigate("/")}
              />
            </div>
            <div className="search-bar">
              <input type="search" placeholder="Search here" />
            </div>
          </div>
          <div className="profile-n-notification">
            <div className="right-side-uppar-nav">
              <div
                className="account login"
                onClick={isLoggedIn ? handleSignOut : () => navigate("/login")}
              >
                {isLoggedIn || isRegistered ? "Sign out" : "Sign in"}
              </div>
            </div>
          </div>
        </div>

        <div className="page-container" style={{ display: "flex" }}>
          <div className="left-nav">
            <p onClick={() => navigate("/myposts")}>My Posts</p>
            <p onClick={() => navigate("/articles")}>Articles</p>
            <p onClick={() => navigate("/archive")}>Archive</p>
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
