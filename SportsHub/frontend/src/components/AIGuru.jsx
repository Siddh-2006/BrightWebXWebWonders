import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Brain, Camera, Target, TrendingUp, MessageCircle, Upload, Zap, Award,
  BarChart3, Send, Image, Video, Star, CheckCircle, ArrowRight, Sun, Moon
} from 'lucide-react';
import { getAIGuruResponse } from '../services/aiGuruService';
import { renderMarkdown } from '../utils/markdownRenderer';
// import { analyzePosture, fileToBase64, getMediaType, extractVideoFrame } from '../services/postureService';
// import { testMediaPipeSupport, runQuickPoseTest } from '../utils/mediaPipeTest';

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
      text: "**🎯 Welcome to AI Guru!** 👋\n\nHey there! I'm your personal sports coach ready to help you excel! Whether you want to improve your technique, learn new strategies, or get training advice, I'm here to guide you every step of the way.\n\n**💪 What I can help you with:**\n• Training techniques and strategies\n• Performance improvement tips\n• Nutrition and fitness advice\n• Sport-specific coaching\n\n**🚀 Ready to get started?** What sport or skill would you like to work on today?",
      message: "**🎯 Welcome to AI Guru!** 👋\n\nHey there! I'm your personal sports coach ready to help you excel! Whether you want to improve your technique, learn new strategies, or get training advice, I'm here to guide you every step of the way.\n\n**💪 What I can help you with:**\n• Training techniques and strategies\n• Performance improvement tips\n• Nutrition and fitness advice\n• Sport-specific coaching\n\n**🚀 Ready to get started?** What sport or skill would you like to work on today?",
      time: 'Just now'
    }
  ]);

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

  // Debug function to test MediaPipe fixes - moved up before it's referenced
  // COMMENTED OUT: Posture correction logic disabled - keeping only UI/UX
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
      color: isDarkMode ? 'from-orange-500 to-red-400' : 'from-orange-600 to-red-500'
    },
    {
      icon: Camera,
      title: 'Posture Analysis',
      description: 'Upload videos for AI-powered technique correction',
      color: isDarkMode ? 'from-red-500 to-orange-400' : 'from-red-600 to-orange-500'
    },
    {
      icon: TrendingUp,
      title: 'Progress Tracking',
      description: 'Monitor improvement with personalized analytics',
      color: isDarkMode ? 'from-amber-500 to-yellow-400' : 'from-amber-600 to-yellow-500'
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

  // COMMENTED OUT: Posture correction logic disabled - keeping only UI/UX
  const handleMediaUpload = async (event) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        setUploadedFile(file);
        // Basic media type detection for UI display
        const mediaType = file.type.startsWith('video/') ? 'video' : 'image';
        setMediaType(mediaType);
        
        // Create preview URL for UI display only
        const previewUrl = URL.createObjectURL(file);
        setUploadedPreview(previewUrl);
        
        console.log('📁 Media uploaded (UI only):', {
          name: file.name,
          type: file.type,
          size: file.size,
          mediaType: mediaType
        });
      } catch (error) {
        console.error('❌ File upload error:', error);
      }
    }
    
    // Original posture processing logic commented out:
    /*
    if (file) {
      try {
        setUploadedFile(file);
        setMediaType(getMediaType(file));
        
        if (file.type.startsWith('video/')) {
          // For videos, extract a frame for preview
          const frameData = await extractVideoFrame(file, 1);
          setUploadedPreview(frameData);
        } else {
          // For images, use the file directly
          const base64Data = await fileToBase64(file);
          setUploadedPreview(base64Data);
        }
        
        console.log('📁 Media uploaded:', {
          name: file.name,
          type: file.type,
          size: file.size,
          mediaType: getMediaType(file)
        });
      } catch (error) {
        console.error('❌ File upload error:', error);
      }
    }
    */
  };

  // COMMENTED OUT: Posture correction logic disabled - keeping only UI/UX
  const handlePostureAnalysis = async () => {
    if (!uploadedFile) return;

    setIsAnalyzing(true);
    setAnalysisResults(null);

    // Simulate analysis for UI demonstration
    setTimeout(() => {
      const demoMessage = `**🎯 Posture Analysis Demo**\n\n⚠️ **Feature Currently Disabled**\n\nThe AI posture analysis system is temporarily disabled. This is a UI/UX demonstration only.\n\n**Current Status:**\n• ✅ File upload working\n• ✅ UI components functional\n• ❌ Analysis logic disabled\n• ❌ MediaPipe integration disabled\n\n**Demo Analysis Results:**\nThis would normally show detailed posture analysis including metrics, recommendations, and safety notes for your uploaded ${mediaType}.`;
      
      // Add demo message to chat
      setChatHistory(prev => [
        ...prev,
        {
          type: 'ai',
          role: 'assistant',
          text: demoMessage,
          message: demoMessage,
          time: 'Just now'
        }
      ]);

      // Set demo analysis results for UI display
      setAnalysisResults({
        overallScore: 7.5,
        assessment: "Demo analysis - posture correction logic is currently disabled for UI/UX testing",
        metrics: {
          posturalAlignment: { score: 8, notes: "Demo metric - logic disabled" },
          jointStability: { score: 7, notes: "Demo metric - logic disabled" },
          movementEfficiency: { score: 7, notes: "Demo metric - logic disabled" },
          sportSpecificForm: { score: 8, notes: "Demo metric - logic disabled" }
        },
        recommendations: [
          "This is a demo recommendation - actual analysis is disabled",
          "UI/UX components are working correctly",
          "Posture correction logic needs to be re-enabled for real analysis"
        ],
        safetyNotes: "Demo safety note - actual analysis logic is currently disabled"
      });

      setIsAnalyzing(false);
    }, 2000);

    // Original posture analysis logic commented out:
    /*
    try {
      // Convert file to base64 for API
      const base64Data = await fileToBase64(uploadedFile);
      
      // Prepare user profile data
      const userProfile = {
        name: userDetails.name,
        age: userDetails.age,
        sport: userDetails.sport,
        experience: 'Intermediate', // Could be extracted from userDetails
        goals: userDetails.details
      };

      console.log('🎯 Starting posture analysis...');
      
      // Add progress message to chat
      const progressMessage = `**🔄 Analyzing ${mediaType === 'video' ? 'Video' : 'Image'}...**\n\nI'm processing your ${mediaType} using AI pose detection. This may take a few moments...`;
      setChatHistory(prev => [
        ...prev,
        {
          type: 'ai',
          role: 'assistant',
          text: progressMessage,
          message: progressMessage,
          time: 'Just now'
        }
      ]);
      
      // Call the posture analysis service
      const result = await analyzePosture({
        userProfile,
        mediaFile: base64Data,
        mediaType: mediaType
      });

      if (result.success) {
        setAnalysisResults(result.analysis);
        
        // Add analysis to chat history
        const analysisMessage = formatAnalysisForChat(result.analysis);
        setChatHistory(prev => [
          ...prev.slice(0, -1), // Remove progress message
          {
            type: 'ai',
            role: 'assistant',
            text: analysisMessage,
            message: analysisMessage,
            time: 'Just now'
          }
        ]);
      } else {
        throw new Error(result.error || 'Analysis failed');
      }

    } catch (error) {
      console.error('❌ Posture analysis error:', error);
      
      // Determine error type and provide appropriate message
      let errorMessage = `**🚫 Analysis Error**\n\n`;
      
      if (error.message.includes('timeout')) {
        errorMessage += `The analysis took too long to complete. This can happen with large files or slow connections.\n\n**💡 Try:**\n• Using a smaller file\n• Checking your internet connection\n• Trying again in a moment`;
      } else if (error.message.includes('load failed')) {
        errorMessage += `I couldn't load your ${mediaType}. Please make sure it's a valid file.\n\n**💡 Try:**\n• Using a different ${mediaType}\n• Checking the file format (JPG, PNG for images; MP4, WebM for videos)\n• Making sure the file isn't corrupted`;
      } else if (error.message.includes('Network Error') || error.message.includes('fetch')) {
        errorMessage += `I'm having trouble connecting to the analysis service.\n\n**💡 Try:**\n• Checking your internet connection\n• Refreshing the page\n• Trying again in a few moments`;
      } else {
        errorMessage += `Something went wrong during the analysis. ${error.message}\n\n**💡 Try:**\n• Uploading a different ${mediaType}\n• Refreshing the page\n• Trying again in a moment`;
      }
      
      setChatHistory(prev => [
        ...prev.slice(0, -1), // Remove progress message if it exists
        {
          type: 'ai',
          role: 'assistant',
          text: errorMessage,
          message: errorMessage,
          time: 'Just now'
        }
      ]);
    } finally {
      setIsAnalyzing(false);
    }
    */
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

  return (
    <div className={`min-h-screen pt-20 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>

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
              <div key={index} className="group relative">
                <div className={`overflow-hidden rounded-3xl p-8 border transition-all duration-300 h-full ${
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
      <section className="py-20">
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
                          <div className={`max-w-4xl p-6 rounded-2xl ${
                            chat.type === 'user'
                              ? isDarkMode
                                ? 'bg-orange-500 text-white'
                                : 'bg-orange-600 text-white'
                              : isDarkMode
                                ? 'bg-white/10 text-white'
                                : 'bg-black/10 text-gray-900'
                          }`}>
                            {chat.type === 'user' ? (
                              <p className="whitespace-pre-line text-base leading-relaxed">{chat.message}</p>
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
                  <div className="grid md:grid-cols-2 gap-3 mb-6">
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
                        className={`text-left p-4 rounded-xl border transition-all duration-300 group hover:scale-[1.02] ${
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
                      </button>
                    ))}
                  </div>

                  {/* Debug Test Button */}
                  <div className="mb-6">
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
                  </div>

                  {/* Chat Input */}
                  <div className="flex space-x-4">
                    <input
                      type="text"
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      placeholder="Ask about sports training, techniques, or strategies..."
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
                </div>
              )}

              {activeTab === 'posture' && (
                <div className="space-y-6 min-h-[600px]">
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold mb-4">AI Posture Analysis</h3>
                    <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                      Upload training videos/images for instant technique feedback
                    </p>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Upload Area */}
                    <div className="space-y-6">
                      <div className={`border-2 border-dashed rounded-3xl p-12 text-center transition-colors ${
                        isDarkMode
                          ? 'border-white/30 hover:border-orange-400'
                          : 'border-black/30 hover:border-orange-500'
                      }`}>
                        <input
                          type="file"
                          accept="image/*,video/*"
                          onChange={handleMediaUpload}
                          className="hidden"
                          id="file-upload"
                        />
                        <label htmlFor="file-upload" className="cursor-pointer">
                          <Upload className={`w-16 h-16 mx-auto mb-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                          <p className="text-xl font-medium mb-2">Upload Image or Video</p>
                          <p className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}>
                            Drag & drop or click to select
                          </p>
                          <div className="flex items-center justify-center space-x-4 mt-4">
                            <div className="flex items-center space-x-2">
                              <Image className="w-5 h-5" />
                              <span className="text-sm">Images</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Video className="w-5 h-5" />
                              <span className="text-sm">Videos</span>
                            </div>
                          </div>
                        </label>
                      </div>

                      {uploadedPreview && (
                        <div className="rounded-2xl overflow-hidden">
                          <div className="relative">
                            <img src={uploadedPreview} alt="Uploaded media" className="w-full h-64 object-cover" />
                            {mediaType === 'video' && (
                              <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-1">
                                <Video className="w-4 h-4" />
                                <span>Video Preview</span>
                              </div>
                            )}
                          </div>
                          <div className="p-4 bg-white/5 text-sm">
                            <p><strong>File:</strong> {uploadedFile?.name}</p>
                            <p><strong>Type:</strong> {mediaType === 'video' ? 'Video' : 'Image'}</p>
                            <p><strong>Size:</strong> {(uploadedFile?.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                        </div>
                      )}

                      <button
                        onClick={handlePostureAnalysis}
                        disabled={!uploadedFile || isAnalyzing}
                        className={`w-full py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                          uploadedFile && !isAnalyzing
                            ? isDarkMode
                              ? 'bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-400 hover:to-orange-500 text-white'
                              : 'bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white'
                            : isDarkMode
                              ? 'bg-white/10 text-gray-500 cursor-not-allowed'
                              : 'bg-black/10 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {isAnalyzing ? (
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

                    {/* Analysis Results */}
                    <div className="space-y-6">
                      <h4 className="text-2xl font-bold mb-6">Analysis Results</h4>
                      
                      {analysisResults ? (
                        <div className="space-y-6">
                          {/* Overall Score */}
                          <div className={`p-6 rounded-2xl text-center ${
                            isDarkMode ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30' : 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30'
                          }`}>
                            <div className="text-4xl font-bold mb-2">{analysisResults.overallScore}/10</div>
                            <div className="text-lg font-medium">Overall Performance Score</div>
                          </div>

                          {/* Metrics */}
                          <div className="space-y-4">
                            {analysisResults.metrics && Object.entries(analysisResults.metrics).map(([key, metric]) => {
                              const getColorClass = (score) => {
                                if (score >= 8) return 'green';
                                if (score >= 6) return 'yellow';
                                return 'red';
                              };
                              
                              const color = getColorClass(metric.score);
                              const colorClasses = {
                                green: {
                                  bg: isDarkMode ? 'bg-green-500/20 border-green-500/30' : 'bg-green-500/20 border-green-500/30',
                                  text: 'text-green-400',
                                  icon: CheckCircle
                                },
                                yellow: {
                                  bg: isDarkMode ? 'bg-yellow-500/20 border-yellow-500/30' : 'bg-yellow-500/20 border-yellow-500/30',
                                  text: 'text-yellow-400',
                                  icon: Target
                                },
                                red: {
                                  bg: isDarkMode ? 'bg-red-500/20 border-red-500/30' : 'bg-red-500/20 border-red-500/30',
                                  text: 'text-red-400',
                                  icon: ArrowRight
                                }
                              };
                              
                              const currentColor = colorClasses[color];
                              const IconComponent = currentColor.icon;
                              
                              // Format metric name for display
                              const formatMetricName = (key) => {
                                const nameMap = {
                                  posturalAlignment: 'Postural Alignment',
                                  jointStability: 'Joint Stability',
                                  movementEfficiency: 'Movement Efficiency',
                                  sportSpecificForm: 'Sport-Specific Form',
                                  balanceControl: 'Balance & Control',
                                  powerGeneration: 'Power Generation',
                                  flexibilityRange: 'Flexibility & Range',
                                  injuryRisk: 'Injury Risk Assessment',
                                  balance: 'Balance',
                                  posture: 'Posture',
                                  movement: 'Movement',
                                  technique: 'Technique'
                                };
                                return nameMap[key] || key.replace(/([A-Z])/g, ' $1').trim();
                              };
                              
                              return (
                                <div key={key} className={`flex items-center justify-between p-6 rounded-2xl border ${currentColor.bg}`}>
                                  <div className="flex items-center space-x-3">
                                    <IconComponent className={`w-6 h-6 ${currentColor.text}`} />
                                    <div>
                                      <div className="font-medium">{formatMetricName(key)}</div>
                                      <div className={`text-sm ${currentColor.text}`}>{metric.notes || 'Assessment completed'}</div>
                                    </div>
                                  </div>
                                  <span className={`${currentColor.text} font-bold`}>{metric.score}/10</span>
                                </div>
                              );
                            })}
                          </div>

                          {/* Recommendations */}
                          <div className={`p-6 rounded-2xl ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
                            <h5 className="font-bold mb-3 flex items-center space-x-2">
                              <Star className="w-5 h-5 text-orange-400" />
                              <span>AI Recommendations</span>
                            </h5>
                            <ul className="space-y-3 text-sm">
                              {analysisResults.recommendations.map((rec, index) => (
                                <li key={index} className="flex items-start space-x-2">
                                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                                  <span>{rec}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Safety Notes */}
                          {analysisResults.safetyNotes && (
                            <div className={`p-6 rounded-2xl ${isDarkMode ? 'bg-amber-500/20 border border-amber-500/30' : 'bg-amber-500/20 border border-amber-500/30'}`}>
                              <h5 className="font-bold mb-3 flex items-center space-x-2 text-amber-400">
                                <span>⚠️</span>
                                <span>Safety Notes</span>
                              </h5>
                              <p className="text-sm">{analysisResults.safetyNotes}</p>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                            isDarkMode ? 'bg-white/10' : 'bg-black/10'
                          }`}>
                            <BarChart3 className={`w-8 h-8 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                          </div>
                          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                            Upload an image or video to see your analysis results here
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'training' && (
                <div className="space-y-6 min-h-[600px]">
                  <div className={`backdrop-blur-md rounded-2xl p-6 border ${isDarkMode ? 'bg-white/5 border-orange-500/20' : 'bg-black/5 border-orange-500/20'}`}>
                    <h2 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      <Award className={`h-6 w-6 ${isDarkMode ? 'text-orange-400' : 'text-orange-500'}`} />
                      Personalized Training Plans
                    </h2>
                    
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
                          
                          <button className={`w-full bg-gradient-to-r ${plan.color} text-white py-3 rounded-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}>
                            Start Training Plan
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
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
            <button className={`px-12 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl ${
              isDarkMode
                ? 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700'
                : 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700'
            } text-white`}>
              Start Your AI Journey
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AIGuru;