import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LoginIcon from "@mui/icons-material/Login";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SecurityIcon from "@mui/icons-material/Security";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import StarsIcon from "@mui/icons-material/Stars";
import { toast, Toaster } from "react-hot-toast";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { setIsLoggedIn, setAuthUsername } = useAuth();
  const navigate = useNavigate();

  const LoginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      toast.error("Please fill in all fields", {
        icon: "⚠️",
        style: {
          background: "#0a0f1e",
          color: "#f1f5f9",
          border: "1px solid #1e293b",
        },
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call with a delay for demo
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error(
          `Login failed: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log("Login response data:", data);

      // Store username in localStorage
      localStorage.setItem("username", username);
      localStorage.setItem("isLoggedIn", "true");

      setAuthUsername(username);
      setIsLoggedIn(true);

      toast.success("Welcome back! Login successful.", {
        icon: "🎉",
        style: {
          background: "#0a0f1e",
          color: "#f1f5f9",
          border: "1px solid #1e293b",
          padding: "16px",
        },
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Invalid credentials. Please try again.", {
        icon: "🔒",
        style: {
          background: "#0a0f1e",
          color: "#f1f5f9",
          border: "1px solid #1e293b",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-950 to-black text-gray-100 flex items-center justify-center p-4">
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

      <div className="relative z-10 w-full max-w-4xl">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Side - Brand & Features */}
          <div className="hidden lg:flex flex-col justify-center">
            <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-gray-900/80 to-gray-900/40 backdrop-blur-sm border border-gray-800/30 p-8 shadow-xl">
              {/* Accent Border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-emerald-500 via-yellow-500 to-emerald-400"></div>

              <div className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-linear-to-br from-emerald-500/20 to-yellow-500/20">
                    <StarsIcon className="text-emerald-400 text-2xl" />
                  </div>
                  <h1 className="text-3xl font-bold">
                    <span className="bg-linear-to-r from-emerald-400 via-yellow-400 to-emerald-300 bg-clip-text text-transparent">
                      Blogify
                    </span>
                  </h1>
                </div>
                <p className="text-xl font-semibold text-gray-100 mb-3">
                  Welcome Back
                </p>
                <p className="text-gray-400">
                  Sign in to continue your journey with our community of writers
                  and readers.
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-5 mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/10">
                    <CheckCircleIcon className="text-emerald-400 text-sm" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-100">
                      Secure & Private
                    </h3>
                    <p className="text-xs text-gray-400">
                      Your data is always protected
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-yellow-500/10">
                    <CheckCircleIcon className="text-yellow-400 text-sm" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-100">
                      Seamless Experience
                    </h3>
                    <p className="text-xs text-gray-400">
                      Fast and intuitive interface
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/10">
                    <CheckCircleIcon className="text-emerald-400 text-sm" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-100">
                      Cross-Platform Sync
                    </h3>
                    <p className="text-xs text-gray-400">
                      Access from any device
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 rounded-xl bg-linear-to-b from-gray-900/50 to-gray-900/30 border border-gray-800/30">
                  <p className="text-xl font-bold text-emerald-400">50K+</p>
                  <p className="text-xs text-gray-400 mt-1">Users</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-linear-to-b from-gray-900/50 to-gray-900/30 border border-gray-800/30">
                  <p className="text-xl font-bold text-yellow-400">250K+</p>
                  <p className="text-xs text-gray-400 mt-1">Posts</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-linear-to-b from-gray-900/50 to-gray-900/30 border border-gray-800/30">
                  <p className="text-xl font-bold text-emerald-400">99%</p>
                  <p className="text-xs text-gray-400 mt-1">Satisfaction</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="flex flex-col justify-center">
            <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-gray-900/80 to-gray-900/40 backdrop-blur-sm border border-gray-800/30 p-6 md:p-8 shadow-xl">
              {/* Accent Border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-emerald-500 via-yellow-500 to-emerald-400"></div>

              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-emerald-500 to-yellow-500 mb-4 shadow-lg">
                  <LoginIcon className="text-white text-2xl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-100 mb-2">
                  Sign In to Your Account
                </h2>
                <p className="text-gray-400 text-sm">
                  Enter your credentials to access your dashboard
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={LoginUser} className="space-y-5">
                {/* Username Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Username or Email
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <PersonIcon className="text-gray-500" />
                    </div>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-900/60 border border-gray-800/50 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all"
                      placeholder="Enter username or email"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <LockIcon className="text-gray-500" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-12 py-3 bg-gray-900/60 border border-gray-800/50 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <div className="relative">
                      <input type="checkbox" className="sr-only" />
                      <div className="w-4 h-4 rounded border border-gray-700 bg-gray-900/50 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-sm bg-emerald-500 opacity-0"></div>
                      </div>
                    </div>
                    <span className="text-sm text-gray-400">Remember me</span>
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      toast("Password reset link sent to your email!", {
                        icon: "🔐",
                        style: {
                          background: "#0a0f1e",
                          color: "#f1f5f9",
                          border: "1px solid #1e293b",
                        },
                      })
                    }
                    className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-linear-to-r from-emerald-600 to-yellow-600 hover:from-emerald-500 hover:to-yellow-500 text-white font-medium rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowForwardIcon className="text-lg" />
                    </>
                  )}
                </button>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-800/50"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-3 bg-gray-900/80 text-xs text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div>

                {/* Social Login */}
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      toast("Google authentication coming soon!", {
                        icon: "🚀",
                      })
                    }
                    className="py-3 rounded-xl bg-gray-900/60 border border-gray-800/50 hover:border-emerald-500/30 hover:bg-gray-800/50 transition-all duration-300"
                  >
                    <GoogleIcon className="text-gray-400 mx-auto" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      toast("GitHub authentication coming soon!", {
                        icon: "🚀",
                      })
                    }
                    className="py-3 rounded-xl bg-gray-900/60 border border-gray-800/50 hover:border-yellow-500/30 hover:bg-gray-800/50 transition-all duration-300"
                  >
                    <GitHubIcon className="text-gray-400 mx-auto" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      toast("Twitter authentication coming soon!", {
                        icon: "🚀",
                      })
                    }
                    className="py-3 rounded-xl bg-gray-900/60 border border-gray-800/50 hover:border-emerald-500/30 hover:bg-gray-800/50 transition-all duration-300"
                  >
                    <TwitterIcon className="text-gray-400 mx-auto" />
                  </button>
                </div>
              </form>

              {/* Register Link */}
              <div className="mt-6 pt-6 border-t border-gray-800/50">
                <p className="text-center text-gray-400 text-sm">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    Create one now
                  </Link>
                </p>
              </div>

              {/* Security Note */}
              <div className="mt-4 p-3 rounded-xl bg-linear-to-r from-gray-900/50 to-gray-900/30 border border-gray-800/30">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-lg bg-emerald-500/10">
                    <SecurityIcon className="text-emerald-400 text-sm" />
                  </div>
                  <p className="text-xs text-gray-400">
                    Your login is secured with industry-standard encryption
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;