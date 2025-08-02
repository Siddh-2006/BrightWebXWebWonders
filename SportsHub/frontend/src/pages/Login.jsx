import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { useNavigate } from "react-router";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Phone,
  Trophy,
  ArrowRight,
  Shield,
  Zap,
  Target,
  Users,
} from "lucide-react";
import axios from "axios";
// custom toasts
import { ToastContainer, toast } from "react-toastify";
import { showCustomToast } from "../helper/CustomToast";
import LoginContext from "../context/loginContext";

const Login = ({ isDarkMode}) => {
  const navigate=useNavigate();
  const {isLoggedIn, setIsLoggedIn} = useContext(LoginContext);

  // quick check is user is already logged in
  useEffect(()=>{
    console.log(isLoggedIn)
    if(isLoggedIn){
      navigate("/profile")
    }
  },[isLoggedIn])

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullname: "",
    phone: "",
    userType: "player",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
        data.append(key, formData[key]);
    }
    console.log([...data.entries()])
    // check for login
    if (isLogin) {
      try {
        const res = await axios.post("http://localhost:3000/users/login", data, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (res.status == 200) {
          showCustomToast("success","redirecting...")
          setIsLoggedIn(true);
          setTimeout(()=>{navigate("/")},1000)
          
        }
      } catch (err) {
        showCustomToast("error","Error: " + err.response?.data || err.message);
        console.log(err)
      }
    }
    // it means we are signing up !!
    else {
      try {
        const res = await axios.post("http://localhost:3000/users/register", data, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (res.status == 200) {
          showCustomToast("success",res.data+",please login");
          setIsLogin(true);
        }
      } catch (err) {
        console.log(err)
        showCustomToast("error", err.response.data);
        console.log(data)
      }
    }
  };

  const features = [
    {
      icon: Zap,
      title: "AI-Powered Coaching",
      description: "Get personalized training insights and posture analysis",
    },
    {
      icon: Target,
      title: "Digital Identity",
      description:
        "Build your comprehensive sports profile and showcase skills",
    },
    {
      icon: Users,
      title: "Global Community",
      description: "Connect with clubs, athletes, and coaches worldwide",
    },
  ];



  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20"
    >
      <div className="min-h-screen flex">
        {/* this is the notification toast */}

        {/* <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop closeOnClick draggable/> */}
        {/* Left Side - Features */}
        <div
          className={`hidden lg:flex lg:w-1/2 relative overflow-hidden ${
            isDarkMode
              ? "bg-gradient-to-br from-orange-500/20 to-red-600/20"
              : "bg-gradient-to-br from-blue-500/20 to-cyan-400/20"
          }`}
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-64 h-64 border-2 border-current rounded-full animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-48 h-48 border-2 border-current rounded-lg rotate-45 animate-bounce"></div>
          </div>

          <div className="relative z-10 flex flex-col justify-center p-12">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center space-x-3 mb-8">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                    isDarkMode
                      ? "bg-gradient-to-r from-orange-500 to-red-600"
                      : "bg-gradient-to-r from-blue-500 to-cyan-400"
                  }`}
                >
                  <Trophy className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">
                    Sports
                    <span
                      className={
                        isDarkMode ? "text-orange-400" : "text-blue-500"
                      }
                    >
                      Hub
                    </span>
                  </h2>
                  <p
                    className={`text-sm ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Digital Identity & AI Coaching
                  </p>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Welcome to the Future of Sports
              </h1>
              <p
                className={`text-xl mb-12 ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Join thousands of athletes who are already using SportsHub to
                enhance their performance and connect with the global sports
                community.
              </p>

              <div className="space-y-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        isDarkMode ? "bg-white/10" : "bg-black/10"
                      }`}
                    >
                      <feature.icon
                        className={`w-6 h-6 ${
                          isDarkMode ? "text-orange-400" : "text-blue-500"
                        }`}
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2">
                        {feature.title}
                      </h3>
                      <p
                        className={
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        }
                      >
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-md"
          >
            <div
              className={`p-8 rounded-3xl ${
                isDarkMode
                  ? "bg-white/5 backdrop-blur-md border border-white/10"
                  : "bg-black/5 backdrop-blur-md border border-black/10"
              }`}
            >
              {/* Toggle Buttons */}
              <div
                className={`flex p-1 rounded-2xl mb-8 ${
                  isDarkMode ? "bg-white/10" : "bg-black/10"
                }`}
              >
                <button
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all duration-300 ${
                    isLogin
                      ? isDarkMode
                        ? "bg-orange-500 text-white shadow-lg"
                        : "bg-blue-500 text-white shadow-lg"
                      : isDarkMode
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all duration-300 ${
                    !isLogin
                      ? isDarkMode
                        ? "bg-orange-500 text-white shadow-lg"
                        : "bg-blue-500 text-white shadow-lg"
                      : isDarkMode
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Sign Up
                </button>
              </div>

              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">
                  {isLogin ? "Welcome Back!" : "Join SportsHub"}
                </h2>
                <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                  {isLogin
                    ? "Sign in to continue your sports journey"
                    : "Create your account and start your sports journey"}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {!isLogin && (
                  <>
                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          name="fullname"
                          value={formData.fullname}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                            isDarkMode
                              ? "bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-orange-500"
                              : "bg-black/10 border border-black/20 text-gray-900 placeholder-gray-500 focus:border-blue-500"
                          } focus:outline-none`}
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                            isDarkMode
                              ? "bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-orange-500"
                              : "bg-black/10 border border-black/20 text-gray-900 placeholder-gray-500 focus:border-blue-500"
                          } focus:outline-none`}
                          placeholder="Enter your phone number"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        User Type
                      </label>
                      <select
                        name="userType"
                        value={formData.userType}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                          isDarkMode
                            ? "bg-white/10 border border-white/20 text-white focus:border-orange-500"
                            : "bg-black/10 border border-black/20 text-gray-900 focus:border-blue-500"
                        } focus:outline-none`}
                      >
                        <option
                          value="player"
                          className={isDarkMode ? "bg-gray-800" : "bg-white"}
                        >
                          Player
                        </option>
                        <option
                          value="faculty"
                          className={isDarkMode ? "bg-gray-800" : "bg-white"}
                        >
                          Club Faculty
                        </option>
                      </select>
                    </div>
                  </>
                )}

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                        isDarkMode
                          ? "bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-orange-500"
                          : "bg-black/10 border border-black/20 text-gray-900 placeholder-gray-500 focus:border-blue-500"
                      } focus:outline-none`}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-12 py-3 rounded-xl font-medium transition-all duration-300 ${
                        isDarkMode
                          ? "bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-orange-500"
                          : "bg-black/10 border border-black/20 text-gray-900 placeholder-gray-500 focus:border-blue-500"
                      } focus:outline-none`}
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-current transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {!isLogin && (
                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                          isDarkMode
                            ? "bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-orange-500"
                            : "bg-black/10 border border-black/20 text-gray-900 placeholder-gray-500 focus:border-blue-500"
                        } focus:outline-none`}
                        placeholder="Confirm your password"
                        required
                      />
                    </div>
                  </div>
                )}

                {isLogin && (
                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className={`w-4 h-4 rounded border-2 ${
                          isDarkMode
                            ? "border-white/20 text-orange-500 focus:ring-orange-500"
                            : "border-black/20 text-blue-500 focus:ring-blue-500"
                        }`}
                      />
                      <span
                        className={`ml-2 text-sm ${
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        Remember me
                      </span>
                    </label>
                    <Link
                      to="/forgot-password"
                      className={`text-sm font-medium transition-colors ${
                        isDarkMode
                          ? "text-orange-400 hover:text-orange-300"
                          : "text-blue-600 hover:text-blue-500"
                      }`}
                    >
                      Forgot password?
                    </Link>
                  </div>
                )}

                <button
                  type="submit"
                  className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                    isDarkMode
                      ? "bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500"
                      : "bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500"
                  } text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1`}
                >
                  <span>{isLogin ? "Sign In" : "Create Account"}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>

              {!isLogin && (
                <div
                  className={`mt-6 p-4 rounded-xl ${
                    isDarkMode ? "bg-white/5" : "bg-black/5"
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <Shield
                      className={`w-5 h-5 mt-0.5 ${
                        isDarkMode ? "text-green-400" : "text-green-500"
                      }`}
                    />
                    <div>
                      <p
                        className={`text-sm ${
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        By creating an account, you agree to our{" "}
                        <Link
                          to="/terms-and-condition"
                          className={
                            isDarkMode ? "text-orange-400" : "text-blue-600"
                          }
                        >
                          Terms & Conditions
                        </Link>{" "}
                        and{" "}
                        <Link
                          to="/privacy-policy"
                          className={
                            isDarkMode ? "text-orange-400" : "text-blue-600"
                          }
                        >
                          Privacy Policy
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
