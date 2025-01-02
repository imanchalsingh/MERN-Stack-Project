import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

// Define the structure of a Post
interface Post {
  id: number;
  content: string;
  isDraft: boolean;
}

const Archive: React.FC = () => {
  const [draftPosts, setDraftPosts] = useState<Post[]>([]); // Use the Post type here
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);
  // Fetch draft posts from localStorage
  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
    const archive = storedPosts.filter((post: Post) => post.isDraft);
    setDraftPosts(archive);
  }, []);

  // Handle deleting draft posts
  const handleDelete = (id: number) => {
    const updatedPosts = draftPosts.filter((post) => post.id !== id);
    setDraftPosts(updatedPosts);

    // Update the posts in localStorage
    const allPosts = JSON.parse(localStorage.getItem("posts") || "[]");
    const newPosts = allPosts.filter((post: Post) => post.id !== id);
    localStorage.setItem("posts", JSON.stringify(newPosts));
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Poppins', sans-serif",
        padding: "20px",
        width: "100%",
        height: "90%",
      }}
    >
      <div
        style={{
          width: "100%",
          padding: "30px",
          borderRadius: "10px",
          height: "100%",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#333",
          }}
        >
          Archive Posts
        </h2>
        {draftPosts.length === 0 ? (
          <p style={{ textAlign: "center", color: "#888" }}>No archive yet.</p>
        ) : (
          <div style={{ width: "100%", overflowY: "auto", height: "70vh" }}>
            <div
              style={{
                marginTop: "20px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                width: "100%",
              }}
            >
              {draftPosts.map((post) => (
                <div
                  key={post.id}
                  style={{
                    alignItems: "center",
                    padding: "20px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    backgroundColor: "#2d945d4c",
                    color: "#312513",
                    width: "90%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    {/* Display the username here */}
                    <p
                      style={{
                        fontWeight: "bold",
                        fontSize: "16px",
                        color: "#555",
                      }}
                    >
                      {username ? `@ ${username}` : "Anonymous"}
                    </p>
                    <DeleteIcon
                      onClick={() => handleDelete(post.id)}
                      sx={{
                        background: "transparent",
                        color: "#f44336",
                        border: "2px solid #f44336",
                        padding: "5px",
                        cursor: "pointer",
                        fontSize: "14px",
                        borderRadius: "50%",
                        marginTop: "10px",
                      }}
                    />
                  </div>
                  <div>
                    <p style={{ fontSize: "14px" }}>{post.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Archive;
