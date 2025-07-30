import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Brain, Camera, Target, TrendingUp, MessageCircle, Upload, Zap, Award,
  BarChart3, Send, Image, Video, Star, CheckCircle, ArrowRight, Sun, Moon,
  User, X, Loader2, AlertCircle, Settings, ChevronLeft
} from 'lucide-react';
import { getAIGuruResponse, analyzePosture as analyzePostureService } from '../services/aiGuruService';
import { generateTrainingPlan } from '../services/trainingPlanService';
import { renderMarkdown } from '../utils/markdownRenderer';
import TrainingPlanModal from './TrainingPlanModal';
import CustomTrainingPlanCreator from './CustomTrainingPlanCreator';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import * as poseDetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl'; 

const AIGuru = ({ isDarkMode = true }) => {
  const [activeTab, setActiveTab] = useState('chat');
  const [chatMessage, setChatMessage] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedPreview, setUploadedPreview] = useState(null);
  const [mediaType, setMediaType] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [chatHistory, setChatHistory] = useState([
    {
      type: 'ai',
      role: 'assistant',
      text: "**🎯 Welcome to AI Guru!** 👋\n\nHey there! I'm your personal sports coach ready to help you excel! Whether you want to improve your technique, learn new strategies, or get training advice, I'm here to guide you every step of the way.\n\n**💪 What I can help you with:**\n• Training techniques and strategies\n• Performance improvement tips\n• Nutrition and fitness advice\n• Sport-specific coaching\n• Advanced posture analysis\n\n**🚀 Ready to get started?** What sport or skill would you like to work on today?",
      message: "**🎯 Welcome to AI Guru!** 👋\n\nHey there! I'm your personal sports coach ready to help you excel! Whether you want to improve your technique, learn new strategies, or get training advice, I'm here to guide you every step of the way.\n\n**💪 What I can help you with:**\n• Training techniques and strategies\n• Performance improvement tips\n• Nutrition and fitness advice\n• Sport-specific coaching\n• Advanced posture analysis\n\n**🚀 Ready to get started?** What sport or skill would you like to work on today?",
      time: 'Just now'
    }
  ]);

  // Posture Analysis State
  const [userProfile, setUserProfile] = useState({
    name: '',
    age: '',
    height: '',
    weight: '',
    sport: 'cricket',
    goal: '',
    roleModel: ''
  });
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [customAlertMessage, setCustomAlertMessage] = useState(null);
  const [poseDetector, setPoseDetector] = useState(null);
  const [detectorLoading, setDetectorLoading] = useState(true);
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);
  const chatRef = useRef(null);
  const postureRef = useRef(null);
  const trainingRef = useRef(null);

  // Training Plan Modal State
  const [showTrainingPlanModal, setShowTrainingPlanModal] = useState(false);
  const [currentTrainingPlan, setCurrentTrainingPlan] = useState(null);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [showCustomPlanCreator, setShowCustomPlanCreator] = useState(false);

  // Mock user details - in a real app, this would come from user profile
  const userDetails = {
    name: 'Athlete',
    age: 25,
    sex: 'Male',
    height: 175,
    weight: 70,
    sport: 'Football',
    details: 'Looking to improve shooting accuracy and overall performance',
    language: 'en-IN'
  };

  // --- Initialize Pose Detector ---
  useEffect(() => {
    const loadDetector = async () => {
      setDetectorLoading(true);
      try {
        // Set up TensorFlow.js backend
        await tf.setBackend('webgl');
        await tf.ready();

        // Load the MoveNet model
        const detectorConfig = { modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER };
        const detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, detectorConfig);
        setPoseDetector(detector);
        console.log('MediaPipe Pose Detector loaded successfully.');
      } catch (error) {
        console.error('Failed to load MediaPipe Pose Detector:', error);
        showCustomAlert('Failed to load posture analysis model. Please try again or check your internet connection.');
      } finally {
        setDetectorLoading(false);
      }
    };
    loadDetector();
  }, []);

  // Handle profile changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setUserProfile(prev => ({ ...prev, [name]: value }));
  };

  // Custom Alert/Message Box Function
  const showCustomAlert = (message) => {
    setCustomAlertMessage(message);
    setTimeout(() => setCustomAlertMessage(null), 5000);
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Validate form
  const isFormValid = () => {
    return userProfile.name && userProfile.age && userProfile.height &&
      userProfile.weight && userProfile.sport && videoFile;
  };

  // Debug function to test MediaPipe fixes - moved up before it's referenced
  const handleDebugTest = async () => {
    console.log('🧪 MediaPipe debug test disabled - posture correction logic commented out');
    
    const debugMessage = `**🧪 MediaPipe Debug Test**\n\n⚠️ **Feature Temporarily Disabled**\n\nThe MediaPipe pose detection system is currently disabled. Only UI/UX components are active for testing purposes.\n\n**Available Features:**\n• ✅ AI Chat functionality\n• ✅ Training plans display\n• ❌ Posture analysis (UI only)`;
    
    setChatHistory(prev => [
      ...prev,
      {
        type: 'ai',
        role: 'assistant',
        text: debugMessage,
        message: debugMessage,
        time: 'Just now'
      }
    ]);

    // Original logic commented out:
    /*
    try {
      // Test MediaPipe support
      const supportTest = await testMediaPipeSupport();
      
      // Run quick pose test
      const poseTest = await runQuickPoseTest();
      
      const resultMessage = `**🧪 MediaPipe Debug Results**\n\n**System Support:**\n• WebGL: ${supportTest.webglSupport ? '✅ Supported' : '❌ Not supported'}\n• MediaPipe Import: ${supportTest.mediaPipeImport ? '✅ Success' : '❌ Failed'}\n• Pose Creation: ${supportTest.poseCreation ? '✅ Success' : '❌ Failed'}\n\n**Pose Detection Test:**\n• Test Status: ${poseTest.success ? '✅ Success' : '❌ Failed'}\n• Analysis Mode: ${poseTest.analysisMode || 'N/A'}\n• Detection: ${poseTest.detected ? '✅ Detected' : '❌ Not detected'}\n• Confidence: ${poseTest.confidence || 'N/A'}\n\n${supportTest.errors.length > 0 ? `**Errors:**\n${supportTest.errors.map(err => `• ${err}`).join('\n')}\n\n` : ''}${poseTest.error ? `**Test Error:** ${poseTest.error}\n\n` : ''}**Status:** ${poseTest.success && supportTest.webglSupport ? '🎉 MediaPipe is working correctly!' : '⚠️ Some issues detected - but visual analysis will still work!'}`;
      
      setChatHistory(prev => [
        ...prev.slice(0, -1), // Remove progress message
        {
          type: 'ai',
          role: 'assistant',
          text: resultMessage,
          message: resultMessage,
          time: 'Just now'
        }
      ]);
    } catch (error) {
      const errorMessage = `**🧪 Debug Test Error**\n\nTest failed: ${error.message}\n\nThis indicates there may be issues with MediaPipe, but the visual analysis fallback should still work.`;
      setChatHistory(prev => [
        ...prev.slice(0, -1), // Remove progress message
        {
          type: 'ai',
          role: 'assistant',
          text: errorMessage,
          message: errorMessage,
          time: 'Just now'
        }
      ]);
    }
    */
  };

  const features = [
    {
      icon: MessageCircle,
      title: 'AI Sports Coach',
      description: 'Ask about techniques, strategies, or training methods',
      color: isDarkMode ? 'from-orange-500 to-red-400' : 'from-orange-600 to-red-500',
      ref: chatRef,
      tab: 'chat'
    },
    {
      icon: Camera,
      title: 'Posture Analysis',
      description: 'Upload videos for AI-powered technique correction',
      color: isDarkMode ? 'from-red-500 to-orange-400' : 'from-red-600 to-orange-500',
      ref: postureRef,
      tab: 'posture'
    },
    {
      icon: TrendingUp,
      title: 'Training Plans',
      description: 'Get personalized training plans based on your sport and goals',
      color: isDarkMode ? 'from-amber-500 to-yellow-400' : 'from-amber-600 to-yellow-500',
      ref: trainingRef,
      tab: 'training'
    }
  ];


  const sampleQuestions = [
    "How can I improve my football shooting accuracy?",
    "What's the best training routine for basketball?",
    "How do I perfect my tennis serve technique?",
    "Give me a nutrition plan for endurance sports"
  ];

  const trainingPlans = [
    {
      title: 'Beginner Football Training',
      duration: '4 weeks',
      sessions: 12,
      difficulty: 'Beginner',
      focus: 'Ball Control & Basic Skills',
      color: 'from-green-500 to-blue-500'
    },
    {
      title: 'Advanced Basketball Drills',
      duration: '6 weeks',
      sessions: 18,
      difficulty: 'Advanced',
      focus: 'Shooting & Agility',
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'Cricket Batting Technique',
      duration: '8 weeks',
      sessions: 24,
      difficulty: 'Intermediate',
      focus: 'Technique & Timing',
      color: 'from-blue-500 to-purple-500'
    },
    {
      title: 'Tennis Serve Mastery',
      duration: '5 weeks',
      sessions: 15,
      difficulty: 'Intermediate',
      focus: 'Power & Precision',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Swimming Stroke Technique',
      duration: '6 weeks',
      sessions: 18,
      difficulty: 'Beginner',
      focus: 'Freestyle & Backstroke',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      title: 'Athletic Conditioning',
      duration: '8 weeks',
      sessions: 24,
      difficulty: 'Advanced',
      focus: 'Strength & Endurance',
      color: 'from-red-500 to-orange-500'
    }
  ];

  // Handle file upload for posture analysis
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ['video/mp4', 'video/webm', 'video/ogg', 'image/jpeg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      showCustomAlert('Please select a valid video or image file.');
      return;
    }

    if (file.size > 100 * 1024 * 1024) { // 100MB
      showCustomAlert('File size must be less than 100MB.');
      return;
    }

    setVideoFile(file);
    setMediaType(file.type.startsWith('video/') ? 'video' : 'image');

    const previewUrl = URL.createObjectURL(file);
    setVideoPreview(previewUrl);

    // Reset previous results
    setAnalysisResults(null);
  };

  // Clear uploaded file
  const clearFile = () => {
    setVideoFile(null);
    setVideoPreview(null);
    setMediaType(null);
    setAnalysisResults(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (videoPreview) {
      URL.revokeObjectURL(videoPreview);
    }
  };

  // Legacy media upload handler for backward compatibility
  const handleMediaUpload = async (event) => {
    handleFileUpload(event);
  };

  // Analyze posture by detecting pose landmarks and sending to backend
  const analyzePosture = async () => {
    if (!isFormValid()) {
      showCustomAlert('Please fill in all required profile fields and upload a file.');
      return;
    }
    if (!poseDetector) {
      showCustomAlert('Pose detection model is still loading or failed to load. Please wait or refresh.');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResults(null);

    try {
      let poses = [];
      if (mediaType === 'video') {
        const videoElement = videoRef.current;
        if (!videoElement) {
          throw new Error("Video element not found for pose detection.");
        }

        await new Promise(resolve => {
          if (videoElement.readyState >= 2) {
            resolve();
          } else {
            videoElement.addEventListener('loadeddata', resolve, { once: true });
          }
        });

        const middleTime = videoElement.duration / 2;
        videoElement.currentTime = middleTime;

        await new Promise(resolve => {
          videoElement.addEventListener('seeked', resolve, { once: true });
        });

        try {
          const detectedPoses = await poseDetector.estimatePoses(videoElement);
          if (detectedPoses.length > 0) {
            poses.push(detectedPoses[0]);
          } else {
            showCustomAlert('No human pose detected in the video. Please ensure the person is clearly visible.');
            setIsAnalyzing(false);
            return;
          }
        } catch (error) {
          if (error.name === 'AbortError') {
            console.warn('MediaPipe Pose Detection Warning: Video play/seek interrupted, but still attempting to process frame.', error);
            showCustomAlert('Pose detection faced a minor issue (video playback interrupted). Please ensure video is stable.');
            setIsAnalyzing(false);
            return;
          }
          throw error;
        }

      } else { // mediaType === 'image'
        const imageElement = videoRef.current;
        if (!imageElement) {
          throw new Error("Image element not found for pose detection.");
        }
        const detectedPoses = await poseDetector.estimatePoses(imageElement);
        if (detectedPoses.length > 0) {
          poses.push(detectedPoses[0]);
        } else {
          showCustomAlert('No human pose detected in the image. Please ensure the person is clearly visible.');
          setIsAnalyzing(false);
          return;
        }
      }

      if (poses.length === 0) {
        showCustomAlert('Could not detect a clear human pose for analysis. Please try a different media file.');
        setIsAnalyzing(false);
        return;
      }

      // Extract relevant landmark data
      const landmarksToSend = poses[0].keypoints.map(kp => ({
        name: kp.name,
        x: kp.x,
        y: kp.y,
        z: kp.z,
        score: kp.score
      }));

      console.log('MediaPipe Pose Landmarks (sent to backend):', landmarksToSend);

      // Send landmark data and profile to backend
      const analysis = await analyzePostureService({
        profile: userProfile,
        mediaType: mediaType,
        landmarks: landmarksToSend,
      });
      setAnalysisResults(analysis);

      // Add analysis to chat history with enhanced formatting
      const analysisMessage = formatAnalysisForChat(analysis);
      setChatHistory(prev => [
        ...prev,
        {
          type: 'ai',
          role: 'assistant',
          text: analysisMessage,
          message: analysisMessage,
          time: 'Just now'
        }
      ]);

    } catch (error) {
      console.error('Analysis error:', error);
      showCustomAlert(`Analysis failed: ${error.message}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Legacy handler for backward compatibility
  const handlePostureAnalysis = () => {
    analyzePosture();
  };

  const formatAnalysisForChat = (analysis) => {
    const { overallScore, assessment, metrics, recommendations, safetyNotes } = analysis;
    
    // Handle both old and new metric formats
    let metricsText = '**📊 Key Metrics:**\n';
    
    if (metrics) {
      // Check if it's the new enhanced format
      if (metrics.posturalAlignment) {
        // New format with 8 enhanced metrics
        const metricNames = {
          posturalAlignment: 'Postural Alignment',
          jointStability: 'Joint Stability',
          movementEfficiency: 'Movement Efficiency',
          sportSpecificForm: 'Sport-Specific Form',
          balanceControl: 'Balance & Control',
          powerGeneration: 'Power Generation',
          flexibilityRange: 'Flexibility & Range',
          injuryRisk: 'Injury Risk Assessment'
        };
        
        Object.entries(metrics).forEach(([key, metric]) => {
          const name = metricNames[key] || key.replace(/([A-Z])/g, ' $1').trim();
          metricsText += `• **${name}**: ${metric.score}/10 - ${metric.notes}\n`;
        });
      } else {
        // Legacy format
        const legacyKeys = ['balance', 'posture', 'movement', 'technique'];
        legacyKeys.forEach(key => {
          if (metrics[key]) {
            metricsText += `• **${key.charAt(0).toUpperCase() + key.slice(1)}**: ${metrics[key].score}/10 - ${metrics[key].notes}\n`;
          }
        });
      }
    } else {
      metricsText += '• Analysis completed with comprehensive assessment\n';
    }
    
    let recommendationsText = '**💪 Recommendations:**\n';
    if (recommendations && Array.isArray(recommendations) && recommendations.length > 0) {
      recommendationsText += recommendations.map((rec, i) => `${i + 1}. ${rec}`).join('\n');
    } else {
      recommendationsText += 'Continue practicing your current technique with focus on consistency';
    }
    
    const safetyText = safetyNotes || 'No specific safety concerns identified';
    
    return `**🎯 Posture Analysis Complete!**\n\n**Overall Score: ${overallScore || 'N/A'}/10**\n\n${assessment || 'Comprehensive analysis completed'}\n\n${metricsText}\n${recommendationsText}\n\n**⚠️ Safety Notes:**\n${safetyText}`;
  };

  // Enhanced error handling function
  const handleAIError = (error, context = '') => {
    console.error(`🎯 AIGuru Error${context ? ` (${context})` : ''}:`, error);
    
    // Log additional details for debugging
    if (error.response) {
      console.error('🎯 Response Data:', error.response.data);
      console.error('🎯 Response Status:', error.response.status);
      console.error('🎯 Response Headers:', error.response.headers);
    } else if (error.request) {
      console.error('🎯 Request:', error.request);
      console.error('🎯 No response received');
    } else {
      console.error('🎯 Error Message:', error.message);
    }
    console.error('🎯 Config:', error.config);
    
    // Determine error type and return appropriate message
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      return "Request timed out. Please check your internet connection and try again.";
    }
    
    if (error.response) {
      switch (error.response.status) {
        case 429:
          return "Rate limit exceeded. Please wait a moment and try again.";
        case 500:
          return "Server error. Our team has been notified. Please try again later.";
        case 503:
          return "Service unavailable. We're performing maintenance. Please check back soon.";
        default:
          return `API error (${error.response.status}). Please try again.`;
      }
    }
    
    if (error.message.includes('Network Error')) {
      return "Network error. Please check your internet connection.";
    }
    
    return "I'm having trouble connecting right now. Please try again in a moment.";
  };

  const handleSendMessage = async () => {
    if (!chatMessage.trim() || isLoading) return;
    
    // Add user message to chat
    const userMessage = {
      type: 'user',
      role: 'user',
      text: chatMessage,
      message: chatMessage,
      time: 'Just now'
    };
    
    const newChat = [...chatHistory, userMessage];
    setChatHistory(newChat);
    setChatMessage('');
    setIsLoading(true);
    
    try {
      console.log('🎯 AIGuru: Starting API call...');
      console.log('🎯 AIGuru: User details:', userDetails);
      console.log('🎯 AIGuru: Chat data:', newChat);
      
      // Call the actual Gemini API
      const response = await getAIGuruResponse({
        chat: newChat,
        userDetails: userDetails
      });
      
      console.log('🎯 AIGuru: Got response:', response);
      
      // Add AI response to chat
      setChatHistory([
        ...newChat,
        {
          type: 'ai',
          role: 'assistant',
          text: response,
          message: response,
          time: 'Just now'
        }
      ]);
    } catch (error) {
      const errorMessage = handleAIError(error, 'main chat');
      setChatHistory([
        ...newChat,
        {
          type: 'ai',
          role: 'assistant',
          text: errorMessage,
          message: errorMessage,
          time: 'Just now'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle training plan generation
  const handleShowTrainingPlan = async (plan) => {
    setShowTrainingPlanModal(true);
    setIsGeneratingPlan(true);
    setCurrentTrainingPlan(null);

    try {
      console.log('🎯 Generating training plan for:', plan);
      
      // Extract sport from plan title (e.g., "Beginner Football Training" -> "Football")
      const sportMatch = plan.title.match(/\b(Football|Basketball|Cricket|Tennis|Swimming|Athletic)\b/i);
      const sport = sportMatch ? sportMatch[1] : plan.title.split(' ')[1] || 'General';
      
      const trainingPlan = await generateTrainingPlan({
        userInfo: {
          name: userDetails.name,
          age: userDetails.age,
          details: userDetails.details
        },
        sport: sport,
        difficulty: plan.difficulty,
        duration: plan.duration,
        sessions: plan.sessions
      });

      setCurrentTrainingPlan(trainingPlan);
    } catch (error) {
      console.error('Failed to generate training plan:', error);
      // Show error in modal or close it
      setCurrentTrainingPlan({
        planTitle: `${plan.title} - Error`,
        overview: 'Failed to generate training plan. Please try again later.',
        error: true
      });
    } finally {
      setIsGeneratingPlan(false);
    }
  };

  return (
    <div className={`min-h-screen pt-20 ${isDarkMode ? 'bg-transparent text-white' : 'bg-gray-50 text-gray-900'}`}>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className={`absolute top-20 left-20 w-64 h-64 rounded-full blur-3xl animate-pulse ${isDarkMode ? 'bg-orange-500' : 'bg-orange-500'}`}></div>
          <div className={`absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl animate-pulse delay-1000 ${isDarkMode ? 'bg-red-500' : 'bg-amber-500'}`}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center mb-6">
              <div className={`w-20 h-20 rounded-3xl flex items-center justify-center ${
                isDarkMode
                  ? 'bg-gradient-to-r from-orange-500 to-red-600'
                  : 'bg-gradient-to-r from-orange-500 to-red-600'
              }`}>
                <Brain className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              AI <span className={`${
                isDarkMode
                  ? 'bg-gradient-to-r from-orange-400 to-red-500'
                  : 'bg-gradient-to-r from-orange-500 to-red-600'
              } bg-clip-text text-transparent`}>Guru</span>
            </h1>
            <p className={`text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Your personal AI sports coach for peak performance through intelligent guidance and analysis
            </p>
          </motion.div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div key={index} className="group relative" onClick={() => {
                setActiveTab(feature.tab);
                feature.ref.current?.scrollIntoView({ behavior: 'smooth' });
              }}>
                <div className={`overflow-hidden rounded-3xl p-8 border transition-all duration-300 h-full cursor-pointer ${
                  isDarkMode
                    ? 'bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10'
                    : 'bg-black/5 backdrop-blur-md border-black/10 hover:bg-black/10'
                }`}>
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive AI Interface */}
      <section className="py-20" ref={chatRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`overflow-hidden rounded-3xl border ${
            isDarkMode 
              ? 'bg-white/5 backdrop-blur-md border-white/10' 
              : 'bg-black/5 backdrop-blur-md border-black/10'
          }`}>
            {/* Tab Navigation */}
            <div className="flex border-b border-current/10">
              {[
                { id: 'chat', label: 'AI Coach Chat', icon: MessageCircle },
                { id: 'posture', label: 'Posture Analysis', icon: Camera },
                { id: 'training', label: 'Training Plans', icon: Award }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-6 px-4 transition-all duration-300 ${
                    activeTab === tab.id
                      ? isDarkMode
                        ? 'bg-orange-500/20 text-orange-400 border-b-2 border-orange-400'
                        : 'bg-orange-500/20 text-orange-600 border-b-2 border-orange-500'
                      : isDarkMode
                        ? 'text-gray-400 hover:text-white hover:bg-white/5'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-black/5'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-medium hidden sm:block">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-8">
              {activeTab === 'chat' && (
                <div className="space-y-6 min-h-[600px]">
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold mb-4">Ask Your AI Sports Coach</h3>
                    <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                      Get instant answers to sports-related questions
                    </p>
                  </div>

                  {/* Chat History */}
                  <div className={`h-[600px] overflow-y-auto p-6 rounded-2xl mb-6 ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
                    <div className="space-y-4">
                      {chatHistory.map((chat, index) => (
                        <div key={index} className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-4xl p-6 rounded-2xl relative ${
                            chat.type === 'user'
                              ? isDarkMode
                                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg border-2 border-orange-400/50'
                                : 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg border-2 border-orange-500/50'
                              : isDarkMode
                                ? 'bg-white/10 text-white'
                                : 'bg-black/10 text-gray-900'
                          }`}>
                            {chat.type === 'user' && (
                              <div className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full">
                                ❓ QUESTION
                              </div>
                            )}
                            {chat.type === 'user' ? (
                              <div>
                                <div className="flex items-center space-x-2 mb-2">
                                  <span className="text-yellow-200 font-semibold text-sm">🎯 Your Question:</span>
                                </div>
                                <p className="whitespace-pre-line text-base leading-relaxed font-medium">{chat.message}</p>
                              </div>
                            ) : (
                              <div className="text-base leading-relaxed">
                                {renderMarkdown(chat.message, isDarkMode)}
                              </div>
                            )}
                            <span className={`text-xs mt-3 block ${
                              chat.type === 'user' ? 'text-white/70' : isDarkMode ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                              {chat.time}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Example Questions */}
                  <div className="mb-6">
                    <div className="text-center mb-4">
                      <h4 className="text-lg font-semibold mb-2">Try These Sample Questions</h4>
                      <p className={`text-sm ${isDarkMode ? 'text-yellow-400' : 'text-orange-600'} font-medium`}>
                        💡 AI Guru will answer about the specific sport mentioned in your question, regardless of your profile sport
                      </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                      {sampleQuestions.map((question, index) => (
                        <button
                          key={index}
                          onClick={async () => {
                            if (isLoading) return;
                            
                            setChatMessage(question);
                            // Auto-send the question
                            const userMessage = {
                              type: 'user',
                              role: 'user',
                              text: question,
                              message: question,
                              time: 'Just now'
                            };
                            
                            const newChat = [...chatHistory, userMessage];
                            setChatHistory(newChat);
                            setChatMessage('');
                            setIsLoading(true);
                            
                            try {
                              console.log('🎯 AIGuru (sample): Starting API call...');
                              
                              // Call the actual Gemini API
                              const response = await getAIGuruResponse({
                                chat: newChat,
                                userDetails: userDetails
                              });
                              
                              console.log('🎯 AIGuru (sample): Got response:', response);
                              
                              // Add AI response to chat
                              setChatHistory([
                                ...newChat,
                                {
                                  type: 'ai',
                                  role: 'assistant',
                                  text: response,
                                  message: response,
                                  time: 'Just now'
                                }
                              ]);
                            } catch (error) {
                              const errorMessage = handleAIError(error, 'sample question');
                              setChatHistory([
                                ...newChat,
                                {
                                  type: 'ai',
                                  role: 'assistant',
                                  text: errorMessage,
                                  message: errorMessage,
                                  time: 'Just now'
                                }
                              ]);
                            } finally {
                              setIsLoading(false);
                            }
                          }}
                          className={`text-left p-4 rounded-xl border transition-all duration-300 group hover:scale-[1.02] relative ${
                            isDarkMode
                              ? 'bg-white/5 border-white/10 hover:bg-orange-500/10 hover:border-orange-500/30'
                              : 'bg-black/5 border-black/10 hover:bg-orange-500/10 hover:border-orange-500/30'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-orange-400' : 'bg-orange-500'}`}></div>
                            <p className={`group-hover:text-current transition-colors text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                              {question}
                            </p>
                          </div>
                          {/* Sport indicator */}
                          <div className="absolute top-2 right-2">
                            {question.includes('football') && <span className="text-xs">⚽</span>}
                            {question.includes('basketball') && <span className="text-xs">🏀</span>}
                            {question.includes('tennis') && <span className="text-xs">🎾</span>}
                            {question.includes('nutrition') && <span className="text-xs">🥗</span>}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Debug Test Button */}
                  {/* <div className="mb-6">
                    <div className="text-center mb-3">
                      <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        Debug Tools
                      </span>
                    </div>
                    <div className="flex justify-center">
                      <button
                        onClick={handleDebugTest}
                        disabled={isLoading}
                        className={`px-4 py-2 rounded-lg border transition-all duration-300 group hover:scale-[1.02] ${
                          isDarkMode
                            ? 'bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20 text-blue-400'
                            : 'bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20 text-blue-600'
                        } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">🧪</span>
                          <span className="text-sm font-medium">Test MediaPipe System</span>
                        </div>
                      </button>
                    </div>
                  </div> */}

                  {/* Chat Input */}
                  <div className="flex space-x-4">
                    <input
                      type="text"
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      placeholder="Ask about ANY sport - basketball, tennis, football, etc. I'll answer based on your question!"
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      className={`flex-1 px-6 py-4 rounded-2xl font-medium transition-all duration-300 ${
                        isDarkMode
                          ? 'bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-orange-500'
                          : 'bg-black/10 border border-black/20 text-gray-900 placeholder-gray-500 focus:border-orange-500'
                      } focus:outline-none`}
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={isLoading || !chatMessage.trim()}
                      className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center space-x-2 ${
                        isLoading || !chatMessage.trim()
                          ? isDarkMode
                            ? 'bg-gray-600 cursor-not-allowed'
                            : 'bg-gray-400 cursor-not-allowed'
                          : isDarkMode
                            ? 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500'
                            : 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700'
                      } text-white shadow-lg hover:shadow-xl`}
                    >
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Thinking...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Ask AI</span>
                        </>
                      )}
                    </button>
                  </div>
                  <br />

                  {/* Chat History Section */}
                  {chatHistory.filter(chat => chat.type === 'user').length > 0 && (
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className={`rounded-2xl p-6 border ${
                        isDarkMode ? 'bg-blue-900/20 border-blue-500/30' : 'bg-blue-100 border-blue-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3 mb-4">
                        <MessageCircle className={`w-6 h-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                        <h3 className="text-xl font-bold">Recent Questions Asked</h3>
                      </div>
                      <p className={`text-sm mb-4 ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                        Here are the questions you've asked in the AI Chat. This context helps provide better posture analysis.
                      </p>
                      <div className="space-y-3">
                        {chatHistory
                          .filter(chat => chat.type === 'user')
                          .slice(-5) // Show last 5 questions
                          .map((chat, index) => (
                            <div key={index} className={`p-3 rounded-lg ${
                              isDarkMode ? 'bg-white/10' : 'bg-white/70'
                            }`}>
                              <div className="flex items-start space-x-3">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0 ${
                                  isDarkMode ? 'bg-blue-500 text-white' : 'bg-blue-600 text-white'
                                }`}>
                                  Q{index + 1}
                                </div>
                                <div className="flex-1">
                                  <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                    {chat.message}
                                  </p>
                                  <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    {chat.time}
                                  </span>
                                </div>
                                {/* Sport detection */}
                                <div className="flex-shrink-0">
                                  {chat.message.toLowerCase().includes('basketball') && <span className="text-lg">🏀</span>}
                                  {chat.message.toLowerCase().includes('football') && <span className="text-lg">⚽</span>}
                                  {chat.message.toLowerCase().includes('tennis') && <span className="text-lg">🎾</span>}
                                  {chat.message.toLowerCase().includes('cricket') && <span className="text-lg">🏏</span>}
                                  {chat.message.toLowerCase().includes('nutrition') && <span className="text-lg">🥗</span>}
                                  {chat.message.toLowerCase().includes('swimming') && <span className="text-lg">🏊</span>}
                                  {chat.message.toLowerCase().includes('golf') && <span className="text-lg">⛳</span>}
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                      {chatHistory.filter(chat => chat.type === 'user').length > 5 && (
                        <p className={`text-xs mt-3 text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          Showing last 5 questions. Switch to AI Chat tab to see full history.
                        </p>
                      )}
                    </motion.div>
                  )}
                  
                </div>
              )}

              {activeTab === 'posture' && (
                <div className="space-y-8 min-h-[600px]" ref={postureRef}>
                  {/* Custom Alert Message */}
                  {customAlertMessage && (
                    <motion.div
                      initial={{ y: -50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -50, opacity: 0 }}
                      className="fixed top-4 left-1/2 -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg z-50"
                    >
                      {customAlertMessage}
                    </motion.div>
                  )}

                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold mb-4">AI Posture Analysis</h3>
                    <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                      Advanced technique analysis using MediaPipe Pose and AI-powered insights
                    </p>
                  </div>

                  {/* Profile Section */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className={`rounded-2xl p-6 border ${
                      isDarkMode ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
                    }`}
                  >
                    <div className="flex items-center space-x-3 mb-6">
                      <User className={`w-6 h-6 ${isDarkMode ? 'text-orange-400' : 'text-orange-500'}`} />
                      <h3 className="text-2xl font-bold">Athlete Profile</h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={userProfile.name}
                            onChange={handleProfileChange}
                            className={`w-full px-4 py-3 rounded-xl border transition-colors ${
                              isDarkMode
                                ? 'bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-orange-500'
                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-orange-500'
                            } focus:outline-none`}
                            placeholder="Your name"
                            required
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              Age *
                            </label>
                            <input
                              type="number"
                              name="age"
                              value={userProfile.age}
                              onChange={handleProfileChange}
                              min="5"
                              max="100"
                              className={`w-full px-4 py-3 rounded-xl border transition-colors ${
                                isDarkMode
                                  ? 'bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-orange-500'
                                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-orange-500'
                              } focus:outline-none`}
                              placeholder="25"
                              required
                            />
                          </div>

                          <div>
                            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              Sport *
                            </label>
                            <select
                              name="sport"
                              value={userProfile.sport}
                              onChange={handleProfileChange}
                              className={`w-full px-4 py-3 rounded-xl border transition-colors ${
                                isDarkMode
                                  ? 'bg-white/10 border-white/20 text-white focus:border-orange-500'
                                  : 'bg-white border-gray-300 text-gray-900 focus:border-orange-500'
                              } focus:outline-none`}
                              style={{
                                color: isDarkMode ? 'white' : 'black'
                              }}
                              required
                            >
                              <option value="cricket" style={{ color: 'black' }}>Cricket</option>
                              <option value="tennis" style={{ color: 'black' }}>Tennis</option>
                              <option value="basketball" style={{ color: 'black' }}>Basketball</option>
                              <option value="soccer" style={{ color: 'black' }}>Soccer</option>
                              <option value="golf" style={{ color: 'black' }}>Golf</option>
                              <option value="baseball" style={{ color: 'black' }}>Baseball</option>
                              <option value="swimming" style={{ color: 'black' }}>Swimming</option>
                              <option value="athletics" style={{ color: 'black' }}>Athletics</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              Height (cm) *
                            </label>
                            <input
                              type="number"
                              name="height"
                              value={userProfile.height}
                              onChange={handleProfileChange}
                              min="50"
                              max="250"
                              className={`w-full px-4 py-3 rounded-xl border transition-colors ${
                                isDarkMode
                                  ? 'bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-orange-500'
                                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-orange-500'
                              } focus:outline-none`}
                              placeholder="175"
                              required
                            />
                          </div>

                          <div>
                            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              Weight (kg) *
                            </label>
                            <input
                              type="number"
                              name="weight"
                              value={userProfile.weight}
                              onChange={handleProfileChange}
                              min="20"
                              max="200"
                              className={`w-full px-4 py-3 rounded-xl border transition-colors ${
                                isDarkMode
                                  ? 'bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-orange-500'
                                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-orange-500'
                              } focus:outline-none`}
                              placeholder="70"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Performance Goal
                          </label>
                          <textarea
                            name="goal"
                            value={userProfile.goal}
                            onChange={handleProfileChange}
                            rows="3"
                            className={`w-full px-4 py-3 rounded-xl border transition-colors resize-none ${
                              isDarkMode
                                ? 'bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-orange-500'
                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-orange-500'
                            } focus:outline-none`}
                            placeholder="e.g., Improve bowling accuracy, perfect tennis serve..."
                          />
                        </div>
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Role Model (Optional)
                          </label>
                          <input
                            type="text"
                            name="roleModel"
                            value={userProfile.roleModel}
                            onChange={handleProfileChange}
                            className={`w-full px-4 py-3 rounded-xl border transition-colors ${
                              isDarkMode
                                ? 'bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-orange-500'
                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-orange-500'
                            } focus:outline-none`}
                            placeholder="e.g., Roger Federer, Virat Kohli"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Video Upload Section */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className={`rounded-2xl p-6 border ${
                      isDarkMode ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
                    }`}
                  >
                    <div className="flex items-center space-x-3 mb-6">
                      <Video className={`w-6 h-6 ${isDarkMode ? 'text-orange-400' : 'text-orange-500'}`} />
                      <h3 className="text-2xl font-bold">Upload Training Media</h3>
                    </div>

                    {!videoPreview ? (
                      <div
                        className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer ${
                          isDarkMode
                            ? 'border-white/30 hover:border-orange-400 hover:bg-white/5'
                            : 'border-black/30 hover:border-orange-500 hover:bg-black/5'
                        }`}
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="video/*,image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />

                        <Upload className={`w-16 h-16 mx-auto mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                        <p className="text-xl font-medium mb-2">Upload Image or Video</p>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          Drag & drop or click to select your training media
                        </p>
                        
                        <div className={`mt-6 p-4 rounded-xl ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
                          <p className="font-semibold text-base mb-2">For Best Analysis Results:</p>
                          <ul className={`list-disc list-inside text-left space-y-1 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            <li>Ensure the video/image is **static** (camera is not moving).</li>
                            <li>Wear clothes that **contrast** with your background.</li>
                            <li>Only **one athlete** should be in the frame.</li>
                            <li>Record in a well-lit environment.</li>
                          </ul>
                        </div>

                        <div className="flex items-center justify-center space-x-6 mt-6">
                          <div className={`flex items-center space-x-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            <Image className="w-5 h-5" />
                            <span className="text-sm">Images</span>
                          </div>
                          <div className={`flex items-center space-x-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            <Video className="w-5 h-5" />
                            <span className="text-sm">Videos</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="relative rounded-2xl overflow-hidden bg-black">
                          {mediaType === 'video' ? (
                            <video
                              ref={videoRef}
                              src={videoPreview}
                              controls
                              className="w-full h-64 object-contain"
                            />
                          ) : (
                            <img
                              ref={videoRef}
                              src={videoPreview}
                              alt="Preview"
                              className="w-full h-64 object-contain"
                            />
                          )}

                          <button
                            onClick={clearFile}
                            className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        <div className={`rounded-xl p-4 ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              {mediaType === 'video' ? (
                                <Video className="w-8 h-8 text-blue-400" />
                              ) : (
                                <Image className="w-8 h-8 text-green-400" />
                              )}
                              <div>
                                <p className="font-medium">{videoFile?.name}</p>
                                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                  {formatFileSize(videoFile?.size)} • {mediaType === 'video' ? 'Video' : 'Image'}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium text-green-400">✓ Ready</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Analysis Button */}
                    <div className="mt-6">
                      <button
                        onClick={analyzePosture}
                        disabled={!isFormValid() || isAnalyzing || detectorLoading}
                        className={`w-full py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                          (isFormValid() && !isAnalyzing && !detectorLoading)
                            ? isDarkMode
                              ? 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 text-white'
                              : 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white'
                            : isDarkMode
                              ? 'bg-white/10 text-gray-400 cursor-not-allowed'
                              : 'bg-black/10 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {detectorLoading ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Loading AI Model...</span>
                          </>
                        ) : isAnalyzing ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Analyzing with AI...</span>
                          </>
                        ) : (
                          <>
                            <Zap className="w-5 h-5" />
                            <span>Analyze {mediaType === 'video' ? 'Video' : 'Image'}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>

                  {/* Enhanced Analysis Results */}
                  {analysisResults && (
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className={`rounded-2xl p-6 border ${
                        isDarkMode ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
                      }`}
                    >
                      <div className="flex items-center space-x-3 mb-6">
                        <Target className={`w-6 h-6 ${isDarkMode ? 'text-orange-400' : 'text-orange-500'}`} />
                        <h3 className="text-2xl font-bold">Analysis Results</h3>
                      </div>

                      {/* Overall Score */}
                      <div className="text-center mb-8">
                        <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full mb-4 ${
                          isDarkMode ? 'bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30'
                            : 'bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30'
                        }`}>
                          <div className="text-center">
                            <div className="text-4xl font-bold">{analysisResults.overallScore}/100</div>
                            <div className="text-sm font-medium">Score</div>
                          </div>
                        </div>
                        <h4 className="text-xl font-semibold mb-2">Overall Performance</h4>
                        <p className={`max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {analysisResults.detailedFeedback?.overview || 'Detailed analysis of your sports technique.'}
                        </p>
                      </div>

                      {/* Metrics Charts */}
                      {analysisResults.metrics && Object.keys(analysisResults.metrics).length > 0 && (
                        <div className="grid md:grid-cols-2 gap-8 mb-8">
                          <div className="space-y-4">
                            <h4 className="text-lg font-semibold">Performance Radar</h4>
                            <div className="h-64">
                              <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={
                                  Object.entries(analysisResults.metrics).filter(([, value]) => value > 0).map(([key, value]) => ({
                                    metric: key,
                                    score: value,
                                    fullMark: 100,
                                  }))
                                }>
                                  <PolarGrid stroke={isDarkMode ? "#ffffff30" : "#00000030"} />
                                  <PolarAngleAxis
                                    dataKey="metric"
                                    tick={{ fill: isDarkMode ? "#fff" : "#000", fontSize: 12 }}
                                  />
                                  <PolarRadiusAxis domain={[0, 100]} />
                                  <Radar
                                    name="Score"
                                    dataKey="score"
                                    stroke="#8884d8"
                                    fill="#8884d8"
                                    fillOpacity={0.6}
                                  />
                                  <Tooltip
                                    contentStyle={isDarkMode ? {
                                      backgroundColor: '#333',
                                      borderColor: '#555',
                                      color: '#fff'
                                    } : {}}
                                  />
                                </RadarChart>
                              </ResponsiveContainer>
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <h4 className="text-lg font-semibold">Metrics Comparison</h4>
                            <div className="h-64">
                              <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={
                                  Object.entries(analysisResults.metrics).filter(([, value]) => value > 0).map(([key, value]) => ({
                                    name: key,
                                    score: value,
                                  }))
                                } layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                  <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#ffffff30" : "#00000030"} />
                                  <XAxis
                                    type="number"
                                    domain={[0, 100]}
                                    stroke={isDarkMode ? "#fff" : "#000"}
                                  />
                                  <YAxis
                                    dataKey="name"
                                    type="category"
                                    stroke={isDarkMode ? "#fff" : "#000"}
                                    width={80}
                                  />
                                  <Tooltip
                                    contentStyle={isDarkMode ? {
                                      backgroundColor: '#333',
                                      borderColor: '#555',
                                      color: '#fff'
                                    } : {}}
                                  />
                                  <Bar dataKey="score" fill="#82ca9d" />
                                </BarChart>
                              </ResponsiveContainer>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Detailed Feedback */}
                      {analysisResults.detailedFeedback && analysisResults.detailedFeedback.points && analysisResults.detailedFeedback.points.length > 0 && (
                        <div className={`p-6 rounded-xl mb-6 ${isDarkMode ? 'bg-blue-900/20' : 'bg-blue-100'}`}>
                          <h5 className="font-bold mb-4 flex items-center space-x-2 text-blue-500">
                            <MessageCircle className="w-5 h-5" />
                            <span>Detailed Feedback</span>
                          </h5>
                          <div className="space-y-4">
                            {analysisResults.detailedFeedback.points.map((point, index) => (
                              <div key={index} className="flex items-start space-x-3">
                                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0">
                                  {index + 1}
                                </div>
                                <div>
                                  <p className="font-medium">{point.joint || point.area}</p>
                                  <p className="text-sm">{point.feedback}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Strengths */}
                      {analysisResults.strengths && analysisResults.strengths.length > 0 && (
                        <div className={`p-6 rounded-xl mb-6 ${isDarkMode ? 'bg-green-900/20' : 'bg-green-100'}`}>
                          <h5 className="font-bold mb-4 flex items-center space-x-2 text-green-500">
                            <Star className="w-5 h-5" />
                            <span>Your Strengths</span>
                          </h5>
                          <ul className="space-y-3">
                            {analysisResults.strengths.map((strength, index) => (
                              <li key={index} className="flex items-start space-x-3">
                                <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0">
                                  {index + 1}
                                </div>
                                <span className="text-sm">{strength}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Improvements */}
                      {analysisResults.improvements && analysisResults.improvements.length > 0 && (
                        <div className={`p-6 rounded-xl mb-6 ${isDarkMode ? 'bg-yellow-900/20' : 'bg-yellow-100'}`}>
                          <h5 className="font-bold mb-4 flex items-center space-x-2 text-yellow-500">
                            <AlertCircle className="w-5 h-5" />
                            <span>Areas for Improvement</span>
                          </h5>
                          <ul className="space-y-3">
                            {analysisResults.improvements.map((improvement, index) => (
                              <li key={index} className="flex items-start space-x-3">
                                <div className="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0">
                                  {index + 1}
                                </div>
                                <span className="text-sm">{improvement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Steps */}
                      {analysisResults.steps && analysisResults.steps.length > 0 && (
                        <div className={`p-6 rounded-xl mb-6 ${isDarkMode ? 'bg-purple-900/20' : 'bg-purple-100'}`}>
                          <h5 className="font-bold mb-4 flex items-center space-x-2 text-purple-500">
                            <ArrowRight className="w-5 h-5" />
                            <span>Action Steps</span>
                          </h5>
                          <ul className="space-y-3">
                            {analysisResults.steps.map((step, index) => (
                              <li key={index} className="flex items-start space-x-3">
                                <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0">
                                  {index + 1}
                                </div>
                                <span className="text-sm">{step}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Prime Athlete Comparison */}
                      {analysisResults.primeAthleteComparison && analysisResults.primeAthleteComparison.name && analysisResults.primeAthleteComparison.techniqueDescription && (
                        <div className={`p-6 rounded-xl mb-6 ${isDarkMode ? 'bg-blue-900/20' : 'bg-blue-100'}`}>
                          <h5 className="font-bold mb-4 flex items-center space-x-2 text-blue-500">
                            <Award className="w-5 h-5" />
                            <span>Prime Athlete Technique: {analysisResults.primeAthleteComparison.name}</span>
                          </h5>
                          <p className="text-sm leading-relaxed">
                            {analysisResults.primeAthleteComparison.techniqueDescription}
                          </p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>
              )}

              {activeTab === 'training' && !showCustomPlanCreator && (
                <div className="space-y-6 min-h-[600px]" ref={trainingRef}>
                  <div className={`backdrop-blur-md rounded-2xl p-6 border ${isDarkMode ? 'bg-white/5 border-orange-500/20' : 'bg-black/5 border-orange-500/20'}`}>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className={`text-2xl font-bold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        <Award className={`h-6 w-6 ${isDarkMode ? 'text-orange-400' : 'text-orange-500'}`} />
                        Training Plans
                      </h2>
                      <button
                        onClick={() => setShowCustomPlanCreator(true)}
                        className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl ${
                          isDarkMode
                            ? 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500'
                            : 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700'
                        } text-white`}
                      >
                        <Settings className="w-5 h-5" />
                        <span>Create Custom Plan</span>
                      </button>
                    </div>

                    <div className="mb-6">
                      <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Choose from our pre-designed training plans or create your own custom plan tailored to your specific needs.
                      </p>
                    </div>

                    <div className="mb-8">
                      <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Quick Start Plans
                      </h3>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {trainingPlans.map((plan, index) => (
                        <div key={index} className={`rounded-lg p-6 transition-colors duration-300 ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}>
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className={`text-lg font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{plan.title}</h3>
                              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{plan.focus}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              plan.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                              plan.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-red-500/20 text-red-400'
                            }`}>
                              {plan.difficulty}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Duration</span>
                              <div className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{plan.duration}</div>
                            </div>
                            <div>
                              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Sessions</span>
                              <div className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{plan.sessions}</div>
                            </div>
                          </div>
                          
                          <button
                            onClick={() => handleShowTrainingPlan(plan)}
                            className={`w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 text-white py-3 rounded-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}
                          >
                            Show Training Plan
                          </button>
                        </div>
                      ))}
                    </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'training' && showCustomPlanCreator && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className={`text-2xl font-bold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      <Settings className={`h-6 w-6 ${isDarkMode ? 'text-orange-400' : 'text-orange-500'}`} />
                      Custom Training Plan Creator
                    </h2>
                    <button
                      onClick={() => setShowCustomPlanCreator(false)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                        isDarkMode
                          ? 'bg-white/10 text-gray-300 hover:bg-white/20'
                          : 'bg-black/10 text-gray-700 hover:bg-black/20'
                      }`}
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Back to Plans</span>
                    </button>
                  </div>
                  
                  <CustomTrainingPlanCreator isDarkMode={isDarkMode} />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`rounded-3xl p-12 text-center ${
            isDarkMode
              ? 'bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30'
              : 'bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30'
          }`}>
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to unlock your potential?
            </h3>
            <p className={`text-xl mb-8 max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Join athletes using AI Guru to enhance performance and achieve goals.
            </p>
            <button
              onClick={() => {
                setActiveTab('chat');
                chatRef.current?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`px-12 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl ${
              isDarkMode
                ? 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700'
                : 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700'
            } text-white`}>
              Start Your AI Journey
            </button>
          </div>
        </div>
      </section>

      {/* Training Plan Modal */}
      <TrainingPlanModal
        isOpen={showTrainingPlanModal}
        onClose={() => setShowTrainingPlanModal(false)}
        trainingPlan={currentTrainingPlan}
        isLoading={isGeneratingPlan}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};

export default AIGuru;