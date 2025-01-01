import React, { useState, useEffect } from "react";

interface Post {
  id: number;
  username: string;
  content: string;
  isDraft: boolean;
}

const MyPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // To toggle the dialog
  const [newPost, setNewPost] = useState({ content: "" }); // To store new post data
  const [username, setUsername] = useState<string>("");

  // Fetch username from localStorage or other storage
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
    
    const storedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
    setPosts(storedPosts);
  }, []);

  // Handle post creation (publish)
  const handlePublish = () => {
    if (!username) {
      alert("Please log in first.");
      return;
    }
    const newPostData = { ...newPost, id: Date.now(), username, isDraft: false };
    const updatedPosts = [...posts, newPostData];
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    setIsDialogOpen(false); // Close the dialog after publishing
    setNewPost({ content: "" }); // Reset new post data
  };

  // Handle input changes in the dialog
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewPost((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle post deletion
  const handleDelete = (id: number) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  // Handle post draft action
  const handleDraft = (id: number) => {
    const updatedPosts = posts.map((post) =>
      post.id === id ? { ...post, isDraft: true } : post
    );
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  return (
    <div className="mypost-container" style={{ padding: "20px", fontFamily: "'Poppins', sans-serif" }}>
      {/* Floating "+" button */}
      <button
        className="create-btn"
        onClick={() => setIsDialogOpen(true)}
       
      >
        +
      </button>

      {/* Dialog Box for Creating a New Post */}
      {isDialogOpen && (
        <div
          className="dialog"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            zIndex: 10,
          }}
        >
          <h3>Create New Post</h3>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            disabled
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
            }}
          />
          <textarea
            name="content"
            placeholder="Post Content"
            value={newPost.content}
            onChange={handleInputChange}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "20px",
              border: "1px solid #ddd",
              borderRadius: "5px",
            }}
          />
          <button
            onClick={handlePublish}
            style={{
              padding: "10px 20px",
              backgroundColor: "#4CAF50",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Publish
          </button>
          <button
            onClick={() => setIsDialogOpen(false)}
            style={{
              padding: "10px 20px",
              backgroundColor: "#f44336",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
              marginLeft: "10px",
            }}
          >
            Cancel
          </button>
        </div>
      )}

      {/* Display posts */}
      {posts.length === 0 ? (
        <div className="my-posts" style={{ textAlign: "center", marginTop: "50px" }}>
          <h4>You haven't posted anything yet.</h4>
          <p>Click on the "+" button to create your first post.</p>
        </div>
      ) : (
        <div className="post-list" style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {posts.map((post) => (
            !post.isDraft && (
              <div className="post-card" key={post.id} style={{ padding: "15px", border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "#fff", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
                <div className="post-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                  <h5 style={{ fontSize: "18px", fontWeight: "bold", color: "#333" }}>{post.username}</h5>
                  <div className="post-actions">
                    {/* Draft and Delete Buttons */}
                    <button
                      onClick={() => handleDraft(post.id)}
                      style={{
                        background: "#f0f0f0",
                        border: "1px solid #ddd",
                        padding: "5px 10px",
                        marginRight: "10px",
                        cursor: "pointer",
                        fontSize: "14px",
                      }}
                    >
                      Draft
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      style={{
                        background: "#f44336",
                        color: "#fff",
                        border: "1px solid #ddd",
                        padding: "5px 10px",
                        cursor: "pointer",
                        fontSize: "14px",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p style={{ fontSize: "16px", color: "#555" }}>{post.content}</p>
              </div>
            )
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPosts;
