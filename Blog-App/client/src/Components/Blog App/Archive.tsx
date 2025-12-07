import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ArchiveIcon from "@mui/icons-material/Archive";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import SelectAllIcon from "@mui/icons-material/SelectAll";
import DeselectIcon from "@mui/icons-material/Deselect";
import SearchIcon from "@mui/icons-material/Search";
import StorageIcon from "@mui/icons-material/Storage";
import VerifiedIcon from "@mui/icons-material/Verified";
import ShieldIcon from "@mui/icons-material/Shield";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { toast, Toaster } from "react-hot-toast";

// Define the structure of a Post
interface Post {
  id: number;
  content: string;
  isDraft: boolean;
  timestamp?: string;
  likes?: number;
  views?: number;
}

const Archive: React.FC = () => {
  const [draftPosts, setDraftPosts] = useState<Post[]>([]);
  const [username, setUsername] = useState<string>("");
  const [selectedPosts, setSelectedPosts] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  // Fetch draft posts from localStorage
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      const storedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
      const archive = storedPosts
        .filter((post: Post) => post.isDraft)
        .map((post: Post) => ({
          ...post,
          timestamp: post.timestamp || new Date().toISOString(),
          likes: post.likes || Math.floor(Math.random() * 100) + 10,
          views: post.views || Math.floor(Math.random() * 500) + 100,
        }));
      setDraftPosts(archive);
      setIsLoading(false);
    }, 500);
  }, []);

  // Filter posts based on search query
  const filteredPosts = draftPosts.filter((post) =>
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle deleting draft posts
  const handleDelete = (id: number) => {
    toast(
      (t) => (
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
            <DeleteIcon className="text-emerald-400" />
          </div>
          <p className="font-semibold text-gray-100 mb-2">
            Delete this content?
          </p>
          <p className="text-sm text-gray-400 mb-6">
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
                const updatedPosts = draftPosts.filter(
                  (post) => post.id !== id
                );
                setDraftPosts(updatedPosts);

                // Update the posts in localStorage
                const allPosts = JSON.parse(
                  localStorage.getItem("posts") || "[]"
                );
                const newPosts = allPosts.filter(
                  (post: Post) => post.id !== id
                );
                localStorage.setItem("posts", JSON.stringify(newPosts));

                toast.success("Content deleted", {
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
        duration: 6000,
      }
    );
  };

  // Handle bulk delete
  const handleBulkDelete = () => {
    if (selectedPosts.length === 0) {
      toast.error("Select content to delete", {
        icon: "⚠️",
        style: {
          background: "#0a0f1e",
          color: "#f1f5f9",
          border: "1px solid #1e293b",
        },
      });
      return;
    }

    toast(
      (t) => (
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
            <DeleteIcon className="text-emerald-400" />
          </div>
          <p className="font-semibold text-gray-100 mb-2">
            Delete {selectedPosts.length} items?
          </p>
          <p className="text-sm text-gray-400 mb-6">
            All selected content will be removed.
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
                const updatedPosts = draftPosts.filter(
                  (post) => !selectedPosts.includes(post.id)
                );
                setDraftPosts(updatedPosts);

                // Update localStorage
                const allPosts = JSON.parse(
                  localStorage.getItem("posts") || "[]"
                );
                const newPosts = allPosts.filter(
                  (post: Post) => !selectedPosts.includes(post.id)
                );
                localStorage.setItem("posts", JSON.stringify(newPosts));

                toast.success(`Deleted ${selectedPosts.length} items`, {
                  icon: "🗑️",
                  style: {
                    background: "#0a0f1e",
                    color: "#f1f5f9",
                    border: "1px solid #1e293b",
                  },
                });

                setSelectedPosts([]);
                toast.dismiss(t.id);
              }}
              className="flex-1 px-4 py-2 bg-linear-to-r from-emerald-600 to-yellow-600 text-white rounded-xl font-medium"
            >
              Delete All
            </button>
          </div>
        </div>
      ),
      {
        duration: 6000,
      }
    );
  };

  // Handle restore post
  const handleRestore = (id: number) => {
    const allPosts = JSON.parse(localStorage.getItem("posts") || "[]");
    const updatedPosts = allPosts.map((post: Post) =>
      post.id === id ? { ...post, isDraft: false } : post
    );
    localStorage.setItem("posts", JSON.stringify(updatedPosts));

    setDraftPosts(draftPosts.filter((post) => post.id !== id));

    toast.success("Content restored successfully", {
      icon: "↩️",
      style: {
        background: "#0a0f1e",
        color: "#f1f5f9",
        border: "1px solid #1e293b",
      },
    });
  };

  // Handle select/deselect post
  const handleSelectPost = (id: number) => {
    if (selectedPosts.includes(id)) {
      setSelectedPosts(selectedPosts.filter((postId) => postId !== id));
    } else {
      setSelectedPosts([...selectedPosts, id]);
    }
  };

  // Handle select all posts
  const handleSelectAll = () => {
    if (selectedPosts.length === filteredPosts.length) {
      setSelectedPosts([]);
    } else {
      setSelectedPosts(filteredPosts.map((post) => post.id));
    }
  };

  // Format date
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-950 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="relative mx-auto mb-4">
            <div className="w-12 h-12 rounded-full bg-linear-to-r from-emerald-500 to-yellow-500 animate-spin"></div>
            <div className="absolute inset-3 bg-gray-950 rounded-full"></div>
          </div>
          <p className="text-gray-400">Loading archive...</p>
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
                <ArchiveIcon className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-100">
                  Archive
                </h1>
                <p className="text-gray-400 text-sm">
                  Your saved draft content
                </p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              <div className="relative overflow-hidden bg-gray-900/80 backdrop-blur-sm rounded-xl p-4 border border-gray-800/50">
                {/* <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-emerald-500 via-yellow-500 to-emerald-400"></div> */}
                <p className="text-xs text-gray-400 mb-2">Total Items</p>
                <div className="flex items-center justify-between">
                  <p className="text-xl font-bold text-emerald-400">
                    {draftPosts.length}
                  </p>
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                    <StorageIcon className="text-emerald-400" />
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden bg-gray-900/80 backdrop-blur-sm rounded-xl p-4 border border-gray-800/50">
                {/* <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-emerald-500 via-yellow-500 to-emerald-400"></div> */}
                <p className="text-xs text-gray-400 mb-2">Selected</p>
                <div className="flex items-center justify-between">
                  <p className="text-xl font-bold text-yellow-400">
                    {selectedPosts.length}
                  </p>
                  <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                    <VerifiedIcon className="text-yellow-400" />
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden bg-gray-900/80 backdrop-blur-sm rounded-xl p-4 border border-gray-800/50">
                {/* <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-emerald-500 via-yellow-500 to-emerald-400"></div> */}
                <p className="text-xs text-gray-400 mb-2">Protected</p>
                <div className="flex items-center justify-between">
                  <p className="text-xl font-bold text-emerald-400">
                    {draftPosts.length}
                  </p>
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                    <ShieldIcon className="text-emerald-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Bulk Actions */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-6">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-xl">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search archive..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-900/80 border border-gray-800/50 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <SearchIcon className="w-5 h-5 text-gray-500" />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleSelectAll}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  selectedPosts.length === filteredPosts.length
                    ? "bg-linear-to-r from-emerald-500/10 to-yellow-500/10 text-emerald-400 border border-emerald-500/30"
                    : "bg-gray-900/80 text-gray-300 border border-gray-800/50 hover:border-emerald-500/30"
                }`}
              >
                {selectedPosts.length === filteredPosts.length ? (
                  <>
                    <DeselectIcon sx={{ fontSize: "18px" }} />
                    Deselect All
                  </>
                ) : (
                  <>
                    <SelectAllIcon sx={{ fontSize: "18px" }} />
                    Select All
                  </>
                )}
              </button>

              {selectedPosts.length > 0 && (
                <button
                  onClick={handleBulkDelete}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-linear-to-r from-emerald-600 to-yellow-600 text-white font-medium hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300"
                >
                  <DeleteIcon sx={{ fontSize: "18px" }} />
                  Delete Selected
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        {filteredPosts.length === 0 ? (
          <div className="relative overflow-hidden bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 text-center border border-gray-800/50">
            {/* <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-emerald-500 via-yellow-500 to-emerald-400"></div> */}
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
                <ArchiveIcon sx={{ fontSize: "48px", color: "#4b5563" }} />
              </div>
              <h3 className="text-xl font-bold text-gray-100 mb-3">
                Archive Empty
              </h3>
              <p className="text-gray-400 mb-6">
                Your draft content will appear here when saved.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <div className="p-3 rounded-xl bg-gray-900/60 border border-gray-800/50">
                  <p className="text-xs text-gray-400 mb-1">Security</p>
                  <p className="text-sm font-bold text-emerald-400">
                    Protected
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-gray-900/60 border border-gray-800/50">
                  <p className="text-xs text-gray-400 mb-1">Storage</p>
                  <p className="text-sm font-bold text-yellow-400">Secure</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Archive Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPosts.map((post) => {
                const isSelected = selectedPosts.includes(post.id);

                return (
                  <div
                    key={post.id}
                    className={`group relative overflow-hidden rounded-xl transition-all duration-300 hover:border-emerald-500/30 ${
                      isSelected
                        ? "border-emerald-500 ring-1 ring-emerald-500/50"
                        : "border-gray-800/50"
                    }`}
                  >
                    {/* Accent Border */}
                    {/* <div
                      className={`absolute top-0 left-0 right-0 h-1 ${
                        isSelected
                          ? "bg-linear-to-r from-emerald-500 to-yellow-500"
                          : "bg-linear-to-r from-emerald-500 via-yellow-500 to-emerald-400"
                      }`}
                    ></div> */}

                    <div className="bg-gray-900/80 p-4">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="w-10 h-10 rounded-lg bg-linear-to-br from-emerald-500 to-yellow-500 flex items-center justify-center shadow">
                              <PersonIcon className="text-white text-sm" />
                            </div>
                            {isSelected && (
                              <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-gray-900 flex items-center justify-center">
                                <span className="text-xs font-bold">✓</span>
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-gray-100 text-sm">
                              {username || "Archive"}
                            </p>
                            <p className="text-xs text-gray-400">
                              {post.timestamp
                                ? formatDate(post.timestamp)
                                : "Recently"}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => handleSelectPost(post.id)}
                          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                            isSelected
                              ? "bg-linear-to-r from-emerald-500 to-yellow-500 text-white"
                              : "bg-gray-900/50 text-gray-400 hover:bg-gray-800/50"
                          }`}
                          title={isSelected ? "Deselect" : "Select"}
                        >
                          {isSelected ? "✓" : "○"}
                        </button>
                      </div>

                      {/* Post Content Preview */}
                      <div className="mb-4">
                        <div className="bg-gray-900/50 rounded-lg p-3 min-h-[100px] group-hover:bg-gray-900/70 transition-colors duration-300">
                          <p className="text-gray-200 text-sm whitespace-pre-wrap line-clamp-3">
                            {post.content}
                          </p>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1 text-gray-400">
                            <FavoriteIcon className="w-3 h-3" />
                            <span className="text-xs font-medium">
                              {post.likes || 0}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-400">
                            <VisibilityIcon className="w-3 h-3" />
                            <span className="text-xs font-medium">
                              {post.views?.toLocaleString() || 0}
                            </span>
                          </div>
                        </div>

                        <div className="px-2 py-1 rounded-lg bg-linear-to-r from-emerald-500/10 to-yellow-500/10 text-xs text-emerald-400">
                          Draft
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => handleRestore(post.id)}
                          className="py-2 rounded-lg bg-gray-900/60 hover:bg-gray-800/60 border border-gray-800/50 text-gray-300 hover:text-emerald-400 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <RestoreFromTrashIcon sx={{ fontSize: "16px" }} />
                          <span className="text-sm font-medium">Restore</span>
                        </button>

                        <button
                          onClick={() => handleDelete(post.id)}
                          className="py-2 rounded-lg bg-linear-to-r from-emerald-500/10 to-yellow-500/10 text-emerald-400 hover:from-emerald-500/20 hover:to-yellow-500/20 font-medium transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <DeleteIcon sx={{ fontSize: "16px" }} />
                          <span className="text-sm">Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer Stats */}
            <div className="mt-6 pt-6 border-t border-gray-800/50">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <span className="text-sm text-gray-400">
                      {filteredPosts.length} archived items
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <span className="text-sm text-gray-400">
                      {selectedPosts.length} selected
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-sm text-gray-400">
                    Storage: {draftPosts.length}/1000 items
                  </div>
                  <div className="w-24 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-emerald-500 to-yellow-500 rounded-full"
                      style={{
                        width: `${Math.min(
                          (draftPosts.length / 1000) * 100,
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Archive;
