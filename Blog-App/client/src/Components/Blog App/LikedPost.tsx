import React, { useState } from "react";
import { useLikedPosts } from "./LikedPostContext";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import FilterListIcon from "@mui/icons-material/FilterList";
import SortIcon from "@mui/icons-material/Sort";
import DownloadIcon from "@mui/icons-material/Download";
import StarIcon from "@mui/icons-material/Star";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { toast, Toaster } from "react-hot-toast";

const LikedPost: React.FC = () => {
  const { likedPosts, removeLikedPost } = useLikedPosts();
  const [sortBy, setSortBy] = useState<string>("recent");

  const getTimeAgo = () => {
    const times = ["2h ago", "1d ago", "3d ago", "1w ago", "2w ago"];
    return times[Math.floor(Math.random() * times.length)];
  };

  const handleRemoveAll = () => {
    toast(
      (t) => (
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
            <DeleteIcon className="text-emerald-400" />
          </div>
          <p className="font-semibold text-gray-100 mb-2">
            Clear your collection?
          </p>
          <p className="text-sm text-gray-400 mb-6">
            This will remove all {likedPosts.length} liked posts.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="flex-1 px-4 py-2 bg-gray-800/50 hover:bg-gray-800 rounded-xl text-gray-300 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                likedPosts.forEach((post) => removeLikedPost(post.id));
                toast.success("Collection cleared successfully", {
                  icon: "🗑️",
                  style: {
                    background: "#0a0f1e",
                    color: "#f1f5f9",
                    border: "1px solid #1e293b",
                  },
                });
                toast.dismiss(t.id);
              }}
              className="flex-1 px-4 py-2 bg-linear-to-r from-emerald-600 to-yellow-600 text-white rounded-xl font-medium"
            >
              Clear All
            </button>
          </div>
        </div>
      ),
      {
        duration: 6000,
      }
    );
  };

  // Get unique creators
  const topCreators = Array.from(new Set(likedPosts.map((p) => p.username)))
    .map((username) => ({
      username,
      count: likedPosts.filter((p) => p.username === username).length,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);

  const sortedPosts = [...likedPosts].sort((a, b) => {
    if (sortBy === "recent") return b.id - a.id;
    if (sortBy === "likes") return b.likes - a.likes;
    if (sortBy === "views") return b.views - a.views;
    return 0;
  });

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-950 to-black text-gray-100 p-4 md:p-6 lg:p-8">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#0a0f1e",
            color: "#fff",
            border: "1px solid #1e293b",
          },
        }}
      />

      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-20 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 left-1/3 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-emerald-500 to-yellow-500 flex items-center justify-center shadow-lg">
                <FavoriteIcon className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-100">
                  Liked Posts
                </h1>
                <p className="text-gray-400 text-sm">
                  Your collection of liked content
                </p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              <div className="relative overflow-hidden bg-gray-900/80 backdrop-blur-sm rounded-xl p-4 border border-gray-800/50">
                {/* <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-emerald-500 via-yellow-500 to-emerald-400"></div> */}
                <p className="text-xs text-gray-400 mb-2">Total Liked</p>
                <div className="flex items-center justify-between">
                  <p className="text-xl font-bold text-emerald-400">
                    {likedPosts.length}
                  </p>
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                    <FavoriteIcon className="text-emerald-400" />
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden bg-gray-900/80 backdrop-blur-sm rounded-xl p-4 border border-gray-800/50">
                {/* <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-emerald-500 via-yellow-500 to-emerald-400"></div> */}
                <p className="text-xs text-gray-400 mb-2">This Month</p>
                <div className="flex items-center justify-between">
                  <p className="text-xl font-bold text-yellow-400">
                    {Math.floor(likedPosts.length * 0.4)}
                  </p>
                  <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                    <TrendingUpIcon className="text-yellow-400" />
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden bg-gray-900/80 backdrop-blur-sm rounded-xl p-4 border border-gray-800/50">
                {/* <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-emerald-500 via-yellow-500 to-emerald-400"></div> */}
                <p className="text-xs text-gray-400 mb-2">Unique Creators</p>
                <div className="flex items-center justify-between">
                  <p className="text-xl font-bold text-emerald-400">
                    {topCreators.length}
                  </p>
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                    <PeopleIcon className="text-emerald-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Filters and Actions */}
          <div className="relative overflow-hidden bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50 mb-6">
            {/* <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-emerald-500 via-yellow-500 to-emerald-400"></div> */}

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-900/60 border border-gray-800/50 text-gray-300 font-medium hover:border-emerald-500/30 transition-all duration-300">
                  <FilterListIcon />
                  Filter
                </button>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-gray-400">
                    <SortIcon sx={{ fontSize: "18px" }} />
                    <span className="text-sm">Sort:</span>
                  </div>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-gray-900/60 border border-gray-800/50 rounded-xl px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-sm"
                  >
                    <option value="recent">Most Recent</option>
                    <option value="likes">Most Liked</option>
                    <option value="views">Most Viewed</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-900/60 border border-gray-800/50 text-gray-300 font-medium hover:border-emerald-500/30 transition-all duration-300">
                  <DownloadIcon />
                  Export
                </button>
                {likedPosts.length > 0 && (
                  <button
                    onClick={handleRemoveAll}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-linear-to-r from-emerald-500/10 to-yellow-500/10 text-emerald-400 font-medium hover:from-emerald-500/20 hover:to-yellow-500/20 transition-all duration-300"
                  >
                    <DeleteIcon />
                    Clear All
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        {likedPosts.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Column - Stats & Info */}
            <div className="lg:col-span-1">
              <div className="sticky top-6 space-y-6">
                {/* User Stats */}
                <div className="relative overflow-hidden bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50">
                  {/* <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-emerald-500 via-yellow-500 to-emerald-400"></div> */}

                  <h3 className="text-lg font-bold text-gray-100 mb-4 flex items-center gap-3">
                    <CheckCircleIcon className="text-emerald-400" />
                    Insights
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Total Items</span>
                      <span className="font-medium text-emerald-400">
                        {likedPosts.length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">
                        Avg. Engagement
                      </span>
                      <span className="font-medium text-yellow-400">
                        {likedPosts.length > 0
                          ? Math.round(
                              likedPosts.reduce(
                                (acc, post) =>
                                  acc +
                                  post.likes +
                                  post.comments +
                                  post.shares,
                                0
                              ) /
                                likedPosts.length /
                                3
                            )
                          : 0}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Peak Activity</span>
                      <span className="font-medium text-gray-100">Today</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">
                        Avg. Views
                      </span>
                      <span className="font-medium text-emerald-400">
                        {likedPosts.length > 0
                          ? Math.round(
                              likedPosts.reduce(
                                (acc, post) => acc + post.views,
                                0
                              ) / likedPosts.length
                            ).toLocaleString()
                          : 0}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="relative overflow-hidden bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50">
                  {/* <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-emerald-500 via-yellow-500 to-emerald-400"></div> */}

                  <h3 className="text-lg font-bold text-gray-100 mb-4 flex items-center gap-3">
                    <StarIcon className="text-emerald-400" />
                    Quick Actions
                  </h3>
                  <div className="space-y-2">
                    <button className="w-full py-3 rounded-xl bg-gray-900/60 border border-gray-800/50 text-gray-300 hover:text-emerald-400 hover:border-emerald-500/30 transition-all duration-300 font-medium">
                      Discover Similar
                    </button>
                    <button className="w-full py-3 rounded-xl bg-linear-to-r from-emerald-600 to-yellow-600 text-white font-medium hover:from-emerald-500 hover:to-yellow-500 transition-all duration-300">
                      Share Collection
                    </button>
                  </div>
                </div>

                {/* Top Creators */}
                <div className="relative overflow-hidden bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50">
                  {/* <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-emerald-500 via-yellow-500 to-emerald-400"></div> */}

                  <h3 className="text-lg font-bold text-gray-100 mb-4 flex items-center gap-3">
                    <PeopleIcon className="text-emerald-400" />
                    Top Creators
                  </h3>
                  <div className="space-y-3">
                    {topCreators.map((creator, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-xl bg-gray-900/60 border border-gray-800/50 hover:border-emerald-500/30 transition-all duration-300"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-linear-to-br from-emerald-500 to-yellow-500 flex items-center justify-center">
                            <PersonIcon className="text-white text-xs" />
                          </div>
                          <div>
                            <span className="font-medium text-gray-100 text-sm">
                              {creator.username}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <StarIcon
                            sx={{ fontSize: "12px", color: "#eab308" }}
                          />
                          <span className="text-sm text-gray-300">
                            {creator.count}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Liked Posts */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sortedPosts.map((post) => (
                  <div
                    key={post.id}
                    className="group relative overflow-hidden rounded-xl border border-gray-800/50 hover:border-emerald-500/30 transition-all duration-300"
                  >
                    {/* Accent Border */}
                    {/* <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-emerald-500 via-yellow-500 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div> */}

                    <div className="bg-gray-900/80 p-4">
                      {/* Post Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="w-10 h-10 rounded-lg bg-linear-to-br from-emerald-500 to-yellow-500 flex items-center justify-center shadow">
                              <span className="text-white font-bold">
                                {post.username[0].toUpperCase()}
                              </span>
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-gray-900"></div>
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-100 text-sm">
                              {post.username}
                            </h3>
                            <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
                              <CalendarTodayIcon sx={{ fontSize: 12 }} />
                              <span>{getTimeAgo()}</span>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            removeLikedPost(post.id);
                            toast.success("Removed from liked posts", {
                              icon: "❤️",
                              style: {
                                background: "#0a0f1e",
                                color: "#f1f5f9",
                                border: "1px solid #1e293b",
                              },
                            });
                          }}
                          className="p-2 rounded-lg bg-gray-900/60 border border-gray-800/50 hover:border-emerald-500/30 text-gray-400 hover:text-emerald-400 transition-all duration-300"
                          title="Remove"
                        >
                          <DeleteIcon sx={{ fontSize: "16px" }} />
                        </button>
                      </div>

                      {/* Post Content */}
                      <div className="mb-4">
                        <div className="bg-gray-900/50 rounded-lg p-3 group-hover:bg-gray-900/70 transition-colors duration-300">
                          <p className="text-gray-200 text-sm leading-relaxed line-clamp-3">
                            {post.postContent}
                          </p>
                          {post.postContent.length > 200 && (
                            <button className="mt-2 font-medium text-emerald-400 hover:text-emerald-300 transition-colors text-sm">
                              Continue reading...
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Post Stats */}
                      <div className="mb-4">
                        <div className="grid grid-cols-4 gap-2">
                          <div className="text-center p-3 rounded-lg bg-gray-900/60 border border-gray-800/50 group-hover:border-emerald-500/30 transition-all duration-300">
                            <FavoriteIcon
                              sx={{ fontSize: "16px", color: "#ef4444" }}
                            />
                            <p className="text-sm font-bold text-gray-100 mt-1">
                              {post.likes.toLocaleString()}
                            </p>
                          </div>
                          <div className="text-center p-3 rounded-lg bg-gray-900/60 border border-gray-800/50 group-hover:border-blue-500/30 transition-all duration-300">
                            <ChatBubbleOutlineIcon
                              sx={{ fontSize: "16px", color: "#3b82f6" }}
                            />
                            <p className="text-sm font-bold text-gray-100 mt-1">
                              {post.comments.toLocaleString()}
                            </p>
                          </div>
                          <div className="text-center p-3 rounded-lg bg-gray-900/60 border border-gray-800/50 group-hover:border-purple-500/30 transition-all duration-300">
                            <ShareIcon
                              sx={{ fontSize: "16px", color: "#8b5cf6" }}
                            />
                            <p className="text-sm font-bold text-gray-100 mt-1">
                              {post.shares.toLocaleString()}
                            </p>
                          </div>
                          <div className="text-center p-3 rounded-lg bg-gray-900/60 border border-gray-800/50 group-hover:border-emerald-500/30 transition-all duration-300">
                            <VisibilityIcon
                              sx={{ fontSize: "16px", color: "#10b981" }}
                            />
                            <p className="text-sm font-bold text-gray-100 mt-1">
                              {(post.views / 1000).toFixed(1)}k
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-2 gap-2">
                        <button className="py-2.5 rounded-lg bg-gray-900/60 border border-gray-800/50 text-gray-300 hover:text-gray-100 hover:border-emerald-500/30 transition-all duration-300 font-medium text-sm">
                          View Post
                        </button>
                        <button className="py-2.5 rounded-lg bg-linear-to-r from-emerald-600 to-yellow-600 text-white font-medium hover:from-emerald-500 hover:to-yellow-500 transition-all duration-300 text-sm">
                          Engage
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer Info */}
              <div className="mt-8 pt-6 border-t border-gray-800/50">
                <div className="relative overflow-hidden rounded-2xl bg-gray-900/80 p-6 border border-gray-800/50">
                  {/* <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-emerald-500 via-yellow-500 to-emerald-400"></div> */}

                  <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-linear-to-r from-emerald-500/10 to-yellow-500/10 flex items-center justify-center">
                        <BookmarkIcon
                          sx={{ fontSize: "24px", color: "#10b981" }}
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-100">
                          Support Creators
                        </h3>
                        <p className="text-gray-300 text-sm mt-1">
                          Your likes help creators grow and produce great content
                        </p>
                      </div>
                    </div>
                    <button className="px-5 py-2.5 rounded-xl bg-linear-to-r from-emerald-600 to-yellow-600 text-white font-medium hover:from-emerald-500 hover:to-yellow-500 transition-all duration-300">
                      Discover More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Empty State
          <div className="relative overflow-hidden bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 text-center border border-gray-800/50">
            <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-emerald-500 via-yellow-500 to-emerald-400"></div>

            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
                <BookmarkIcon
                  sx={{ fontSize: "40px", color: "#4b5563" }}
                />
              </div>
              <h3 className="text-xl font-bold text-gray-100 mb-3">
                No Liked Posts Yet
              </h3>
              <p className="text-gray-400 mb-6">
                Start building your collection by liking posts from creators
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button className="px-5 py-3 rounded-xl bg-linear-to-r from-emerald-600 to-yellow-600 text-white font-medium hover:from-emerald-500 hover:to-yellow-500 transition-all duration-300">
                  Explore Trending
                </button>
                <button className="px-5 py-3 rounded-xl bg-gray-900/60 border border-gray-800/50 text-gray-300 hover:text-gray-100 hover:border-emerald-500/30 transition-all duration-300 font-medium">
                  Follow Creators
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LikedPost;