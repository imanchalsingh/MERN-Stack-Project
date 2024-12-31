import React, { useEffect, useState } from "react";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";

interface Post {
  id: number;
  username: string;
  postContent: string;
  likes: number;
  comments: number;
  shares: number;
  views: number;
}
interface User {
  id: number;
  username: string;
  views: number;
  description: string;
}
const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]); // For fetching trending posts
  const [topPosts, setTopPosts] = useState<User[]>([]); // For fetching top posts
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching data for trending posts
        const responsePosts = await fetch("http://localhost:5000/api/posts");
        if (!responsePosts.ok) {
          throw new Error("Failed to fetch posts");
        }
        const dataPosts = await responsePosts.json();
        setPosts(dataPosts); // Storing data for trending posts in state

        // Fetching data for top posts
        const responseTopPosts = await fetch(
          "http://localhost:5000/api/top/user"
        );
        if (!responseTopPosts.ok) {
          throw new Error("Failed to fetch top posts");
        }
        const dataTopPosts = await responseTopPosts.json();
        setTopPosts(dataTopPosts); // Storing data for top posts in state
      } catch (error) {
        setError("Error fetching data: " + error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="home-page-container">
      <h3>Top Users</h3>
      <div className="top-posts">
        {topPosts.map((post) => (
          <div key={post.id} className="top-post">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <h3 className="user-profile-letter">
                  {[...post.username][0].toUpperCase()}
                </h3>
                <h4>{post.username}</h4>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  paddingRight:"5px"
                }}
              >
                <p>{post.views}</p>
                <VolunteerActivismIcon
                  sx={{
                    fontSize: "20px",
                    color: "#278e50",
                  }}
                />
              </div>
            </div>
            <div
              style={{
                marginTop: "-5px",
                textAlign: "center",
              }}
            >
              <p style={{ fontSize: "small" }}>{post.description}</p>
              <button
                style={{
                  width: "300px",
                  backgroundColor: "#278e50",
                  textAlign: "center",
                }}
              >
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>

      <h3>Trending Posts</h3>
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
