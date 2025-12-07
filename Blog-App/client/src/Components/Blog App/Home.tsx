import React, { useEffect, useState } from "react";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import StarIcon from "@mui/icons-material/Star";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import PersonIcon from "@mui/icons-material/Person";
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
      <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-950 to-black flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-linear-to-r from-emerald-500 to-yellow-500 animate-spin"></div>
          <div className="absolute inset-4 bg-gray-950 rounded-full"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-950 to-black flex items-center justify-center">
        <div className="bg-gray-900/80 backdrop-blur-sm p-8 rounded-2xl border border-emerald-500/30 shadow-lg">
          <div className="text-emerald-400 text-lg font-medium">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-950 to-black text-gray-100 p-4 md:p-6 lg:p-8">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -right-20 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 left-1/3 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-8 md:mb-12 lg:mb-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
                <span className="bg-linear-to-r from-emerald-400 via-yellow-400 to-emerald-300 bg-clip-text text-transparent">
                  Community Hub
                </span>
              </h1>
              <p className="text-gray-400 text-base md:text-lg max-w-2xl">
                Discover trending content and connect with top creators
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 bg-gray-900/80 backdrop-blur-sm px-4 py-2 rounded-xl border border-gray-800">
                <WhatshotIcon className="text-emerald-400" />
                <span className="text-gray-300 font-medium">
                  {posts.length} Active Posts
                </span>
              </div>
              <button className="px-5 py-2.5 bg-linear-to-r from-emerald-600 to-yellow-600 hover:from-emerald-500 hover:to-yellow-500 text-white font-semibold rounded-xl transition-all duration-300 transform hover:-translate-y-0.5">
                Explore More
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Left Column - Top Users */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <div className="relative overflow-hidden rounded-2xl bg-gray-900/80 backdrop-blur-sm border border-gray-800/50 p-6 shadow-lg">
                {/* Accent Border */}
                {/* <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-emerald-500 via-yellow-500 to-emerald-400"></div> */}

                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-linear-to-br from-emerald-500/20 to-yellow-500/20 rounded-lg">
                    <StarIcon className="text-emerald-400" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-100">
                    Top Creators
                  </h2>
                </div>

                <div className="space-y-4">
                  {topPosts.map((post, index) => (
                    <div
                      key={post.id}
                      className="group relative overflow-hidden rounded-xl bg-gray-900/60 p-4 border border-gray-800/50 hover:border-emerald-500/30 transition-all duration-300"
                    >
                      {/* Rank Badge */}
                      <div
                        className={`absolute -top-2 -left-2 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shadow ${
                          index === 0
                            ? "bg-linear-to-br from-yellow-500 to-yellow-600 text-gray-900"
                            : index === 1
                            ? "bg-linear-to-br from-gray-400 to-gray-500 text-gray-900"
                            : index === 2
                            ? "bg-linear-to-br from-amber-700 to-amber-800 text-gray-100"
                            : "bg-linear-to-br from-gray-800 to-gray-900 text-gray-400"
                        }`}
                      >
                        #{index + 1}
                      </div>

                      <div className="flex items-center gap-4 mb-3">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-xl bg-linear-to-br from-emerald-500 to-yellow-500 flex items-center justify-center text-white font-bold text-lg shadow">
                            <PersonIcon className="text-white" />
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-gray-950 border-2 border-gray-900 flex items-center justify-center">
                            <TrendingUpIcon
                              sx={{ fontSize: "12px", color: "#10b981" }}
                            />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-100">
                            {post.username}
                          </h3>
                          <p className="text-xs text-gray-400">
                            Verified Creator
                          </p>
                        </div>
                      </div>

                      <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                        {post.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 bg-gray-950/80 px-3 py-1.5 rounded-lg">
                          <VisibilityIcon
                            className="text-emerald-400"
                            sx={{ fontSize: "16px" }}
                          />
                          <span className="font-bold text-gray-100 text-sm">
                            {post.views.toLocaleString()}
                          </span>
                        </div>

                        <button className="px-3 py-1.5 rounded-lg bg-linear-to-r from-emerald-500/10 to-yellow-500/10 text-emerald-400 text-sm font-medium hover:from-emerald-500/20 hover:to-yellow-500/20 transition-all duration-300">
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
            <div className="relative overflow-hidden rounded-2xl bg-gray-900/80 backdrop-blur-sm border border-gray-800/50 p-6 mb-6 shadow-lg">
              {/* Accent Border */}
              {/* <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-emerald-500 via-yellow-500 to-emerald-400"></div> */}

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-linear-to-br from-emerald-500/20 to-yellow-500/20 rounded-lg">
                    <WhatshotIcon className="text-emerald-400" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-100">
                      Trending Now
                    </h2>
                    <p className="text-gray-400 text-sm">
                      Most engaging content from the community
                    </p>
                  </div>
                </div>

                <div className="px-4 py-2 rounded-lg bg-linear-to-r from-emerald-500/10 to-yellow-500/10 border border-emerald-500/30">
                  <span className="text-sm font-semibold text-emerald-400">
                    🔥 Hot Today
                  </span>
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
                      className="relative overflow-hidden rounded-xl bg-gray-900/60 p-5 border border-gray-800/50 hover:border-emerald-500/30 transition-all duration-300 group"
                    >
                      {/* Draft Badge */}
                      {post.isDraft && (
                        <div className="absolute top-0 right-0 bg-linear-to-l from-emerald-500 to-yellow-500 text-gray-900 px-3 py-1 rounded-bl-lg font-bold text-xs shadow">
                          DRAFT
                        </div>
                      )}

                      {/* User Info */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-linear-to-br from-emerald-500 to-yellow-500 flex items-center justify-center text-white font-bold shadow">
                          {[...post.username][0].toUpperCase()}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-100">
                            {post.username}
                          </h3>
                          <p className="text-xs text-gray-400">
                            Just now • 5 min read
                          </p>
                        </div>
                      </div>

                      {/* Post Content */}
                      <div className="mb-6">
                        <p className="text-gray-200 leading-relaxed">
                          {post.postContent.slice(0, 160)}
                          {post.postContent.length > 160 && (
                            <span className="ml-2 cursor-pointer font-medium text-emerald-400 hover:underline">
                              ...Read more
                            </span>
                          )}
                        </p>
                      </div>

                      {/* Stats Bar */}
                      <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-gray-800/50">
                        <div className="flex items-center gap-2">
                          {/* Like Button */}
                          <button
                            onClick={() => handleLike(post)}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                              isLiked
                                ? "bg-linear-to-r from-emerald-500/20 to-yellow-500/20 text-emerald-400"
                                : "bg-gray-900/80 text-gray-400 hover:text-emerald-400 hover:bg-gray-800/80"
                            }`}
                          >
                            {isLiked ? (
                              <ThumbUpIcon sx={{ fontSize: "20px" }} />
                            ) : (
                              <ThumbUpOffAltIcon sx={{ fontSize: "20px" }} />
                            )}
                            <span className="font-medium">{post.likes}</span>
                          </button>

                          {/* Comments */}
                          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-900/80 text-gray-400 hover:text-yellow-400 hover:bg-gray-800/80 transition-all duration-300 cursor-pointer">
                            <ChatBubbleOutlineIcon sx={{ fontSize: "20px" }} />
                            <span className="font-medium">{post.comments}</span>
                          </div>

                          {/* Shares */}
                          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-900/80 text-gray-400 hover:text-emerald-400 hover:bg-gray-800/80 transition-all duration-300 cursor-pointer">
                            <ShareIcon sx={{ fontSize: "20px" }} />
                            <span className="font-medium">{post.shares}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          {/* Views */}
                          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-950/80">
                            <VisibilityIcon
                              sx={{ fontSize: "18px", color: "#9ca3af" }}
                            />
                            <span className="font-medium text-gray-300">
                              {post.views.toLocaleString()}
                            </span>
                          </div>

                          {/* Share Button */}
                          <button className="px-4 py-2 rounded-lg bg-linear-to-r from-emerald-500/10 to-yellow-500/10 text-gray-300 font-medium hover:from-emerald-500/20 hover:to-yellow-500/20 transition-all duration-300">
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
                <button className="px-6 py-3 rounded-xl bg-linear-to-r from-emerald-600 to-yellow-600 text-white font-bold hover:from-emerald-500 hover:to-yellow-500 hover:scale-105 transition-all duration-300">
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
