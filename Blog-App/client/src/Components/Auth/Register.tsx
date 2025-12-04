import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import SecurityIcon from "@mui/icons-material/Security";
import StarIcon from "@mui/icons-material/Star";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { toast, Toaster } from "react-hot-toast";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setIsRegistered } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      toast.error("Please fill in all required fields", {
        icon: "⚠️",
        style: {
          background: "#0f172a",
          color: "#f1f5f9",
          border: "1px solid #1e293b",
        },
      });
      return false;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long", {
        icon: "🔒",
        style: {
          background: "#0f172a",
          color: "#f1f5f9",
          border: "1px solid #1e293b",
        },
      });
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match. Please verify your entries.", {
        icon: "🔑",
        style: {
          background: "#0f172a",
          color: "#f1f5f9",
          border: "1px solid #1e293b",
        },
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address", {
        icon: "📧",
        style: {
          background: "#0f172a",
          color: "#f1f5f9",
          border: "1px solid #1e293b",
        },
      });
      return false;
    }

    return true;
  };

  const registerUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call with a delay for demo
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        throw new Error(
          `Registration failed: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();

      if (data.status === "ok") {
        // Store user data
        localStorage.setItem("username", name);
        localStorage.setItem("isRegistered", "true");
        localStorage.setItem("email", email);

        setIsRegistered(true);

        toast.success(
          "Account created successfully! Welcome to the Elite Community!",
          {
            icon: "🚀",
            duration: 3000,
            style: {
              background: "#0f172a",
              color: "#f1f5f9",
              border: "1px solid #1e293b",
              padding: "16px",
            },
          }
        );

        // Delay navigation to show success message
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } else {
        throw new Error(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Registration failed. Please try again.", {
        icon: "❌",
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
            background: "#0f172a",
            color: "#fff",
            border: "1px solid #1e293b",
          },
        }}
      />

      {/* Background Glow Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#ff1a1a] rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-[#ff00ff] rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute -bottom-40 right-1/3 w-96 h-96 bg-[#ff0066] rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Side - Registration Form */}
          <div className="flex flex-col justify-center">
            <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-gray-900/60 to-gray-900/30 backdrop-blur-xl border border-gray-800/50 p-8 md:p-10 shadow-2xl shadow-black/50">
              {/* linear Border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#ff1a1a] via-[#ff0066] to-[#ff00ff]"></div>

              {/* Header */}
              <div className="text-center mb-8">
                <div className="relative inline-block mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-[#ff1a1a] via-[#ff0066] to-[#ff00ff] flex items-center justify-center mx-auto shadow-xl shadow-[#ff0066]/30">
                    <HowToRegIcon className="text-white text-3xl" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-linear-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg">
                    <StarIcon sx={{ fontSize: "16px", color: "white" }} />
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-gray-100 mb-2">
                  Join the Elite Community
                </h2>
                <p className="text-gray-400">
                  Create your premium account in seconds
                </p>
              </div>

              {/* Registration Form */}
              <form onSubmit={registerUser} className="space-y-6">
                {/* Name Field */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-300 mb-3">
                    Display Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-0 bg-linear-to-r from-[#ff1a1a] via-[#ff0066] to-[#ff00ff] rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                    <div className="relative flex items-center">
                      <div className="absolute left-4 flex items-center pointer-events-none">
                        <PersonIcon className="text-gray-500 group-hover:text-gray-300 transition-colors" />
                      </div>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-gray-900/80 border border-gray-800/50 rounded-2xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ff0066]/50 focus:border-transparent transition-all backdrop-blur-sm"
                        placeholder="Choose your display name"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Email Field */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-300 mb-3">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-0 bg-linear-to-r from-[#ff1a1a] via-[#ff0066] to-[#ff00ff] rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                    <div className="relative flex items-center">
                      <div className="absolute left-4 flex items-center pointer-events-none">
                        <EmailIcon className="text-gray-500 group-hover:text-gray-300 transition-colors" />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-gray-900/80 border border-gray-800/50 rounded-2xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ff0066]/50 focus:border-transparent transition-all backdrop-blur-sm"
                        placeholder="Enter your professional email"
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
                        placeholder="Create a strong password"
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
                  {/* Password Requirements */}
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center">
                      <div
                        className={`w-2 h-2 rounded-full mr-3 ${
                          password.length >= 8 ? "bg-[#ff1a1a]" : "bg-gray-700"
                        }`}
                      ></div>
                      <span
                        className={`text-sm ${
                          password.length >= 8
                            ? "text-gray-300"
                            : "text-gray-500"
                        }`}
                      >
                        Minimum 8 characters
                      </span>
                    </div>
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-300 mb-3">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-0 bg-linear-to-r from-[#ff1a1a] via-[#ff0066] to-[#ff00ff] rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                    <div className="relative flex items-center">
                      <div className="absolute left-4 flex items-center pointer-events-none">
                        <LockIcon className="text-gray-500 group-hover:text-gray-300 transition-colors" />
                      </div>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full pl-12 pr-12 py-4 bg-gray-900/80 border border-gray-800/50 rounded-2xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ff0066]/50 focus:border-transparent transition-all backdrop-blur-sm"
                        placeholder="Confirm your password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-4 flex items-center p-1.5 rounded-lg hover:bg-gray-800/50 transition-colors"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOffIcon className="text-gray-500 hover:text-gray-300" />
                        ) : (
                          <VisibilityIcon className="text-gray-500 hover:text-gray-300" />
                        )}
                      </button>
                    </div>
                  </div>
                  {/* Password Match Indicator */}
                  <div className="mt-3">
                    <div className="flex items-center">
                      <div
                        className={`w-2 h-2 rounded-full mr-3 ${
                          password &&
                          confirmPassword &&
                          password === confirmPassword
                            ? "bg-[#ff00ff]"
                            : "bg-gray-700"
                        }`}
                      ></div>
                      <span
                        className={`text-sm ${
                          password &&
                          confirmPassword &&
                          password === confirmPassword
                            ? "text-gray-300"
                            : "text-gray-500"
                        }`}
                      >
                        Passwords match
                      </span>
                    </div>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start group cursor-pointer">
                  <div className="relative flex items-center h-5 mt-0.5">
                    <input
                      id="terms"
                      type="checkbox"
                      className="sr-only"
                      required
                    />
                    <div className="w-5 h-5 rounded border border-gray-700 bg-gray-900/50 group-hover:border-[#ff0066] transition-colors flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-sm bg-linear-to-r from-[#ff1a1a] to-[#ff00ff] opacity-0 group-has-[input:checked]:opacity-100 transition-opacity"></div>
                    </div>
                  </div>
                  <label
                    htmlFor="terms"
                    className="ml-3 text-sm text-gray-400 group-hover:text-gray-300 transition-colors cursor-pointer"
                  >
                    I agree to the{" "}
                    <button
                      type="button"
                      onClick={() =>
                        toast("Terms and conditions coming soon!", {
                          icon: "📝",
                        })
                      }
                      className="font-medium bg-linear-to-r from-[#ff0066] to-[#ff00ff] bg-clip-text text-transparent hover:opacity-80 transition-opacity"
                    >
                      Terms of Service
                    </button>{" "}
                    and{" "}
                    <button
                      type="button"
                      onClick={() =>
                        toast("Privacy policy coming soon!", {
                          icon: "🔒",
                        })
                      }
                      className="font-medium bg-linear-to-r from-[#ff1a1a] to-[#ff0066] bg-clip-text text-transparent hover:opacity-80 transition-opacity"
                    >
                      Privacy Policy
                    </button>
                  </label>
                </div>

                {/* Register Button */}
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
                          <span className="font-bold text-lg">
                            Creating Elite Account...
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="font-bold text-lg">
                            Create Elite Account
                          </span>
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
                      Or sign up with
                    </span>
                  </div>
                </div>

                {/* Social Signup */}
                <div className="grid grid-cols-3 gap-4">
                  <button
                    type="button"
                    onClick={() =>
                      toast("Google signup coming soon!", { icon: "🚀" })
                    }
                    className="group relative p-4 rounded-2xl bg-linear-to-b from-gray-900/60 to-gray-900/30 border border-gray-800/50 hover:border-[#ff1a1a]/30 transition-all duration-300"
                  >
                    <GoogleIcon className="text-gray-400 group-hover:text-[#ff1a1a] transition-colors mx-auto" />
                    <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#ff1a1a] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      toast("GitHub signup coming soon!", { icon: "🚀" })
                    }
                    className="group relative p-4 rounded-2xl bg-linear-to-b from-gray-900/60 to-gray-900/30 border border-gray-800/50 hover:border-[#ff0066]/30 transition-all duration-300"
                  >
                    <GitHubIcon className="text-gray-400 group-hover:text-[#ff0066] transition-colors mx-auto" />
                    <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#ff0066] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      toast("Twitter signup coming soon!", { icon: "🚀" })
                    }
                    className="group relative p-4 rounded-2xl bg-linear-to-b from-gray-900/60 to-gray-900/30 border border-gray-800/50 hover:border-[#ff00ff]/30 transition-all duration-300"
                  >
                    <TwitterIcon className="text-gray-400 group-hover:text-[#ff00ff] transition-colors mx-auto" />
                    <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#ff00ff] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </button>
                </div>
              </form>

              {/* Login Link */}
              <div className="mt-8 pt-6 border-t border-gray-800/50">
                <p className="text-center text-gray-400">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-bold bg-linear-to-r from-[#ff1a1a] via-[#ff0066] to-[#ff00ff] bg-clip-text text-transparent hover:opacity-80 transition-opacity"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Features & Benefits */}
          <div className="hidden lg:flex flex-col justify-center">
            <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-gray-900/60 to-gray-900/30 backdrop-blur-xl border border-gray-800/50 p-10 shadow-2xl shadow-black/50">
              {/* linear Border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#ff1a1a] via-[#ff0066] to-[#ff00ff]"></div>

              <div className="mb-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-linear-to-br from-[#ff1a1a]/20 to-[#ff00ff]/20">
                    <RocketLaunchIcon className="text-[#ff0066] text-3xl" />
                  </div>
                  <h1 className="text-4xl font-bold">
                    <span className="bg-linear-to-r from-[#ff1a1a] via-[#ff0066] to-[#ff00ff] bg-clip-text text-transparent">
                      Why Join Elite?
                    </span>
                  </h1>
                </div>
                <p className="text-2xl font-semibold text-gray-100 mb-2">
                  Premium Features Await You
                </p>
                <p className="text-gray-400 text-lg">
                  Get access to exclusive tools and features that will elevate
                  your content creation experience.
                </p>
              </div>

              {/* Benefits */}
              <div className="space-y-6 mb-10">
                <div className="flex items-center gap-4 p-5 rounded-2xl bg-linear-to-r from-gray-900/50 to-gray-900/20 hover:from-gray-800/50 transition-all duration-300 group">
                  <div className="p-3 rounded-xl bg-linear-to-br from-[#ff1a1a]/10 to-[#ff00ff]/10 group-hover:from-[#ff1a1a]/20 group-hover:to-[#ff00ff]/20 transition-all duration-300">
                    <VerifiedUserIcon className="text-[#ff0066]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-100 text-lg">
                      Verified Creator Status
                    </h3>
                    <p className="text-gray-400">
                      Get your content verified and build trust with your
                      audience
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-5 rounded-2xl bg-linear-to-r from-gray-900/50 to-gray-900/20 hover:from-gray-800/50 transition-all duration-300 group">
                  <div className="p-3 rounded-xl bg-linear-to-br from-[#ff1a1a]/10 to-[#ff00ff]/10 group-hover:from-[#ff1a1a]/20 group-hover:to-[#ff00ff]/20 transition-all duration-300">
                    <SecurityIcon className="text-[#ff0066]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-100 text-lg">
                      Advanced Security
                    </h3>
                    <p className="text-gray-400">
                      Bank-level encryption and privacy controls for your
                      content
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-5 rounded-2xl bg-linear-to-r from-gray-900/50 to-gray-900/20 hover:from-gray-800/50 transition-all duration-300 group">
                  <div className="p-3 rounded-xl bg-linear-to-br from-[#ff1a1a]/10 to-[#ff00ff]/10 group-hover:from-[#ff1a1a]/20 group-hover:to-[#ff00ff]/20 transition-all duration-300">
                    <StarIcon className="text-[#ff0066]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-100 text-lg">
                      Premium Analytics
                    </h3>
                    <p className="text-gray-400">
                      Detailed insights and performance metrics for your content
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-5 rounded-2xl bg-linear-to-b from-gray-900/60 to-gray-900/30 border border-gray-800/50 hover:border-[#ff1a1a]/30 transition-colors duration-300">
                  <p className="text-2xl font-bold bg-linear-to-r from-[#ff1a1a] to-[#ff00ff] bg-clip-text text-transparent">
                    50K+
                  </p>
                  <p className="text-sm text-gray-400 mt-2">Elite Creators</p>
                </div>
                <div className="text-center p-5 rounded-2xl bg-linear-to-b from-gray-900/60 to-gray-900/30 border border-gray-800/50 hover:border-[#ff0066]/30 transition-colors duration-300">
                  <p className="text-2xl font-bold bg-linear-to-r from-[#ff0066] to-[#ff00ff] bg-clip-text text-transparent">
                    1M+
                  </p>
                  <p className="text-sm text-gray-400 mt-2">Monthly Readers</p>
                </div>
                <div className="text-center p-5 rounded-2xl bg-linear-to-b from-gray-900/60 to-gray-900/30 border border-gray-800/50 hover:border-[#ff1a1a]/30 transition-colors duration-300">
                  <p className="text-2xl font-bold bg-linear-to-r from-[#ff1a1a] to-[#ff0066] bg-clip-text text-transparent">
                    99.8%
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    Satisfaction Rate
                  </p>
                </div>
              </div>

              {/* Security Note */}
              <div className="mt-8 p-5 rounded-2xl bg-linear-to-r from-gray-900/50 to-gray-900/20 border border-gray-800/50">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-linear-to-br from-green-500/20 to-emerald-500/20">
                    <SecurityIcon className="text-green-400 text-lg" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-300 font-medium">
                      Your data is protected with end-to-end encryption
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      We never share your personal information with third
                      parties
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

export default Register;
