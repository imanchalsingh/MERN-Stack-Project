import React, { useEffect, useState } from "react";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import StarIcon from "@mui/icons-material/Star";
import { useLikedPosts } from "./LikedPostContext";

interface Post {
  id: number;
  username: string;
  postContent: string;
  likes: number;
  comments: number;
  shares: number;
  views: number;
  isDraft: boolean;
}

interface User {
  id: number;
  username: string;
  views: number;
  description: string;
}

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [topPosts, setTopPosts] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const { likedPosts, addLikedPost } = useLikedPosts();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responsePosts = await fetch("http://localhost:5000/api/posts");
        if (!responsePosts.ok) {
          throw new Error("Failed to fetch posts");
        }
        const dataPosts = await responsePosts.json();
        setPosts(dataPosts);

        const responseTopPosts = await fetch(
          "http://localhost:5000/api/top/user"
        );
        if (!responseTopPosts.ok) {
          throw new Error("Failed to fetch top posts");
        }
        const dataTopPosts = await responseTopPosts.json();
        setTopPosts(dataTopPosts);
      } catch (error) {
        setError("Error fetching data: " + error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLike = (post: Post) => {
    if (!likedPosts.some((likedPost) => likedPost.id === post.id)) {
      addLikedPost(post);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-linear-to-r from-[#ff1a1a] via-[#ff0066] to-[#ff00ff] animate-spin"></div>
          <div className="absolute inset-4 bg-gray-950 rounded-full"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="bg-gray-900/90 backdrop-blur-lg p-8 rounded-2xl border border-red-500/30 shadow-2xl shadow-red-500/10">
          <div className="text-red-400 text-lg font-medium">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-gray-100 p-4 md:p-6 lg:p-8">
      {/* Background Glow Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-[#ff1a1a] rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-[#ff00ff] rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute -bottom-40 left-1/2 w-80 h-80 bg-[#ff0066] rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-10 md:mb-14 lg:mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">
                <span className="bg-linear-to-r from-[#ff1a1a] via-[#ff0066] to-[#ff00ff] bg-clip-text text-transparent">
                  Community Hub
                </span>
              </h1>
              <p className="text-gray-400 text-lg md:text-xl max-w-2xl">
                Discover trending content and elite creators in our vibrant
                community
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 bg-gray-900/80 backdrop-blur-sm px-4 py-2.5 rounded-2xl border border-gray-800">
                <WhatshotIcon className="text-[#ff1a1a]" />
                <span className="text-gray-300 font-medium">
                  {posts.length} Active Posts
                </span>
              </div>
              <div className="bg-linear-to-r from-[#ff1a1a] via-[#ff0066] to-[#ff00ff] p-0.5 rounded-2xl">
                <button className="bg-gray-950 hover:bg-gray-900 px-6 py-2.5 rounded-[14px] font-semibold transition-all duration-300">
                  Explore More
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {/* Left Column - Top Users */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <div className="relative overflow-hidden rounded-3xl bg-gray-900/60 backdrop-blur-xl border border-gray-800 p-6 shadow-2xl shadow-black/50">
                {/* Header Glow Effect */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#ff1a1a] via-[#ff0066] to-[#ff00ff]"></div>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-linear-to-br from-[#ff1a1a]/20 to-[#ff00ff]/20 rounded-xl">
                      <StarIcon className="text-[#ff0066]" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-100">
                      Elite Creators
                    </h2>
                  </div>
                </div>

                <div className="space-y-4">
                  {topPosts.map((post, index) => (
                    <div
                      key={post.id}
                      className="group relative overflow-hidden rounded-2xl bg-gray-900/80 backdrop-blur-sm p-5 border border-gray-800 hover:border-[#ff0066]/50 transition-all duration-500 hover:shadow-xl hover:shadow-[#ff0066]/10"
                    >
                      {/* Rank Badge */}
                      <div
                        className={`absolute -top-2 -left-2 w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg ${
                          index === 0
                            ? "bg-linear-to-br from-yellow-500 to-yellow-700 text-gray-900"
                            : index === 1
                            ? "bg-linear-to-br from-gray-400 to-gray-600 text-gray-900"
                            : index === 2
                            ? "bg-linear-to-br from-amber-700 to-amber-900 text-gray-100"
                            : "bg-linear-to-br from-gray-800 to-gray-900 text-gray-400"
                        }`}
                      >
                        #{index + 1}
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <div className="w-14 h-14 rounded-xl bg-linear-to-br from-[#ff1a1a] via-[#ff0066] to-[#ff00ff] flex items-center justify-center text-white font-bold text-xl shadow-lg">
                              {[...post.username][0].toUpperCase()}
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gray-950 border-2 border-gray-900 flex items-center justify-center">
                              <TrendingUpIcon
                                sx={{ fontSize: "14px", color: "#ff1a1a" }}
                              />
                            </div>
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-100 text-lg">
                              {post.username}
                            </h3>
                            <p className="text-sm text-gray-400">
                              Verified Creator
                            </p>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-300 text-sm mb-5 line-clamp-2 pl-1">
                        {post.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 bg-gray-950/80 px-3 py-2 rounded-xl">
                          <VolunteerActivismIcon
                            className="text-[#ff0066]"
                            sx={{ fontSize: "20px" }}
                          />
                          <span className="font-bold text-gray-100">
                            {post.views.toLocaleString()}
                          </span>
                          <span className="text-xs text-gray-400">views</span>
                        </div>

                        <button className="px-4 py-2 rounded-xl bg-linear-to-r from-[#ff1a1a]/10 via-[#ff0066]/10 to-[#ff00ff]/10 text-[#ff0066] font-semibold text-sm hover:from-[#ff1a1a]/20 hover:via-[#ff0066]/20 hover:to-[#ff00ff]/20 transition-all duration-300 group-hover:scale-105">
                          Follow
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Trending Posts */}
          <div className="lg:col-span-2">
            <div className="relative overflow-hidden rounded-3xl bg-gray-900/60 backdrop-blur-xl border border-gray-800 p-6 mb-8 shadow-2xl shadow-black/50">
              <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#ff1a1a] via-[#ff0066] to-[#ff00ff]"></div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-linear-to-br from-[#ff1a1a]/20 to-[#ff00ff]/20 rounded-xl">
                    <WhatshotIcon className="text-[#ff1a1a]" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-100">
                      Trending Now
                    </h2>
                    <p className="text-gray-400">
                      Most engaging content from the community
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="px-4 py-2 rounded-xl bg-linear-to-r from-[#ff1a1a]/10 via-[#ff0066]/10 to-[#ff00ff]/10 border border-[#ff0066]/30">
                    <span className="text-sm font-semibold bg-linear-to-r from-[#ff1a1a] via-[#ff0066] to-[#ff00ff] bg-clip-text text-transparent">
                      🔥 Hot Today
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {posts.map((post) => {
                  const isLiked = likedPosts.some(
                    (likedPost) => likedPost.id === post.id
                  );

                  return (
                    <div
                      key={post.id}
                      className="group relative overflow-hidden rounded-2xl bg-gray-900/80 backdrop-blur-sm p-6 border border-gray-800 hover:border-[#ff00ff]/30 transition-all duration-500 hover:shadow-xl hover:shadow-[#ff00ff]/5"
                    >
                      {/* Post Glow Effect */}
                      {post.isDraft && (
                        <div className="absolute top-0 right-0 bg-linear-to-l from-[#ff1a1a] via-[#ff0066] to-[#ff00ff] text-gray-900 px-4 py-1 rounded-bl-lg font-bold text-sm shadow-lg">
                          DRAFT
                        </div>
                      )}

                      {/* User Info */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[#ff1a1a] via-[#ff0066] to-[#ff00ff] flex items-center justify-center text-white font-bold shadow-lg">
                              {[...post.username][0].toUpperCase()}
                            </div>
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-100 text-lg">
                              {post.username}
                            </h3>
                            <p className="text-sm text-gray-400">
                              Just now • 5 min read
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Post Content */}
                      <div className="mb-8">
                        <p className="text-gray-200 text-lg leading-relaxed">
                          {post.postContent.slice(0, 180)}
                          {post.postContent.length > 180 && (
                            <span className="ml-2 cursor-pointer font-semibold bg-linear-to-r from-[#ff0066] to-[#ff00ff] bg-clip-text text-transparent hover:underline">
                              ...Read more
                            </span>
                          )}
                        </p>
                      </div>

                      {/* Stats Bar */}
                      <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-gray-800">
                        <div className="flex items-center gap-3">
                          {/* Like Button */}
                          <button
                            onClick={() => handleLike(post)}
                            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 ${
                              isLiked
                                ? "bg-linear-to-r from-[#ff1a1a]/20 via-[#ff0066]/20 to-[#ff00ff]/20 text-[#ff0066] shadow-lg shadow-[#ff0066]/10"
                                : "bg-gray-900/80 text-gray-400 hover:text-[#ff0066] hover:bg-gray-800/80 hover:shadow-lg hover:shadow-[#ff0066]/5"
                            }`}
                          >
                            {isLiked ? (
                              <ThumbUpIcon sx={{ fontSize: "22px" }} />
                            ) : (
                              <ThumbUpOffAltIcon sx={{ fontSize: "22px" }} />
                            )}
                            <span className="font-bold">{post.likes}</span>
                          </button>

                          {/* Comments */}
                          <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-gray-900/80 text-gray-400 hover:text-[#ff00ff] hover:bg-gray-800/80 hover:shadow-lg hover:shadow-[#ff00ff]/5 transition-all duration-300 cursor-pointer">
                            <ChatBubbleOutlineIcon sx={{ fontSize: "22px" }} />
                            <span className="font-bold">{post.comments}</span>
                          </div>

                          {/* Shares */}
                          <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-gray-900/80 text-gray-400 hover:text-[#ff1a1a] hover:bg-gray-800/80 hover:shadow-lg hover:shadow-[#ff1a1a]/5 transition-all duration-300 cursor-pointer">
                            <ShareIcon sx={{ fontSize: "22px" }} />
                            <span className="font-bold">{post.shares}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          {/* Views */}
                          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-950/80">
                            <VisibilityIcon
                              sx={{ fontSize: "20px", color: "#888" }}
                            />
                            <span className="font-bold text-gray-300">
                              {post.views.toLocaleString()}
                            </span>
                          </div>

                          {/* Share Button */}
                          <button className="px-5 py-2.5 rounded-xl bg-linear-to-r from-[#ff1a1a]/10 via-[#ff0066]/10 to-[#ff00ff]/10 text-gray-300 font-semibold hover:from-[#ff1a1a]/20 hover:via-[#ff0066]/20 hover:to-[#ff00ff]/20 transition-all duration-300 hover:scale-105 group-hover:shadow-lg group-hover:shadow-[#ff00ff]/10">
                            Share
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Load More Button */}
              <div className="mt-8 flex justify-center">
                <button className="px-8 py-3.5 rounded-2xl bg-linear-to-r from-[#ff1a1a] via-[#ff0066] to-[#ff00ff] text-white font-bold text-lg shadow-2xl shadow-[#ff0066]/30 hover:shadow-[#ff0066]/50 hover:scale-105 transition-all duration-300">
                  Load More Posts
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
