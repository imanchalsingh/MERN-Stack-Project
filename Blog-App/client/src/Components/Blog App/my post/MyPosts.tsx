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
import PersonIcon from "@mui/icons-material/Person";
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
          background: "#0a0f1e",
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
          background: "#0a0f1e",
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
          background: "#0a0f1e",
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
          background: "#0a0f1e",
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
          background: "#0a0f1e",
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
          <p className="font-semibold text-gray-100 mb-2">Delete this post?</p>
          <p className="text-sm text-gray-400 mb-4">
            This action cannot be undone.
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
                const updatedPosts = posts.filter((post) => post.id !== id);
                setPosts(updatedPosts);
                localStorage.setItem("posts", JSON.stringify(updatedPosts));
                toast.success("Post deleted successfully", {
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
        background: "#0a0f1e",
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
        background: "#0a0f1e",
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
      <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-950 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="relative mx-auto mb-4">
            <div className="w-12 h-12 rounded-full bg-linear-to-r from-emerald-500 to-yellow-500 animate-spin"></div>
            <div className="absolute inset-3 bg-gray-950 rounded-full"></div>
          </div>
          <p className="text-gray-400">Loading your content...</p>
        </div>
      </div>
    );
  }

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
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-emerald-500 to-yellow-500 flex items-center justify-center shadow-lg">
                <DashboardIcon className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-100">
                  My Posts
                </h1>
                <p className="text-gray-400 text-sm">
                  Manage and track your content
                </p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              <div className="relative overflow-hidden bg-gray-900/80 backdrop-blur-sm rounded-xl p-4 border border-gray-800/50">
                {/* <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-emerald-500 via-yellow-500 to-emerald-400"></div> */}
                <p className="text-xs text-gray-400 mb-2">Total Posts</p>
                <div className="flex items-center justify-between">
                  <p className="text-xl font-bold text-emerald-400">
                    {posts.length}
                  </p>
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                    <DescriptionIcon className="text-emerald-400" />
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden bg-gray-900/80 backdrop-blur-sm rounded-xl p-4 border border-gray-800/50">
                {/* <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-emerald-500 via-yellow-500 to-emerald-400"></div> */}
                <p className="text-xs text-gray-400 mb-2">Published</p>
                <div className="flex items-center justify-between">
                  <p className="text-xl font-bold text-yellow-400">
                    {posts.filter((p) => !p.isDraft).length}
                  </p>
                  <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                    <VisibilityIcon className="text-yellow-400" />
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden bg-gray-900/80 backdrop-blur-sm rounded-xl p-4 border border-gray-800/50">
                {/* <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-emerald-500 via-yellow-500 to-emerald-400"></div> */}
                <p className="text-xs text-gray-400 mb-2">Total Views</p>
                <div className="flex items-center justify-between">
                  <p className="text-xl font-bold text-emerald-400">
                    {posts
                      .reduce((sum, post) => sum + (post.views || 0), 0)
                      .toLocaleString()}
                  </p>
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                    <TrendingUpIcon className="text-emerald-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Create Post Button and Filters */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-6">
            <button
              onClick={() => {
                setEditingPost(null);
                setNewPost({ content: "" });
                setCharacterCount(0);
                setIsDialogOpen(true);
              }}
              className="px-5 py-3 bg-linear-to-r from-emerald-600 to-yellow-600 hover:from-emerald-500 hover:to-yellow-500 text-white font-semibold rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <CreateIcon />
              Create New Post
            </button>

            {/* Filter Buttons */}
            <div className="flex items-center gap-2 bg-gray-900/80 backdrop-blur-sm p-1.5 rounded-xl border border-gray-800/50">
              {["all", "published", "drafts"].map((filterType) => (
                <button
                  key={filterType}
                  onClick={() =>
                    setFilter(filterType as "all" | "published" | "drafts")
                  }
                  className={`px-4 py-2 rounded-lg font-medium capitalize transition-all duration-300 ${
                    filter === filterType
                      ? "bg-linear-to-r from-emerald-600 to-yellow-600 text-white shadow"
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
          <div className="relative overflow-hidden bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 text-center border border-gray-800/50">
            {/* <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-emerald-500 via-yellow-500 to-emerald-400"></div> */}
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
                <CreateIcon sx={{ fontSize: "40px", color: "#4b5563" }} />
              </div>
              <h3 className="text-xl font-bold text-gray-100 mb-3">
                {filter === "drafts" ? "No Drafts Found" : "Ready to Create?"}
              </h3>
              <p className="text-gray-400 mb-6">
                {filter === "drafts"
                  ? "Drafts will appear here when you save content for later."
                  : "Create your first post to get started!"}
              </p>
              <button
                onClick={() => {
                  setEditingPost(null);
                  setNewPost({ content: "" });
                  setCharacterCount(0);
                  setIsDialogOpen(true);
                }}
                className="px-5 py-3 bg-linear-to-r from-emerald-600 to-yellow-600 hover:from-emerald-500 hover:to-yellow-500 text-white font-semibold rounded-xl transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Create First Post
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className={`group relative overflow-hidden rounded-xl transition-all duration-300 hover:border-emerald-500/30 ${
                  post.isDraft
                    ? "border-yellow-500/30"
                    : "border-gray-800/50"
                }`}
              >
                {/* Accent Border */}
                {/* <div
                  className={`absolute top-0 left-0 right-0 h-1 ${
                    post.isDraft
                      ? "bg-linear-to-r from-yellow-500 to-yellow-600"
                      : "bg-linear-to-r from-emerald-500 to-yellow-500"
                  }`}
                ></div> */}

                <div className="bg-gray-900/80 p-4">
                  {/* Post Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-lg bg-linear-to-br from-emerald-500 to-yellow-500 flex items-center justify-center shadow">
                          <PersonIcon className="text-white text-sm" />
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
                        <h3 className="font-bold text-gray-100 text-sm">
                          {post.username}
                        </h3>
                        <p className="text-xs text-gray-400">
                          {getTimeAgo(
                            post.timestamp || new Date().toISOString()
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Bookmark Button */}
                    <button
                      onClick={() => handleBookmark(post.id)}
                      className="p-1.5 rounded-lg hover:bg-gray-800/50 transition-colors"
                    >
                      {post.isBookmarked ? (
                        <BookmarkIcon className="text-emerald-400" />
                      ) : (
                        <BookmarkBorderIcon className="text-gray-400" />
                      )}
                    </button>
                  </div>

                  {/* Post Content */}
                  <div className="mb-4">
                    <div className="bg-gray-900/50 rounded-lg p-3 min-h-[120px] group-hover:bg-gray-900/70 transition-colors duration-300">
                      <p className="text-gray-200 text-sm leading-relaxed line-clamp-3">
                        {post.content}
                      </p>
                    </div>
                  </div>

                  {/* Post Stats */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleLike(post.id)}
                        className={`flex items-center gap-2 px-2 py-1.5 rounded-lg transition-all duration-300 ${
                          post.isLiked
                            ? "bg-linear-to-r from-emerald-500/20 to-yellow-500/20 text-emerald-400"
                            : "text-gray-400 hover:text-emerald-400 hover:bg-gray-800/50"
                        }`}
                      >
                        {post.isLiked ? (
                          <FavoriteIcon sx={{ fontSize: "18px" }} />
                        ) : (
                          <FavoriteBorderIcon sx={{ fontSize: "18px" }} />
                        )}
                        <span className="font-medium">{post.likes || 0}</span>
                      </button>

                      <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-gray-400 hover:text-yellow-400 hover:bg-gray-800/50 transition-all duration-300">
                        <ChatBubbleOutlineIcon sx={{ fontSize: "18px" }} />
                        <span className="font-medium">{post.comments || 0}</span>
                      </div>

                      <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-gray-400 hover:text-emerald-400 hover:bg-gray-800/50 transition-all duration-300">
                        <ShareIcon sx={{ fontSize: "18px" }} />
                        <span className="font-medium">{post.shares || 0}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-gray-900/50">
                      <VisibilityIcon
                        sx={{ fontSize: "16px", color: "#9ca3af" }}
                      />
                      <span className="font-medium text-gray-300">
                        {post.views?.toLocaleString() || 0}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    {post.isDraft ? (
                      <>
                        <button
                          onClick={() => handleEdit(post)}
                          className="py-2 bg-gray-900/60 hover:bg-gray-800/60 rounded-lg text-gray-300 hover:text-gray-100 font-medium transition-all duration-300"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handlePublishDraft(post.id)}
                          className="py-2 rounded-lg bg-linear-to-r from-emerald-600 to-yellow-600 text-white font-medium hover:shadow transition-all duration-300"
                        >
                          Publish
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(post)}
                          className="py-2 bg-gray-900/60 hover:bg-gray-800/60 rounded-lg text-gray-300 hover:text-gray-100 font-medium transition-all duration-300"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDraft(post.id)}
                          className="py-2 rounded-lg bg-linear-to-r from-yellow-500/10 to-yellow-600/10 text-yellow-400 hover:from-yellow-500/20 hover:to-yellow-600/20 font-medium transition-all duration-300"
                        >
                          Save Draft
                        </button>
                      </>
                    )}
                  </div>

                  {/* Delete Button */}
                  <div className="mt-3 pt-3 border-t border-gray-800/50">
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="w-full py-2 rounded-lg bg-linear-to-r from-emerald-500/10 to-yellow-500/10 text-emerald-400 hover:from-emerald-500/20 hover:to-yellow-500/20 font-medium transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <DeleteIcon sx={{ fontSize: "16px" }} />
                      Delete
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
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
            <div className="relative w-full max-w-2xl transform overflow-hidden rounded-2xl bg-gray-900 shadow-lg border border-gray-800/50">
              {/* Accent Border Top */}
              {/* <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-emerald-500 via-yellow-500 to-emerald-400"></div> */}

              {/* Header */}
              <div className="p-6 border-b border-gray-800/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-linear-to-br from-emerald-500 to-yellow-500 flex items-center justify-center shadow">
                      <CreateIcon className="text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-100">
                        {editingPost ? "Edit Post" : "Create Post"}
                      </h2>
                      <p className="text-gray-400 text-sm mt-1">
                        {editingPost
                          ? "Update your content"
                          : "Share your thoughts with the community"}
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
                    className="text-gray-400 hover:text-gray-100 hover:bg-gray-800/50 rounded-lg p-2 transition-all duration-300"
                  >
                    <CloseIcon />
                  </button>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-6">
                <div className="space-y-6">
                  {/* Author Info */}
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-900/60 border border-gray-800/50">
                    <div className="w-10 h-10 rounded-lg bg-linear-to-br from-emerald-500 to-yellow-500 flex items-center justify-center shadow">
                      <PersonIcon className="text-white text-sm" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-100">
                        {username || "Creator"}
                      </p>
                      <p className="text-gray-400 text-sm">
                        Publishing to community
                      </p>
                    </div>
                  </div>

                  {/* Content Editor */}
                  <div>
                    <label className="block font-medium text-gray-100 mb-3">
                      Post Content
                    </label>
                    <textarea
                      name="content"
                      value={newPost.content}
                      onChange={handleInputChange}
                      placeholder="What's on your mind?..."
                      className="w-full h-48 bg-gray-900/60 border border-gray-800/50 rounded-xl p-4 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent resize-none"
                      required
                      maxLength={1000}
                    />
                    <div className="flex justify-between items-center mt-3">
                      <div className="text-sm text-gray-400">
                        Max 1000 characters
                      </div>
                      <div
                        className={`text-sm font-medium px-3 py-1.5 rounded-lg ${
                          characterCount > 900
                            ? "bg-linear-to-r from-emerald-500/10 to-yellow-500/10 text-emerald-400"
                            : characterCount > 800
                            ? "bg-linear-to-r from-yellow-500/10 to-yellow-600/10 text-yellow-400"
                            : "bg-gray-900/60 text-gray-400"
                        }`}
                      >
                        {characterCount}/1000
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
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gray-900/60 hover:bg-gray-800/60 text-gray-300 font-medium transition-all duration-300"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handlePublish}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-linear-to-r from-emerald-600 to-yellow-600 text-white font-medium hover:from-emerald-500 hover:to-yellow-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!newPost.content.trim()}
                  >
                    {editingPost ? "Update Post" : "Publish Post"}
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