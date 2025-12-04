import React, { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ShareIcon from "@mui/icons-material/Share";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VerifiedIcon from "@mui/icons-material/Verified";
import ArticleIcon from "@mui/icons-material/Article";
import BoltIcon from "@mui/icons-material/Bolt";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

const ArticlePage: React.FC = () => {
  const navigate = useNavigate();
  const [comments, setComments] = useState<string[]>([
    "Great insights! The AI integration section was particularly enlightening.",
    "Looking forward to trying out these trends in my next project.",
    "Excellent overview of the current web development landscape.",
  ]);
  const [newComment, setNewComment] = useState<string>("");
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(428);
  const [bookmarks, setBookmarks] = useState<number>(127);
  const [views] = useState<number>(2480);
  const [shares, setShares] = useState<number>(156);

  // Sample related articles data
  const relatedArticles = [
    {
      id: 1,
      title: "Mastering Modern React Patterns",
      author: "Sarah Chen",
      readTime: "8 min read",
      likes: 312,
      views: "2.1K",
      category: "Technology",
    },
    {
      id: 2,
      title: "Advanced TypeScript Techniques",
      author: "Michael Rodriguez",
      readTime: "12 min read",
      likes: 456,
      views: "3.4K",
      category: "Programming",
    },
    {
      id: 3,
      title: "Building Scalable Web Applications",
      author: "Emma Wilson",
      readTime: "15 min read",
      likes: 289,
      views: "4.2K",
      category: "Development",
    },
    {
      id: 4,
      title: "AI-Powered Development Tools",
      author: "David Kim",
      readTime: "6 min read",
      likes: 543,
      views: "5.7K",
      category: "AI",
    },
  ];

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment("");
      toast.success("Comment published successfully!", {
        icon: "💬",
        style: {
          background: "#0f172a",
          color: "#f1f5f9",
          border: "1px solid #1e293b",
        },
      });
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
    toast.success(isLiked ? "Removed from likes" : "Article liked!", {
      icon: isLiked ? "❤️" : "🔥",
      style: {
        background: "#0f172a",
        color: "#f1f5f9",
        border: "1px solid #1e293b",
      },
    });
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    setBookmarks(isBookmarked ? bookmarks - 1 : bookmarks + 1);
    toast.success(
      isBookmarked ? "Removed from bookmarks" : "Article bookmarked",
      {
        icon: isBookmarked ? "📌" : "🔖",
        style: {
          background: "#0f172a",
          color: "#f1f5f9",
          border: "1px solid #1e293b",
        },
      }
    );
  };

  const handleShare = () => {
    setShares(shares + 1);
    toast.success("Article shared!", {
      icon: "📤",
      style: {
        background: "#0f172a",
        color: "#f1f5f9",
        border: "1px solid #1e293b",
      },
    });
  };

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
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-[#ff1a1a] rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-[#ff00ff] rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute -bottom-40 left-1/3 w-80 h-80 bg-[#ff0066] rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-3 mb-10 transition-all duration-300"
        >
          <div className="p-2.5 rounded-xl bg-linear-to-br from-gray-900/50 to-gray-900/20 border border-gray-800/50 group-hover:border-[#ff0066]/30 group-hover:scale-105 transition-all duration-300">
            <ArrowBackIcon className="text-gray-400 group-hover:text-[#ff0066] transition-colors" />
          </div>
          <div className="text-left">
            <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
              Return to
            </p>
            <p className="font-semibold bg-linear-to-r from-[#ff0066] to-[#ff00ff] bg-clip-text text-transparent">
              Elite Articles
            </p>
          </div>
        </button>

        {/* Article Header */}
        <header className="relative overflow-hidden rounded-3xl mb-12">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-gray-950/90 to-gray-950 z-10"></div>
            <img
              src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop"
              alt="Article Cover"
              className="w-full h-full object-cover opacity-30"
            />
          </div>

          <div className="relative z-20 p-8 lg:p-12">
            <div className="max-w-4xl">
              {/* Category and Stats */}
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <div className="px-4 py-2 rounded-xl bg-linear-to-r from-[#ff1a1a]/20 via-[#ff0066]/20 to-[#ff00ff]/20 backdrop-blur-sm border border-[#ff0066]/30">
                  <span className="font-semibold bg-linear-to-r from-[#ff1a1a] via-[#ff0066] to-[#ff00ff] bg-clip-text text-transparent">
                    TECHNOLOGY
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <AccessTimeIcon sx={{ fontSize: "18px" }} />
                    <span>8 min read</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-2">
                    <VisibilityIcon sx={{ fontSize: "18px" }} />
                    <span>{views.toLocaleString()} views</span>
                  </div>
                </div>
              </div>

              {/* Article Title */}
              <h1 className="text-4xl lg:text-6xl font-bold mb-8 leading-tight">
                <span className="bg-linear-to-r from-gray-100 via-gray-200 to-gray-300 bg-clip-text text-transparent">
                  The Future of Web Development:
                </span>
                <br />
                <span className="bg-linear-to-r from-[#ff1a1a] via-[#ff0066] to-[#ff00ff] bg-clip-text text-transparent">
                  Elite Trends for 2024
                </span>
              </h1>

              {/* Article Description */}
              <p className="text-xl lg:text-2xl text-gray-300 mb-10 max-w-3xl">
                Explore the groundbreaking innovations and cutting-edge
                technologies that are redefining the web development landscape
                in 2024 and beyond.
              </p>

              {/* Author and Actions */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-[#ff1a1a] via-[#ff0066] to-[#ff00ff] flex items-center justify-center shadow-xl">
                      <PersonIcon className="text-white text-2xl" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-green-500 border-2 border-gray-900 flex items-center justify-center">
                      <VerifiedIcon sx={{ fontSize: "12px", color: "white" }} />
                    </div>
                  </div>
                  <div>
                    <p className="font-bold text-gray-100 text-lg">
                      Alex Johnson
                    </p>
                    <p className="text-sm text-gray-400">
                      Senior Architect • Published Jan 15, 2024
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={handleLike}
                    className={`group flex items-center gap-3 px-5 py-3 rounded-2xl transition-all duration-300 ${
                      isLiked
                        ? "bg-linear-to-r from-[#ff1a1a]/20 via-[#ff0066]/20 to-[#ff00ff]/20 border border-[#ff0066]/30"
                        : "bg-linear-to-b from-gray-900/60 to-gray-900/30 border border-gray-800/50 hover:border-[#ff0066]/30"
                    }`}
                  >
                    {isLiked ? (
                      <FavoriteIcon className="text-[#ff0066] group-hover:scale-110 transition-transform" />
                    ) : (
                      <FavoriteBorderIcon className="text-gray-400 group-hover:text-[#ff0066] transition-colors" />
                    )}
                    <span className="font-bold">{likes}</span>
                  </button>

                  <button
                    onClick={handleBookmark}
                    className={`group flex items-center gap-3 px-5 py-3 rounded-2xl transition-all duration-300 ${
                      isBookmarked
                        ? "bg-linear-to-r from-[#ff1a1a]/20 via-[#ff0066]/20 to-[#ff00ff]/20 border border-[#ff0066]/30"
                        : "bg-linear-to-b from-gray-900/60 to-gray-900/30 border border-gray-800/50 hover:border-[#ff0066]/30"
                    }`}
                  >
                    {isBookmarked ? (
                      <BookmarkIcon className="text-[#ff00ff] group-hover:scale-110 transition-transform" />
                    ) : (
                      <BookmarkBorderIcon className="text-gray-400 group-hover:text-[#ff00ff] transition-colors" />
                    )}
                    <span className="font-bold">{bookmarks}</span>
                  </button>

                  <button
                    onClick={handleShare}
                    className="group flex items-center gap-3 px-5 py-3 rounded-2xl bg-linear-to-b from-gray-900/60 to-gray-900/30 border border-gray-800/50 hover:border-[#ff1a1a]/30 transition-all duration-300"
                  >
                    <ShareIcon className="text-gray-400 group-hover:text-[#ff1a1a] transition-colors group-hover:rotate-12" />
                    <span className="font-bold">{shares}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Article Content */}
          <div className="lg:col-span-2">
            <article className="relative overflow-hidden rounded-3xl bg-linear-to-br from-gray-900/60 to-gray-900/30 backdrop-blur-xl border border-gray-800/50 p-8 shadow-2xl shadow-black/30">
              <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#ff1a1a] via-[#ff0066] to-[#ff00ff]"></div>

              <div className="prose prose-lg max-w-none text-gray-300">
                <div className="mb-10">
                  <p className="text-xl leading-relaxed text-gray-300 mb-6">
                    Web development continues to evolve at an unprecedented
                    pace, with new frameworks, tools, and methodologies emerging
                    constantly. As we move deeper into 2024, several key trends
                    are fundamentally reshaping the landscape of web
                    development.
                  </p>
                </div>

                <h2 className="text-3xl font-bold mb-6 mt-12 bg-linear-to-r from-[#ff1a1a] to-[#ff0066] bg-clip-text text-transparent">
                  Artificial Intelligence Integration
                </h2>
                <div className="mb-8">
                  <p className="leading-relaxed mb-6 text-gray-300">
                    AI-powered tools are becoming indispensable for elite
                    developers. From intelligent code completion and automated
                    testing to sophisticated debugging and performance
                    optimization, AI is streamlining the development process
                    while dramatically improving code quality and security.
                  </p>
                  <div className="my-8 p-6 rounded-2xl bg-linear-to-r from-[#ff1a1a]/10 via-[#ff0066]/10 to-[#ff00ff]/10 border border-[#ff0066]/20">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-xl bg-linear-to-br from-[#ff1a1a]/20 to-[#ff00ff]/20">
                        <BoltIcon className="text-[#ff0066]" />
                      </div>
                      <div>
                        <p className="text-lg italic text-gray-200">
                          "The most significant shift in web development this
                          year is the democratization of AI tools, making
                          advanced capabilities accessible to developers of all
                          skill levels while maintaining enterprise-grade
                          security."
                        </p>
                        <p className="mt-3 text-sm text-gray-400">
                          — Alex Johnson, Senior Architect
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <h2 className="text-3xl font-bold mb-6 mt-12 bg-linear-to-r from-[#ff0066] to-[#ff00ff] bg-clip-text text-transparent">
                  Progressive Web Apps (PWAs)
                </h2>
                <p className="leading-relaxed mb-8 text-gray-300">
                  PWAs continue to gain traction as they bridge the gap between
                  web and mobile applications. With features like offline
                  functionality, push notifications, and app-like experiences,
                  PWAs provide users with seamless experiences across all
                  devices while reducing development time and costs by up to
                  70%.
                </p>

                <h2 className="text-3xl font-bold mb-6 mt-12 bg-linear-to-r from-[#ff1a1a] to-[#ff00ff] bg-clip-text text-transparent">
                  Serverless Architecture Revolution
                </h2>
                <p className="leading-relaxed mb-8 text-gray-300">
                  The move towards serverless computing allows elite developers
                  to focus on writing business logic without worrying about
                  infrastructure management. This trend is enabling more
                  scalable, cost-effective, and efficient web applications while
                  providing unprecedented flexibility in deployment strategies.
                </p>

                <div className="my-12 p-8 rounded-2xl bg-linear-to-br from-gray-900/50 to-gray-900/30 border border-gray-800/50">
                  <h3 className="text-2xl font-bold text-gray-100 mb-6 flex items-center gap-3">
                    <TrendingUpIcon className="text-[#ff0066]" />
                    Key Statistics for 2024
                  </h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center p-4 rounded-xl bg-linear-to-b from-gray-900/60 to-gray-900/30 border border-gray-800/50">
                      <p className="text-2xl font-bold text-[#ff1a1a]">87%</p>
                      <p className="text-sm text-gray-400 mt-2">
                        AI Adoption Rate
                      </p>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-linear-to-b from-gray-900/60 to-gray-900/30 border border-gray-800/50">
                      <p className="text-2xl font-bold text-[#ff00ff]">62%</p>
                      <p className="text-sm text-gray-400 mt-2">
                        PWA Implementation
                      </p>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-linear-to-b from-gray-900/60 to-gray-900/30 border border-gray-800/50">
                      <p className="text-2xl font-bold text-[#ff0066]">
                        $14.5B
                      </p>
                      <p className="text-sm text-gray-400 mt-2">
                        Serverless Market
                      </p>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-linear-to-b from-gray-900/60 to-gray-900/30 border border-gray-800/50">
                      <p className="text-2xl font-bold text-[#ff1a1a]">94%</p>
                      <p className="text-sm text-gray-400 mt-2">
                        Developer Satisfaction
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-gray-800/50">
                <h3 className="text-xl font-bold text-gray-100 mb-6 flex items-center gap-3">
                  <ArticleIcon className="text-[#ff0066]" />
                  Related Topics
                </h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    "Web Development",
                    "Artificial Intelligence",
                    "Progressive Web Apps",
                    "Serverless Computing",
                    "Cloud Architecture",
                    "Modern JavaScript",
                    "TypeScript",
                    "Performance Optimization",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="group px-5 py-2.5 rounded-xl bg-linear-to-b from-gray-900/60 to-gray-900/30 border border-gray-800/50 hover:border-[#ff0066]/30 hover:scale-105 transition-all duration-300 cursor-pointer"
                    >
                      <span className="text-gray-300 group-hover:text-[#ff0066] transition-colors">
                        #{tag}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            </article>

            {/* Comments Section */}
            <section className="mt-8 relative overflow-hidden rounded-3xl bg-linear-to-br from-gray-900/60 to-gray-900/30 backdrop-blur-xl border border-gray-800/50 p-8 shadow-2xl shadow-black/30">
              <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#ff1a1a] via-[#ff0066] to-[#ff00ff]"></div>

              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-100 flex items-center gap-3">
                    <ChatBubbleOutlineIcon className="text-[#ff0066]" />
                    Elite Discussion
                  </h2>
                  <p className="text-gray-400 mt-2">
                    {comments.length} insightful comments from the community
                  </p>
                </div>
                <div className="flex items-center gap-2 text-gray-400 bg-gray-900/50 px-4 py-2 rounded-xl">
                  <span className="text-sm">Join the conversation</span>
                </div>
              </div>

              {/* Comment Input */}
              <div className="mb-10">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[#ff1a1a] via-[#ff0066] to-[#ff00ff] flex items-center justify-center shadow-lg shrink-0">
                    <span className="text-white font-bold text-lg">Y</span>
                  </div>
                  <div className="flex-1">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Share your expert insights..."
                      className="w-full bg-gray-900/80 border border-gray-800/50 rounded-2xl p-5 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ff0066]/50 focus:border-transparent resize-none min-h-[140px] backdrop-blur-sm"
                    />
                    <div className="flex justify-between items-center mt-4">
                      <p className="text-sm text-gray-400">
                        Share your professional perspective
                      </p>
                      <button
                        onClick={handleCommentSubmit}
                        disabled={!newComment.trim()}
                        className={`group relative overflow-hidden rounded-2xl ${
                          newComment.trim()
                            ? ""
                            : "opacity-50 cursor-not-allowed"
                        }`}
                      >
                        <div className="absolute inset-0 bg-linear-to-r from-[#ff1a1a] via-[#ff0066] to-[#ff00ff] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative bg-linear-to-r from-gray-900 to-gray-800 group-hover:from-transparent group-hover:to-transparent transition-all duration-300">
                          <div className="flex items-center justify-center gap-3 px-8 py-3 rounded-2xl border border-gray-800/50 group-hover:border-transparent transition-all duration-300">
                            <span className="font-bold">Publish Insight</span>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-6">
                {comments.map((comment, index) => (
                  <div
                    key={index}
                    className="bg-linear-to-br from-gray-900/60 to-gray-900/30 rounded-2xl p-6 border border-gray-800/50 hover:border-[#ff0066]/30 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                          <span className="text-gray-400 font-bold text-sm">
                            U{index + 1}
                          </span>
                        </div>
                        {index < 3 && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-linear-to-br from-[#ff1a1a] to-[#ff0066] flex items-center justify-center">
                            <VerifiedIcon
                              sx={{ fontSize: "10px", color: "white" }}
                            />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="font-bold text-gray-100">
                              Elite Contributor #{index + 1}
                            </p>
                            <p className="text-xs text-gray-500">
                              {index === 0
                                ? "Verified Expert"
                                : "Community Member"}{" "}
                              • Just now
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="p-1.5 rounded-lg hover:bg-gray-800/50 transition-colors">
                              <FavoriteBorderIcon
                                sx={{ fontSize: "18px", color: "#9ca3af" }}
                              />
                            </button>
                            <button className="text-sm text-gray-400 hover:text-[#ff0066] transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-800/50">
                              Reply
                            </button>
                          </div>
                        </div>
                        <p className="text-gray-300">{comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {comments.length === 0 && (
                <div className="text-center py-16 bg-linear-to-br from-gray-900/40 to-gray-900/20 rounded-2xl">
                  <ChatBubbleOutlineIcon
                    className="text-gray-600 mx-auto mb-6"
                    sx={{ fontSize: 64 }}
                  />
                  <p className="text-gray-400 text-xl mb-2">No insights yet</p>
                  <p className="text-gray-500">
                    Be the first to share your expert perspective
                  </p>
                </div>
              )}
            </section>
          </div>

          {/* Sidebar - Related Articles */}
          <aside className="lg:col-span-1">
            <div className="sticky top-8 space-y-8">
              {/* Author Info Card */}
              <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-gray-900/60 to-gray-900/30 backdrop-blur-xl border border-gray-800/50 p-6 shadow-2xl shadow-black/30">
                <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#ff1a1a] via-[#ff0066] to-[#ff00ff]"></div>

                <h3 className="text-xl font-bold text-gray-100 mb-6 flex items-center gap-3">
                  <PersonIcon className="text-[#ff0066]" />
                  Elite Creator
                </h3>
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-[#ff1a1a] via-[#ff0066] to-[#ff00ff] flex items-center justify-center shadow-xl">
                      <PersonIcon className="text-white text-2xl" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-green-500 border-2 border-gray-900 flex items-center justify-center">
                      <TrendingUpIcon
                        sx={{ fontSize: "12px", color: "white" }}
                      />
                    </div>
                  </div>
                  <div>
                    <p className="font-bold text-gray-100 text-lg">
                      Alex Johnson
                    </p>
                    <p className="text-sm text-gray-400">Senior Architect</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-xs text-green-400">Active now</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-300 mb-6">
                  With over 12 years of experience in enterprise web
                  development, Alex specializes in modern JavaScript frameworks,
                  cloud architecture, and scalable system design.
                </p>
                <button className="w-full py-3 rounded-2xl bg-linear-to-r from-[#ff1a1a]/10 via-[#ff0066]/10 to-[#ff00ff]/10 text-[#ff0066] font-bold hover:from-[#ff1a1a]/20 hover:via-[#ff0066]/20 hover:to-[#ff00ff]/20 transition-all duration-300">
                  Follow Creator
                </button>
              </div>

              {/* Related Articles */}
              <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-gray-900/60 to-gray-900/30 backdrop-blur-xl border border-gray-800/50 p-6 shadow-2xl shadow-black/30">
                <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#ff1a1a] via-[#ff0066] to-[#ff00ff]"></div>

                <h3 className="text-xl font-bold text-gray-100 mb-6 flex items-center gap-3">
                  <TrendingUpIcon className="text-[#ff0066]" />
                  Trending Insights
                </h3>
                <div className="space-y-4">
                  {relatedArticles.map((article) => (
                    <div
                      key={article.id}
                      className="group p-5 rounded-2xl bg-linear-to-b from-gray-900/60 to-gray-900/30 border border-gray-800/50 hover:border-[#ff0066]/30 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-linear-to-r from-[#ff1a1a]/20 to-[#ff00ff]/20 text-gray-300">
                          {article.category}
                        </span>
                        <div className="flex items-center gap-1 text-gray-400 text-sm">
                          <VisibilityIcon sx={{ fontSize: "16px" }} />
                          <span>{article.views}</span>
                        </div>
                      </div>
                      <h4 className="font-bold text-gray-100 group-hover:text-[#ff0066] transition-colors mb-3 line-clamp-2">
                        {article.title}
                      </h4>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">{article.author}</span>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1 text-gray-400">
                            <AccessTimeIcon sx={{ fontSize: "14px" }} />
                            <span>{article.readTime}</span>
                          </div>
                          <div className="flex items-center gap-1 text-[#ff0066]">
                            <FavoriteIcon sx={{ fontSize: "14px" }} />
                            <span>{article.likes}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-6 py-3.5 rounded-2xl bg-linear-to-r from-[#ff1a1a]/10 via-[#ff0066]/10 to-[#ff00ff]/10 text-gray-300 font-bold hover:from-[#ff1a1a]/20 hover:via-[#ff0066]/20 hover:to-[#ff00ff]/20 transition-all duration-300">
                  View All Insights
                </button>
              </div>

              {/* Article Stats */}
              <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-gray-900/60 to-gray-900/30 backdrop-blur-xl border border-gray-800/50 p-6 shadow-2xl shadow-black/30">
                <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#ff1a1a] via-[#ff0066] to-[#ff00ff]"></div>

                <h3 className="text-xl font-bold text-gray-100 mb-6 flex items-center gap-3">
                  <TrendingUpIcon className="text-[#ff0066]" />
                  Performance Metrics
                </h3>
                <div className="space-y-5">
                  {[
                    {
                      label: "Reading Time",
                      value: "8 minutes",
                      color: "from-[#ff1a1a] to-[#ff0066]",
                    },
                    {
                      label: "Word Count",
                      value: "1,842 words",
                      color: "from-[#ff0066] to-[#ff00ff]",
                    },
                    {
                      label: "Engagement Rate",
                      value: "94%",
                      color: "from-[#ff1a1a] to-[#ff00ff]",
                    },
                    {
                      label: "Social Shares",
                      value: shares.toLocaleString(),
                      color: "from-[#ff0066] to-[#ff00ff]",
                    },
                  ].map((stat, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between group"
                    >
                      <span className="text-gray-400 group-hover:text-gray-300 transition-colors">
                        {stat.label}
                      </span>
                      <span
                        className={`font-bold bg-linear-to-r ${stat.color} bg-clip-text text-transparent`}
                      >
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
};

export default ArticlePage;
