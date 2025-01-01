import React from "react";
import { useAuth } from "../../Auth/AuthContext";

const CreatePost: React.FC = () => {
  const { username } = useAuth();
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        {username && (
          <h3 className="username-profile-letter">
            {[...username][0].toUpperCase()}
          </h3>
        )}
        <h4 style={{ marginLeft: "10px" }}>{username}</h4>
      </div>
      <div style={{ display: "flex", flexDirection: "row",width:"100%",position:"relative" }}>
        <div style={{ width: "50%",}}>
          <textarea
            style={{ width: "50%", height: "100px" }}
            placeholder="Write your post here..."
          ></textarea>
        </div>
        
      </div>
    </div>
  );
};

export default CreatePost;
