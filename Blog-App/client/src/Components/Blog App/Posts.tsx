import React, { useEffect, useState } from "react";
import axios from "axios";

// Define types for posts and comments
interface Comment {
  text: string;
}

interface Post {
  id: number;
  username: string;
  content: string;
  comments: Comment[];
}

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]); // Define type for posts
  const [newPost, setNewPost] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  // Fetch posts from the backend
  const fetchPosts = async () => {
    try {
      const response = await axios.get<Post[]>("http://localhost:5000/api/posts");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // Add a new post
  const handleCreatePost = async () => {
    try {
      const response = await axios.post<Post>("http://localhost:5000/api/posts", {
        username,
        content: newPost,
      });
      setPosts([response.data, ...posts]); // Update the posts list
      setNewPost(""); // Clear input
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  // Delete a post
  const handleDeletePost = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  // Add a comment
  const handleAddComment = async (id: number, comment: string) => {
    try {
      const response = await axios.post<Post>(`http://localhost:5000/api/posts/${id}/comment`, {
        comment,
      });
      setPosts(posts.map((post) => (post.id === id ? response.data : post)));
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  // Reshare a post
  const handleReshare = async (id: number) => {
    try {
      const response = await axios.post<Post>(`http://localhost:5000/api/posts/${id}/reshare`);
      setPosts(posts.map((post) => (post.id === id ? response.data : post)));
    } catch (error) {
      console.error("Error resharing post:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <h1>My Posts</h1>
      <div>
        <input
          type="text"
          placeholder="Your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <textarea
          placeholder="What's on your mind?"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />
        <button onClick={handleCreatePost}>Create Post</button>
      </div>

      {posts.length === 0 ? (
        <p>No posts yet. Create a new post!</p>
      ) : (
        <div>
          {posts.map((post) => (
            <div key={post.id} style={{ border: "1px solid #ddd", margin: "10px", padding: "10px" }}>
              <h3>{post.username}</h3>
              <p>{post.content}</p>
              <button onClick={() => handleDeletePost(post.id)}>Delete</button>
              <button onClick={() => handleReshare(post.id)}>Reshare</button>
              <div>
                <h4>Comments:</h4>
                {post.comments.map((comment, idx) => (
                  <p key={idx}>- {comment.text}</p>
                ))}
                <input
                  type="text"
                  placeholder="Add a comment"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleAddComment(post.id, (e.target as HTMLInputElement).value);
                      (e.target as HTMLInputElement).value = "";
                    }
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Posts;
