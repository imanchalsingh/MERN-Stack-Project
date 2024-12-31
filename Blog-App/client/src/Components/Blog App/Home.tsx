import React, { useEffect, useState } from "react";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import VisibilityIcon from "@mui/icons-material/Visibility";
interface Post {
  id: number;
  username: string;
  postContent: string;
  likes: number;
  comments: number;
  shares: number;
  views: number;
}

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/posts");
        const data = await response.json();
        setPosts(data); // Storing data in the state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this runs once when the component mounts

  return (
    <div className="home-page-container">
      <h3>Top 2 Posts</h3>
      <div className="top-2-posts">
        <div className="top-1st-post"></div>
        <div className="top-2nd-post"></div>
      </div>
      <h3>Trending</h3>
      <div className="trending-posts">
        {posts.map((post) => (
          <div key={post.id} className="post">
            <div className="posts-details">
              <div className="user-details">
                <h3 className="profile-letter">
                  {[...post.username][0].toUpperCase()}
                </h3>
                <h4 className="username">{post.username}</h4>
              </div>
              <div className="like-comment-share">
                <div className="likes">
                  <p>{post.likes}</p>
                  <ThumbUpOffAltIcon
                    sx={{
                      fontSize: "20px",
                      marginLeft: "5px",
                      color: "#278e50",
                    }}
                  />
                </div>
                <div className="comments">
                  <p>{post.comments}</p>
                  <ChatBubbleOutlineIcon
                    sx={{
                      fontSize: "20px",
                      marginLeft: "5px",
                      color: "#278e50",
                    }}
                  />
                </div>
                <div className="shares">
                  <p>{post.shares}</p>
                  <ShareIcon
                    sx={{
                      fontSize: "20px",
                      marginLeft: "5px",
                      color: "#278e50",
                    }}
                  />
                </div>
                <div className="views">
                  <p>{post.views}</p>
                  <VisibilityIcon
                    sx={{
                      fontSize: "20px",
                      marginLeft: "5px",
                      color: "#278e50",
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="post-contents">
              <p>
                {post.postContent.slice(0, 70)}
                {post.postContent.length > 70 ? (
                  <span className="see-more"> ...See more</span>
                ) : (
                  ""
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
