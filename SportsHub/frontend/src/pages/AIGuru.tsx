import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, Camera, Target, TrendingUp, MessageCircle, Upload, Zap, Award, 
  BarChart3, Send, Mic, Image, Video, Star, CheckCircle, ArrowRight
} from 'lucide-react';

interface AIGuruProps {
  isDarkMode: boolean;
}

const AIGuru: React.FC<AIGuruProps> = ({ isDarkMode }) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'posture' | 'progress'>('chat');
  const [chatMessage, setChatMessage] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const features = [
    {
      icon: MessageCircle,
      title: 'AI Sports Coach',
      description: 'Ask any question about sports techniques, strategies, or training methods',
      color: isDarkMode ? 'from-blue-500 to-cyan-400' : 'from-blue-600 to-cyan-500'
    },
    {
      icon: Camera,
      title: 'Posture Analysis',
      description: 'Upload your form videos for AI-powered technique correction',
      color: isDarkMode ? 'from-purple-500 to-pink-400' : 'from-purple-600 to-pink-500'
    },
    {
      icon: TrendingUp,
      title: 'Progress Tracking',
      description: 'Monitor your improvement with personalized analytics and insights',
      color: isDarkMode ? 'from-green-500 to-emerald-400' : 'from-green-600 to-emerald-500'
    }
  ];

  const sampleQuestions = [
    "How can I improve my football shooting accuracy?",
    "What's the best training routine for basketball?",
    "How to perfect my tennis serve technique?",
    "Best nutrition plan for endurance sports?",
    "How to increase my running speed?",
    "What are the key fundamentals of cricket batting?"
  ];

  const chatHistory = [
    {
      type: 'user',
      message: 'How can I improve my football shooting accuracy?',
      time: '2 min ago'
    },
    {
      type: 'ai',
      message: 'Great question! Here are key techniques to improve your shooting accuracy:\n\n1. **Body Position**: Keep your head up and body over the ball\n2. **Plant Foot**: Place your non-kicking foot firmly beside the ball\n3. **Follow Through**: Ensure your kicking foot follows through toward your target\n4. **Practice**: Regular practice with both feet from different angles\n\nWould you like me to create a personalized training routine for you?',
      time: '1 min ago'
    }
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzePosture = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 3000);
  };

  const progressData = {
    overallRating: 92,
    sessionsCompleted: 127,
    improvementRate: 23,
    weeklyUsage: 28,
    achievements: [
      { title: 'Perfect Posture Week', description: 'Maintained excellent form for 7 days', icon: Target, date: '2024-01-15' },
      { title: 'AI Guru Master', description: 'Used AI Guru for 30 consecutive days', icon: Brain, date: '2024-01-10' },
      { title: 'Consistency Champion', description: 'Posted daily for 2 weeks', icon: Award, date: '2024-01-05' }
    ]
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20"
    >
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-10">
          <div className={`absolute top-20 left-20 w-64 h-64 rounded-full blur-3xl animate-pulse ${
            isDarkMode ? 'bg-orange-500' : 'bg-blue-500'
          }`}></div>
          <div className={`absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl animate-pulse delay-1000 ${
            isDarkMode ? 'bg-purple-500' : 'bg-cyan-500'
          }`}></div>
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
                  ? 'bg-gradient-to-r from-orange-500 to-purple-600'
                  : 'bg-gradient-to-r from-blue-500 to-purple-600'
              }`}>
                <Brain className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              AI <span className={`${
                isDarkMode 
                  ? 'bg-gradient-to-r from-orange-400 to-purple-500' 
                  : 'bg-gradient-to-r from-blue-500 to-purple-600'
              } bg-clip-text text-transparent`}>Guru</span>
            </h1>
            <p className={`text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Your personal AI sports coach, available 24/7 to help you reach peak performance through 
              intelligent guidance, posture analysis, and personalized training insights.
            </p>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-8 mb-16"
          >
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
                  <p className={`leading-relaxed ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
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
                { id: 'progress', label: 'Progress Tracking', icon: BarChart3 }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-6 px-4 transition-all duration-300 ${
                    activeTab === tab.id
                      ? isDarkMode
                        ? 'bg-orange-500/20 text-orange-400 border-b-2 border-orange-400'
                        : 'bg-blue-500/20 text-blue-600 border-b-2 border-blue-500'
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
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold mb-4">Ask Your AI Sports Coach</h3>
                    <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                      Get instant answers to any sports-related question
                    </p>
                  </div>

                  {/* Chat History */}
                  <div className={`h-96 overflow-y-auto p-6 rounded-2xl mb-6 ${
                    isDarkMode ? 'bg-white/5' : 'bg-black/5'
                  }`}>
                    <div className="space-y-4">
                      {chatHistory.map((chat, index) => (
                        <div key={index} className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-3xl p-4 rounded-2xl ${
                            chat.type === 'user'
                              ? isDarkMode
                                ? 'bg-orange-500 text-white'
                                : 'bg-blue-500 text-white'
                              : isDarkMode
                                ? 'bg-white/10 text-white'
                                : 'bg-black/10 text-gray-900'
                          }`}>
                            <p className="whitespace-pre-line">{chat.message}</p>
                            <span className={`text-xs mt-2 block ${
                              chat.type === 'user' ? 'text-white/70' : isDarkMode ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                              {chat.time}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sample Questions */}
                  <div className="grid md:grid-cols-2 gap-4 mb-8">
                    {sampleQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => setChatMessage(question)}
                        className={`text-left p-4 rounded-xl border transition-all duration-300 group ${
                          isDarkMode 
                            ? 'bg-white/5 border-white/10 hover:bg-white/10' 
                            : 'bg-black/5 border-black/10 hover:bg-black/10'
                        }`}
                      >
                        <p className={`group-hover:text-current transition-colors ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          {question}
                        </p>
                      </button>
                    ))}
                  </div>

                  {/* Chat Input */}
                  <div className="flex space-x-4">
                    <input
                      type="text"
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      placeholder="Ask me anything about sports training, techniques, or strategies..."
                      className={`flex-1 px-6 py-4 rounded-2xl font-medium transition-all duration-300 ${
                        isDarkMode
                          ? 'bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-orange-500'
                          : 'bg-black/10 border border-black/20 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                      } focus:outline-none`}
                    />
                    <button className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center space-x-2 ${
                      isDarkMode
                        ? 'bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-400 hover:to-purple-500'
                        : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
                    } text-white shadow-lg hover:shadow-xl`}>
                      <Send className="w-5 h-5" />
                      <span>Ask AI</span>
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'posture' && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold mb-4">AI Posture Analysis</h3>
                    <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                      Upload your training videos or images for instant technique feedback
                    </p>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Upload Area */}
                    <div className="space-y-6">
                      <div className={`border-2 border-dashed rounded-3xl p-12 text-center transition-colors ${
                        isDarkMode 
                          ? 'border-white/30 hover:border-orange-400' 
                          : 'border-black/30 hover:border-blue-500'
                      }`}>
                        <input
                          type="file"
                          accept="image/*,video/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="file-upload"
                        />
                        <label htmlFor="file-upload" className="cursor-pointer">
                          <Upload className={`w-16 h-16 mx-auto mb-4 ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`} />
                          <p className="text-xl font-medium mb-2">Upload Image or Video</p>
                          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
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

                      {uploadedImage && (
                        <div className="rounded-2xl overflow-hidden">
                          <img src={uploadedImage} alt="Uploaded" className="w-full h-64 object-cover" />
                        </div>
                      )}

                      <button 
                        onClick={analyzePosture}
                        disabled={!uploadedImage || isAnalyzing}
                        className={`w-full py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                          uploadedImage && !isAnalyzing
                            ? isDarkMode
                              ? 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white'
                              : 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white'
                            : isDarkMode
                              ? 'bg-white/10 text-gray-500 cursor-not-allowed'
                              : 'bg-black/10 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {isAnalyzing ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Analyzing...</span>
                          </>
                        ) : (
                          <>
                            <Zap className="w-5 h-5" />
                            <span>Analyze Posture</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Analysis Results */}
                    <div className="space-y-6">
                      <h4 className="text-2xl font-bold mb-6">Analysis Results</h4>
                      <div className="space-y-4">
                        <div className={`flex items-center justify-between p-6 rounded-2xl ${
                          isDarkMode ? 'bg-green-500/20 border border-green-500/30' : 'bg-green-500/20 border border-green-500/30'
                        }`}>
                          <div className="flex items-center space-x-3">
                            <CheckCircle className="w-6 h-6 text-green-400" />
                            <span className="font-medium">Stance Balance</span>
                          </div>
                          <span className="text-green-400 font-bold">Excellent</span>
                        </div>
                        <div className={`flex items-center justify-between p-6 rounded-2xl ${
                          isDarkMode ? 'bg-yellow-500/20 border border-yellow-500/30' : 'bg-yellow-500/20 border border-yellow-500/30'
                        }`}>
                          <div className="flex items-center space-x-3">
                            <Target className="w-6 h-6 text-yellow-400" />
                            <span className="font-medium">Arm Position</span>
                          </div>
                          <span className="text-yellow-400 font-bold">Good</span>
                        </div>
                        <div className={`flex items-center justify-between p-6 rounded-2xl ${
                          isDarkMode ? 'bg-red-500/20 border border-red-500/30' : 'bg-red-500/20 border border-red-500/30'
                        }`}>
                          <div className="flex items-center space-x-3">
                            <ArrowRight className="w-6 h-6 text-red-400" />
                            <span className="font-medium">Follow Through</span>
                          </div>
                          <span className="text-red-400 font-bold">Needs Work</span>
                        </div>
                      </div>

                      {/* Recommendations */}
                      <div className={`p-6 rounded-2xl ${
                        isDarkMode ? 'bg-white/5' : 'bg-black/5'
                      }`}>
                        <h5 className="font-bold mb-3">AI Recommendations</h5>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-current rounded-full mt-2 flex-shrink-0"></div>
                            <span>Focus on extending your follow-through motion</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-current rounded-full mt-2 flex-shrink-0"></div>
                            <span>Practice slow-motion swings to improve muscle memory</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-current rounded-full mt-2 flex-shrink-0"></div>
                            <span>Consider working with a coach on technique refinement</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'progress' && (
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold mb-4">Your Progress Dashboard</h3>
                    <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                      Track your improvement with AI-powered insights
                    </p>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className={`text-center p-8 rounded-2xl ${
                      isDarkMode ? 'bg-white/5' : 'bg-black/5'
                    }`}>
                      <Award className={`w-16 h-16 mx-auto mb-4 ${
                        isDarkMode ? 'text-yellow-400' : 'text-yellow-500'
                      }`} />
                      <h4 className="text-4xl font-bold mb-2">{progressData.overallRating}%</h4>
                      <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Overall Rating</p>
                    </div>
                    <div className={`text-center p-8 rounded-2xl ${
                      isDarkMode ? 'bg-white/5' : 'bg-black/5'
                    }`}>
                      <Target className={`w-16 h-16 mx-auto mb-4 ${
                        isDarkMode ? 'text-green-400' : 'text-green-500'
                      }`} />
                      <h4 className="text-4xl font-bold mb-2">{progressData.sessionsCompleted}</h4>
                      <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Sessions Completed</p>
                    </div>
                    <div className={`text-center p-8 rounded-2xl ${
                      isDarkMode ? 'bg-white/5' : 'bg-black/5'
                    }`}>
                      <TrendingUp className={`w-16 h-16 mx-auto mb-4 ${
                        isDarkMode ? 'text-blue-400' : 'text-blue-500'
                      }`} />
                      <h4 className="text-4xl font-bold mb-2">+{progressData.improvementRate}%</h4>
                      <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Improvement Rate</p>
                    </div>
                  </div>

                  {/* Weekly Usage */}
                  <div className={`p-8 rounded-2xl ${
                    isDarkMode ? 'bg-white/5' : 'bg-black/5'
                  }`}>
                    <h4 className="text-xl font-bold mb-6">Weekly Usage</h4>
                    <div className="flex justify-between items-end h-32 space-x-2">
                      {[12, 8, 15, 10, 18, 14, 9].map((hours, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center">
                          <div 
                            className={`w-full rounded-t-lg ${
                              isDarkMode 
                                ? 'bg-gradient-to-t from-orange-500 to-red-600' 
                                : 'bg-gradient-to-t from-blue-500 to-cyan-400'
                            }`}
                            style={{ height: `${(hours / 20) * 100}%` }}
                          ></div>
                          <span className={`text-xs mt-2 ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Achievements */}
                  <div className={`p-8 rounded-2xl ${
                    isDarkMode ? 'bg-white/5' : 'bg-black/5'
                  }`}>
                    <h4 className="text-xl font-bold mb-6">Recent Achievements</h4>
                    <div className="space-y-4">
                      {progressData.achievements.map((achievement, index) => (
                        <div key={index} className={`flex items-center space-x-4 p-4 rounded-xl ${
                          isDarkMode ? 'bg-white/5' : 'bg-black/5'
                        }`}>
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            isDarkMode ? 'bg-white/10' : 'bg-black/10'
                          }`}>
                            <achievement.icon className={`w-6 h-6 ${
                              isDarkMode ? 'text-yellow-400' : 'text-yellow-500'
                            }`} />
                          </div>
                          <div className="flex-1">
                            <h5 className="font-bold mb-1">{achievement.title}</h5>
                            <p className={`text-sm ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              {achievement.description}
                            </p>
                          </div>
                          <span className={`text-sm ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            {achievement.date}
                          </span>
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
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className={`rounded-3xl p-12 text-center ${
              isDarkMode
                ? 'bg-gradient-to-r from-orange-500/20 to-purple-500/20 border border-orange-500/30'
                : 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30'
            }`}
          >
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to unlock your potential?
            </h3>
            <p className={`text-xl mb-8 max-w-2xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Join thousands of athletes who are already using AI Guru to enhance their performance and achieve their goals.
            </p>
            <button className={`px-12 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl ${
              isDarkMode
                ? 'bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-400 hover:to-purple-500'
                : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
            } text-white`}>
              Start Your AI Journey
            </button>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default AIGuru;