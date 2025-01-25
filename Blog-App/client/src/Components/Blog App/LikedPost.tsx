import React, { useState, useEffect } from "react";

interface Post {
  id: number;
  username: string;
  content: string;
  isDraft: boolean;
}

const LikedPost: React.FC = () => {
  const [likedPosts, setLikedPosts] = useState<Post[]>([]);

  useEffect(() => {
    const storedLikedPosts = JSON.parse(localStorage.getItem("likedPosts") || "[]");
    setLikedPosts(storedLikedPosts);
  }, []);

  return (
    <div>
      <h2>Liked Posts</h2>
      {likedPosts.length === 0 ? (
        <p>No liked posts yet.</p>
      ) : (
        likedPosts.map((post) => (
          <div key={post.id}>
            <h3>{post.username}</h3>
            <p>{post.content}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default LikedPost;
