import React, { useState } from "react";
import { useLikedPosts } from "./LikedPostContext";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import FilterListIcon from "@mui/icons-material/FilterList";
import SortIcon from "@mui/icons-material/Sort";
import DownloadIcon from "@mui/icons-material/Download";
import StarIcon from "@mui/icons-material/Star";
import PeopleIcon from "@mui/icons-material/People";
import BoltIcon from "@mui/icons-material/Bolt";
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
          <div className="w-16 h-16 rounded-full bg-linear-to-r from-[#ff1a1a]/20 to-[#ff0066]/20 flex items-center justify-center mx-auto mb-4">
            <DeleteIcon className="text-[#ff1a1a]" />
          </div>
          <p className="font-semibold text-gray-100 mb-3">
            Clear your collection?
          </p>
          <p className="text-sm text-gray-400 mb-6">
            This will remove all {likedPosts.length} liked posts from your
            collection. This action cannot be undone.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="flex-1 px-4 py-2.5 bg-gray-800/50 hover:bg-gray-800 rounded-xl text-gray-300 font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                likedPosts.forEach((post) => removeLikedPost(post.id));
                toast.success("Collection cleared successfully", {
                  icon: "🗑️",
                  style: {
                    background: "#0f172a",
                    color: "#f1f5f9",
                    border: "1px solid #1e293b",
                  },
                });
                toast.dismiss(t.id);
              }}
              className="flex-1 px-4 py-2.5 bg-linear-to-r from-[#ff1a1a] to-[#ff0066] text-white rounded-xl font-semibold"
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
      avatarColor: `from-[#${Math.floor(Math.random() * 16777215).toString(
        16
      )}] via-[#${Math.floor(Math.random() * 16777215).toString(
        16
      )}] to-[#${Math.floor(Math.random() * 16777215).toString(16)}]`,
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
    <div className="min-h-screne text-gray-100">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#0f172a",
            color: "#fff",
            border: "1px solid #1e293b",
          },
        }}
      />

      {/* Background Glow Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#ff1a1a] rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-[#ff00ff] rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute -bottom-40 left-1/3 w-80 h-80 bg-[#ff0066] rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-8xl mx-auto p-6 lg:p-8">
        {/* Header Section */}
        <div className="mb-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-10">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-[#ff1a1a] via-[#ff0066] to-[#ff00ff] flex items-center justify-center shadow-xl shadow-[#ff0066]/30">
                  <FavoriteIcon className="text-white text-3xl" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-linear-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg">
                  <StarIcon sx={{ fontSize: "14px", color: "white" }} />
                </div>
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-100">
                  Elite Collection
                </h1>
                <p className="text-gray-400 mt-2">
                  Curated collection of your favorite premium content
                </p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="relative overflow-hidden bg-linear-to-br from-gray-900/60 to-gray-900/30 backdrop-blur-sm rounded-2xl p-5 border border-gray-800/50 min-w-40">
                <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#ff1a1a] via-[#ff0066] to-[#ff00ff]"></div>
                <p className="text-sm text-gray-400 mb-2">Total Curated</p>
                <div className="flex items-center justify-between">
                  <p className="text-3xl font-bold bg-linear-to-r from-[#ff1a1a] to-[#ff0066] bg-clip-text text-transparent">
                    {likedPosts.length}
                  </p>
                  <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#ff1a1a]/20 to-[#ff00ff]/20 flex items-center justify-center">
                    <FavoriteIcon className="text-[#ff0066]" />
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden bg-linear-to-br from-gray-900/60 to-gray-900/30 backdrop-blur-sm rounded-2xl p-5 border border-gray-800/50 min-w-40">
                <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#ff0066] to-[#ff00ff]"></div>
                <p className="text-sm text-gray-400 mb-2">This Month</p>
                <div className="flex items-center justify-between">
                  <p className="text-3xl font-bold bg-linear-to-r from-[#ff0066] to-[#ff00ff] bg-clip-text text-transparent">
                    {Math.floor(likedPosts.length * 0.4)}
                  </p>
                  <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#ff0066]/20 to-[#ff00ff]/20 flex items-center justify-center">
                    <TrendingUpIcon className="text-[#ff00ff]" />
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden bg-linear-to-br from-gray-900/60 to-gray-900/30 backdrop-blur-sm rounded-2xl p-5 border border-gray-800/50 min-w-40">
                <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#ff1a1a] to-[#ff00ff]"></div>
                <p className="text-sm text-gray-400 mb-2">Unique Creators</p>
                <div className="flex items-center justify-between">
                  <p className="text-3xl font-bold bg-linear-to-r from-[#ff1a1a] to-[#ff00ff] bg-clip-text text-transparent">
                    {topCreators.length}
                  </p>
                  <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#ff1a1a]/20 to-[#ff00ff]/20 flex items-center justify-center">
                    <PeopleIcon className="text-[#ff0066]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Filters and Actions */}
          <div className="relative overflow-hidden bg-linear-to-br from-gray-900/60 to-gray-900/30 backdrop-blur-xl rounded-3xl p-6 border border-gray-800/50 mb-8 shadow-2xl shadow-black/30">
            <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#ff1a1a] via-[#ff0066] to-[#ff00ff]"></div>

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex flex-wrap items-center gap-4">
                <button className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-linear-to-b from-gray-900/60 to-gray-900/30 border border-gray-800/50 text-gray-300 font-semibold hover:border-[#ff0066]/30 transition-all duration-300">
                  <FilterListIcon />
                  Filter Content
                </button>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-gray-400">
                    <SortIcon sx={{ fontSize: "20px" }} />
                    <span>Sort by:</span>
                  </div>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-gray-900/80 border border-gray-800/50 rounded-2xl px-4 py-2.5 text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#ff0066]/50 backdrop-blur-sm"
                  >
                    <option value="recent">Most Recent</option>
                    <option value="likes">Most Liked</option>
                    <option value="views">Most Viewed</option>
                    <option value="comments">Most Comments</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-linear-to-b from-gray-900/60 to-gray-900/30 border border-gray-800/50 text-gray-300 font-semibold hover:border-[#ff0066]/30 transition-all duration-300">
                  <DownloadIcon />
                  Export Collection
                </button>
                {likedPosts.length > 0 && (
                  <button
                    onClick={handleRemoveAll}
                    className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-linear-to-r from-[#ff1a1a]/20 to-[#ff0066]/20 text-[#ff0066] font-semibold hover:from-[#ff1a1a]/30 hover:to-[#ff0066]/30 transition-all duration-300"
                  >
                    <DeleteIcon />
                    Clear Collection
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        {likedPosts.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Column - Stats & Info */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* User Stats */}
                <div className="relative overflow-hidden bg-linear-to-br from-gray-900/60 to-gray-900/30 backdrop-blur-xl rounded-3xl p-6 border border-gray-800/50 shadow-2xl shadow-black/30">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#ff1a1a] via-[#ff0066] to-[#ff00ff]"></div>

                  <h3 className="text-xl font-bold text-gray-100 mb-6 flex items-center gap-3">
                    <BoltIcon className="text-[#ff0066]" />
                    Collection Insights
                  </h3>
                  <div className="space-y-5">
                    <div className="flex items-center justify-between group">
                      <span className="text-gray-400 group-hover:text-gray-300 transition-colors">
                        Total Items
                      </span>
                      <span className="font-bold bg-linear-to-r from-[#ff1a1a] to-[#ff0066] bg-clip-text text-transparent">
                        {likedPosts.length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between group">
                      <span className="text-gray-400 group-hover:text-gray-300 transition-colors">
                        Avg. Engagement
                      </span>
                      <span className="font-bold bg-linear-to-r from-[#ff0066] to-[#ff00ff] bg-clip-text text-transparent">
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
                    <div className="flex items-center justify-between group">
                      <span className="text-gray-400 group-hover:text-gray-300 transition-colors">
                        Peak Activity
                      </span>
                      <span className="font-bold text-gray-100">Today</span>
                    </div>
                    <div className="flex items-center justify-between group">
                      <span className="text-gray-400 group-hover:text-gray-300 transition-colors">
                        Avg. View Score
                      </span>
                      <span className="font-bold bg-linear-to-r from-[#ff1a1a] to-[#ff00ff] bg-clip-text text-transparent">
                        {likedPosts.length > 0
                          ? Math.round(
                              likedPosts.reduce(
                                (acc, post) => acc + post.views,
                                0
                              ) /
                                likedPosts.length /
                                1000
                            )
                          : 0}
                        K
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="relative overflow-hidden bg-linear-to-br from-gray-900/60 to-gray-900/30 backdrop-blur-xl rounded-3xl p-6 border border-gray-800/50 shadow-2xl shadow-black/30">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#ff0066] to-[#ff00ff]"></div>

                  <h3 className="text-xl font-bold text-gray-100 mb-6 flex items-center gap-3">
                    <StarIcon className="text-[#ff0066]" />
                    Quick Actions
                  </h3>
                  <div className="space-y-3">
                    <button className="w-full py-3.5 rounded-xl bg-linear-to-b from-gray-900/60 to-gray-900/30 border border-gray-800/50 text-gray-300 hover:text-[#ff0066] hover:border-[#ff0066]/30 transition-all duration-300 font-semibold">
                      Discover Similar
                    </button>
                    <button className="w-full py-3.5 rounded-xl bg-linear-to-r from-[#ff1a1a] via-[#ff0066] to-[#ff00ff] text-white font-semibold hover:shadow-lg hover:shadow-[#ff0066]/20 transition-all duration-300">
                      Share Collection
                    </button>
                    <button className="w-full py-3.5 rounded-xl bg-linear-to-b from-gray-900/60 to-gray-900/30 border border-gray-800/50 text-gray-300 hover:text-[#ff00ff] hover:border-[#ff00ff]/30 transition-all duration-300 font-semibold">
                      View Analytics
                    </button>
                  </div>
                </div>

                {/* Top Creators */}
                <div className="relative overflow-hidden bg-linear-to-br from-gray-900/60 to-gray-900/30 backdrop-blur-xl rounded-3xl p-6 border border-gray-800/50 shadow-2xl shadow-black/30">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#ff1a1a] to-[#ff00ff]"></div>

                  <h3 className="text-xl font-bold text-gray-100 mb-6 flex items-center gap-3">
                    <PeopleIcon className="text-[#ff0066]" />
                    Top Creators
                  </h3>
                  <div className="space-y-4">
                    {topCreators.map((creator, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 rounded-2xl bg-linear-to-b from-gray-900/60 to-gray-900/30 border border-gray-800/50 hover:border-[#ff0066]/30 transition-all duration-300 group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1 mt-1">
                            {[...Array(Math.min(creator.count, 5))].map(
                              (_, i) => (
                                <StarIcon
                                  key={i}
                                  sx={{ fontSize: "10px", color: "#ff0066" }}
                                />
                              )
                            )}
                          </div>
                          <div>
                            <span className="font-bold text-gray-100">
                              {creator.username}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Liked Posts */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sortedPosts.map((post) => (
                  <div
                    key={post.id}
                    className="group relative overflow-hidden rounded-3xl transition-all duration-500 hover:scale-[1.02]"
                  >
                    {/* linear Border */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#ff1a1a] via-[#ff0066] to-[#ff00ff] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="bg-linear-to-br from-gray-900/60 to-gray-900/30 backdrop-blur-sm border border-gray-800/50 group-hover:border-[#ff0066]/30 p-6">
                      {/* Post Header */}
                      <div className="flex items-start justify-between mb-5">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-[#ff1a1a] via-[#ff0066] to-[#ff00ff] flex items-center justify-center shadow-lg">
                              <span className="text-white text-xl font-bold">
                                {post.username[0].toUpperCase()}
                              </span>
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-500 border-2 border-gray-900"></div>
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-100 text-lg">
                              {post.username}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                              <CalendarTodayIcon sx={{ fontSize: 14 }} />
                              <span>{getTimeAgo()}</span>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            removeLikedPost(post.id);
                            toast.success("Removed from collection", {
                              icon: "❤️",
                              style: {
                                background: "#0f172a",
                                color: "#f1f5f9",
                                border: "1px solid #1e293b",
                              },
                            });
                          }}
                          className="p-2.5 rounded-xl bg-linear-to-b from-gray-900/60 to-gray-900/30 border border-gray-800/50 hover:border-[#ff1a1a]/30 text-gray-400 hover:text-[#ff1a1a] transition-all duration-300 group-hover:opacity-100"
                          title="Remove from collection"
                        >
                          <DeleteIcon sx={{ fontSize: "20px" }} />
                        </button>
                      </div>

                      {/* Post Content */}
                      <div className="mb-6">
                        <div className="bg-gray-900/50 rounded-2xl p-5 group-hover:bg-gray-900/70 transition-colors duration-300">
                          <p className="text-gray-200 leading-relaxed line-clamp-3">
                            {post.postContent}
                          </p>
                          {post.postContent.length > 200 && (
                            <button className="mt-3 font-semibold bg-linear-to-r from-[#ff0066] to-[#ff00ff] bg-clip-text text-transparent hover:opacity-80 transition-opacity">
                              Continue reading...
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Post Stats */}
                      <div className="mb-6">
                        <div className="grid grid-cols-4 gap-3">
                          <div className="text-center p-4 rounded-2xl bg-linear-to-b from-gray-900/60 to-gray-900/30 border border-gray-800/50 group-hover:border-[#ff1a1a]/30 transition-all duration-300">
                            <FavoriteIcon
                              sx={{ fontSize: "20px", color: "#ff1a1a" }}
                            />
                            <p className="text-md font-bold text-gray-100 mt-2">
                              {post.likes.toLocaleString()}
                            </p>
                          </div>
                          <div className="text-center p-4 rounded-2xl bg-linear-to-b from-gray-900/60 to-gray-900/30 border border-gray-800/50 group-hover:border-[#3b82f6]/30 transition-all duration-300">
                            <ChatBubbleOutlineIcon
                              sx={{ fontSize: "20px", color: "#3b82f6" }}
                            />
                            <p className="text-md font-bold text-gray-100 mt-2">
                              {post.comments.toLocaleString()}
                            </p>
                          </div>
                          <div className="text-center p-4 rounded-2xl bg-linear-to-b from-gray-900/60 to-gray-900/30 border border-gray-800/50 group-hover:border-[#8b5cf6]/30 transition-all duration-300">
                            <ShareIcon
                              sx={{ fontSize: "20px", color: "#8b5cf6" }}
                            />
                            <p className="text-md font-bold text-gray-100 mt-2">
                              {post.shares.toLocaleString()}
                            </p>
                          </div>
                          <div className="text-center p-4 rounded-2xl bg-linear-to-b from-gray-900/60 to-gray-900/30 border border-gray-800/50 group-hover:border-[#10b981]/30 transition-all duration-300">
                            <VisibilityIcon
                              sx={{ fontSize: "20px", color: "#10b981" }}
                            />
                            <p className="text-md font-bold text-gray-100 mt-2">
                              {(post.views / 1000).toFixed(1)}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-2 gap-3">
                        <button className="py-3.5 rounded-xl bg-linear-to-b from-gray-900/60 to-gray-900/30 border border-gray-800/50 text-gray-300 hover:text-gray-100 hover:border-[#ff0066]/30 transition-all duration-300 font-semibold">
                          View Full Post
                        </button>
                        <button className="py-3.5 rounded-xl bg-linear-to-r from-[#ff1a1a] via-[#ff0066] to-[#ff00ff] text-white font-semibold hover:shadow-lg hover:shadow-[#ff0066]/20 transition-all duration-300">
                          Engage
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer Info */}
              <div className="mt-10 pt-8 border-t border-gray-800/50">
                <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-gray-900/40 to-gray-900/20 backdrop-blur-xl p-8 border border-gray-800/50 shadow-2xl shadow-black/30">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#ff1a1a] via-[#ff0066] to-[#ff00ff]"></div>

                  <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 rounded-2xl bg-linear-to-r from-[#ff1a1a]/20 via-[#ff0066]/20 to-[#ff00ff]/20 flex items-center justify-center">
                        <VolunteerActivismIcon
                          sx={{ fontSize: "40px", color: "#ff0066" }}
                        />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-100">
                          Support Elite Creators
                        </h3>
                        <p className="text-gray-300 mt-2">
                          Your curated collection helps premium creators grow
                          and produce exceptional content
                        </p>
                      </div>
                    </div>
                    <button className="px-8 py-3.5 rounded-2xl bg-linear-to-r from-[#ff1a1a] via-[#ff0066] to-[#ff00ff] text-white font-bold hover:shadow-xl hover:shadow-[#ff0066]/30 transition-all duration-300">
                      Discover More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Empty State
          <div className="relative overflow-hidden bg-linear-to-br from-gray-900/40 to-gray-900/20 backdrop-blur-xl rounded-3xl p-12 text-center border border-gray-800/50 shadow-2xl shadow-black/30">
            <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#ff1a1a] via-[#ff0066] to-[#ff00ff]"></div>

            <div className="max-w-md mx-auto">
              <div className="relative inline-block mb-8">
                <div className="w-32 h-32 rounded-full bg-linear-to-br from-[#ff1a1a]/10 via-[#ff0066]/10 to-[#ff00ff]/10 flex items-center justify-center mx-auto">
                  <BookmarkBorderIcon
                    sx={{ fontSize: "64px", color: "#4b5563" }}
                  />
                </div>
                <div className="absolute -top-2 -right-2 w-12 h-12 rounded-full bg-linear-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg">
                  <StarIcon sx={{ fontSize: "20px", color: "white" }} />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-100 mb-4">
                Curate Your Collection
              </h3>
              <p className="text-gray-400 mb-8 text-lg">
                Start building your elite collection by liking premium content
                from top creators
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-3.5 rounded-2xl bg-linear-to-r from-[#ff1a1a] via-[#ff0066] to-[#ff00ff] text-white font-bold hover:shadow-xl hover:shadow-[#ff0066]/30 transition-all duration-300">
                  Explore Trending
                </button>
                <button className="px-8 py-3.5 rounded-2xl bg-linear-to-b from-gray-900/60 to-gray-900/30 border border-gray-800/50 text-gray-300 hover:text-gray-100 hover:border-[#ff0066]/30 transition-all duration-300 font-bold">
                  Follow Elite Creators
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
