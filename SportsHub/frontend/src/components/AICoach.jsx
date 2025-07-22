import React, { useState } from 'react';
import { Brain, Camera, Activity, MessageSquare, Zap, Target, Award, TrendingUp } from 'lucide-react';

const AICoach = () => {
  const [activeTab, setActiveTab] = useState('advice');

  const features = [
    {
      id: 'advice',
      title: 'AI Training Advice',
      icon: Brain,
      description: 'Get personalized training recommendations based on your sport and skill level.',
      color: 'from-blue-500 to-purple-500'
    },
    {
      id: 'posture',
      title: 'Posture Correction',
      icon: Camera,
      description: 'Upload your form and get instant feedback on technique and posture.',
      color: 'from-green-500 to-blue-500'
    },
    {
      id: 'health',
      title: 'Health Analysis',
      icon: Activity,
      description: 'Comprehensive fitness assessment and personalized health recommendations.',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const examples = [
    { question: 'How to improve my fast bowling speed?', category: 'Cricket' },
    { question: 'Best diet plan for basketball players?', category: 'Basketball' },
    { question: 'How to score a perfect three-pointer?', category: 'Basketball' },
    { question: 'Swimming technique for freestyle?', category: 'Swimming' },
    { question: 'How to dribble like Messi?', category: 'Football' },
    { question: 'Checkmate in 4 moves strategy?', category: 'Chess' }
  ];

  return (
    <section id="ai-coach" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="gradient-text">AI Sports Guru</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Your personal AI coach available 24/7. Get instant advice, posture correction, and health insights powered by advanced artificial intelligence.
          </p>
        </div>

        {/* Feature Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {features.map((feature) => (
            <button
              key={feature.id}
              onClick={() => setActiveTab(feature.id)}
              className={`glass px-6 py-3 rounded-full flex items-center gap-3 transition-all duration-300 ${
                activeTab === feature.id ? `bg-gradient-to-r ${feature.color}` : 'hover:bg-white/20'
              }`}
            >
              <feature.icon className="h-5 w-5" />
              <span className="font-medium">{feature.title}</span>
            </button>
          ))}
        </div>

        {/* Active Feature Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="mb-8">
              <h3 className="text-3xl font-bold mb-4 flex items-center gap-4">
                {React.createElement(features.find(f => f.id === activeTab)?.icon, {
                  className: `h-10 w-10 text-blue-400`
                })}
                <span className="gradient-text">
                  {features.find(f => f.id === activeTab)?.title}
                </span>
              </h3>
              <p className="text-xl text-gray-300 mb-6">
                {features.find(f => f.id === activeTab)?.description}
              </p>
            </div>

            {/* Example Questions */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white mb-4">Popular Questions:</h4>
              {examples.slice(0, 4).map((example, index) => (
                <div key={index} className="glass p-4 rounded-lg hover:bg-white/20 transition-all duration-300 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="h-4 w-4 text-blue-400" />
                      <span className="text-gray-300">{example.question}</span>
                    </div>
                    <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">
                      {example.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button className="btn-primary mt-6 flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Ask AI Coach
            </button>
          </div>

          <div className="relative">
            <div className="glass rounded-2xl p-8">
              {activeTab === 'advice' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <Brain className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white">AI Training Assistant</h4>
                      <p className="text-gray-400">Always ready to help</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800 rounded-lg p-4">
                    <p className="text-gray-300 mb-2">💬 "How can I improve my sprint speed?"</p>
                    <p className="text-blue-400 text-sm">🤖 AI Coach is typing...</p>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Zap className="h-4 w-4" />
                      <span>Instant Response</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Target className="h-4 w-4" />
                      <span>Personalized</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="h-4 w-4" />
                      <span>Expert Level</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'posture' && (
                <div className="space-y-6">
                  <div className="text-center">
                    <Camera className="h-16 w-16 text-green-400 mx-auto mb-4" />
                    <h4 className="text-xl font-bold text-white mb-2">Posture Analysis</h4>
                    <p className="text-gray-400">Upload your form video or image</p>
                  </div>
                  
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                    <p className="text-gray-400 mb-4">Drop your video here or click to upload</p>
                    <button className="btn-primary">Choose File</button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center">
                      <TrendingUp className="h-6 w-6 text-green-400 mx-auto mb-2" />
                      <span className="text-gray-400">Instant Analysis</span>
                    </div>
                    <div className="text-center">
                      <Award className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                      <span className="text-gray-400">Expert Tips</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'health' && (
                <div className="space-y-6">
                  <div className="text-center">
                    <Activity className="h-16 w-16 text-orange-400 mx-auto mb-4" />
                    <h4 className="text-xl font-bold text-white mb-2">Health Assessment</h4>
                    <p className="text-gray-400">Comprehensive fitness analysis</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="glass p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-green-400">85%</div>
                      <div className="text-sm text-gray-400">Fitness Score</div>
                    </div>
                    <div className="glass p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-blue-400">A+</div>
                      <div className="text-sm text-gray-400">Health Grade</div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Cardio Endurance</span>
                      <span className="text-green-400">Excellent</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Strength</span>
                      <span className="text-blue-400">Good</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Flexibility</span>
                      <span className="text-orange-400">Needs Work</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Background Animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
    </section>
  );
};

export default AICoach;