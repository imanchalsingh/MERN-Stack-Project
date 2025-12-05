import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Auth/AuthContext";
import SearchIcon from "@mui/icons-material/Search";
import ArticleIcon from "@mui/icons-material/Article";
import ArchiveIcon from "@mui/icons-material/Archive";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import BookmarksIcon from "@mui/icons-material/Bookmarks";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, setIsLoggedIn, isRegistered, setIsRegistered } =
    useAuth();
  const [activeNav, setActiveNav] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    // Set active nav based on current route
    setActiveNav(location.pathname);

    // Get username from localStorage
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, [location.pathname]);

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setIsRegistered(false);
    localStorage.setItem("isLoggedIn", "false");
    localStorage.setItem("isRegistered", "false");
    navigate("/login");
    setMobileMenuOpen(false);
  };

  const handleNavClick = (path: string) => {
    setActiveNav(path);
    navigate(path);
    setMobileMenuOpen(false);
  };

  const navItems = [
    { path: "/", label: "Dashboard", icon: <DashboardIcon /> },
    { path: "/myposts", label: "My Posts", icon: <ArticleIcon /> },
    { path: "/articles", label: "Articles", icon: <BookmarksIcon /> },
    { path: "/archive", label: "Archive", icon: <ArchiveIcon /> },
    { path: "/likedpost", label: "Liked Posts", icon: <FavoriteIcon /> },
    { path: "/trending", label: "Trending", icon: <TrendingUpIcon /> },
    { path: "/settings", label: "Settings", icon: <SettingsIcon /> },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Background Glow Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-[#ff1a1a] rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-[#ff00ff] rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute -bottom-40 left-1/2 w-80 h-80 bg-[#ff0066] rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse delay-500"></div>
      </div>

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-xl border-b border-gray-800/50 shadow-2xl shadow-black/30">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo and Mobile Menu Button */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2.5 rounded-xl hover:bg-gray-800/80 transition-all duration-300"
              >
                {mobileMenuOpen ? (
                  <CloseIcon className="text-gray-300" />
                ) : (
                  <MenuIcon className="text-gray-300" />
                )}
              </button>

              <div
                className="flex items-center cursor-pointer group"
                onClick={() => handleNavClick("/")}
              >
                <div className="relative">
                  <h1 className=" LogoText text-4xl font-bold hover:scale-105 transition-transform duration-300">
                    <span className="bg-linear-to-r from-[#ff1a1a] via-[#ff0066] to-[#ff00ff] bg-clip-text text-transparent">
                      Blogify
                    </span>
                  </h1>
                </div>
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* User Profile / Login */}
              <div className="flex items-center">
                {isLoggedIn || isRegistered ? (
                  <div className="flex items-center space-x-4">
                    <div className="hidden xl:block text-right">
                      <p className="font-semibold text-gray-100">
                        {username || "Creator"}
                      </p>
                      <p className="text-sm text-gray-400">Premium Member</p>
                    </div>
                    <div className="relative group">
                      <button className="flex items-center gap-3 p-2 rounded-2xl hover:bg-gray-800/80 transition-all duration-300">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[#ff1a1a] via-[#ff0066] to-[#ff00ff] flex items-center justify-center shadow-lg">
                            <span className="font-bold text-white text-lg">
                              {(username || "U")[0].toUpperCase()}
                            </span>
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-500 border-2 border-gray-900"></div>
                        </div>
                      </button>

                      {/* Dropdown Menu */}
                      <div className="absolute right-0 mt-3 w-56 bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/50 border border-gray-800/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 origin-top-right">
                        <div className="p-2">
                          <div className="px-4 py-3 border-b border-gray-800/50">
                            <p className="font-semibold text-gray-100">
                              {username || "User"}
                            </p>
                            <p className="text-sm text-gray-400">
                              @{(username || "user").toLowerCase()}
                            </p>
                          </div>
                          <div className="py-2">
                            <button
                              onClick={() => handleNavClick("/profile")}
                              className="w-full px-4 py-3 text-left hover:bg-gray-800/50 rounded-xl flex items-center gap-3 group/item"
                            >
                              <PersonIcon className="text-gray-400 group-hover/item:text-[#ff0066]" />
                              <span>My Profile</span>
                            </button>
                            <button
                              onClick={handleSignOut}
                              className="w-full px-4 py-3 text-left hover:bg-red-500/10 rounded-xl flex items-center gap-3 group/item text-red-400 mt-1"
                            >
                              <LogoutIcon className="group-hover/item:scale-110 transition-transform" />
                              <span>Sign Out</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => navigate("/login")}
                    className="flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-linear-to-r from-[#ff1a1a] via-[#ff0066] to-[#ff00ff] text-white font-semibold hover:shadow-2xl hover:shadow-[#ff0066]/30 hover:scale-105 transition-all duration-300"
                  >
                    <LoginIcon />
                    <span>Sign In</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="lg:hidden py-4">
            <div className="relative group">
              <div className="absolute inset-0 bg-linear-to-r from-[#ff1a1a] via-[#ff0066] to-[#ff00ff] rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
              <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 z-10" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search everything..."
                className="relative w-full pl-12 pr-4 py-3.5 bg-gray-900/80 border border-gray-800/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#ff0066]/50 text-gray-100 placeholder-gray-500 backdrop-blur-sm"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-gray-950/95 backdrop-blur-xl">
          <div className="p-6 h-full overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <div
                className="flex items-center cursor-pointer"
                onClick={() => handleNavClick("/")}
              >
                <h1 className="text-2xl font-bold bg-linear-to-r from-[#ff1a1a] via-[#ff0066] to-[#ff00ff] bg-clip-text text-transparent">
                  Blogify
                </h1>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl hover:bg-gray-800/80"
              >
                <CloseIcon className="text-gray-300" />
              </button>
            </div>

            {/* User Info */}
            {(isLoggedIn || isRegistered) && (
              <div className="mb-6 p-5 bg-linear-to-br from-gray-900/80 to-gray-900/40 backdrop-blur-sm rounded-2xl border border-gray-800/50 shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-xl bg-linear-to-br from-[#ff1a1a] via-[#ff0066] to-[#ff00ff] flex items-center justify-center shadow-lg">
                      <span className="font-bold text-white text-xl">
                        {(username || "U")[0].toUpperCase()}
                      </span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-500 border-2 border-gray-900"></div>
                  </div>
                  <div>
                    <p className="font-bold text-gray-100 text-lg">
                      {username || "User"}
                    </p>
                    <p className="text-sm text-gray-400">
                      Elite Creator • Pro Plan
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 mt-4">
                  <div className="text-center p-3 bg-gray-900/60 rounded-xl">
                    <p className="text-xl font-bold text-[#ff1a1a]">24</p>
                    <p className="text-xs text-gray-400">Posts</p>
                  </div>
                  <div className="text-center p-3 bg-gray-900/60 rounded-xl">
                    <p className="text-xl font-bold text-[#ff0066]">1.2K</p>
                    <p className="text-xs text-gray-400">Likes</p>
                  </div>
                  <div className="text-center p-3 bg-gray-900/60 rounded-xl">
                    <p className="text-xl font-bold text-[#ff00ff]">356</p>
                    <p className="text-xs text-gray-400">Views</p>
                  </div>
                </div>
              </div>
            )}

            {/* Mobile Navigation */}
            <nav className="space-y-2 mb-8">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 ${
                    activeNav === item.path
                      ? "bg-linear-to-r from-[#ff1a1a]/20 via-[#ff0066]/20 to-[#ff00ff]/20 border-l-4 border-[#ff0066] shadow-lg shadow-[#ff0066]/10"
                      : "hover:bg-gray-800/50 text-gray-300 hover:text-gray-100"
                  }`}
                >
                  <span
                    className={`text-xl ${
                      activeNav === item.path
                        ? "text-[#ff0066]"
                        : "text-gray-400"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="font-medium text-lg">{item.label}</span>
                  {activeNav === item.path && (
                    <div className="ml-auto w-2.5 h-2.5 rounded-full bg-linear-to-r from-[#ff1a1a] to-[#ff00ff] animate-pulse"></div>
                  )}
                </button>
              ))}
              {/* Sign Out Button */}
              {(isLoggedIn || isRegistered) && (
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-4 px-4 py-4 mt-4 rounded-2xl bg-red-500/10 text-red-400 hover:bg-red-500/20"
                >
                  <LogoutIcon />
                  <span className="font-medium text-lg">Sign Out</span>
                </button>
              )}
            </nav>

            {/* Mobile Stats */}
            <div className="p-5 bg-linear-to-br from-gray-900/60 to-gray-900/30 backdrop-blur-sm rounded-2xl border border-gray-800/50">
              <h4 className="font-semibold text-gray-300 mb-4 text-lg">
                Today's Stats
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Engagement Rate</span>
                  <span className="font-bold text-[#ff0066]">84.5%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">New Followers</span>
                  <span className="font-bold text-[#ff00ff]">+28</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Content Score</span>
                  <span className="font-bold text-[#ff1a1a]">92/100</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-28">
              {/* User Profile Card */}
              {isLoggedIn || isRegistered ? (
                <div className="relative overflow-hidden bg-linear-to-br from-gray-900/80 to-gray-900/40 backdrop-blur-xl rounded-3xl p-6 mb-8 border border-gray-800/50 shadow-2xl shadow-black/30">
                  {/* linear Border Top */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#ff1a1a] via-[#ff0066] to-[#ff00ff]"></div>

                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-[#ff1a1a] via-[#ff0066] to-[#ff00ff] flex items-center justify-center shadow-xl">
                        <span className="font-bold text-white text-2xl">
                          {(username || "U")[0].toUpperCase()}
                        </span>
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-green-500 border-3 border-gray-900 flex items-center justify-center">
                        <TrendingUpIcon
                          sx={{ fontSize: "12px", color: "white" }}
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-100 text-xl">
                        {username || "Creator"}
                      </h3>
                      <p className="text-sm text-gray-400">
                        Elite Creator • Pro Plan
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="text-center p-3.5 bg-gray-900/60 rounded-xl">
                      <p className="text-2xl font-bold text-[#ff1a1a]">24</p>
                      <p className="text-xs text-gray-400">Posts</p>
                    </div>
                    <div className="text-center p-3.5 bg-gray-900/60 rounded-xl">
                      <p className="text-2xl font-bold text-[#ff0066]">1.2K</p>
                      <p className="text-xs text-gray-400">Likes</p>
                    </div>
                    <div className="text-center p-3.5 bg-gray-900/60 rounded-xl">
                      <p className="text-2xl font-bold text-[#ff00ff]">356</p>
                      <p className="text-xs text-gray-400">Views</p>
                    </div>
                  </div>

                  <button className="w-full py-3.5 rounded-xl bg-linear-to-r from-[#ff1a1a]/10 via-[#ff0066]/10 to-[#ff00ff]/10 text-gray-100 font-semibold hover:from-[#ff1a1a]/20 hover:via-[#ff0066]/20 hover:to-[#ff00ff]/20 transition-all duration-300 border border-gray-800/50">
                    View Full Profile
                  </button>
                </div>
              ) : (
                <div className="relative overflow-hidden bg-linear-to-br from-gray-900/80 to-gray-900/40 backdrop-blur-xl rounded-3xl p-6 mb-8 border border-gray-800/50 shadow-2xl">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#ff1a1a] via-[#ff0066] to-[#ff00ff]"></div>
                  <h3 className="font-bold text-gray-100 text-xl mb-4">
                    Join Blogify Pro
                  </h3>
                  <p className="text-gray-300 mb-6">
                    Unlock premium features and grow your audience
                    exponentially.
                  </p>
                  <button
                    onClick={() => navigate("/login")}
                    className="w-full py-3.5 rounded-xl bg-linear-to-r from-[#ff1a1a] via-[#ff0066] to-[#ff00ff] text-white font-bold hover:shadow-2xl hover:shadow-[#ff0066]/30 transition-all duration-300"
                  >
                    Start Free Trial
                  </button>
                </div>
              )}

              {/* Desktop Navigation */}
              <div className="relative overflow-hidden bg-linear-to-br from-gray-900/80 to-gray-900/40 backdrop-blur-xl rounded-3xl p-6 border border-gray-800/50 shadow-2xl shadow-black/30">
                <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#ff1a1a] via-[#ff0066] to-[#ff00ff]"></div>

                <nav className="space-y-2">
                  {navItems.map((item) => (
                    <button
                      key={item.path}
                      onClick={() => handleNavClick(item.path)}
                      className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group ${
                        activeNav === item.path
                          ? "bg-linear-to-r from-[#ff1a1a]/20 via-[#ff0066]/20 to-[#ff00ff]/20 border-l-4 border-[#ff0066] shadow-lg shadow-[#ff0066]/10"
                          : "hover:bg-gray-800/50 border-l-4 border-transparent"
                      }`}
                    >
                      <span
                        className={`text-xl transition-all duration-300 ${
                          activeNav === item.path
                            ? "text-[#ff0066] scale-110"
                            : "text-gray-400 group-hover:text-gray-300"
                        }`}
                      >
                        {item.icon}
                      </span>
                      <span
                        className={`font-medium text-lg ${
                          activeNav === item.path
                            ? "text-gray-100 font-semibold"
                            : "text-gray-300 group-hover:text-gray-100"
                        }`}
                      >
                        {item.label}
                      </span>
                      {activeNav === item.path && (
                        <div className="ml-auto w-2.5 h-2.5 rounded-full bg-linear-to-r from-[#ff1a1a] to-[#ff00ff] animate-pulse"></div>
                      )}
                    </button>
                  ))}
                </nav>

                {/* Quick Stats */}
                <div className="mt-8 p-5 bg-linear-to-br from-gray-900/60 to-gray-900/30 rounded-2xl border border-gray-800/50">
                  <h4 className="font-semibold text-gray-300 mb-4 text-lg flex items-center gap-2">
                    <TrendingUpIcon
                      sx={{ fontSize: "20px", color: "#ff0066" }}
                    />
                    Quick Stats
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">Engagement Rate</span>
                        <span className="font-bold text-[#ff0066]">84.5%</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-linear-to-r from-[#ff1a1a] to-[#ff0066] rounded-full"
                          style={{ width: "84.5%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">Growth Score</span>
                        <span className="font-bold text-[#ff00ff]">92%</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-linear-to-r from-[#ff0066] to-[#ff00ff] rounded-full"
                          style={{ width: "92%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-gray-800/50">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Daily Views</span>
                        <span className="font-bold text-[#ff1a1a]">1.2K</span>
                      </div>
                      <div className="flex justify-between mt-2">
                        <span className="text-gray-400">New Followers</span>
                        <span className="font-bold text-[#ff00ff]">+28</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0">
            <div className="relative overflow-hidden bg-linear-to-br from-gray-900/60 to-gray-900/30 backdrop-blur-xl rounded-3xl border border-gray-800/50 shadow-2xl shadow-black/30">
              {/* linear Border Top */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#ff1a1a] via-[#ff0066] to-[#ff00ff]"></div>

              {/* Main Content */}
              <div className="p-8">
                <Outlet />
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Mobile Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-gray-900/90 backdrop-blur-xl border-t border-gray-800/50 shadow-2xl shadow-black/50">
        <div className="flex justify-around py-3">
          {navItems.slice(0, 5).map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavClick(item.path)}
              className={`flex flex-col items-center p-2.5 rounded-xl transition-all duration-300 ${
                activeNav === item.path
                  ? "text-[#ff0066] bg-linear-to-b from-[#ff0066]/10 to-transparent"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              <span
                className={`${
                  activeNav === item.path ? "scale-110" : ""
                } transition-transform duration-300`}
              >
                {item.icon}
              </span>
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
