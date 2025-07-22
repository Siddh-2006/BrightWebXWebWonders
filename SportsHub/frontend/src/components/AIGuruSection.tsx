import React, { useState } from 'react';
import { Brain, Camera, Target, TrendingUp, MessageCircle, Upload, Zap, Award, BarChart3 } from 'lucide-react';

const AIGuruSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'posture' | 'progress'>('chat');
  const [chatMessage, setChatMessage] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const features = [
    {
      icon: MessageCircle,
      title: 'AI Sports Coach',
      description: 'Ask any question about sports techniques, strategies, or training methods',
      color: 'from-blue-500 to-cyan-400'
    },
    {
      icon: Camera,
      title: 'Posture Analysis',
      description: 'Upload your form videos for AI-powered technique correction',
      color: 'from-purple-500 to-pink-400'
    },
    {
      icon: TrendingUp,
      title: 'Progress Tracking',
      description: 'Monitor your improvement with personalized analytics and insights',
      color: 'from-green-500 to-emerald-400'
    }
  ];

  const sampleQuestions = [
    "How can I improve my football shooting accuracy?",
    "What's the best training routine for basketball?",
    "How to perfect my tennis serve technique?",
    "Best nutrition plan for endurance sports?"
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

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
              <Brain className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            AI <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Guru</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Your personal AI sports coach, available 24/7 to help you reach peak performance through 
            intelligent guidance, posture analysis, and personalized training insights.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="group relative">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 h-full">
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive AI Interface */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 overflow-hidden">
          {/* Tab Navigation */}
          <div className="flex border-b border-white/20">
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
                    ? 'bg-blue-500/20 text-blue-300 border-b-2 border-blue-400'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'chat' && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-4">Ask Your AI Sports Coach</h3>
                  <p className="text-gray-300">Get instant answers to any sports-related question</p>
                </div>

                {/* Sample Questions */}
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  {sampleQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => setChatMessage(question)}
                      className="text-left p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 group"
                    >
                      <p className="text-gray-300 group-hover:text-white transition-colors">{question}</p>
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
                    className="flex-1 px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
                  />
                  <button className="bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 flex items-center space-x-2">
                    <Zap className="w-5 h-5" />
                    <span>Ask AI</span>
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'posture' && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-4">AI Posture Analysis</h3>
                  <p className="text-gray-300">Upload your training videos for instant technique feedback</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Upload Area */}
                  <div className="space-y-6">
                    <div className="border-2 border-dashed border-white/30 rounded-2xl p-8 text-center hover:border-blue-400 transition-colors">
                      <input
                        type="file"
                        accept="image/*,video/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="file-upload"
                      />
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-lg font-medium mb-2">Upload Image or Video</p>
                        <p className="text-gray-400">Drag & drop or click to select</p>
                      </label>
                    </div>

                    {uploadedImage && (
                      <div className="rounded-xl overflow-hidden">
                        <img src={uploadedImage} alt="Uploaded" className="w-full h-48 object-cover" />
                      </div>
                    )}

                    <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 py-4 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
                      Analyze Posture
                    </button>
                  </div>

                  {/* Analysis Results */}
                  <div className="space-y-4">
                    <h4 className="text-xl font-bold mb-4">Analysis Results</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 bg-green-500/20 rounded-xl border border-green-500/30">
                        <span>Stance Balance</span>
                        <span className="text-green-400 font-bold">Excellent</span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-yellow-500/20 rounded-xl border border-yellow-500/30">
                        <span>Arm Position</span>
                        <span className="text-yellow-400 font-bold">Good</span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-red-500/20 rounded-xl border border-red-500/30">
                        <span>Follow Through</span>
                        <span className="text-red-400 font-bold">Needs Work</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'progress' && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-4">Your Progress Dashboard</h3>
                  <p className="text-gray-300">Track your improvement with AI-powered insights</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white/5 rounded-2xl p-6 text-center">
                    <Award className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                    <h4 className="text-2xl font-bold mb-2">85%</h4>
                    <p className="text-gray-300">Overall Rating</p>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-6 text-center">
                    <Target className="w-12 h-12 text-green-400 mx-auto mb-4" />
                    <h4 className="text-2xl font-bold mb-2">127</h4>
                    <p className="text-gray-300">Sessions Completed</p>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-6 text-center">
                    <TrendingUp className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                    <h4 className="text-2xl font-bold mb-2">+23%</h4>
                    <p className="text-gray-300">Improvement Rate</p>
                  </div>
                </div>

                <div className="bg-white/5 rounded-2xl p-6">
                  <h4 className="text-xl font-bold mb-4">Recent Achievements</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                      <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                        <Award className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">Perfect Posture Week</p>
                        <p className="text-sm text-gray-400">Maintained excellent form for 7 days</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <Target className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">Consistency Champion</p>
                        <p className="text-sm text-gray-400">Used AI Guru for 30 consecutive days</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl p-12 border border-white/20">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to unlock your potential?
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of athletes who are already using AI Guru to enhance their performance and achieve their goals.
            </p>
            <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-12 py-4 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl">
              Start Your AI Journey
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIGuruSection;