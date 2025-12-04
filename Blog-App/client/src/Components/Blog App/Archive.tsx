import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ArchiveIcon from "@mui/icons-material/Archive";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import SelectAllIcon from "@mui/icons-material/SelectAll";
import DeselectIcon from "@mui/icons-material/Deselect";
import StorageIcon from "@mui/icons-material/Storage";
import LockIcon from "@mui/icons-material/Lock";
import VerifiedIcon from "@mui/icons-material/Verified";
import ShieldIcon from "@mui/icons-material/Shield";
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
          <div className="w-16 h-16 rounded-full bg-linear-to-r from-[#ff1a1a]/20 to-[#ff0066]/20 flex items-center justify-center mx-auto mb-4">
            <DeleteIcon className="text-[#ff1a1a]" />
          </div>
          <p className="font-semibold text-gray-100 mb-3">
            Permanently delete this content?
          </p>
          <p className="text-sm text-gray-400 mb-6">
            This action cannot be undone. The content will be permanently
            removed from your archive.
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

                toast.success("Content permanently deleted", {
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
          background: "#0f172a",
          color: "#f1f5f9",
          border: "1px solid #1e293b",
        },
      });
      return;
    }

    toast(
      (t) => (
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-linear-to-r from-[#ff1a1a]/20 to-[#ff0066]/20 flex items-center justify-center mx-auto mb-4">
            <DeleteIcon className="text-[#ff1a1a]" />
          </div>
          <p className="font-semibold text-gray-100 mb-3">
            Delete {selectedPosts.length} items?
          </p>
          <p className="text-sm text-gray-400 mb-6">
            All selected content will be permanently removed from your archive.
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
                    background: "#0f172a",
                    color: "#f1f5f9",
                    border: "1px solid #1e293b",
                  },
                });

                setSelectedPosts([]);
                toast.dismiss(t.id);
              }}
              className="flex-1 px-4 py-2.5 bg-linear-to-r from-[#ff1a1a] to-[#ff0066] text-white rounded-xl font-semibold"
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
        background: "#0f172a",
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="relative mx-auto mb-6">
            <div className="w-16 h-16 rounded-full bg-linear-to-r from-[#ff1a1a] via-[#ff0066] to-[#ff00ff] animate-spin"></div>
            <div className="absolute inset-4 rounded-full"></div>
          </div>
          <p className="text-gray-400">Loading secure archive...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-gray-100 p-4 md:p-6 lg:p-8">
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
      </div>

      <div className="relative z-10 max-w-8xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-8">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-[#ff1a1a] via-[#ff0066] to-[#ff00ff] flex items-center justify-center shadow-xl shadow-[#ff0066]/30">
                  <ArchiveIcon className="text-white text-3xl" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-linear-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg">
                  <LockIcon sx={{ fontSize: "14px", color: "white" }} />
                </div>
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-100">
                  Secure Archive Vault
                </h1>
                <p className="text-gray-400 mt-2">
                  Protected storage for your unpublished content
                </p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="relative overflow-hidden bg-linear-to-br from-gray-900/60 to-gray-900/30 backdrop-blur-sm rounded-2xl p-5 border border-gray-800/50">
                <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#ff1a1a] via-[#ff0066] to-[#ff00ff]"></div>
                <p className="text-sm text-gray-400 mb-2">Total Items</p>
                <div className="flex items-center justify-between">
                  <p className="text-3xl font-bold bg-linear-to-r from-[#ff1a1a] to-[#ff0066] bg-clip-text text-transparent">
                    {draftPosts.length}
                  </p>
                  <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#ff1a1a]/20 to-[#ff00ff]/20 flex items-center justify-center">
                    <StorageIcon className="text-[#ff0066]" />
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden bg-linear-to-br from-gray-900/60 to-gray-900/30 backdrop-blur-sm rounded-2xl p-5 border border-gray-800/50">
                <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#ff0066] to-[#ff00ff]"></div>
                <p className="text-sm text-gray-400 mb-2">Selected</p>
                <div className="flex items-center justify-between">
                  <p className="text-3xl font-bold bg-linear-to-r from-[#ff0066] to-[#ff00ff] bg-clip-text text-transparent">
                    {selectedPosts.length}
                  </p>
                  <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#ff0066]/20 to-[#ff00ff]/20 flex items-center justify-center">
                    <VerifiedIcon className="text-[#ff00ff]" />
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden bg-linear-to-br from-gray-900/60 to-gray-900/30 backdrop-blur-sm rounded-2xl p-5 border border-gray-800/50">
                <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#ff1a1a] to-[#ff00ff]"></div>
                <p className="text-sm text-gray-400 mb-2">Protected</p>
                <div className="flex items-center justify-between">
                  <p className="text-3xl font-bold bg-linear-to-r from-[#ff1a1a] to-[#ff00ff] bg-clip-text text-transparent">
                    {draftPosts.length}
                  </p>
                  <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#ff1a1a]/20 to-[#ff00ff]/20 flex items-center justify-center">
                    <ShieldIcon className="text-[#ff0066]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Bulk Actions */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-8">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-xl">
              <div className="absolute inset-0 bg-linear-to-r from-[#ff1a1a] via-[#ff0066] to-[#ff00ff] rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search archived content..."
                className="relative w-full pl-12 pr-4 py-3.5 bg-gray-900/80 border border-gray-800/50 rounded-2xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ff0066]/50 focus:border-transparent backdrop-blur-sm"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleSelectAll}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                  selectedPosts.length === filteredPosts.length
                    ? "bg-linear-to-r from-[#ff0066]/20 to-[#ff00ff]/20 text-[#ff00ff] border border-[#ff00ff]/30"
                    : "bg-linear-to-b from-gray-900/60 to-gray-900/30 text-gray-300 border border-gray-800/50 hover:border-[#ff0066]/30"
                }`}
              >
                {selectedPosts.length === filteredPosts.length ? (
                  <>
                    <DeselectIcon sx={{ fontSize: "20px" }} />
                    Deselect All
                  </>
                ) : (
                  <>
                    <SelectAllIcon sx={{ fontSize: "20px" }} />
                    Select All
                  </>
                )}
              </button>

              {selectedPosts.length > 0 && (
                <button
                  onClick={handleBulkDelete}
                  className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-linear-to-r from-[#ff1a1a] to-[#ff0066] text-white font-semibold hover:shadow-lg hover:shadow-[#ff0066]/20 transition-all duration-300"
                >
                  <DeleteIcon sx={{ fontSize: "20px" }} />
                  Delete Selected ({selectedPosts.length})
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        {filteredPosts.length === 0 ? (
          <div className="relative overflow-hidden bg-linear-to-br from-gray-900/40 to-gray-900/20 backdrop-blur-xl rounded-3xl p-12 text-center border border-gray-800/50 shadow-2xl shadow-black/30">
            <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#ff1a1a] via-[#ff0066] to-[#ff00ff]"></div>
            <div className="max-w-md mx-auto">
              <div className="relative inline-block mb-8">
                <div className="w-32 h-32 rounded-full bg-linear-to-br from-[#ff1a1a]/10 via-[#ff0066]/10 to-[#ff00ff]/10 flex items-center justify-center mx-auto">
                  <ArchiveIcon sx={{ fontSize: "64px", color: "#4b5563" }} />
                </div>
                <div className="absolute -top-2 -right-2 w-12 h-12 rounded-full bg-linear-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg">
                  <LockIcon sx={{ fontSize: "18px", color: "white" }} />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-100 mb-4">
                Secure Vault Empty
              </h3>
              <p className="text-gray-400 mb-8 text-lg">
                Your protected archive is currently empty. Content saved as
                drafts will be securely stored here.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="p-4 rounded-2xl bg-linear-to-b from-gray-900/60 to-gray-900/30 border border-gray-800/50">
                  <p className="text-sm text-gray-400 mb-1">Security Level</p>
                  <p className="text-lg font-bold text-[#ff0066]">
                    Military-Grade
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-linear-to-b from-gray-900/60 to-gray-900/30 border border-gray-800/50">
                  <p className="text-sm text-gray-400 mb-1">Encryption</p>
                  <p className="text-lg font-bold text-[#ff00ff]">AES-256</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Archive Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => {
                const isSelected = selectedPosts.includes(post.id);

                return (
                  <div
                    key={post.id}
                    className={`group relative overflow-hidden rounded-3xl transition-all duration-500 hover:scale-[1.02] ${
                      isSelected
                        ? "border-[#ff0066] ring-2 ring-[#ff0066]/50"
                        : "border-gray-800/50 hover:border-[#ff0066]/30"
                    }`}
                  >
                    {/* linear Border */}
                    <div
                      className={`absolute top-0 left-0 right-0 h-1 ${
                        isSelected
                          ? "bg-linear-to-r from-[#ff1a1a] to-[#ff0066]"
                          : "bg-linear-to-r from-gray-800/50 to-gray-800/50 group-hover:from-[#ff1a1a] group-hover:via-[#ff0066] group-hover:to-[#ff00ff]"
                      }`}
                    ></div>

                    <div className="bg-linear-to-br from-gray-900/60 to-gray-900/30 backdrop-blur-sm p-6">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-5">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[#ff1a1a] via-[#ff0066] to-[#ff00ff] flex items-center justify-center shadow-lg">
                              <span className="text-white font-bold text-lg">
                                {username ? username[0].toUpperCase() : "A"}
                              </span>
                            </div>
                            {isSelected && (
                              <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#ff0066] border-2 border-gray-900 flex items-center justify-center">
                                <span className="text-xs font-bold">✓</span>
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-gray-100">
                              {username || "Archived"}
                            </p>
                            <p className="text-sm text-gray-400">
                              {post.timestamp
                                ? formatDate(post.timestamp)
                                : "Recently"}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => handleSelectPost(post.id)}
                          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                            isSelected
                              ? "bg-linear-to-r from-[#ff1a1a] to-[#ff0066] text-white"
                              : "bg-gray-900/50 text-gray-400 hover:bg-gray-800/50"
                          }`}
                          title={isSelected ? "Deselect" : "Select"}
                        >
                          {isSelected ? "✓" : "○"}
                        </button>
                      </div>

                      {/* Post Content Preview */}
                      <div className="mb-6">
                        <div className="bg-gray-900/50 rounded-2xl p-5 min-h-[140px] group-hover:bg-gray-900/70 transition-colors duration-300">
                          <p className="text-gray-200 whitespace-pre-wrap line-clamp-3">
                            {post.content}
                          </p>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1 text-gray-400">
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                            <span className="text-sm font-semibold">
                              {post.likes || 0}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-400">
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                            </svg>
                            <span className="text-sm font-semibold">
                              {post.views?.toLocaleString() || 0}
                            </span>
                          </div>
                        </div>

                        <div className="px-3 py-1.5 rounded-xl bg-linear-to-r from-gray-900/50 to-gray-900/20 text-xs text-gray-400">
                          Draft
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => handleRestore(post.id)}
                          className="group/restore py-3 rounded-xl bg-linear-to-r from-gray-900/50 to-gray-900/20 hover:from-gray-800/50 border border-gray-800/50 hover:border-[#ff00ff]/30 transition-all duration-300"
                        >
                          <div className="flex items-center justify-center gap-2">
                            <RestoreFromTrashIcon
                              className="text-gray-400 group-hover/restore:text-[#ff00ff] transition-colors"
                              sx={{ fontSize: "18px" }}
                            />
                            <span className="font-semibold text-gray-300 group-hover/restore:text-[#ff00ff] transition-colors">
                              Restore
                            </span>
                          </div>
                        </button>

                        <button
                          onClick={() => handleDelete(post.id)}
                          className="py-3 rounded-xl bg-linear-to-r from-red-600/10 to-pink-600/10 text-red-400 hover:from-red-600/20 hover:to-pink-600/20 font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <DeleteIcon sx={{ fontSize: "20px" }} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer Stats */}
            <div className="mt-10 pt-8 border-t border-gray-800/50">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-[#ff1a1a]"></div>
                    <span className="text-gray-400">
                      {filteredPosts.length} archived items
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-[#ff0066]"></div>
                    <span className="text-gray-400">
                      {selectedPosts.length} selected for action
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-[#ff00ff]"></div>
                    <span className="text-gray-400">
                      Protected with AES-256 encryption
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-sm text-gray-400">
                    Storage: {draftPosts.length}/1000 items
                  </div>
                  <div className="w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-[#ff1a1a] via-[#ff0066] to-[#ff00ff] rounded-full"
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
