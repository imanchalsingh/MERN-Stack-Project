import React from "react";
import { useLikedPosts } from "./LikedPostContext";
import DeleteIcon from "@mui/icons-material/Delete";

const LikedPost: React.FC = () => {
  const { likedPosts, removeLikedPost } = useLikedPosts();

  return (
    <div style={{overflowY:"auto",height:"100%"}}>
      <h2>Liked Posts</h2>
      {likedPosts.length > 0 ? (
        likedPosts.map((post) => (
          <div
            key={post.id}
            style={{
              backgroundColor: "#f0f0f0",
              padding: "10px",
              margin: "10px 0",
              borderRadius: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                position: "relative",
              }}
            >
              <h3 className="profile-letter">
                {[...post.username][0].toUpperCase()}
              </h3>
              <h4>{post.username}</h4>
              <DeleteIcon
                onClick={() => removeLikedPost(post.id)}
                sx={{
                  background: "transparent",
                  color: "#f44336",
                  border: "2px solid #f44336",
                  padding: "5px",
                  cursor: "pointer",
                  fontSize: "14px",
                  borderRadius: "50%",
                  marginLeft: "10px",
                  position: "absolute",
                  right: 0,
                }}
              />
            </div>
            <p style={{ marginTop:"-5px" }}>
              {post.postContent.slice(0, 150)}
              {post.postContent.length > 150 ? (
                <span className="see-more"> ...See more</span>
              ) : (
                ""
              )}
            </p>
          </div>
        ))
      ) : (
        <p>No liked posts yet.</p>
      )}
    </div>
  );
};

export default LikedPost;
