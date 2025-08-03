import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import axios from "axios";
import { showCustomToast } from "../helper/CustomToast";
import {
  User,
  Edit3,
  Camera,
  Trophy,
  Target,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Timer,
  Play,
  Star,
  Award,
  TrendingUp,
  Users,
  Settings,
  Contact,
  Shield,
  Heart,
  MessageCircle,
  Share2,
  Plus,
  ChevronRight,
  Zap,
  Brain,
  BarChart3,
} from "lucide-react";
import { ToastContainer } from "react-toastify";

const Profile = ({ isDarkMode, isLoggedIn }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [trainingData, setTrainingData] = useState(null);
  const [userId, setUserId] = useState(null);

  // for navigation
  const navigate = useNavigate();
  // basic check

  useEffect(() => {
    const fetch_data = async () => {
      try {
        console.log("fecthing");
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/profile`, {
          withCredentials: true,
        });
        if (res.status == 200) {
          setUserData(res.data);
          setUserId(res.data._id);
          console.log(res.data);
        } else {
          console.log(res);
        }
      } catch (err) {
        console.log(err);
        showCustomToast("error", err.message + err.response.data);
      }
    };
    const fetch_training_data = async (user_id) => {
      try {
        console.log(user_id);
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/custom-training-plans/user/${user_id}`,{
            withCredentials:true
          }
        );
        if (res.status == 200) {
          console.log(res.data);
          setTrainingData(res.data.trainingPlans);
        }
      } catch (err) {
        console.log("errior in training data", err);
      }
    };
    if (isLoggedIn) {
      if (!userId) {
        fetch_data();
      }
      if (userId) {
        fetch_training_data(userId);
      }
    } else {
      navigate("/login");
    }
  }, [isLoggedIn, userId]);

  async function handel_profile_submit(e){
    const file=e.target.files[0]
    if(!file) return;
    const formData=new FormData();
    formData.append("profilePhoto",file);
    try{
      const res=await axios.put(`${import.meta.env.VITE_BACKEND_URL}/users/profile/photo`,formData,{headers:{"Content-Type":"multipart/form-data"},withCredentials:true});
      if(res.status==200){
        showCustomToast("success",res.data.message);
      }
    }catch(err){
      console.log(err);
    }
  }
  const playerData = {
    name: "Alex Rodriguez",
    username: "@alexrod_sports",
    pronouns: "He/Him",
    bio: "Professional footballer passionate about excellence. Always pushing limits and inspiring others to achieve greatness.",
    location: "Los Angeles, CA",
    joinDate: "March 2023",
    profileImage: userData.profilePhoto,
    coverImage: "/bg-img.jpg",
    sports: ["Football", "Basketball", "Tennis"],
    primarySport: "Football",
    position: "Midfielder",
    currentClub: "Thunder FC",
    phone: "+1 (555) 123-4567",
    email: "alex.rodriguez@email.com",
    followers: 15420,
    following: 892,
    posts: 234,
    aiRating: 92,
    weeklyUsage: 28,
    improvementRate: 23,
  };

  const achievements = [
    {
      id: 1,
      title: "AI Guru Master",
      description: "Used AI Guru for 30 consecutive days",
      icon: Brain,
      color: "text-purple-400",
      date: "2024-01-15",
    },
    {
      id: 2,
      title: "Perfect Posture Week",
      description: "Maintained excellent form for 7 days",
      icon: Target,
      color: "text-green-400",
      date: "2024-01-10",
    },
    {
      id: 3,
      title: "Community Champion",
      description: "Helped 50+ athletes improve",
      icon: Users,
      color: "text-blue-400",
      date: "2024-01-05",
    },
    {
      id: 4,
      title: "Consistency King",
      description: "Posted daily for 2 weeks",
      icon: Calendar,
      color: "text-orange-400",
      date: "2024-01-01",
    },
  ];

  const recentPosts = [
    {
      id: 1,
      type: "highlight",
      content:
        "Just scored the winning goal in today's match! The team played amazingly.",
      image:
        "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=600&q=80",
      likes: 1247,
      comments: 89,
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      type: "training",
      content:
        "Morning training session with AI Guru. Improved my shooting accuracy by 15%!",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80",
      likes: 892,
      comments: 156,
      timestamp: "1 day ago",
    },
  ];

  const stats = [
    { label: "Matches Played", value: "127", icon: Trophy, change: "+12%" },
    { label: "Win Rate", value: "78%", icon: Target, change: "+5%" },
    { label: "Goals Scored", value: "45", icon: Star, change: "+8%" },
    { label: "AI Sessions", value: "89", icon: Brain, change: "+23%" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20"
    >
      <ToastContainer />
      {/* Cover Photo & Profile Header */}
      <div className="relative">
        <div className="h-80 overflow-hidden">
          <img
            src={playerData.coverImage}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-8">
          <div className="max-w-7xl flex lg:ml-5 items-center justify-center sm:justify-start">
            <div className="flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-0 items-center space-y-4 md:space-y-0 md:space-x-6">
              {/* Profile Picture */}
              <div className="relative">
                <img
                  src={playerData.profileImage}
                  alt={playerData.name}
                  className="w-32 h-32 rounded-[50%] border-4 border-white shadow-2xl"
                />
                <form
                  className="absolute bottom-2 right-2"
                  action={`${import.meta.env.VITE_BACKEND_URL}/users/profile/photo`}
                  method="PUT"
                >
                  <label htmlFor="profile_input" className="bg-orange-400">
                    <Camera className="bg-red-400 rounded-[50%] min-w-5 min-h-5 p-1 border border-white"></Camera>
                  </label>
                  <input
                    type="file"
                    id="profile_input"
                    onChange={(e)=>handel_profile_submit(e)}
                    className={`absolute bottom-2 right-2 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      isDarkMode
                        ? "bg-orange-500 hover:bg-orange-400"
                        : "bg-blue-500 hover:bg-blue-400"
                    } text-white hidden`}
                  ></input>
                </form>
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-white">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h1 className="sm:text-4xl text-3xl font-bold mb-2">
                      {userData.fullname}
                    </h1>
                    <p className="sm:text-xl opacity-90 mb-2">
                      {userData.email}
                    </p>
                    <p className="text-lg opacity-75">
                      {playerData.currentClub}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4 mt-4 md:mt-0">
                    {/* <button
                      onClick={() => setIsEditing(!isEditing)}
                      className={`sm:px-6 sm:py-3 px-4 py-2 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 ${
                        isDarkMode
                          ? "bg-orange-500 hover:bg-orange-400"
                          : "bg-blue-500 hover:bg-blue-400"
                      } text-white`}
                    >
                      <Edit3 className="w-5 h-5" />
                      <span>Edit Profile</span>
                    </button>
                    <button className="p-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-colors">
                      <Settings className="w-5 h-5 text-white" />
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="flex space-x-1 flex-wrap mb-8">
          {[
            { id: "overview", label: "Overview", icon: User },
            { id: "training_data", label: "Training plan", icon: BarChart3 },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? isDarkMode
                    ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                    : "bg-blue-500/20 text-blue-600 border border-blue-500/30"
                  : isDarkMode
                  ? "text-gray-400 hover:text-white hover:bg-white/5"
                  : "text-gray-600 hover:text-gray-900 hover:bg-black/5"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {activeTab === "overview" && (
              <>
                {/* Bio Section */}
                <div
                  className={`p-6 rounded-2xl ${
                    isDarkMode
                      ? "bg-white/5 backdrop-blur-md border-white/10"
                      : "bg-black/5 backdrop-blur-md border-black/10"
                  } border`}
                >
                  <h3 className="text-xl font-bold mb-4">About</h3>
                  <p
                    className={`leading-relaxed mb-4 ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {playerData.bio}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {playerData.sports.map((sport) => (
                      <span
                        key={sport}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          sport === playerData.primarySport
                            ? isDarkMode
                              ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                              : "bg-blue-500/20 text-blue-600 border border-blue-500/30"
                            : isDarkMode
                            ? "bg-white/10 text-gray-300"
                            : "bg-black/10 text-gray-700"
                        }`}
                      >
                        {sport}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Recent Posts */}
                <div
                  className={`p-6 rounded-2xl ${
                    isDarkMode
                      ? "bg-white/5 backdrop-blur-md border-white/10"
                      : "bg-black/5 backdrop-blur-md border-black/10"
                  } border`}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold">Recent Posts</h3>
                    <button
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        isDarkMode
                          ? "bg-orange-500/20 text-orange-400 hover:bg-orange-500/30"
                          : "bg-blue-500/20 text-blue-600 hover:bg-blue-500/30"
                      }`}
                    >
                      <Plus className="w-4 h-4" />
                      <span>New Post</span>
                    </button>
                  </div>
                  <div className="space-y-6">
                    {recentPosts.map((post) => (
                      <div
                        key={post.id}
                        className={`p-4 rounded-xl ${
                          isDarkMode ? "bg-white/5" : "bg-black/5"
                        }`}
                      >
                        <div className="flex space-x-4">
                          <img
                            src={post.image}
                            alt="Post"
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <p className="mb-3">{post.content}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4 text-sm">
                                <div className="flex items-center space-x-1">
                                  <Heart className="w-4 h-4 text-red-500" />
                                  <span>{post.likes}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <MessageCircle className="w-4 h-4" />
                                  <span>{post.comments}</span>
                                </div>
                              </div>
                              <span
                                className={`text-sm ${
                                  isDarkMode ? "text-gray-400" : "text-gray-500"
                                }`}
                              >
                                {post.timestamp}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeTab === "stats" && (
              <div className="grid md:grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className={`p-6 rounded-2xl ${
                      isDarkMode
                        ? "bg-white/5 backdrop-blur-md border-white/10"
                        : "bg-black/5 backdrop-blur-md border-black/10"
                    } border`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <stat.icon
                        className={`w-8 h-8 ${
                          isDarkMode ? "text-orange-400" : "text-blue-500"
                        }`}
                      />
                      <span
                        className={`text-sm font-medium px-2 py-1 rounded-full ${
                          stat.change.startsWith("+")
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {stat.change}
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
                    <p
                      className={isDarkMode ? "text-gray-400" : "text-gray-600"}
                    >
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "training_data" &&(
                  <div className="space-y-6">
                    {/* Header Section */}
                    <div className="flex  items-center justify-between mb-6">
                      <div>
                        <h2 className="text-2xl font-bold">Training Plans</h2>
                        <p
                          className={`text-sm ${
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          Your personalized AI-generated training programs
                        </p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span
                          className={`text-sm px-3 py-1 rounded-full ${
                            isDarkMode
                              ? "bg-orange-500/20 text-orange-400"
                              : "bg-blue-500/20 text-blue-600"
                          }`}
                        >
                          {trainingData?.length || 0} Plans
                        </span>
                        
                      </div>
                    </div>

                    {/* Training Plans Grid */}
                    <div className="space-y-4">
                      {trainingData?.map((data, index) => (
                        <motion.div
                          key={data._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`group relative p-2 sm:p-6 rounded-2xl ${
                            isDarkMode
                              ? "bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10"
                              : "bg-black/5 backdrop-blur-md border-black/10 hover:bg-black/10"
                          } border transition-all duration-300 hover:shadow-lg hover:scale-[1.02]`}
                        >
                          {/* Plan Header */}
                          <div className="flex flex-col sm:flex-row flex-wrap items-start justify-between mb-6">
                            <div className="flex-1">
                              <div className="flex  items-center space-x-3 mb-2">
                                <div
                                  className={`p-2 rounded-lg ${
                                    isDarkMode
                                      ? "bg-orange-500/20"
                                      : "bg-blue-500/20"
                                  }`}
                                >
                                  <Target
                                    className={`w-5 h-5 ${
                                      isDarkMode
                                        ? "text-orange-400"
                                        : "text-blue-600"
                                    }`}
                                  />
                                </div>
                                <div>
                                  <h3 className="break-words sm:text-xl font-bold group-hover:text-orange-400 transition-colors mb-2">
                                    {data.planName}
                                  </h3>
                                  <div className="flex items-center space-x-2 text-sm">
                                    <span
                                      className={`px-2 py-1 rounded-full ${
                                        isDarkMode
                                          ? "bg-white/10 text-gray-300"
                                          : "bg-black/10 text-gray-700"
                                      }`}
                                    >
                                      {data.sport}
                                    </span>
                                    <span
                                      className={`px-2 py-1 rounded-full ${
                                        data.difficulty === "Beginner"
                                          ? "bg-green-500/20 text-green-400"
                                          : data.difficulty === "Intermediate"
                                          ? "bg-yellow-500/20 text-yellow-400"
                                          : "bg-red-500/20 text-red-400"
                                      }`}
                                    >
                                      {data.difficulty}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center ml-12 sm:ml-0 space-x-2">
                              <span
                                className={`text-xs px-2 py-1 rounded-full ${
                                  isDarkMode
                                    ? "bg-white/10 text-gray-400"
                                    : "bg-black/10 text-gray-500"
                                }`}
                              >
                                {new Date(data.createdAt).toLocaleDateString()}
                              </span>
                              <button
                                className={`opacity-0 group-hover:opacity-100 p-2 rounded-lg transition-all ${
                                  isDarkMode
                                    ? "hover:bg-white/10"
                                    : "hover:bg-black/10"
                                }`}
                              >
                                <ChevronRight className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          {/* Key Metrics */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                            <div
                              className={`p-3 rounded-xl ${
                                isDarkMode ? "bg-white/5" : "bg-black/5"
                              } text-center`}
                            >
                              <Calendar
                                className={`w-5 h-5 mx-auto mb-1 ${
                                  isDarkMode
                                    ? "text-orange-400"
                                    : "text-blue-600"
                                }`}
                              />
                              <p className="text-sm font-semibold">
                                {data.duration.weeks} Weeks
                              </p>
                              <p
                                className={`text-xs ${
                                  isDarkMode ? "text-gray-400" : "text-gray-600"
                                }`}
                              >
                                Duration
                              </p>
                            </div>
                            <div
                              className={`p-3 rounded-xl ${
                                isDarkMode ? "bg-white/5" : "bg-black/5"
                              } text-center`}
                            >
                              <Zap
                                className={`w-5 h-5 mx-auto mb-1 ${
                                  isDarkMode
                                    ? "text-orange-400"
                                    : "text-blue-600"
                                }`}
                              />
                              <p className="text-sm font-semibold">
                                {data.sessions.sessionsPerWeek}/week
                              </p>
                              <p
                                className={`text-xs ${
                                  isDarkMode ? "text-gray-400" : "text-gray-600"
                                }`}
                              >
                                Sessions
                              </p>
                            </div>
                            <div
                              className={`p-3 rounded-xl ${
                                isDarkMode ? "bg-white/5" : "bg-black/5"
                              } text-center`}
                            >
                              <Timer
                                className={`w-5 h-5 mx-auto mb-1 ${
                                  isDarkMode
                                    ? "text-orange-400"
                                    : "text-blue-600"
                                }`}
                              />
                              <p className="text-sm font-semibold">
                                {data.sessions.sessionDuration}min
                              </p>
                              <p
                                className={`text-xs ${
                                  isDarkMode ? "text-gray-400" : "text-gray-600"
                                }`}
                              >
                                Per Session
                              </p>
                            </div>
                          </div>

                          {/* Goals Section */}
                          <div className="mb-4">
                            <div className="flex items-center space-x-2 mb-3">
                              <Trophy
                                className={`w-4 h-4 ${
                                  isDarkMode
                                    ? "text-orange-400"
                                    : "text-blue-600"
                                }`}
                              />
                              <h4 className="font-semibold">Training Goals</h4>
                            </div>
                            <div className="grid gap-2">
                              {data.goals.slice(0, 2).map((goal, index) => (
                                <div
                                  key={index}
                                  className={`flex items-center space-x-2 p-2 rounded-lg ${
                                    isDarkMode ? "bg-white/5" : "bg-black/5"
                                  }`}
                                >
                                  <div
                                    className={`w-2 h-2 rounded-full ${
                                      isDarkMode
                                        ? "bg-orange-400"
                                        : "bg-blue-600"
                                    }`}
                                  ></div>
                                  <span className="text-sm">{goal}</span>
                                </div>
                              ))}
                              {data.goals.length > 2 && (
                                <span
                                  className={`text-xs ${
                                    isDarkMode
                                      ? "text-gray-400"
                                      : "text-gray-600"
                                  }`}
                                >
                                  +{data.goals.length - 2} more goals
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Focus Areas */}
                          <div className="mb-4">
                            <div className="flex items-center space-x-2 mb-3">
                              <Brain
                                className={`w-4 h-4 ${
                                  isDarkMode
                                    ? "text-orange-400"
                                    : "text-blue-600"
                                }`}
                              />
                              <h4 className="font-semibold">Focus Areas</h4>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {data.focusAreas.map((area, index) => (
                                <span
                                  key={index}
                                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                                    isDarkMode
                                      ? "bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-300 border border-orange-500/30"
                                      : "bg-gradient-to-r from-blue-500/20 to-cyan-400/20 text-blue-700 border border-blue-500/30"
                                  }`}
                                >
                                  {area}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Overview */}
                          {data.generatedPlan?.overview && (
                            <div className="mb-4">
                              <div className="flex items-center space-x-2 mb-2">
                                <BarChart3
                                  className={`w-4 h-4 ${
                                    isDarkMode
                                      ? "text-orange-400"
                                      : "text-blue-600"
                                  }`}
                                />
                                <h4 className="font-semibold">Plan Overview</h4>
                              </div>
                              <p
                                className={`text-sm leading-relaxed ${
                                  isDarkMode ? "text-gray-300" : "text-gray-600"
                                }`}
                              >
                                {data.generatedPlan.overview.length > 150
                                  ? `${data.generatedPlan.overview.substring(
                                      0,
                                      150
                                    )}...`
                                  : data.generatedPlan.overview}
                              </p>
                            </div>
                          )}

                          {/* Custom Notes */}
                          {data.customNotes && (
                            <div className="mb-4">
                              <div className="flex items-center space-x-2 mb-2">
                                <MessageCircle
                                  className={`w-4 h-4 ${
                                    isDarkMode
                                      ? "text-orange-400"
                                      : "text-blue-600"
                                  }`}
                                />
                                <h4 className="font-semibold">
                                  Personal Notes
                                </h4>
                              </div>
                              <div
                                className={`p-3 rounded-lg ${
                                  isDarkMode
                                    ? "bg-white/5 border-l-2 border-orange-500/50"
                                    : "bg-black/5 border-l-2 border-blue-500/50"
                                }`}
                              >
                                <p
                                  className={`text-sm italic ${
                                    isDarkMode
                                      ? "text-gray-300"
                                      : "text-gray-600"
                                  }`}
                                >
                                  "{data.customNotes}"
                                </p>
                              </div>
                            </div>
                          )}

                          {/* Action Buttons */}
                          <div className="flex items-center justify-between pt-4 border-t border-white/10">
                            <div className="flex items-center space-x-4">
                              <button
                                className={`flex items-center space-x-2 px-3 py-1 rounded-lg text-sm transition-colors ${
                                  isDarkMode
                                    ? "text-orange-400 hover:bg-orange-500/20"
                                    : "text-blue-600 hover:bg-blue-500/20"
                                }`}
                                onClick={()=>{navigate("/ai-guru")}}
                              >
                                <Play className="w-4 h-4" />
                                <span>Start Training</span>
                              </button>
                            </div>

                          </div>

                          {/* Progress Indicator (if applicable) */}
                          
                        </motion.div>
                      ))}
                    </div>

                    {/* Empty State */}
                    {(!trainingData || trainingData.length === 0) && (
                      <div
                        className={`text-center py-12 rounded-2xl ${
                          isDarkMode
                            ? "bg-white/5 backdrop-blur-md border-white/10"
                            : "bg-black/5 backdrop-blur-md border-black/10"
                        } border`}
                      >
                        <Target
                          className={`w-12 h-12 mx-auto mb-4 ${
                            isDarkMode ? "text-gray-600" : "text-gray-400"
                          }`}
                        />
                        <h3 className="text-lg font-semibold mb-2">
                          No Training Plans Yet
                        </h3>
                        <p
                          className={`${
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                          } mb-4`}
                        >
                          Create your first AI-powered training plan to get
                          started
                        </p>
                        <button
                          className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 mx-auto ${
                            isDarkMode
                              ? "bg-orange-500 hover:bg-orange-400"
                              : "bg-blue-500 hover:bg-blue-400"
                          } text-white`}
                        >
                          <Plus className="w-5 h-5" />
                          <span>Create Training Plan</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div
              className={`p-6 rounded-2xl ${
                isDarkMode
                  ? "bg-white/5 backdrop-blur-md border-white/10"
                  : "bg-black/5 backdrop-blur-md border-black/10"
              } border`}
            >
              <h3 className="text-lg font-bold mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <span>{playerData.location}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span>{playerData.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span>{playerData.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <span>Joined {playerData.joinDate}</span>
                </div>
              </div>
            </div>

            {/* AI Guru Progress */}
            <div
              className={`p-6 rounded-2xl ${
                isDarkMode
                  ? "bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-500/20"
                  : "bg-gradient-to-r from-blue-500/10 to-cyan-400/10 border-blue-500/20"
              } border`}
            >
              <div className="flex items-center space-x-3 mb-4">
                <Brain
                  className={`w-6 h-6 ${
                    isDarkMode ? "text-orange-400" : "text-blue-500"
                  }`}
                />
                <h3 className="text-lg font-bold">AI Guru Progress</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Weekly Usage</span>
                    <span className="font-bold">{playerData.weeklyUsage}h</span>
                  </div>
                  <div
                    className={`w-full h-2 rounded-full ${
                      isDarkMode ? "bg-white/10" : "bg-black/10"
                    }`}
                  >
                    <div
                      className={`h-full rounded-full ${
                        isDarkMode
                          ? "bg-gradient-to-r from-orange-400 to-red-500"
                          : "bg-gradient-to-r from-blue-500 to-cyan-400"
                      }`}
                      style={{
                        width: `${(playerData.weeklyUsage / 40) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Improvement Rate</span>
                    <span className="font-bold text-green-400">
                      +{playerData.improvementRate}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div
              className={`p-6 rounded-2xl ${
                isDarkMode
                  ? "bg-white/5 backdrop-blur-md border-white/10"
                  : "bg-black/5 backdrop-blur-md border-black/10"
              } border`}
            >
              <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                    isDarkMode ? "hover:bg-white/10" : "hover:bg-black/10"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Zap className="w-5 h-5" />
                    <span>Start AI Session</span>
                  </div>
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                    isDarkMode ? "hover:bg-white/10" : "hover:bg-black/10"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5" />
                    <span>Find Clubs</span>
                  </div>
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                    isDarkMode ? "hover:bg-white/10" : "hover:bg-black/10"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5" />
                    <span>Privacy Settings</span>
                  </div>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
