import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Auth/AuthContext";
import ArchiveIcon from "@mui/icons-material/Archive";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import HomeIcon from "@mui/icons-material/Home";
import CreateIcon from "@mui/icons-material/Create";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, setIsLoggedIn, isRegistered, setIsRegistered } =
    useAuth();
  const [activeNav, setActiveNav] = useState<string>("");
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
    { path: "/", label: "Home", icon: <HomeIcon /> },
    { path: "/myposts", label: "My Posts", icon: <CreateIcon /> },
    { path: "/articles", label: "Articles", icon: <BookmarksIcon /> },
    { path: "/archive", label: "Archive", icon: <ArchiveIcon /> },
    { path: "/likedpost", label: "Liked", icon: <FavoriteIcon /> },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-950 to-black text-gray-100">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -right-20 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 left-1/3 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl"></div>
      </div>

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-sm border-b border-gray-800/50 shadow-lg">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Mobile Menu Button */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-800/80 transition-all duration-300"
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
                <h1 className="text-3xl font-bold">
                  <span className="bg-linear-to-r from-emerald-400 via-yellow-400 to-emerald-300 bg-clip-text text-transparent font-['Engagement']">
                    Blogify
                  </span>
                </h1>
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* User Profile / Login */}
              <div className="flex items-center">
                {isLoggedIn || isRegistered ? (
                  <div className="flex items-center space-x-3">
                    <div className="relative group">
                      <button className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-800/80 transition-all duration-300">
                        <div className="relative">
                          <div className="w-10 h-10 rounded-full bg-linear-to-br from-emerald-500 to-yellow-500 flex items-center justify-center shadow">
                            <span className="font-bold text-white">
                              {(username || "U")[0].toUpperCase()}
                            </span>
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-gray-900"></div>
                        </div>
                      </button>

                      {/* Dropdown Menu */}
                      <div className="absolute right-0 mt-2 w-48 bg-gray-900/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-800/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 origin-top-right">
                        <div className="p-2">
                          <div className="px-3 py-2 border-b border-gray-800/50">
                            <p className="font-medium text-gray-100 text-sm">
                              {username || "User"}
                            </p>
                            <p className="text-xs text-gray-400">
                              @{(username || "user").toLowerCase()}
                            </p>
                          </div>
                          <div className="py-1">
                            <button
                              onClick={handleSignOut}
                              className="w-full px-3 py-2 text-left hover:bg-red-500/10 rounded-lg flex items-center gap-2 group/item text-red-400 mt-1 text-sm"
                            >
                              <LogoutIcon className="group-hover/item:scale-110 transition-transform text-base" />
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
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-linear-to-r from-emerald-600 to-yellow-600 text-white font-medium hover:from-emerald-500 hover:to-yellow-500 transition-all duration-300"
                  >
                    <LoginIcon className="text-base" />
                    <span className="text-sm">Sign In</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-gray-950/95 backdrop-blur-sm">
          <div className="p-6 h-full overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div
                className="flex items-center cursor-pointer"
                onClick={() => handleNavClick("/")}
              >
                <h1 className="text-xl font-bold bg-linear-to-r from-emerald-400 via-yellow-400 to-emerald-300 bg-clip-text text-transparent font-['Engagement']">
                  Blogify
                </h1>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-800/80"
              >
                <CloseIcon className="text-gray-300" />
              </button>
            </div>

            {/* User Info */}
            {(isLoggedIn || isRegistered) && (
              <div className="mb-4 p-4 bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-800/50">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-lg bg-linear-to-br from-emerald-500 to-yellow-500 flex items-center justify-center shadow">
                      <span className="font-bold text-white">
                        {(username || "U")[0].toUpperCase()}
                      </span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-gray-900"></div>
                  </div>
                  <div>
                    <p className="font-bold text-gray-100">
                      {username || "User"}
                    </p>
                    <p className="text-sm text-gray-400">Member • Basic Plan</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-3">
                  <div className="text-center p-2 bg-gray-900/60 rounded-lg">
                    <p className="text-lg font-bold text-emerald-400">24</p>
                    <p className="text-xs text-gray-400">Posts</p>
                  </div>
                  <div className="text-center p-2 bg-gray-900/60 rounded-lg">
                    <p className="text-lg font-bold text-yellow-400">1.2K</p>
                    <p className="text-xs text-gray-400">Likes</p>
                  </div>
                  <div className="text-center p-2 bg-gray-900/60 rounded-lg">
                    <p className="text-lg font-bold text-emerald-400">356</p>
                    <p className="text-xs text-gray-400">Views</p>
                  </div>
                </div>
              </div>
            )}

            {/* Mobile Navigation */}
            <nav className="space-y-1 mb-6">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeNav === item.path
                      ? "bg-linear-to-r from-emerald-500/10 to-yellow-500/10 border-l-4 border-emerald-500"
                      : "hover:bg-gray-800/50 text-gray-300 hover:text-gray-100"
                  }`}
                >
                  <span
                    className={`text-base ${
                      activeNav === item.path
                        ? "text-emerald-400"
                        : "text-gray-400"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.label}</span>
                  {activeNav === item.path && (
                    <div className="ml-auto w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  )}
                </button>
              ))}
              {/* Sign Out Button */}
              {(isLoggedIn || isRegistered) && (
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 px-4 py-3 mt-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20"
                >
                  <LogoutIcon />
                  <span className="font-medium">Sign Out</span>
                </button>
              )}
            </nav>

            {/* Mobile Stats */}
            <div className="p-4 bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-800/50">
              <h4 className="font-medium text-gray-300 mb-3">Today's Stats</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Engagement</span>
                  <span className="font-bold text-emerald-400">84.5%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">New Followers</span>
                  <span className="font-bold text-yellow-400">+28</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Content Score</span>
                  <span className="font-bold text-emerald-400">92/100</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24">
              {/* User Profile Card */}
              {isLoggedIn || isRegistered ? (
                <div className="relative overflow-hidden bg-gray-900/80 backdrop-blur-sm rounded-2xl p-5 mb-6 border border-gray-800/50">
                  {/* Accent Border Top */}
                  {/* <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-emerald-500 via-yellow-500 to-emerald-400"></div> */}

                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-lg bg-linear-to-br from-emerald-500 to-yellow-500 flex items-center justify-center shadow">
                        <span className="font-bold text-white">
                          {(username || "U")[0].toUpperCase()}
                        </span>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-gray-900 flex items-center justify-center">
                        <TrendingUpIcon
                          sx={{ fontSize: "10px", color: "white" }}
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-100">
                        {username || "Creator"}
                      </h3>
                      <p className="text-sm text-gray-400">
                        Member • Basic Plan
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="text-center p-2.5 bg-gray-900/60 rounded-lg">
                      <p className="text-lg font-bold text-emerald-400">24</p>
                      <p className="text-xs text-gray-400">Posts</p>
                    </div>
                    <div className="text-center p-2.5 bg-gray-900/60 rounded-lg">
                      <p className="text-lg font-bold text-yellow-400">1.2K</p>
                      <p className="text-xs text-gray-400">Likes</p>
                    </div>
                    <div className="text-center p-2.5 bg-gray-900/60 rounded-lg">
                      <p className="text-lg font-bold text-emerald-400">356</p>
                      <p className="text-xs text-gray-400">Views</p>
                    </div>
                  </div>

                  <button className="w-full py-2.5 rounded-xl bg-linear-to-r from-emerald-500/10 to-yellow-500/10 text-gray-100 font-medium hover:from-emerald-500/20 hover:to-yellow-500/20 transition-all duration-300">
                    View Profile
                  </button>
                </div>
              ) : (
                <div className="relative overflow-hidden bg-gray-900/80 backdrop-blur-sm rounded-2xl p-5 mb-6 border border-gray-800/50">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-emerald-500 via-yellow-500 to-emerald-400"></div>
                  <h3 className="font-bold text-gray-100 mb-3">Join Blogify</h3>
                  <p className="text-gray-300 text-sm mb-4">
                    Unlock features and grow your audience.
                  </p>
                  <button
                    onClick={() => navigate("/login")}
                    className="w-full py-2.5 rounded-xl bg-linear-to-r from-emerald-600 to-yellow-600 text-white font-medium hover:from-emerald-500 hover:to-yellow-500 transition-all duration-300"
                  >
                    Get Started
                  </button>
                </div>
              )}

              {/* Desktop Navigation */}
              <div className="relative overflow-hidden bg-gray-900/80 backdrop-blur-sm rounded-2xl p-5 border border-gray-800/50">
                <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-emerald-500 via-yellow-500 to-emerald-400"></div>

                <nav className="space-y-1">
                  {navItems.map((item) => (
                    <button
                      key={item.path}
                      onClick={() => handleNavClick(item.path)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group ${
                        activeNav === item.path
                          ? "bg-linear-to-r from-emerald-500/10 to-yellow-500/10 border-l-4 border-emerald-500"
                          : "hover:bg-gray-800/50 border-l-4 border-transparent"
                      }`}
                    >
                      <span
                        className={`text-base transition-all duration-300 ${
                          activeNav === item.path
                            ? "text-emerald-400"
                            : "text-gray-400 group-hover:text-gray-300"
                        }`}
                      >
                        {item.icon}
                      </span>
                      <span
                        className={`font-medium ${
                          activeNav === item.path
                            ? "text-gray-100"
                            : "text-gray-300 group-hover:text-gray-100"
                        }`}
                      >
                        {item.label}
                      </span>
                      {activeNav === item.path && (
                        <div className="ml-auto w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                      )}
                    </button>
                  ))}
                </nav>

                {/* Quick Stats */}
                <div className="mt-6 p-4 bg-gray-900/60 rounded-xl border border-gray-800/50">
                  <h4 className="font-medium text-gray-300 mb-3 flex items-center gap-2">
                    <TrendingUpIcon
                      sx={{ fontSize: "18px", color: "#10b981" }}
                    />
                    Quick Stats
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">Engagement</span>
                        <span className="font-medium text-emerald-400">
                          84.5%
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-linear-to-r from-emerald-500 to-yellow-500 rounded-full"
                          style={{ width: "84.5%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">Growth</span>
                        <span className="font-medium text-yellow-400">92%</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-linear-to-r from-emerald-500 to-yellow-500 rounded-full"
                          style={{ width: "92%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="pt-3 border-t border-gray-800/50">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Daily Views</span>
                        <span className="font-medium text-emerald-400">
                          1.2K
                        </span>
                      </div>
                      <div className="flex justify-between mt-1 text-sm">
                        <span className="text-gray-400">Followers</span>
                        <span className="font-medium text-yellow-400">+28</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0">
            <div className="relative overflow-hidden bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-800/50">
              {/* Accent Border Top */}
              {/* <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-emerald-500 via-yellow-500 to-emerald-400"></div> */}

              {/* Main Content */}
              <div className="p-6">
                <Outlet />
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Mobile Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-gray-900/90 backdrop-blur-sm border-t border-gray-800/50 shadow-lg">
        <div className="flex justify-around py-2">
          {navItems.slice(0, 5).map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavClick(item.path)}
              className={`flex flex-col items-center p-2 rounded-lg transition-all duration-300 ${
                activeNav === item.path
                  ? "text-emerald-400 bg-linear-to-b from-emerald-500/10 to-transparent"
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
