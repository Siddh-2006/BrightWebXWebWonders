import React, { useState } from 'react';
import { User, Trophy, Target, Brain, Activity, Settings, Edit, Award, TrendingUp } from 'lucide-react';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', name: 'Overview', icon: User },
    { id: 'achievements', name: 'Achievements', icon: Trophy },
    { id: 'ai-coach', name: 'AI Coach', icon: Brain },
    { id: 'health', name: 'Health', icon: Activity },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  const userStats = {
    name: 'Alex Johnson',
    sport: 'Football',
    level: 'Intermediate',
    coins: 1250,
    rank: 'Gold',
    joinDate: 'January 2024',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400'
  };

  const achievements = [
    { name: 'Quiz Master', description: 'Completed 50 quizzes', icon: '🧠', earned: true },
    { name: 'Community Star', description: 'Top contributor this month', icon: '⭐', earned: true },
    { name: 'Sports Enthusiast', description: 'Active for 30 days', icon: '🏃', earned: true },
    { name: 'Prediction Pro', description: 'Correct predictions streak', icon: '🔮', earned: false },
    { name: 'Social Butterfly', description: 'Connected with 100 fans', icon: '🦋', earned: false }
  ];

  const healthMetrics = {
    fitnessScore: 85,
    cardio: 'Excellent',
    strength: 'Good',
    flexibility: 'Needs Work',
    bmi: 22.5,
    lastCheckup: '2 weeks ago'
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-orange-500/20 text-center">
                <div className="text-2xl font-bold text-orange-400">{userStats.coins}</div>
                <div className="text-sm text-gray-400">Coins</div>
              </div>
              <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-orange-500/20 text-center">
                <div className="text-2xl font-bold text-blue-400">{userStats.rank}</div>
                <div className="text-sm text-gray-400">Rank</div>
              </div>
              <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-orange-500/20 text-center">
                <div className="text-2xl font-bold text-green-400">{userStats.level}</div>
                <div className="text-sm text-gray-400">Level</div>
              </div>
              <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-orange-500/20 text-center">
                <div className="text-2xl font-bold text-purple-400">{userStats.sport}</div>
                <div className="text-sm text-gray-400">Main Sport</div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-orange-500/20">
              <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                  <Trophy className="h-5 w-5 text-yellow-400" />
                  <div>
                    <div className="text-white font-medium">Completed Football Quiz</div>
                    <div className="text-sm text-gray-400">Earned 50 coins • 2 hours ago</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                  <Target className="h-5 w-5 text-green-400" />
                  <div>
                    <div className="text-white font-medium">Joined Manchester United FC</div>
                    <div className="text-sm text-gray-400">New club member • 1 day ago</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                  <Brain className="h-5 w-5 text-blue-400" />
                  <div>
                    <div className="text-white font-medium">AI Coach Session</div>
                    <div className="text-sm text-gray-400">Posture analysis completed • 3 days ago</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'achievements':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <div key={index} className={`bg-white/5 backdrop-blur-md rounded-xl p-6 border transition-all duration-300 ${
                  achievement.earned 
                    ? 'border-orange-500/40 bg-orange-500/5' 
                    : 'border-gray-600/20 opacity-60'
                }`}>
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold mb-1">{achievement.name}</h3>
                      <p className="text-gray-400 text-sm">{achievement.description}</p>
                    </div>
                    {achievement.earned && (
                      <Award className="h-6 w-6 text-orange-400" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'ai-coach':
        return (
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-orange-500/20">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Brain className="h-6 w-6 text-blue-400" />
                AI Coach Dashboard
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-800 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-400">15</div>
                  <div className="text-sm text-gray-400">Sessions</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-400">8.5</div>
                  <div className="text-sm text-gray-400">Avg Rating</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-orange-400">92%</div>
                  <div className="text-sm text-gray-400">Improvement</div>
                </div>
              </div>

              <div className="space-y-4">
                <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300">
                  Start New AI Session
                </button>
                <button className="w-full bg-white/10 text-white py-3 rounded-lg font-semibold hover:bg-white/20 transition-all duration-300">
                  Upload Posture Image
                </button>
                <button className="w-full bg-white/10 text-white py-3 rounded-lg font-semibold hover:bg-white/20 transition-all duration-300">
                  View Training History
                </button>
              </div>
            </div>
          </div>
        );

      case 'health':
        return (
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-orange-500/20">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Activity className="h-6 w-6 text-green-400" />
                Health Overview
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white">Fitness Score</span>
                      <span className="text-green-400 font-bold">{healthMetrics.fitnessScore}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${healthMetrics.fitnessScore}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Cardio Endurance</span>
                      <span className="text-green-400">{healthMetrics.cardio}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Strength</span>
                      <span className="text-blue-400">{healthMetrics.strength}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Flexibility</span>
                      <span className="text-orange-400">{healthMetrics.flexibility}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">BMI</span>
                      <span className="text-green-400">{healthMetrics.bmi}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-3">Health Recommendations</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Increase flexibility training</li>
                    <li>• Maintain current cardio routine</li>
                    <li>• Add strength training 2x/week</li>
                    <li>• Stay hydrated during workouts</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <button className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-300">
                  Update Health Data
                </button>
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-orange-500/20">
              <h3 className="text-xl font-bold text-white mb-6">Account Settings</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-white font-medium mb-2">Display Name</label>
                  <input 
                    type="text" 
                    value={userStats.name}
                    className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                
                <div>
                  <label className="block text-white font-medium mb-2">Primary Sport</label>
                  <select className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                    <option>Football</option>
                    <option>Basketball</option>
                    <option>Cricket</option>
                    <option>Tennis</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-white font-medium mb-2">Notifications</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="text-gray-300">Match updates</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="text-gray-300">Quiz reminders</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-gray-300">Marketing emails</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex gap-4">
                <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300">
                  Save Changes
                </button>
                <button className="bg-white/10 text-white px-6 py-2 rounded-lg font-semibold hover:bg-white/20 transition-all duration-300">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-orange-500/20 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <img 
                src={userStats.avatar} 
                alt={userStats.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-orange-500"
              />
              <button className="absolute bottom-0 right-0 bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition-colors">
                <Edit className="h-4 w-4" />
              </button>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-white mb-2">{userStats.name}</h1>
              <p className="text-gray-300 mb-4">
                {userStats.level} {userStats.sport} Player • Member since {userStats.joinDate}
              </p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <div className="flex items-center gap-2 bg-orange-500/20 px-3 py-1 rounded-full">
                  <Trophy className="h-4 w-4 text-orange-400" />
                  <span className="text-orange-400 font-semibold">{userStats.coins} coins</span>
                </div>
                <div className="flex items-center gap-2 bg-blue-500/20 px-3 py-1 rounded-full">
                  <Award className="h-4 w-4 text-blue-400" />
                  <span className="text-blue-400 font-semibold">{userStats.rank} Rank</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.name}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Profile;