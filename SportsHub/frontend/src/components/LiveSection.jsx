import React, { useState, useEffect } from 'react';
import { Play, Users, MessageCircle, TrendingUp, Clock, Star, Trophy, Vote } from 'lucide-react';

const LiveSection = () => {
  const [activeMatch, setActiveMatch] = useState(0);
  const [liveCount, setLiveCount] = useState(15420);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveCount(prev => prev + Math.floor(Math.random() * 10) - 5);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

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
    },
    {
      id: 3,
      sport: 'Cricket',
      teams: { home: 'India', away: 'Australia' },
      score: { home: 245, away: 198 },
      time: '45.2 overs',
      viewers: 89600,
      status: 'live',
      prediction: { home: 67, away: 33 }
    }
  ];

  const newsItems = [
    {
      title: 'Champions League Final Set for Historic Showdown',
      time: '2 hours ago',
      category: 'Football',
      verified: true
    },
    {
      title: 'NBA Draft Predictions: Top 5 Prospects',
      time: '4 hours ago',
      category: 'Basketball',
      verified: true
    },
    {
      title: 'World Cup Qualifiers: Upset Victory Changes Everything',
      time: '6 hours ago',
      category: 'Cricket',
      verified: true
    }
  ];

  const chatMessages = [
    { user: 'SportsFan2024', message: 'What a goal! 🔥', time: 'now' },
    { user: 'FootballGuru', message: 'Liverpool needs to step up their defense', time: '1m' },
    { user: 'RedDevil', message: 'UNITED! 🔴', time: '2m' },
    { user: 'LiverpoolFC', message: 'Still plenty of time left!', time: '3m' }
  ];

  return (
    <section id="live" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="gradient-text">Live Sports Hub</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Watch live matches, chat with fans worldwide, and participate in real-time predictions.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-red-400 font-medium">{liveCount.toLocaleString()} viewers online</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Live Matches */}
          <div className="lg:col-span-2">
            <div className="glass rounded-2xl p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Play className="h-6 w-6 text-red-500" />
                  Live Matches
                </h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-400">Live</span>
                </div>
              </div>

              {/* Match Selector */}
              <div className="flex flex-wrap gap-2 mb-6">
                {liveMatches.map((match, index) => (
                  <button
                    key={match.id}
                    onClick={() => setActiveMatch(index)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeMatch === index
                        ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    {match.sport}
                  </button>
                ))}
              </div>

              {/* Active Match */}
              <div className="bg-gray-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-400">
                      {liveMatches[activeMatch].time}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Users className="h-4 w-4" />
                    <span>{liveMatches[activeMatch].viewers.toLocaleString()} watching</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-white">
                      {liveMatches[activeMatch].teams.home}
                    </div>
                    <div className="text-3xl font-bold text-blue-400 mt-2">
                      {liveMatches[activeMatch].score.home}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-400">VS</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {liveMatches[activeMatch].sport}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-white">
                      {liveMatches[activeMatch].teams.away}
                    </div>
                    <div className="text-3xl font-bold text-orange-400 mt-2">
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
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                        style={{ width: `${liveMatches[activeMatch].prediction.home}%` }}
                      ></div>
                    </div>
                    <div className="flex-1 bg-gray-700 rounded-full h-2 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-500"
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
            </div>

            {/* Live Chat */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-blue-400" />
                  Live Chat
                </h3>
                <span className="text-sm text-gray-400">2.4k online</span>
              </div>

              <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                {chatMessages.map((msg, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-xs font-bold">
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
                  className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="btn-primary px-4 py-2">
                  Send
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Trending News */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-400" />
                Trending News
              </h3>
              <div className="space-y-4">
                {newsItems.map((news, index) => (
                  <div key={index} className="border-b border-gray-700 pb-3 last:border-b-0 last:pb-0">
                    <div className="flex items-start gap-2 mb-2">
                      <h4 className="text-sm font-medium text-white leading-tight">{news.title}</h4>
                      {news.verified && (
                        <Star className="h-3 w-3 text-blue-400 fill-current flex-shrink-0 mt-0.5" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <Clock className="h-3 w-3" />
                      <span>{news.time}</span>
                      <span className="text-gray-500">•</span>
                      <span className="text-blue-400">{news.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-400" />
                Today's Highlights
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Active Matches</span>
                  <span className="text-white font-bold">47</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Live Viewers</span>
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
    </section>
  );
};

export default LiveSection;