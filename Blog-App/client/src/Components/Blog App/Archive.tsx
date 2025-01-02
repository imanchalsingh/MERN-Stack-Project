import React, { useState, useEffect } from "react";

// Define the structure of a Post
interface Post {
  id: number;
  title: string;
  content: string;
  isDraft: boolean;
}

const Archive: React.FC = () => {
  const [draftPosts, setDraftPosts] = useState<Post[]>([]); // Use the Post type here

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
        minHeight: "100vh",
        backgroundColor: "#f9f9f9",
      }}
    >
      <div
        style={{
          width: "80%",
          maxWidth: "1000px",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#fff",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#333",
          }}
        >
          Draft Posts
        </h2>
        {draftPosts.length === 0 ? (
          <p style={{ textAlign: "center", color: "#888" }}>No archive yet.</p>
        ) : (
          <div style={{ marginTop: "20px" }}>
            {draftPosts.map((post) => (
              <div
                key={post.id}
                style={{
                  borderBottom: "1px solid #ddd",
                  paddingBottom: "20px",
                  marginBottom: "20px",
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
                  <h3
                    style={{
                      margin: 0,
                      color: "#333",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    {post.title}
                  </h3>
                  <button
                    onClick={() => handleDelete(post.id)}
                    style={{
                      padding: "8px 12px",
                      backgroundColor: "#ff4d4f",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      fontSize: "14px",
                    }}
                  >
                    Delete
                  </button>
                </div>
                <p style={{ color: "#555", fontSize: "14px" }}>{post.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Archive;
