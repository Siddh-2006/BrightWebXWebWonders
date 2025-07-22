import React, { useState, useEffect } from 'react';
import { Play, Users, MessageCircle, TrendingUp, Clock, Vote, Trophy } from 'lucide-react';

const Live = () => {
  const [activeMatch, setActiveMatch] = useState(0);
  const [liveCount, setLiveCount] = useState(15420);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveCount(prev => prev + Math.floor(Math.random() * 10) - 5);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const upcomingMatches = [
    {
      id: 1,
      sport: 'Football',
      teams: { home: 'Barcelona', away: 'Real Madrid' },
      time: '2024-01-15 20:00',
      tournament: 'La Liga',
      image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 2,
      sport: 'Basketball',
      teams: { home: 'Lakers', away: 'Warriors' },
      time: '2024-01-16 02:30',
      tournament: 'NBA',
      image: 'https://images.pexels.com/photos/358042/pexels-photo-358042.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 3,
      sport: 'Cricket',
      teams: { home: 'India', away: 'Australia' },
      time: '2024-01-17 09:30',
      tournament: 'Test Series',
      image: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  const liveMatches = [
    {
      id: 1,
      sport: 'Football',
      teams: { home: 'Manchester United', away: 'Liverpool' },
      score: { home: 2, away: 1 },
      time: '78\'',
      viewers: 45200,
      status: 'live',
      prediction: { home: 45, away: 55 }
    },
    {
      id: 2,
      sport: 'Basketball',
      teams: { home: 'Lakers', away: 'Warriors' },
      score: { home: 98, away: 102 },
      time: '3rd Quarter',
      viewers: 32800,
      status: 'live',
      prediction: { home: 38, away: 62 }
    }
  ];

  const chatMessages = [
    { user: 'SportsFan2024', message: 'What a goal! 🔥', time: 'now' },
    { user: 'FootballGuru', message: 'Liverpool needs to step up their defense', time: '1m' },
    { user: 'RedDevil', message: 'UNITED! 🔴', time: '2m' },
    { user: 'LiverpoolFC', message: 'Still plenty of time left!', time: '3m' }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-orange-900/40 to-gray-900/80"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=1920)'
          }}
        ></div>
        
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6">
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Live Sports
            </span>
            <br />
            <span className="text-white">Action</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Watch live matches, chat with fans worldwide, and participate in real-time predictions.
          </p>
          <div className="flex items-center justify-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-lg shadow-red-500/50"></div>
            <span className="text-red-400 font-medium text-lg">{liveCount.toLocaleString()} viewers online</span>
            <div className="ml-4 flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm">12 live matches</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Live Matches */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <div className="relative">
                    <Play className="h-6 w-6 text-red-500 animate-pulse" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                  </div>
                  Live Matches
                </h2>
                <div className="flex items-center gap-2 bg-red-500/20 px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-red-400 font-medium">Live</span>
                </div>
              </div>

              {/* Match Selector */}
              <div className="flex flex-wrap gap-2 mb-6">
                {liveMatches.map((match, index) => (
                  <button
                    key={match.id}
                    onClick={() => setActiveMatch(index)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 ${
                      activeMatch === index
                        ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg shadow-red-500/30'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    {match.sport}
                    {activeMatch === index && (
                      <div className="inline-block ml-2 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    )}
                  </button>
                ))}
              </div>

              {/* Active Match */}
              {liveMatches[activeMatch] && (
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                        <div className="absolute inset-0 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                      </div>
                      <span className="text-sm text-gray-300 font-medium bg-gray-700 px-2 py-1 rounded">
                        {liveMatches[activeMatch].time}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300 bg-gray-700 px-3 py-1 rounded-full">
                      <Users className="h-4 w-4 text-blue-400" />
                      <span>{liveMatches[activeMatch].viewers.toLocaleString()} watching</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-6 bg-gray-700/50 rounded-lg p-4">
                    <div className="text-center flex-1">
                      <div className="text-lg font-semibold text-white mb-2">
                        {liveMatches[activeMatch].teams.home}
                      </div>
                      <div className="text-4xl font-bold text-orange-400 animate-pulse-glow">
                        {liveMatches[activeMatch].score.home}
                      </div>
                    </div>
                    <div className="text-center px-6">
                      <div className="text-sm text-gray-400 mb-1">VS</div>
                      <div className="text-xs text-gray-500 bg-gray-600 px-2 py-1 rounded">
                        {liveMatches[activeMatch].sport}
                      </div>
                    </div>
                    <div className="text-center flex-1">
                      <div className="text-lg font-semibold text-white mb-2">
                        {liveMatches[activeMatch].teams.away}
                      </div>
                      <div className="text-4xl font-bold text-red-400 animate-pulse-glow">
                        {liveMatches[activeMatch].score.away}
                      </div>
                    </div>
                  </div>

                  {/* Prediction Poll */}
                  <div className="bg-gray-900 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Vote className="h-4 w-4 text-purple-400" />
                      <span className="text-sm font-medium text-white">Fan Predictions</span>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1 bg-gray-700 rounded-full h-2 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-500"
                          style={{ width: `${liveMatches[activeMatch].prediction.home}%` }}
                        ></div>
                      </div>
                      <div className="flex-1 bg-gray-700 rounded-full h-2 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                          style={{ width: `${liveMatches[activeMatch].prediction.away}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>{liveMatches[activeMatch].prediction.home}%</span>
                      <span>{liveMatches[activeMatch].prediction.away}%</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Upcoming Matches */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-orange-500/20">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Clock className="h-6 w-6 text-orange-400" />
                Upcoming Matches
              </h2>
              
              <div className="space-y-4">
                {upcomingMatches.map((match) => (
                  <div key={match.id} className="bg-gray-800 rounded-lg p-4 flex items-center gap-4">
                    <img 
                      src={match.image} 
                      alt={match.sport}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white font-semibold">
                          {match.teams.home} vs {match.teams.away}
                        </span>
                        <span className="bg-orange-500 text-white px-2 py-1 rounded text-xs">
                          {match.sport}
                        </span>
                      </div>
                      <div className="text-sm text-gray-400">
                        {match.tournament} • {new Date(match.time).toLocaleString()}
                      </div>
                    </div>
                    <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg text-sm hover:from-orange-600 hover:to-red-600 transition-all duration-300">
                      Set Reminder
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Live Chat */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-orange-500/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-blue-400" />
                  Live Chat
                </h3>
                <span className="text-sm text-gray-400">2.4k online</span>
              </div>

              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {chatMessages.map((msg, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-xs font-bold">
                      {msg.user[0]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-white">{msg.user}</span>
                        <span className="text-xs text-gray-400">{msg.time}</span>
                      </div>
                      <p className="text-gray-300 text-sm">{msg.message}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300">
                  Send
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-orange-500/20">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-400" />
                Today's Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Live Matches</span>
                  <span className="text-white font-bold">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Total Viewers</span>
                  <span className="text-green-400 font-bold">2.3M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Predictions Made</span>
                  <span className="text-blue-400 font-bold">156K</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Chat Messages</span>
                  <span className="text-purple-400 font-bold">890K</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Live;