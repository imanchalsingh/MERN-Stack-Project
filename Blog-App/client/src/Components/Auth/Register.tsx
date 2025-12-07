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
          background: "#0a0f1e",
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
          background: "#0a0f1e",
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
          background: "#0a0f1e",
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
          background: "#0a0f1e",
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
          "Account created successfully! Welcome to Blogify!",
          {
            icon: "🎉",
            duration: 3000,
            style: {
              background: "#0a0f1e",
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
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-20 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 right-1/3 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Side - Registration Form */}
          <div className="flex flex-col justify-center">
            <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-gray-900/80 to-gray-900/40 backdrop-blur-sm border border-gray-800/30 p-6 md:p-8 shadow-xl">
              {/* Accent Border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-emerald-500 via-yellow-500 to-emerald-400"></div>

              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-emerald-500 to-yellow-500 mb-4 shadow-lg">
                  <HowToRegIcon className="text-white text-2xl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-100 mb-2">
                  Create Your Account
                </h2>
                <p className="text-gray-400 text-sm">
                  Join our community of writers and readers
                </p>
              </div>

              {/* Registration Form */}
              <form onSubmit={registerUser} className="space-y-5">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Display Name
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <PersonIcon className="text-gray-500" />
                    </div>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-900/60 border border-gray-800/50 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all"
                      placeholder="Choose your display name"
                      required
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <EmailIcon className="text-gray-500" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-900/60 border border-gray-800/50 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all"
                      placeholder="Enter your email"
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
                      placeholder="Create a password"
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
                  {/* Password Requirements */}
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center">
                      <div
                        className={`w-2 h-2 rounded-full mr-3 ${
                          password.length >= 8 ? "bg-emerald-500" : "bg-gray-700"
                        }`}
                      ></div>
                      <span
                        className={`text-xs ${
                          password.length >= 8
                            ? "text-gray-300"
                            : "text-gray-500"
                        }`}
                      >
                        At least 8 characters
                      </span>
                    </div>
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <LockIcon className="text-gray-500" />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-10 pr-12 py-3 bg-gray-900/60 border border-gray-800/50 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all"
                      placeholder="Confirm your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                    >
                      {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </button>
                  </div>
                  {/* Password Match Indicator */}
                  <div className="mt-3">
                    <div className="flex items-center">
                      <div
                        className={`w-2 h-2 rounded-full mr-3 ${
                          password &&
                          confirmPassword &&
                          password === confirmPassword
                            ? "bg-yellow-500"
                            : "bg-gray-700"
                        }`}
                      ></div>
                      <span
                        className={`text-xs ${
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
                <div className="flex items-start space-x-3">
                  <div className="relative flex items-center h-5 mt-0.5">
                    <input
                      id="terms"
                      type="checkbox"
                      className="sr-only"
                      required
                    />
                    <div className="w-4 h-4 rounded border border-gray-700 bg-gray-900/50 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-sm bg-emerald-500 opacity-0"></div>
                    </div>
                  </div>
                  <label
                    htmlFor="terms"
                    className="text-sm text-gray-400 cursor-pointer"
                  >
                    I agree to the{" "}
                    <button
                      type="button"
                      onClick={() =>
                        toast("Terms and conditions coming soon!", {
                          icon: "📝",
                        })
                      }
                      className="text-emerald-400 hover:text-emerald-300 transition-colors"
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
                      className="text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                      Privacy Policy
                    </button>
                  </label>
                </div>

                {/* Register Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-linear-to-r from-emerald-600 to-yellow-600 hover:from-emerald-500 hover:to-yellow-500 text-white font-medium rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span>Create Account</span>
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
                      Or sign up with
                    </span>
                  </div>
                </div>

                {/* Social Signup */}
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      toast("Google signup coming soon!", { icon: "🚀" })
                    }
                    className="py-3 rounded-xl bg-gray-900/60 border border-gray-800/50 hover:border-emerald-500/30 hover:bg-gray-800/50 transition-all duration-300"
                  >
                    <GoogleIcon className="text-gray-400 mx-auto" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      toast("GitHub signup coming soon!", { icon: "🚀" })
                    }
                    className="py-3 rounded-xl bg-gray-900/60 border border-gray-800/50 hover:border-yellow-500/30 hover:bg-gray-800/50 transition-all duration-300"
                  >
                    <GitHubIcon className="text-gray-400 mx-auto" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      toast("Twitter signup coming soon!", { icon: "🚀" })
                    }
                    className="py-3 rounded-xl bg-gray-900/60 border border-gray-800/50 hover:border-emerald-500/30 hover:bg-gray-800/50 transition-all duration-300"
                  >
                    <TwitterIcon className="text-gray-400 mx-auto" />
                  </button>
                </div>
              </form>

              {/* Login Link */}
              <div className="mt-6 pt-6 border-t border-gray-800/50">
                <p className="text-center text-gray-400 text-sm">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Features & Benefits */}
          <div className="hidden lg:flex flex-col justify-center">
            <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-gray-900/80 to-gray-900/40 backdrop-blur-sm border border-gray-800/30 p-8 shadow-xl">
              {/* Accent Border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-emerald-500 via-yellow-500 to-emerald-400"></div>

              <div className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-linear-to-br from-emerald-500/20 to-yellow-500/20">
                    <RocketLaunchIcon className="text-emerald-400 text-2xl" />
                  </div>
                  <h1 className="text-3xl font-bold">
                    <span className="bg-linear-to-r from-emerald-400 via-yellow-400 to-emerald-300 bg-clip-text text-transparent">
                      Why Join Blogify?
                    </span>
                  </h1>
                </div>
                <p className="text-xl font-semibold text-gray-100 mb-3">
                  Premium Features Await
                </p>
                <p className="text-gray-400">
                  Get access to exclusive tools designed for modern writers and
                  creators.
                </p>
              </div>

              {/* Benefits */}
              <div className="space-y-5 mb-8">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-linear-to-r from-gray-900/50 to-gray-900/30 border border-gray-800/30 hover:border-emerald-500/30 transition-all duration-300">
                  <div className="p-2 rounded-lg bg-emerald-500/10">
                    <VerifiedUserIcon className="text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-100">
                      Verified Creator Status
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">
                      Build trust with your audience
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-xl bg-linear-to-r from-gray-900/50 to-gray-900/30 border border-gray-800/30 hover:border-yellow-500/30 transition-all duration-300">
                  <div className="p-2 rounded-lg bg-yellow-500/10">
                    <SecurityIcon className="text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-100">
                      Advanced Security
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">
                      Your content is always protected
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-xl bg-linear-to-r from-gray-900/50 to-gray-900/30 border border-gray-800/30 hover:border-emerald-500/30 transition-all duration-300">
                  <div className="p-2 rounded-lg bg-emerald-500/10">
                    <StarIcon className="text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-100">
                      Premium Analytics
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">
                      Detailed insights for your content
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="text-center p-3 rounded-xl bg-linear-to-b from-gray-900/50 to-gray-900/30 border border-gray-800/30">
                  <p className="text-lg font-bold text-emerald-400">50K+</p>
                  <p className="text-xs text-gray-400 mt-1">Creators</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-linear-to-b from-gray-900/50 to-gray-900/30 border border-gray-800/30">
                  <p className="text-lg font-bold text-yellow-400">1M+</p>
                  <p className="text-xs text-gray-400 mt-1">Readers</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-linear-to-b from-gray-900/50 to-gray-900/30 border border-gray-800/30">
                  <p className="text-lg font-bold text-emerald-400">99.8%</p>
                  <p className="text-xs text-gray-400 mt-1">Satisfaction</p>
                </div>
              </div>

              {/* Security Note */}
              <div className="p-4 rounded-xl bg-linear-to-r from-gray-900/50 to-gray-900/30 border border-gray-800/30">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-lg bg-emerald-500/10">
                    <SecurityIcon className="text-emerald-400 text-sm" />
                  </div>
                  <p className="text-xs text-gray-400">
                    Your data is protected with end-to-end encryption. We never
                    share your personal information.
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

export default Register;