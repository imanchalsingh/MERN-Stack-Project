import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionIcon from "@mui/icons-material/Description";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { toast, Toaster } from "react-hot-toast";

interface Post {
  id: number;
  username: string;
  content: string;
  isDraft: boolean;
  timestamp?: string;
  likes?: number;
  comments?: number;
  shares?: number;
  views?: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
}

const MyPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newPost, setNewPost] = useState({ content: "" });
  const [username, setUsername] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "published" | "drafts">("all");
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [characterCount, setCharacterCount] = useState(0);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }

    const storedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
    const postsWithStats = storedPosts.map((post: Post) => ({
      ...post,
      likes: post.likes || 0,
      comments: post.comments || 0,
      shares: post.shares || 0,
      views: post.views || 0,
      timestamp: post.timestamp || new Date().toISOString(),
      isLiked: post.isLiked || false,
      isBookmarked: post.isBookmarked || false,
    }));
    setPosts(postsWithStats);
    setIsLoading(false);
  }, []);

  const handlePublish = () => {
    if (!username) {
      toast.error("Please log in to create posts", {
        icon: "🔒",
        style: {
          background: "#0f172a",
          color: "#f1f5f9",
          border: "1px solid #1e293b",
        },
      });
      return;
    }

    if (!newPost.content.trim()) {
      toast.error("Post content cannot be empty!", {
        icon: "📝",
        style: {
          background: "#0f172a",
          color: "#f1f5f9",
          border: "1px solid #1e293b",
        },
      });
      return;
    }

    if (characterCount > 1000) {
      toast.error("Post content exceeds 1000 characters!", {
        icon: "⚠️",
        style: {
          background: "#0f172a",
          color: "#f1f5f9",
          border: "1px solid #1e293b",
        },
      });
      return;
    }

    if (editingPost) {
      // Update existing post
      const updatedPosts = posts.map((post) =>
        post.id === editingPost.id
          ? { ...post, content: newPost.content }
          : post
      );
      setPosts(updatedPosts);
      localStorage.setItem("posts", JSON.stringify(updatedPosts));
      toast.success("Post updated successfully!", {
        icon: "✏️",
        style: {
          background: "#0f172a",
          color: "#f1f5f9",
          border: "1px solid #1e293b",
        },
      });
    } else {
      // Create new post
      const newPostData: Post = {
        ...newPost,
        id: Date.now(),
        username,
        isDraft: false,
        likes: 0,
        comments: 0,
        shares: 0,
        views: Math.floor(Math.random() * 1000) + 100,
        timestamp: new Date().toISOString(),
        isLiked: false,
        isBookmarked: false,
      };
      const updatedPosts = [...posts, newPostData];
      setPosts(updatedPosts);
      localStorage.setItem("posts", JSON.stringify(updatedPosts));
      toast.success("Post published successfully!", {
        icon: "🚀",
        style: {
          background: "#0f172a",
          color: "#f1f5f9",
          border: "1px solid #1e293b",
        },
      });
    }

    setIsDialogOpen(false);
    setNewPost({ content: "" });
    setEditingPost(null);
    setCharacterCount(0);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewPost((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setCharacterCount(value.length);
  };

  const handleDelete = (id: number) => {
    toast(
      (t) => (
        <div className="text-center">
          <p className="font-semibold text-gray-100 mb-3">Delete this post?</p>
          <p className="text-sm text-gray-400 mb-4">
            This action cannot be undone.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="flex-1 px-4 py-2 bg-gray-800/50 hover:bg-gray-800 rounded-lg text-gray-300 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                const updatedPosts = posts.filter((post) => post.id !== id);
                setPosts(updatedPosts);
                localStorage.setItem("posts", JSON.stringify(updatedPosts));
                toast.success("Post deleted successfully", {
                  icon: "🗑️",
                  style: {
                    background: "#0f172a",
                    color: "#f1f5f9",
                    border: "1px solid #1e293b",
                  },
                });
                toast.dismiss(t.id);
              }}
              className="flex-1 px-4 py-2 bg-linear-to-r from-[#ff1a1a] to-[#ff0066] text-white rounded-lg font-medium"
            >
              Delete
            </button>
          </div>
        </div>
      ),
      {
        duration: 5000,
      }
    );
  };

  const handleDraft = (id: number) => {
    const updatedPosts = posts.map((post) =>
      post.id === id ? { ...post, isDraft: true } : post
    );
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    toast.success("Moved to drafts", {
      icon: "📁",
      style: {
        background: "#0f172a",
        color: "#f1f5f9",
        border: "1px solid #1e293b",
      },
    });
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setNewPost({ content: post.content });
    setCharacterCount(post.content.length);
    setIsDialogOpen(true);
  };

  const handlePublishDraft = (id: number) => {
    const updatedPosts = posts.map((post) =>
      post.id === id ? { ...post, isDraft: false } : post
    );
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    toast.success("Post published from drafts!", {
      icon: "📤",
      style: {
        background: "#0f172a",
        color: "#f1f5f9",
        border: "1px solid #1e293b",
      },
    });
  };

  const handleLike = (id: number) => {
    const updatedPosts = posts.map((post) =>
      post.id === id
        ? {
            ...post,
            likes: post.isLiked ? (post.likes || 0) - 1 : (post.likes || 0) + 1,
            isLiked: !post.isLiked,
          }
        : post
    );
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  const handleBookmark = (id: number) => {
    const updatedPosts = posts.map((post) =>
      post.id === id
        ? {
            ...post,
            isBookmarked: !post.isBookmarked,
          }
        : post
    );
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  const filteredPosts = posts.filter((post) => {
    if (filter === "all") return true;
    if (filter === "published") return !post.isDraft;
    if (filter === "drafts") return post.isDraft;
    return true;
  });

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return formatDate(timestamp);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="relative mx-auto mb-6">
            <div className="w-16 h-16 rounded-full bg-linear-to-r from-[#ff1a1a] via-[#ff0066] to-[#ff00ff] animate-spin"></div>
            <div className="absolute inset-4 bg-gray-950 rounded-full"></div>
          </div>
          <p className="text-gray-400">Loading your content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-gray-100">
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
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-[#ff00ff] rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-8xl mx-auto p-6 lg:p-8">
        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-10">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-[#ff1a1a] via-[#ff0066] to-[#ff00ff] flex items-center justify-center shadow-xl shadow-[#ff0066]/30">
                  <DashboardIcon className="text-white text-3xl" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-linear-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg">
                  <span className="text-xs font-bold text-gray-900">PRO</span>
                </div>
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-100">
                  Content Dashboard
                </h1>
                <p className="text-gray-400 mt-2">
                  Manage and track your published content
                </p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="relative overflow-hidden bg-linear-to-br from-gray-900/60 to-gray-900/30 backdrop-blur-sm rounded-2xl p-5 border border-gray-800/50 min-w-40">
                <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#ff1a1a] via-[#ff0066] to-[#ff00ff]"></div>
                <p className="text-sm text-gray-400 mb-2">Total Posts</p>
                <div className="flex items-center justify-between">
                  <p className="text-3xl font-bold bg-linear-to-r from-[#ff1a1a] to-[#ff0066] bg-clip-text text-transparent">
                    {posts.length}
                  </p>
                  <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#ff1a1a]/20 to-[#ff00ff]/20 flex items-center justify-center">
                    <DescriptionIcon className="text-[#ff0066]" />
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden bg-linear-to-br from-gray-900/60 to-gray-900/30 backdrop-blur-sm rounded-2xl p-5 border border-gray-800/50 min-w-40">
                <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#ff0066] to-[#ff00ff]"></div>
                <p className="text-sm text-gray-400 mb-2">Published</p>
                <div className="flex items-center justify-between">
                  <p className="text-3xl font-bold bg-linear-to-r from-[#ff0066] to-[#ff00ff] bg-clip-text text-transparent">
                    {posts.filter((p) => !p.isDraft).length}
                  </p>
                  <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#ff0066]/20 to-[#ff00ff]/20 flex items-center justify-center">
                    <VisibilityIcon className="text-[#ff00ff]" />
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden bg-linear-to-br from-gray-900/60 to-gray-900/30 backdrop-blur-sm rounded-2xl p-5 border border-gray-800/50 min-w-40">
                <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#ff1a1a] to-[#ff00ff]"></div>
                <p className="text-sm text-gray-400 mb-2">Total Views</p>
                <div className="flex items-center justify-between">
                  <p className="text-3xl font-bold bg-linear-to-r from-[#ff1a1a] to-[#ff00ff] bg-clip-text text-transparent">
                    {posts
                      .reduce((sum, post) => sum + (post.views || 0), 0)
                      .toLocaleString()}
                  </p>
                  <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#ff1a1a]/20 to-[#ff00ff]/20 flex items-center justify-center">
                    <TrendingUpIcon className="text-[#ff0066]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Create Post Button and Filters */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-8">
            <button
              onClick={() => {
                setEditingPost(null);
                setNewPost({ content: "" });
                setCharacterCount(0);
                setIsDialogOpen(true);
              }}
              className="group relative overflow-hidden rounded-2xl"
            >
              <div className="absolute inset-0 bg-linear-to-r from-[#ff1a1a] via-[#ff0066] to-[#ff00ff] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-linear-to-r from-gray-900 to-gray-800 group-hover:from-transparent group-hover:to-transparent transition-all duration-300">
                <div className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl border border-gray-800/50 group-hover:border-transparent transition-all duration-300">
                  <CreateIcon />
                  <span className="font-bold text-lg">Create New Content</span>
                  <RocketLaunchIcon className="group-hover:rotate-12 transition-transform duration-300" />
                </div>
              </div>
            </button>

            {/* Filter Buttons */}
            <div className="flex items-center gap-2 bg-gray-900/60 backdrop-blur-sm p-1.5 rounded-2xl border border-gray-800/50">
              {["all", "published", "drafts"].map((filterType) => (
                <button
                  key={filterType}
                  onClick={() =>
                    setFilter(filterType as "all" | "published" | "drafts")
                  }
                  className={`px-5 py-2.5 rounded-xl font-medium capitalize transition-all duration-300 ${
                    filter === filterType
                      ? "bg-linear-to-r from-[#ff1a1a] via-[#ff0066] to-[#ff00ff] text-white shadow-lg shadow-[#ff0066]/20"
                      : "text-gray-400 hover:text-gray-100 hover:bg-gray-800/50"
                  }`}
                >
                  {filterType}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        {filteredPosts.length === 0 ? (
          <div className="relative overflow-hidden bg-linear-to-br from-gray-900/40 to-gray-900/20 backdrop-blur-xl rounded-3xl p-12 text-center border border-gray-800/50 shadow-2xl shadow-black/30">
            <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#ff1a1a] via-[#ff0066] to-[#ff00ff]"></div>
            <div className="max-w-md mx-auto">
              <div className="relative inline-block mb-8">
                <div className="w-32 h-32 rounded-full bg-linear-to-br from-[#ff1a1a]/10 via-[#ff0066]/10 to-[#ff00ff]/10 flex items-center justify-center mx-auto">
                  <CreateIcon sx={{ fontSize: "64px", color: "#4b5563" }} />
                </div>
                <div className="absolute -top-2 -right-2 w-12 h-12 rounded-full bg-linear-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg">
                  <span className="text-sm font-bold text-gray-900">+</span>
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-100 mb-4">
                {filter === "drafts" ? "No Drafts Found" : "Ready to Create?"}
              </h3>
              <p className="text-gray-400 mb-8 text-lg">
                {filter === "drafts"
                  ? "Drafts will appear here when you save content for later."
                  : "Start your content journey by creating your first masterpiece!"}
              </p>
              <button
                onClick={() => {
                  setEditingPost(null);
                  setNewPost({ content: "" });
                  setCharacterCount(0);
                  setIsDialogOpen(true);
                }}
                className="group relative overflow-hidden rounded-2xl"
              >
                <div className="absolute inset-0 bg-linear-to-r from-[#ff1a1a] via-[#ff0066] to-[#ff00ff] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-linear-to-r from-gray-900 to-gray-800 group-hover:from-transparent group-hover:to-transparent transition-all duration-300">
                  <div className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl border border-gray-800/50 group-hover:border-transparent transition-all duration-300">
                    <span className="font-bold text-lg">
                      Launch Creator Studio
                    </span>
                    <RocketLaunchIcon className="group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                </div>
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className={`group relative overflow-hidden rounded-3xl transition-all duration-500 hover:scale-[1.02] ${
                  post.isDraft
                    ? "border-yellow-500/30 hover:border-yellow-500/50"
                    : "border-gray-800/50 hover:border-[#ff0066]/30"
                }`}
              >
                {/* linear Border */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 ${
                    post.isDraft
                      ? "bg-linear-to-r from-yellow-500 to-orange-500"
                      : "bg-linear-to-r from-[#ff1a1a] via-[#ff0066] to-[#ff00ff]"
                  }`}
                ></div>

                <div className="bg-linear-to-br from-gray-900/60 to-gray-900/30 backdrop-blur-sm p-6">
                  {/* Post Header */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[#ff1a1a] via-[#ff0066] to-[#ff00ff] flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold text-lg">
                            {post.username[0].toUpperCase()}
                          </span>
                        </div>
                        {post.isDraft && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center">
                            <span className="text-xs font-bold text-gray-900">
                              D
                            </span>
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-100">
                          {post.username}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {getTimeAgo(
                            post.timestamp || new Date().toISOString()
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleBookmark(post.id)}
                        className="p-2 rounded-xl hover:bg-gray-800/50 transition-colors"
                      >
                        {post.isBookmarked ? (
                          <BookmarkIcon className="text-[#ff00ff]" />
                        ) : (
                          <BookmarkBorderIcon className="text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="mb-6">
                    <div className="bg-gray-900/50 rounded-2xl p-5 min-h-[140px] group-hover:bg-gray-900/70 transition-colors duration-300">
                      <p className="text-gray-200 leading-relaxed line-clamp-3">
                        {post.content}
                      </p>
                    </div>
                  </div>

                  {/* Post Stats */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-5">
                      <button
                        onClick={() => handleLike(post.id)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all duration-300 ${
                          post.isLiked
                            ? "bg-[#ff0066]/20 text-[#ff0066]"
                            : "text-gray-400 hover:text-[#ff0066] hover:bg-gray-800/50"
                        }`}
                      >
                        {post.isLiked ? (
                          <FavoriteIcon sx={{ fontSize: "20px" }} />
                        ) : (
                          <FavoriteBorderIcon sx={{ fontSize: "20px" }} />
                        )}
                        <span className="font-semibold">{post.likes || 0}</span>
                      </button>

                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-gray-400 hover:text-[#ff00ff] hover:bg-gray-800/50 transition-all duration-300">
                        <ChatBubbleOutlineIcon sx={{ fontSize: "20px" }} />
                        <span className="font-semibold">
                          {post.comments || 0}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-gray-400 hover:text-[#ff1a1a] hover:bg-gray-800/50 transition-all duration-300">
                        <ShareIcon sx={{ fontSize: "20px" }} />
                        <span className="font-semibold">
                          {post.shares || 0}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-900/50">
                      <VisibilityIcon
                        sx={{ fontSize: "18px", color: "#9ca3af" }}
                      />
                      <span className="font-semibold text-gray-300">
                        {post.views?.toLocaleString() || 0}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    {post.isDraft ? (
                      <>
                        <button
                          onClick={() => handleEdit(post)}
                          className="py-3 bg-linear-to-r from-gray-900/50 to-gray-900/20 hover:from-gray-800/50 rounded-xl text-gray-300 hover:text-gray-100 font-semibold transition-all duration-300"
                        >
                          Edit Draft
                        </button>
                        <button
                          onClick={() => handlePublishDraft(post.id)}
                          className="py-3 rounded-xl bg-linear-to-r from-[#ff1a1a] to-[#ff0066] text-white font-semibold hover:shadow-lg hover:shadow-[#ff0066]/20 transition-all duration-300"
                        >
                          Publish Now
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(post)}
                          className="py-3 bg-linear-to-r from-gray-900/50 to-gray-900/20 hover:from-gray-800/50 rounded-xl text-gray-300 hover:text-gray-100 font-semibold transition-all duration-300"
                        >
                          Edit Post
                        </button>
                        <button
                          onClick={() => handleDraft(post.id)}
                          className="py-3 rounded-xl bg-linear-to-r from-yellow-600/20 to-orange-600/20 text-yellow-400 hover:from-yellow-600/30 hover:to-orange-600/30 font-semibold transition-all duration-300"
                        >
                          Save Draft
                        </button>
                      </>
                    )}
                  </div>

                  {/* Delete Button */}
                  <div className="mt-4 pt-4 border-t border-gray-800/50">
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="w-full py-3 rounded-xl bg-linear-to-r from-red-600/10 to-pink-600/10 text-red-400 hover:from-red-600/20 hover:to-pink-600/20 font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <DeleteIcon sx={{ fontSize: "20px" }} />
                      Remove Content
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/*Dialog Modal */}
      {isDialogOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => {
              setIsDialogOpen(false);
              setEditingPost(null);
              setNewPost({ content: "" });
              setCharacterCount(0);
            }}
          />

          {/* Dialog Container */}
          <div className="flex min-h-full items-center justify-center p-4">
            {/* Dialog Content */}
            <div className="relative w-full max-w-2xl transform overflow-hidden rounded-3xl bg-linear-to-br from-gray-900 via-gray-900/95 to-gray-950 shadow-2xl shadow-black/50 transition-all border border-gray-800/50 backdrop-blur-xl">
              {/* linear Border Top */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#ff1a1a] via-[#ff0066] to-[#ff00ff]"></div>

              {/* Header */}
              <div className="p-6 border-b border-gray-800/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-[#ff1a1a] via-[#ff0066] to-[#ff00ff] flex items-center justify-center shadow-xl shadow-[#ff0066]/30">
                        <CreateIcon className="text-white text-2xl" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-linear-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg">
                        <span className="text-xs font-bold text-gray-900">
                          PRO
                        </span>
                      </div>
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-100">
                        {editingPost
                          ? "Edit Elite Content"
                          : "Create Premium Content"}
                      </h2>
                      <p className="text-gray-400 mt-2">
                        {editingPost
                          ? "Refine your masterpiece to perfection"
                          : "Craft content that will captivate the community"}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setIsDialogOpen(false);
                      setEditingPost(null);
                      setNewPost({ content: "" });
                      setCharacterCount(0);
                    }}
                    className="text-gray-400 hover:text-gray-100 hover:bg-gray-800/50 rounded-xl p-2.5 transition-all duration-300"
                  >
                    <CloseIcon />
                  </button>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-6">
                <div className="space-y-8">
                  {/* Author Info Card */}
                  <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-gray-900/60 to-gray-900/30 border border-gray-800/50 p-5">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#ff1a1a] via-[#ff0066] to-[#ff00ff] opacity-50"></div>
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-[#ff1a1a] via-[#ff0066] to-[#ff00ff] flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold text-2xl">
                            {username?.[0]?.toUpperCase() || "U"}
                          </span>
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-green-500 border-3 border-gray-900 flex items-center justify-center">
                          <svg
                            className="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <p className="font-bold text-gray-100 text-xl">
                          {username || "Elite Creator"}
                        </p>
                        <p className="text-gray-400 text-sm mt-1">
                          Publishing to global audience
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Content Editor */}
                  <div>
                    <label className="block text-lg font-bold text-gray-100 mb-4">
                      Your Content
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-0 bg-linear-to-r from-[#ff1a1a] via-[#ff0066] to-[#ff00ff] rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                      <textarea
                        name="content"
                        value={newPost.content}
                        onChange={handleInputChange}
                        placeholder="Share your thoughts, insights, or creative masterpiece with the world..."
                        className="relative w-full h-64 bg-gray-900/80 border border-gray-800/50 rounded-2xl p-6 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ff0066]/50 focus:border-transparent resize-none backdrop-blur-sm text-lg leading-relaxed"
                        required
                        maxLength={1000}
                      />
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <div className="text-sm text-gray-400">
                        Express yourself freely (max 1000 characters)
                      </div>
                      <div
                        className={`text-sm font-bold px-4 py-2 rounded-xl ${
                          characterCount > 900
                            ? "bg-linear-to-r from-[#ff1a1a]/20 to-[#ff0066]/20 text-[#ff1a1a]"
                            : characterCount > 800
                            ? "bg-linear-to-r from-[#ff0066]/20 to-[#ff00ff]/20 text-[#ff0066]"
                            : "bg-linear-to-b from-gray-900/60 to-gray-900/30 text-gray-400"
                        }`}
                      >
                        {characterCount}/1000
                      </div>
                    </div>
                  </div>

                  {/* Content Features */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-linear-to-b from-gray-900/60 to-gray-900/30 border border-gray-800/50">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-linear-to-br from-[#ff1a1a]/20 to-[#ff00ff]/20">
                          <svg
                            className="w-5 h-5 text-[#ff0066]"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.2 6.5 10.266a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-100">
                            Premium Visibility
                          </p>
                          <p className="text-xs text-gray-400">
                            Featured placement
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 rounded-2xl bg-linear-to-b from-gray-900/60 to-gray-900/30 border border-gray-800/50">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-linear-to-br from-[#ff1a1a]/20 to-[#ff00ff]/20">
                          <svg
                            className="w-5 h-5 text-[#ff0066]"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-100">
                            Elite Analytics
                          </p>
                          <p className="text-xs text-gray-400">
                            Performance insights
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-6 border-t border-gray-800/50">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <button
                    onClick={() => {
                      setIsDialogOpen(false);
                      setEditingPost(null);
                      setNewPost({ content: "" });
                      setCharacterCount(0);
                    }}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-linear-to-b from-gray-900/60 to-gray-900/30 border border-gray-800/50 text-gray-300 font-bold hover:text-gray-100 hover:border-[#ff0066]/30 transition-all duration-300"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handlePublish}
                    className="relative group overflow-hidden rounded-2xl w-full sm:w-auto"
                    disabled={!newPost.content.trim()}
                  >
                    <div className="absolute inset-0 bg-linear-to-r from-[#ff1a1a] via-[#ff0066] to-[#ff00ff] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div
                      className={`relative transition-all duration-300 ${
                        newPost.content.trim()
                          ? "bg-linear-to-r from-gray-900 to-gray-800 group-hover:from-transparent group-hover:to-transparent"
                          : "bg-linear-to-b from-gray-900/60 to-gray-900/30 opacity-50 cursor-not-allowed"
                      }`}
                    >
                      <div className="flex items-center justify-center gap-4 px-10 py-3.5 rounded-2xl border border-gray-800/50 group-hover:border-transparent transition-all duration-300">
                        <span className="font-bold text-lg">
                          {editingPost ? "Update Content" : "Publish Content"}
                        </span>
                        <RocketLaunchIcon className="group-hover:translate-x-2 transition-transform duration-300" />
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPosts;
