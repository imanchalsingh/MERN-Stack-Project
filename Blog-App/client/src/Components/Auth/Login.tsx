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
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import SecurityIcon from "@mui/icons-material/Security";
import PeopleIcon from "@mui/icons-material/People";
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
          background: "#0f172a",
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

      toast.success("Welcome back! Access granted.", {
        icon: "🎉",
        style: {
          background: "#0f172a",
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
          background: "#0f172a",
          color: "#f1f5f9",
          border: "1px solid #1e293b",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center p-4">
      <Toaster 
        position="top-right" 
        toastOptions={{
          style: {
            background: '#0f172a',
            color: '#fff',
            border: '1px solid #1e293b',
          },
        }}
      />

      {/* Background Glow Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#ff1a1a] rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-[#ff00ff] rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-[#ff0066] rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Side - Brand & Features */}
          <div className="hidden lg:flex flex-col justify-center">
            <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-gray-900/60 to-gray-900/30 backdrop-blur-xl border border-gray-800/50 p-10 shadow-2xl shadow-black/50">
              {/* linear Border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#ff1a1a] via-[#ff0066] to-[#ff00ff]"></div>
              
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-linear-to-br from-[#ff1a1a]/20 to-[#ff00ff]/20">
                    <FingerprintIcon className="text-[#ff0066] text-3xl" />
                  </div>
                  <h1 className="text-4xl font-bold">
                    <span className="bg-linear-to-r from-[#ff1a1a] via-[#ff0066] to-[#ff00ff] bg-clip-text text-transparent">
                      Blogify
                    </span>
                  </h1>
                </div>
                <p className="text-2xl font-semibold text-gray-100 mb-2">
                  Welcome to the Elite Community
                </p>
                <p className="text-gray-400 text-lg">
                  Join thousands of creators sharing their stories in the most premium blogging experience
                </p>
              </div>

              {/* Features */}
              <div className="space-y-6 mb-10">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-linear-to-r from-gray-900/50 to-gray-900/20 hover:from-gray-800/50 transition-all duration-300">
                  <div className="p-2.5 rounded-xl bg-linear-to-br from-[#ff1a1a]/10 to-[#ff00ff]/10">
                    <SecurityIcon className="text-[#ff0066]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-100">Enterprise Security</h3>
                    <p className="text-sm text-gray-400">Military-grade encryption for your content</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-linear-to-r from-gray-900/50 to-gray-900/20 hover:from-gray-800/50 transition-all duration-300">
                  <div className="p-2.5 rounded-xl bg-linear-to-br from-[#ff1a1a]/10 to-[#ff00ff]/10">
                    <PeopleIcon className="text-[#ff0066]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-100">Global Community</h3>
                    <p className="text-sm text-gray-400">Connect with creators worldwide</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-linear-to-r from-gray-900/50 to-gray-900/20 hover:from-gray-800/50 transition-all duration-300">
                  <div className="p-2.5 rounded-xl bg-linear-to-br from-[#ff1a1a]/10 to-[#ff00ff]/10">
                    <StarsIcon className="text-[#ff0066]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-100">Premium Features</h3>
                    <p className="text-sm text-gray-400">Advanced analytics and monetization</p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-2xl bg-linear-to-b from-gray-900/60 to-gray-900/30 border border-gray-800/50">
                  <p className="text-2xl font-bold bg-linear-to-r from-[#ff1a1a] to-[#ff00ff] bg-clip-text text-transparent">50K+</p>
                  <p className="text-xs text-gray-400">Active Creators</p>
                </div>
                <div className="text-center p-4 rounded-2xl bg-linear-to-b from-gray-900/60 to-gray-900/30 border border-gray-800/50">
                  <p className="text-2xl font-bold bg-linear-to-r from-[#ff0066] to-[#ff00ff] bg-clip-text text-transparent">250K+</p>
                  <p className="text-xs text-gray-400">Premium Posts</p>
                </div>
                <div className="text-center p-4 rounded-2xl bg-linear-to-b from-gray-900/60 to-gray-900/30 border border-gray-800/50">
                  <p className="text-2xl font-bold bg-linear-to-r from-[#ff1a1a] to-[#ff0066] bg-clip-text text-transparent">99.9%</p>
                  <p className="text-xs text-gray-400">Uptime</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="flex flex-col justify-center">
            <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-gray-900/60 to-gray-900/30 backdrop-blur-xl border border-gray-800/50 p-8 md:p-10 shadow-2xl shadow-black/50">
              {/* linear Border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#ff1a1a] via-[#ff0066] to-[#ff00ff]"></div>
              
              {/* Header */}
              <div className="text-center mb-8">
                <div className="relative inline-block mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-[#ff1a1a] via-[#ff0066] to-[#ff00ff] flex items-center justify-center mx-auto shadow-xl shadow-[#ff0066]/30">
                    <LoginIcon className="text-white text-3xl" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-linear-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg">
                    <span className="text-xs font-bold text-gray-900">PRO</span>
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-gray-100 mb-2">
                  Access Your Account
                </h2>
                <p className="text-gray-400">
                  Enter your credentials to continue
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={LoginUser} className="space-y-6">
                {/* Username Field */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-300 mb-3">
                    Username or Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-0 bg-linear-to-r from-[#ff1a1a] via-[#ff0066] to-[#ff00ff] rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                    <div className="relative flex items-center">
                      <div className="absolute left-4 flex items-center pointer-events-none">
                        <PersonIcon className="text-gray-500 group-hover:text-gray-300 transition-colors" />
                      </div>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-gray-900/80 border border-gray-800/50 rounded-2xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ff0066]/50 focus:border-transparent transition-all backdrop-blur-sm"
                        placeholder="Enter your username or email"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Password Field */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-300 mb-3">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-0 bg-linear-to-r from-[#ff1a1a] via-[#ff0066] to-[#ff00ff] rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                    <div className="relative flex items-center">
                      <div className="absolute left-4 flex items-center pointer-events-none">
                        <LockIcon className="text-gray-500 group-hover:text-gray-300 transition-colors" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-12 pr-12 py-4 bg-gray-900/80 border border-gray-800/50 rounded-2xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ff0066]/50 focus:border-transparent transition-all backdrop-blur-sm"
                        placeholder="Enter your password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 flex items-center p-1.5 rounded-lg hover:bg-gray-800/50 transition-colors"
                      >
                        {showPassword ? (
                          <VisibilityOffIcon className="text-gray-500 hover:text-gray-300" />
                        ) : (
                          <VisibilityIcon className="text-gray-500 hover:text-gray-300" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center group cursor-pointer">
                    <div className="relative">
                      <input
                        type="checkbox"
                        id="remember"
                        className="sr-only"
                      />
                      <div className="w-5 h-5 rounded border border-gray-700 bg-gray-900/50 group-hover:border-[#ff0066] transition-colors flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-sm bg-linear-to-r from-[#ff1a1a] to-[#ff00ff] opacity-0 group-has-[input:checked]:opacity-100 transition-opacity"></div>
                      </div>
                    </div>
                    <label
                      htmlFor="remember"
                      className="ml-3 text-sm text-gray-400 group-hover:text-gray-300 transition-colors cursor-pointer"
                    >
                      Remember this device
                    </label>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      toast("Password reset initiated. Check your email!", {
                        icon: "🔐",
                        style: {
                          background: "#0f172a",
                          color: "#f1f5f9",
                          border: "1px solid #1e293b",
                        },
                      })
                    }
                    className="text-sm font-medium bg-linear-to-r from-[#ff0066] to-[#ff00ff] bg-clip-text text-transparent hover:opacity-80 transition-opacity"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="relative w-full group overflow-hidden rounded-2xl"
                >
                  <div className="absolute inset-0 bg-linear-to-r from-[#ff1a1a] via-[#ff0066] to-[#ff00ff] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative bg-linear-to-r from-gray-900 to-gray-800 group-hover:from-transparent group-hover:to-transparent transition-all duration-300">
                    <div className="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl border border-gray-800/50 group-hover:border-transparent transition-all duration-300">
                      {isLoading ? (
                        <>
                          <div className="w-6 h-6 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                          <span className="font-bold text-lg">Authenticating...</span>
                        </>
                      ) : (
                        <>
                          <span className="font-bold text-lg">Secure Login</span>
                          <ArrowForwardIcon className="group-hover:translate-x-2 transition-transform duration-300" />
                        </>
                      )}
                    </div>
                  </div>
                </button>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-800/50"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-gray-900/60 text-gray-500 font-medium">
                      Or continue with
                    </span>
                  </div>
                </div>

                {/* Social Login */}
                <div className="grid grid-cols-3 gap-4">
                  <button
                    type="button"
                    onClick={() =>
                      toast("Google authentication coming soon!", {
                        icon: "🚀",
                      })
                    }
                    className="group relative p-4 rounded-2xl bg-linear-to-b from-gray-900/60 to-gray-900/30 border border-gray-800/50 hover:border-[#ff1a1a]/30 transition-all duration-300"
                  >
                    <GoogleIcon className="text-gray-400 group-hover:text-[#ff1a1a] transition-colors mx-auto" />
                    <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#ff1a1a] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() =>
                      toast("GitHub authentication coming soon!", {
                        icon: "🚀",
                      })
                    }
                    className="group relative p-4 rounded-2xl bg-linear-to-b from-gray-900/60 to-gray-900/30 border border-gray-800/50 hover:border-[#ff0066]/30 transition-all duration-300"
                  >
                    <GitHubIcon className="text-gray-400 group-hover:text-[#ff0066] transition-colors mx-auto" />
                    <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#ff0066] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() =>
                      toast("Twitter authentication coming soon!", {
                        icon: "🚀",
                      })
                    }
                    className="group relative p-4 rounded-2xl bg-linear-to-b from-gray-900/60 to-gray-900/30 border border-gray-800/50 hover:border-[#ff00ff]/30 transition-all duration-300"
                  >
                    <TwitterIcon className="text-gray-400 group-hover:text-[#ff00ff] transition-colors mx-auto" />
                    <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#ff00ff] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </button>
                </div>
              </form>

              {/* Register Link */}
              <div className="mt-8 pt-6 border-t border-gray-800/50">
                <p className="text-center text-gray-400">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="font-bold bg-linear-to-r from-[#ff1a1a] via-[#ff0066] to-[#ff00ff] bg-clip-text text-transparent hover:opacity-80 transition-opacity"
                  >
                    Join Elite Community
                  </Link>
                </p>
              </div>

              {/* Security Note */}
              <div className="mt-6 p-4 rounded-2xl bg-linear-to-r from-gray-900/50 to-gray-900/20 border border-gray-800/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-linear-to-br from-green-500/20 to-emerald-500/20">
                    <SecurityIcon className="text-green-400 text-sm" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-300">
                      Your credentials are encrypted with AES-256 encryption
                    </p>
                  </div>
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