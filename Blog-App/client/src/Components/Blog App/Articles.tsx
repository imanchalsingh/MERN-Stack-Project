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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
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
          background: "#0a0f1e",
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
        background: "#0a0f1e",
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
          background: "#0a0f1e",
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
        background: "#0a0f1e",
        color: "#f1f5f9",
        border: "1px solid #1e293b",
      },
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-950 to-black text-gray-100">
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
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -right-20 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 left-1/3 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-3 mb-8 transition-all duration-300"
        >
          <div className="p-2 rounded-xl bg-gray-900/80 hover:bg-gray-800/80 border border-gray-800/50 transition-all duration-300">
            <ArrowBackIcon className="text-gray-400 group-hover:text-emerald-400 transition-colors" />
          </div>
          <div className="text-left">
            <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
              Back to
            </p>
            <p className="font-medium text-emerald-400">Articles</p>
          </div>
        </button>

        {/* Article Header */}
        <header className="mb-8">
          <div className="max-w-4xl">
            {/* Category and Stats */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="px-3 py-1.5 rounded-lg bg-linear-to-r from-emerald-500/10 to-yellow-500/10 border border-emerald-500/30">
                <span className="font-medium text-emerald-400">TECHNOLOGY</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <AccessTimeIcon sx={{ fontSize: "16px" }} />
                  <span>8 min read</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-2">
                  <VisibilityIcon sx={{ fontSize: "16px" }} />
                  <span>{views.toLocaleString()} views</span>
                </div>
              </div>
            </div>

            {/* Article Title */}
            <h1 className="text-3xl lg:text-5xl font-bold mb-6 leading-tight">
              <span className="text-gray-100">The Future of Web Development:</span>
              <br />
              <span className="bg-linear-to-r from-emerald-400 via-yellow-400 to-emerald-300 bg-clip-text text-transparent">
                Elite Trends for 2025
              </span>
            </h1>

            {/* Article Description */}
            <p className="text-lg lg:text-xl text-gray-300 mb-8">
              Explore the groundbreaking innovations and cutting-edge
              technologies that are redefining the web development landscape
              in 2025 and beyond.
            </p>

            {/* Author and Actions */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-linear-to-br from-emerald-500 to-yellow-500 flex items-center justify-center shadow">
                    <PersonIcon className="text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-gray-900 flex items-center justify-center">
                    <VerifiedIcon sx={{ fontSize: "10px", color: "white" }} />
                  </div>
                </div>
                <div>
                  <p className="font-bold text-gray-100">Alex Johnson</p>
                  <p className="text-sm text-gray-400">
                    Senior Architect • Published Jan 15, 2025
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 ${
                    isLiked
                      ? "bg-linear-to-r from-emerald-500/10 to-yellow-500/10 text-emerald-400"
                      : "bg-gray-900/80 text-gray-400 hover:text-emerald-400 hover:bg-gray-800/80"
                  }`}
                >
                  {isLiked ? (
                    <FavoriteIcon className="transition-transform" />
                  ) : (
                    <FavoriteBorderIcon className="transition-colors" />
                  )}
                  <span className="font-bold">{likes}</span>
                </button>

                <button
                  onClick={handleBookmark}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 ${
                    isBookmarked
                      ? "bg-linear-to-r from-emerald-500/10 to-yellow-500/10 text-yellow-400"
                      : "bg-gray-900/80 text-gray-400 hover:text-yellow-400 hover:bg-gray-800/80"
                  }`}
                >
                  {isBookmarked ? (
                    <BookmarkIcon className="transition-transform" />
                  ) : (
                    <BookmarkBorderIcon className="transition-colors" />
                  )}
                  <span className="font-bold">{bookmarks}</span>
                </button>

                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-900/80 text-gray-400 hover:text-emerald-400 hover:bg-gray-800/80 transition-all duration-300"
                >
                  <ShareIcon className="transition-colors" />
                  <span className="font-bold">{shares}</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Article Content */}
          <div className="lg:col-span-2">
            <article className="relative overflow-hidden rounded-2xl bg-gray-900/80 backdrop-blur-sm border border-gray-800/50 p-6 shadow-lg">
              {/* Accent Border */}
              {/* <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-emerald-500 via-yellow-500 to-emerald-400"></div> */}

              <div className="text-gray-300">
                <div className="mb-8">
                  <p className="text-lg leading-relaxed text-gray-300 mb-6">
                    Web development continues to evolve at an unprecedented
                    pace, with new frameworks, tools, and methodologies emerging
                    constantly. As we move deeper into 2025, several key trends
                    are fundamentally reshaping the landscape of web
                    development.
                  </p>
                </div>

                <h2 className="text-2xl font-bold mb-6 mt-10 text-emerald-400">
                  Artificial Intelligence Integration
                </h2>
                <div className="mb-8">
                  <p className="leading-relaxed mb-6">
                    AI-powered tools are becoming indispensable for elite
                    developers. From intelligent code completion and automated
                    testing to sophisticated debugging and performance
                    optimization, AI is streamlining the development process
                    while dramatically improving code quality and security.
                  </p>
                  <div className="my-6 p-5 rounded-xl bg-linear-to-r from-emerald-500/10 to-yellow-500/10 border border-emerald-500/20">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-emerald-500/10">
                        <CheckCircleIcon className="text-emerald-400" />
                      </div>
                      <div>
                        <p className="italic text-gray-200">
                          "The most significant shift in web development this
                          year is the democratization of AI tools, making
                          advanced capabilities accessible to developers of all
                          skill levels while maintaining enterprise-grade
                          security."
                        </p>
                        <p className="mt-2 text-sm text-gray-400">
                          — Alex Johnson, Senior Architect
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <h2 className="text-2xl font-bold mb-6 mt-10 text-yellow-400">
                  Progressive Web Apps (PWAs)
                </h2>
                <p className="leading-relaxed mb-8">
                  PWAs continue to gain traction as they bridge the gap between
                  web and mobile applications. With features like offline
                  functionality, push notifications, and app-like experiences,
                  PWAs provide users with seamless experiences across all
                  devices while reducing development time and costs by up to
                  70%.
                </p>

                <h2 className="text-2xl font-bold mb-6 mt-10 text-emerald-400">
                  Serverless Architecture Revolution
                </h2>
                <p className="leading-relaxed mb-8">
                  The move towards serverless computing allows elite developers
                  to focus on writing business logic without worrying about
                  infrastructure management. This trend is enabling more
                  scalable, cost-effective, and efficient web applications while
                  providing unprecedented flexibility in deployment strategies.
                </p>

                <div className="my-8 p-6 rounded-xl bg-gray-900/60 border border-gray-800/50">
                  <h3 className="text-xl font-bold text-gray-100 mb-6 flex items-center gap-3">
                    <TrendingUpIcon className="text-emerald-400" />
                    Key Statistics for 2025
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 rounded-xl bg-gray-900/40 border border-gray-800/50">
                      <p className="text-xl font-bold text-emerald-400">87%</p>
                      <p className="text-sm text-gray-400 mt-2">
                        AI Adoption Rate
                      </p>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-gray-900/40 border border-gray-800/50">
                      <p className="text-xl font-bold text-yellow-400">62%</p>
                      <p className="text-sm text-gray-400 mt-2">
                        PWA Implementation
                      </p>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-gray-900/40 border border-gray-800/50">
                      <p className="text-xl font-bold text-emerald-400">
                        $14.5B
                      </p>
                      <p className="text-sm text-gray-400 mt-2">
                        Serverless Market
                      </p>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-gray-900/40 border border-gray-800/50">
                      <p className="text-xl font-bold text-emerald-400">94%</p>
                      <p className="text-sm text-gray-400 mt-2">
                        Developer Satisfaction
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="mt-8 pt-6 border-t border-gray-800/50">
                <h3 className="text-lg font-bold text-gray-100 mb-4 flex items-center gap-3">
                  <ArticleIcon className="text-emerald-400" />
                  Related Topics
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Web Development",
                    "Artificial Intelligence",
                    "Progressive Web Apps",
                    "Serverless Computing",
                    "Cloud Architecture",
                    "Modern JavaScript",
                    "TypeScript",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-lg bg-gray-900/60 border border-gray-800/50 text-gray-300 hover:text-emerald-400 hover:border-emerald-500/30 transition-all duration-300 cursor-pointer text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>

            {/* Comments Section */}
            <section className="mt-6 relative overflow-hidden rounded-2xl bg-gray-900/80 backdrop-blur-sm border border-gray-800/50 p-6 shadow-lg">
              {/* Accent Border */}
              {/* <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-emerald-500 via-yellow-500 to-emerald-400"></div> */}

              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-100 flex items-center gap-3">
                    <ChatBubbleOutlineIcon className="text-emerald-400" />
                    Comments
                  </h2>
                  <p className="text-gray-400 text-sm mt-1">
                    {comments.length} comments from the community
                  </p>
                </div>
              </div>

              {/* Comment Input */}
              <div className="mb-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-linear-to-br from-emerald-500 to-yellow-500 flex items-center justify-center shadow shrink-0">
                    <span className="text-white font-bold text-sm">Y</span>
                  </div>
                  <div className="flex-1">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Share your thoughts..."
                      className="w-full bg-gray-900/60 border border-gray-800/50 rounded-xl p-4 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent resize-none min-h-[120px]"
                    />
                    <div className="flex justify-between items-center mt-3">
                      <p className="text-sm text-gray-400">
                        Express your perspective
                      </p>
                      <button
                        onClick={handleCommentSubmit}
                        disabled={!newComment.trim()}
                        className="px-4 py-2 rounded-xl bg-linear-to-r from-emerald-600 to-yellow-600 text-white font-medium hover:from-emerald-500 hover:to-yellow-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Publish Comment
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-4">
                {comments.map((comment, index) => (
                  <div
                    key={index}
                    className="bg-gray-900/60 rounded-xl p-4 border border-gray-800/50 hover:border-emerald-500/30 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center">
                          <span className="text-gray-400 font-bold text-xs">
                            U{index + 1}
                          </span>
                        </div>
                        {index < 3 && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
                            <VerifiedIcon
                              sx={{ fontSize: "8px", color: "white" }}
                            />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-medium text-gray-100 text-sm">
                              Contributor #{index + 1}
                            </p>
                            <p className="text-xs text-gray-500">
                              {index === 0 ? "Expert" : "Member"} • Just now
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="text-sm text-gray-400 hover:text-emerald-400 transition-colors px-2 py-1 rounded-lg hover:bg-gray-800/50">
                              Reply
                            </button>
                          </div>
                        </div>
                        <p className="text-gray-300 text-sm">{comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {comments.length === 0 && (
                <div className="text-center py-10 bg-gray-900/40 rounded-xl">
                  <ChatBubbleOutlineIcon
                    className="text-gray-600 mx-auto mb-4"
                    sx={{ fontSize: 48 }}
                  />
                  <p className="text-gray-400 mb-1">No comments yet</p>
                  <p className="text-gray-500 text-sm">
                    Be the first to share your thoughts
                  </p>
                </div>
              )}
            </section>
          </div>

          {/* Sidebar - Related Articles */}
          <aside className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              {/* Author Info Card */}
              <div className="relative overflow-hidden rounded-2xl bg-gray-900/80 backdrop-blur-sm border border-gray-800/50 p-6 shadow-lg">
                {/* Accent Border */}
                {/* <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-emerald-500 via-yellow-500 to-emerald-400"></div> */}

                <h3 className="text-lg font-bold text-gray-100 mb-4 flex items-center gap-3">
                  <PersonIcon className="text-emerald-400" />
                  Author
                </h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-linear-to-br from-emerald-500 to-yellow-500 flex items-center justify-center shadow">
                      <PersonIcon className="text-white" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-gray-900 flex items-center justify-center">
                      <TrendingUpIcon sx={{ fontSize: "10px", color: "white" }} />
                    </div>
                  </div>
                  <div>
                    <p className="font-bold text-gray-100">Alex Johnson</p>
                    <p className="text-sm text-gray-400">Senior Architect</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                      <span className="text-xs text-emerald-400">Active now</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-300 mb-6">
                  With over 12 years of experience in enterprise web
                  development, Alex specializes in modern JavaScript frameworks,
                  cloud architecture, and scalable system design.
                </p>
                <button className="w-full py-2.5 rounded-xl bg-linear-to-r from-emerald-500/10 to-yellow-500/10 text-emerald-400 font-medium hover:from-emerald-500/20 hover:to-yellow-500/20 transition-all duration-300">
                  Follow Author
                </button>
              </div>

              {/* Related Articles */}
              <div className="relative overflow-hidden rounded-2xl bg-gray-900/80 backdrop-blur-sm border border-gray-800/50 p-6 shadow-lg">
                {/* Accent Border */}
                {/* <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-emerald-500 via-yellow-500 to-emerald-400"></div> */}

                <h3 className="text-lg font-bold text-gray-100 mb-4 flex items-center gap-3">
                  <TrendingUpIcon className="text-emerald-400" />
                  Related Articles
                </h3>
                <div className="space-y-3">
                  {relatedArticles.map((article) => (
                    <div
                      key={article.id}
                      className="group p-4 rounded-xl bg-gray-900/40 border border-gray-800/50 hover:border-emerald-500/30 transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-1 rounded text-xs font-medium bg-linear-to-r from-emerald-500/10 to-yellow-500/10 text-gray-300">
                          {article.category}
                        </span>
                        <div className="flex items-center gap-1 text-gray-400 text-xs">
                          <VisibilityIcon sx={{ fontSize: "14px" }} />
                          <span>{article.views}</span>
                        </div>
                      </div>
                      <h4 className="font-medium text-gray-100 group-hover:text-emerald-400 transition-colors mb-2 line-clamp-2">
                        {article.title}
                      </h4>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-400">{article.author}</span>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1 text-gray-400">
                            <AccessTimeIcon sx={{ fontSize: "12px" }} />
                            <span>{article.readTime}</span>
                          </div>
                          <div className="flex items-center gap-1 text-emerald-400">
                            <FavoriteIcon sx={{ fontSize: "12px" }} />
                            <span>{article.likes}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-4 py-2.5 rounded-xl bg-linear-to-r from-emerald-500/10 to-yellow-500/10 text-gray-300 font-medium hover:from-emerald-500/20 hover:to-yellow-500/20 transition-all duration-300">
                  View All Articles
                </button>
              </div>

              {/* Article Stats */}
              <div className="relative overflow-hidden rounded-2xl bg-gray-900/80 backdrop-blur-sm border border-gray-800/50 p-6 shadow-lg">
                {/* Accent Border */}
                {/* <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-emerald-500 via-yellow-500 to-emerald-400"></div> */}

                <h3 className="text-lg font-bold text-gray-100 mb-4 flex items-center gap-3">
                  <TrendingUpIcon className="text-emerald-400" />
                  Article Stats
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      label: "Reading Time",
                      value: "8 minutes",
                      color: "text-emerald-400",
                    },
                    {
                      label: "Word Count",
                      value: "1,842 words",
                      color: "text-yellow-400",
                    },
                    {
                      label: "Engagement Rate",
                      value: "94%",
                      color: "text-emerald-400",
                    },
                    {
                      label: "Social Shares",
                      value: shares.toLocaleString(),
                      color: "text-emerald-400",
                    },
                  ].map((stat, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <span className="text-gray-400 text-sm">
                        {stat.label}
                      </span>
                      <span className={`font-medium ${stat.color}`}>
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