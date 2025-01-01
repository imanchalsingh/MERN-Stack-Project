import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const MyPosts: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="mypost-container">
      {location.pathname !== "/myposts/create" && (
        <div className="add-a-post">
          <button className="create-btn" onClick={() => navigate("create")}>
            Create
          </button>
        </div>
      )}
      {location.pathname !== "/myposts/create" && (
        <div className="my-posts">
          <h4>You haven't posted anything yet.</h4>
          <p>Click on the "Create" button to create your first post.</p>
        </div>
      )}
      <Outlet />
    </div>
  );
};

export default MyPosts;
