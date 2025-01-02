import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ArchiveIcon from "@mui/icons-material/Archive";
import DeleteIcon from "@mui/icons-material/Delete";

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
    const newPostData = {
      ...newPost,
      id: Date.now(),
      username,
      isDraft: false,
    };
    const updatedPosts = [...posts, newPostData];
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    setIsDialogOpen(false); // Close the dialog after publishing
    setNewPost({ content: "" }); // Reset new post data
  };

  // Handle input changes in the dialog
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
    <div
      className="mypost-container"
      style={{ padding: "20px", fontFamily: "'Poppins', sans-serif" }}
    >
      <button className="create-btn" onClick={() => setIsDialogOpen(true)}>
        +
      </button>

      {isDialogOpen && (
        <Dialog open={isDialogOpen} fullWidth>
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Create Post
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={() => setIsDialogOpen(false)}
            sx={(theme) => ({
              position: "absolute",
              right: 8,
              top: 8,
              color: theme.palette.grey[500],
              width: "40px",
            })}
          >
            <CloseIcon />
          </IconButton>
          <form
            onSubmit={(e) => {
              e.preventDefault(); // Prevent default form submission
              if (!newPost.content.trim()) {
                alert("Post Content cannot be empty!");
                return;
              }
              handlePublish();
            }}
          >
            <DialogContent>
              <div style={{ padding: "10px" }}>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={username}
                  disabled
                  style={{
                    width: "95%",
                    padding: "10px",
                    marginBottom: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                  }}
                />
              </div>
              <div style={{ padding: "10px" }}>
                <textarea
                  className="textarea"
                  name="content"
                  placeholder="Post Content"
                  value={newPost.content}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: "95%",
                    padding: "10px",
                    marginBottom: "20px",
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                  }}
                />
              </div>
            </DialogContent>

            <DialogActions>
              <button
                type="submit"
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#1a733e",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "16px",
                  bottom: 0,
                }}
              >
                Publish
              </button>
            </DialogActions>
          </form>
        </Dialog>
      )}

      {/* Display posts */}
      {posts.length === 0 ? (
        <div
          className="my-posts"
          style={{ textAlign: "center", marginTop: "50px" }}
        >
          <h4>You haven't posted anything yet.</h4>
          <p>Click on the "+" button to create your first post.</p>
        </div>
      ) : (
        <div
          className="post-list"
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
          {posts.map(
            (post) =>
              !post.isDraft && (
                <div
                  className="post-card"
                  key={post.id}
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    backgroundColor: "#fff",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div
                    className="post-header"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "10px",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <h3 className="user-profile-letter">
                        {[...post.username][0].toUpperCase()}
                      </h3>
                      <h5
                        style={{
                          fontSize: "18px",
                          fontWeight: "bold",
                          color: "#333",
                        }}
                      >
                        {post.username}
                      </h5>
                    </div>

                    <div
                      className="post-actions"
                      style={{ display: "flex", flexDirection: "row" }}
                    >
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
                        <ArchiveIcon />
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
                        <DeleteIcon />
                      </button>
                    </div>
                  </div>
                  <p style={{ fontSize: "16px", color: "#555" }}>
                    {post.content}
                  </p>
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
};

export default MyPosts;
