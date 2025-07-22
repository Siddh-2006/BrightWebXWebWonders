import React from 'react';
import { Brain, Users, Trophy, Camera, MessageCircle, Gift } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI Coach',
      description: 'Get personalized training advice and posture correction from our advanced AI system.',
      color: 'from-blue-500 to-purple-500',
      audience: 'Players'
    },
    {
      icon: Users,
      title: 'Fan Engagement',
      description: 'Join communities, participate in quizzes, and earn coins for exclusive merchandise.',
      color: 'from-green-500 to-blue-500',
      audience: 'Fans'
    },
    {
      icon: Trophy,
      title: 'Club Management',
      description: 'Manage your team, challenge other clubs, and discover new talent.',
      color: 'from-orange-500 to-red-500',
      audience: 'Clubs'
    },
    {
      icon: Camera,
      title: 'Live Streaming',
      description: 'Watch live matches with real-time chat and prediction polls.',
      color: 'from-purple-500 to-pink-500',
      audience: 'All'
    },
    {
      icon: MessageCircle,
      title: 'Community',
      description: 'Connect with verified clubs, players, and passionate fans worldwide.',
      color: 'from-cyan-500 to-blue-500',
      audience: 'All'
    },
    {
      icon: Gift,
      title: 'Rewards',
      description: 'Earn points through activities and redeem them for exclusive sports merchandise.',
      color: 'from-yellow-500 to-orange-500',
      audience: 'Fans'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="gradient-text">Features for Everyone</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Whether you're a passionate fan, aspiring player, or club manager, SportsHub has something special for you.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card glass p-6 hover:scale-105 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${feature.color} mr-4`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                  <span className="text-sm text-gray-400">{feature.audience}</span>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Audience Tabs */}
        <div className="mt-16 text-center">
          <div className="inline-flex glass rounded-full p-2 mb-8">
            <button className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium">
              For Fans
            </button>
            <button className="px-6 py-2 rounded-full text-gray-300 hover:text-white transition-colors">
              For Players
            </button>
            <button className="px-6 py-2 rounded-full text-gray-300 hover:text-white transition-colors">
              For Clubs
            </button>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-10 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 right-20 w-3 h-3 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-orange-500 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
    </section>
  );
};

export default Features;