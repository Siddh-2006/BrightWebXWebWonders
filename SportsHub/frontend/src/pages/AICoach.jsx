import React, { useState, useEffect } from 'react';
import { Brain, Camera, Target, TrendingUp, Award, Zap, MessageCircle, Upload, Play, CheckCircle } from 'lucide-react';

const AICoach = () => {
  const [activeTab, setActiveTab] = useState('posture');
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    if (isAnalyzing) {
      const interval = setInterval(() => {
        setAnalysisProgress(prev => {
          if (prev >= 100) {
            setIsAnalyzing(false);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
      return () => clearInterval(interval);
    }
  }, [isAnalyzing]);

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
  };

  const features = [
    {
      id: 'posture',
      title: 'Posture Analysis',
      icon: Target,
      description: 'Upload your training videos for AI-powered posture correction',
      color: 'from-blue-500 to-purple-500'
    },
    {
      id: 'performance',
      title: 'Performance Tracking',
      icon: TrendingUp,
      description: 'Track your progress with detailed analytics and insights',
      color: 'from-green-500 to-blue-500'
    },
    {
      id: 'training',
      title: 'Training Plans',
      icon: Award,
      description: 'Get personalized training plans based on your goals',
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'chat',
      title: 'AI Assistant',
      icon: MessageCircle,
      description: 'Chat with our AI coach for instant advice and tips',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const analysisResults = [
    { metric: 'Posture Score', value: '87%', status: 'good', improvement: '+5%' },
    { metric: 'Balance', value: '92%', status: 'excellent', improvement: '+2%' },
    { metric: 'Form Accuracy', value: '78%', status: 'needs-work', improvement: '+12%' },
    { metric: 'Consistency', value: '85%', status: 'good', improvement: '+8%' }
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
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-blue-900/40 to-gray-900/80"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/2524874/pexels-photo-2524874.jpeg?auto=compress&cs=tinysrgb&w=1920)'
          }}
        ></div>
        
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-6 py-3 rounded-full border border-blue-500/30 mb-6">
              <Brain className="h-6 w-6 text-blue-400" />
              <span className="text-blue-400 font-medium">AI-Powered Coaching</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6">
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Train Smarter
              </span>
              <br />
              <span className="text-white">Not Harder</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Experience the future of sports training with our AI coach. Get personalized feedback, 
              track your progress, and achieve your goals faster than ever before.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 flex items-center gap-2 justify-center hover:scale-105">
              <Zap className="h-5 w-5 group-hover:scale-110 transition-transform" />
              Start Training
            </button>
            <button className="group bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-all duration-300 border border-blue-500/30 hover:border-blue-500/50 flex items-center gap-2 justify-center">
              <Play className="h-5 w-5 group-hover:scale-110 transition-transform" />
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Feature Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {features.map((feature) => (
            <button
              key={feature.id}
              onClick={() => setActiveTab(feature.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                activeTab === feature.id
                  ? `bg-gradient-to-r ${feature.color} text-white shadow-lg`
                  : 'bg-white/10 backdrop-blur-md text-gray-300 hover:text-white hover:bg-white/20'
              }`}
            >
              <feature.icon className="h-4 w-4" />
              {feature.title}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'posture' && (
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-blue-500/20">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Camera className="h-6 w-6 text-blue-400" />
                  Posture Analysis
                </h2>
                
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center mb-6 hover:border-blue-500/50 transition-colors duration-300">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-300 mb-4">Upload your training video for AI analysis</p>
                  <button 
                    onClick={startAnalysis}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                  >
                    Choose Video
                  </button>
                </div>

                {isAnalyzing && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">Analyzing...</span>
                      <span className="text-blue-400">{analysisProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${analysisProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {analysisProgress === 100 && (
                  <div className="grid grid-cols-2 gap-4">
                    {analysisResults.map((result, index) => (
                      <div key={index} className="bg-gray-800 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-300 text-sm">{result.metric}</span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            result.status === 'excellent' ? 'bg-green-500/20 text-green-400' :
                            result.status === 'good' ? 'bg-blue-500/20 text-blue-400' :
                            'bg-orange-500/20 text-orange-400'
                          }`}>
                            {result.status}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-white">{result.value}</span>
                          <span className="text-green-400 text-sm">{result.improvement}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'training' && (
              <div className="space-y-6">
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-orange-500/20">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Award className="h-6 w-6 text-orange-400" />
                    Personalized Training Plans
                  </h2>
                  
                  <div className="space-y-4">
                    {trainingPlans.map((plan, index) => (
                      <div key={index} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-300">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-white mb-2">{plan.title}</h3>
                            <p className="text-gray-400">{plan.focus}</p>
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
                            <span className="text-gray-400 text-sm">Duration</span>
                            <div className="text-white font-semibold">{plan.duration}</div>
                          </div>
                          <div>
                            <span className="text-gray-400 text-sm">Sessions</span>
                            <div className="text-white font-semibold">{plan.sessions}</div>
                          </div>
                        </div>
                        
                        <button className={`w-full bg-gradient-to-r ${plan.color} text-white py-3 rounded-lg font-semibold hover:scale-105 transition-all duration-300`}>
                          Start Training Plan
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'chat' && (
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-purple-500/20">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <MessageCircle className="h-6 w-6 text-purple-400" />
                  AI Assistant
                </h2>
                
                <div className="bg-gray-800 rounded-lg p-4 h-96 mb-4 overflow-y-auto">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <Brain className="h-4 w-4 text-white" />
                      </div>
                      <div className="bg-purple-500/20 rounded-lg p-3 max-w-xs">
                        <p className="text-white text-sm">Hello! I'm your AI coach. How can I help you improve your game today?</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 justify-end">
                      <div className="bg-gray-700 rounded-lg p-3 max-w-xs">
                        <p className="text-white text-sm">I want to improve my basketball shooting accuracy</p>
                      </div>
                      <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">U</span>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <Brain className="h-4 w-4 text-white" />
                      </div>
                      <div className="bg-purple-500/20 rounded-lg p-3 max-w-xs">
                        <p className="text-white text-sm">Great! Let's work on your shooting form. Here are 3 key areas to focus on: 1) Proper stance and balance 2) Consistent follow-through 3) Arc trajectory. Would you like me to create a practice routine?</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Ask your AI coach anything..."
                    className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
                    Send
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-blue-500/20">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-400" />
                Your Progress
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Sessions Completed</span>
                  <span className="text-white font-bold">24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Improvement Score</span>
                  <span className="text-green-400 font-bold">+15%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Current Streak</span>
                  <span className="text-orange-400 font-bold">7 days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Goals Achieved</span>
                  <span className="text-purple-400 font-bold">3/5</span>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-yellow-500/20">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-400" />
                Recent Achievements
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 bg-yellow-500/10 rounded-lg p-3">
                  <CheckCircle className="h-5 w-5 text-yellow-400" />
                  <div>
                    <div className="text-white font-medium text-sm">Perfect Form</div>
                    <div className="text-gray-400 text-xs">Achieved 95% accuracy</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-blue-500/10 rounded-lg p-3">
                  <CheckCircle className="h-5 w-5 text-blue-400" />
                  <div>
                    <div className="text-white font-medium text-sm">Consistency King</div>
                    <div className="text-gray-400 text-xs">7-day training streak</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-green-500/10 rounded-lg p-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <div>
                    <div className="text-white font-medium text-sm">Quick Learner</div>
                    <div className="text-gray-400 text-xs">Completed 10 sessions</div>
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

export default AICoach;