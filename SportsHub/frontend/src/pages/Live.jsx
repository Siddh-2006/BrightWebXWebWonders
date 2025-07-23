import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Radio, Users, MessageCircle, BarChart3, Clock, MapPin, Trophy, Search,
  Filter, Play, Eye, Star, Calendar, Target, Zap
} from 'lucide-react';

const Live = ({ isDarkMode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSport, setSelectedSport] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const matches = [
    {
      id: 1,
      sport: 'Football',
      homeTeam: 'Thunder FC',
      awayTeam: 'Lightning United',
      homeScore: 2,
      awayScore: 1,
      status: 'live',
      time: '78\'',
      venue: 'Thunder Stadium',
      viewers: 15420,
      league: 'Premier League',
      homeImage: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=400&q=80',
      awayImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 2,
      sport: 'Basketball',
      homeTeam: 'Court Kings',
      awayTeam: 'Hoops Elite',
      homeScore: 89,
      awayScore: 92,
      status: 'live',
      time: 'Q4 2:45',
      venue: 'Kings Arena',
      viewers: 8750,
      league: 'Championship',
      homeImage: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=400&q=80',
      awayImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 3,
      sport: 'Tennis',
      homeTeam: 'Emma Thompson',
      awayTeam: 'Sarah Wilson',
      homeScore: 2,
      awayScore: 1,
      status: 'live',
      time: 'Set 3',
      venue: 'Center Court',
      viewers: 3420,
      league: 'Grand Slam',
      homeImage: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=400&q=80',
      awayImage: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 4,
      sport: 'Cricket',
      homeTeam: 'Royal Cricketers',
      awayTeam: 'Boundary Hunters',
      homeScore: 245,
      awayScore: 180,
      status: 'upcoming',
      time: '19:30',
      venue: 'Cricket Ground',
      viewers: 0,
      league: 'T20 League',
      homeImage: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=400&q=80',
      awayImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 5,
      sport: 'Swimming',
      homeTeam: 'Aqua Sharks',
      awayTeam: 'Wave Riders',
      homeScore: 0,
      awayScore: 0,
      status: 'upcoming',
      time: '20:00',
      venue: 'Aquatic Center',
      viewers: 0,
      league: 'Championship',
      homeImage: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=400&q=80',
      awayImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 6,
      sport: 'Football',
      homeTeam: 'Storm City',
      awayTeam: 'Phoenix United',
      homeScore: 3,
      awayScore: 2,
      status: 'finished',
      time: 'FT',
      venue: 'Storm Arena',
      viewers: 12340,
      league: 'Premier League',
      homeImage: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=400&q=80',
      awayImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&q=80'
    }
  ];

  const sports = ['all', 'Football', 'Basketball', 'Tennis', 'Cricket', 'Swimming'];
  const statuses = ['all', 'live', 'upcoming', 'finished'];

  const filteredMatches = matches.filter(match => {
    const matchesSport = selectedSport === 'all' || match.sport === selectedSport;
    const matchesStatus = selectedStatus === 'all' || match.status === selectedStatus;
    const matchesSearch = searchTerm === '' || 
      match.homeTeam.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.awayTeam.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.league.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.venue.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSport && matchesStatus && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'live': return isDarkMode ? 'bg-red-500' : 'bg-red-500';
      case 'upcoming': return isDarkMode ? 'bg-blue-500' : 'bg-blue-500';
      case 'finished': return isDarkMode ? 'bg-gray-500' : 'bg-gray-500';
      default: return isDarkMode ? 'bg-gray-500' : 'bg-gray-500';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'live': return 'LIVE';
      case 'upcoming': return 'UPCOMING';
      case 'finished': return 'FINISHED';
      default: return status.toUpperCase();
    }
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
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-64 h-64 border-2 border-current rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 border-2 border-current rounded-lg rotate-45 animate-bounce"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className={`${
                isDarkMode 
                  ? 'bg-gradient-to-r from-red-400 to-pink-500' 
                  : 'bg-gradient-to-r from-red-500 to-pink-600'
              } bg-clip-text text-transparent`}>Live</span> Matches
            </h1>
            <p className={`text-xl md:text-2xl max-w-4xl mx-auto mb-12 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Watch live matches, engage with community, and never miss the action
            </p>

            {/* Search and Filters */}
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search matches, teams, leagues, or venues..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full pl-12 pr-4 py-4 rounded-2xl font-medium transition-all duration-300 ${
                      isDarkMode
                        ? 'bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 focus:border-red-500'
                        : 'bg-black/10 backdrop-blur-md border border-black/20 text-gray-900 placeholder-gray-500 focus:border-red-500'
                    } focus:outline-none`}
                  />
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {/* Sport Filter */}
                  <select
                    value={selectedSport}
                    onChange={(e) => setSelectedSport(e.target.value)}
                    className={`px-4 py-4 rounded-2xl font-medium transition-all duration-300 ${
                      isDarkMode
                        ? 'bg-white/10 backdrop-blur-md border border-white/20 text-white focus:border-red-500'
                        : 'bg-black/10 backdrop-blur-md border border-black/20 text-gray-900 focus:border-red-500'
                    } focus:outline-none`}
                  >
                    {sports.map((sport) => (
                      <option key={sport} value={sport} className={isDarkMode ? 'bg-gray-800' : 'bg-white'}>
                        {sport === 'all' ? 'All Sports' : sport}
                      </option>
                    ))}
                  </select>

                  {/* Status Filter */}
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className={`px-4 py-4 rounded-2xl font-medium transition-all duration-300 ${
                      isDarkMode
                        ? 'bg-white/10 backdrop-blur-md border border-white/20 text-white focus:border-red-500'
                        : 'bg-black/10 backdrop-blur-md border border-black/20 text-gray-900 focus:border-red-500'
                    } focus:outline-none`}
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status} className={isDarkMode ? 'bg-gray-800' : 'bg-white'}>
                        {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Live Matches Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {filteredMatches.map((match, index) => (
              <motion.div
                key={match.id}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`group relative overflow-hidden rounded-3xl transition-all duration-300 hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10' 
                    : 'bg-black/5 backdrop-blur-md border border-black/10 hover:bg-black/10'
                }`}
              >
                {/* Match Header */}
                <div className="p-6 border-b border-current/10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className={`${getStatusColor(match.status)} text-white px-3 py-1 rounded-full text-sm font-bold flex items-center space-x-1`}>
                        {match.status === 'live' && <Radio className="w-3 h-3 animate-pulse" />}
                        <span>{getStatusText(match.status)}</span>
                      </span>
                      <span className={`text-sm font-medium ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {match.sport}
                      </span>
                    </div>
                    <span className={`text-sm font-medium ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {match.league}
                    </span>
                  </div>

                  {/* Teams and Score */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <img 
                          src={match.homeImage} 
                          alt={match.homeTeam}
                          className="w-12 h-12 rounded-full object-cover border-2 border-current/20"
                        />
                        <span className="font-semibold text-lg">{match.homeTeam}</span>
                      </div>
                      <span className="text-3xl font-bold">{match.homeScore}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <img 
                          src={match.awayImage} 
                          alt={match.awayTeam}
                          className="w-12 h-12 rounded-full object-cover border-2 border-current/20"
                        />
                        <span className="font-semibold text-lg">{match.awayTeam}</span>
                      </div>
                      <span className="text-3xl font-bold">{match.awayScore}</span>
                    </div>
                  </div>
                </div>

                {/* Match Info */}
                <div className="p-6">
                  <div className={`flex items-center justify-between text-sm mb-6 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{match.time}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{match.venue}</span>
                      </div>
                    </div>
                    {match.status === 'live' && match.viewers > 0 && (
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{match.viewers.toLocaleString()} watching</span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    {match.status === 'live' ? (
                      <>
                        <button className={`flex-1 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                          isDarkMode
                            ? 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-400 hover:to-pink-500'
                            : 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700'
                        } text-white shadow-lg hover:shadow-xl`}>
                          <Radio className="w-5 h-5" />
                          <span>Watch Live</span>
                        </button>
                        <button className={`px-4 py-3 rounded-2xl transition-all duration-300 ${
                          isDarkMode 
                            ? 'bg-white/10 hover:bg-white/20' 
                            : 'bg-black/10 hover:bg-black/20'
                        }`}>
                          <MessageCircle className="w-5 h-5" />
                        </button>
                        <button className={`px-4 py-3 rounded-2xl transition-all duration-300 ${
                          isDarkMode 
                            ? 'bg-white/10 hover:bg-white/20' 
                            : 'bg-black/10 hover:bg-black/20'
                        }`}>
                          <BarChart3 className="w-5 h-5" />
                        </button>
                      </>
                    ) : match.status === 'upcoming' ? (
                      <button className={`flex-1 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                        isDarkMode
                          ? 'bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-400 hover:to-cyan-300'
                          : 'bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500'
                      } text-white shadow-lg hover:shadow-xl`}>
                        <Calendar className="w-5 h-5" />
                        <span>Set Reminder</span>
                      </button>
                    ) : (
                      <button className={`flex-1 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                        isDarkMode
                          ? 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600'
                          : 'bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700'
                      } text-white shadow-lg hover:shadow-xl`}>
                        <Play className="w-5 h-5" />
                        <span>Watch Highlights</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Hover Effect */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none ${
                  match.status === 'live'
                    ? 'bg-gradient-to-r from-red-500/5 to-pink-500/5'
                    : match.status === 'upcoming'
                      ? 'bg-gradient-to-r from-blue-500/5 to-cyan-400/5'
                      : 'bg-gradient-to-r from-gray-500/5 to-gray-600/5'
                }`}></div>
              </motion.div>
            ))}
          </div>

          {/* No Results */}
          {filteredMatches.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Trophy className={`w-20 h-20 mx-auto mb-6 ${
                isDarkMode ? 'text-gray-600' : 'text-gray-400'
              }`} />
              <h3 className={`text-2xl font-bold mb-4 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                No matches found
              </h3>
              <p className={isDarkMode ? 'text-gray-500' : 'text-gray-500'}>
                Try adjusting your search or filter criteria
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className={`rounded-3xl p-12 text-center ${
              isDarkMode
                ? 'bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/30'
                : 'bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/30'
            }`}
          >
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Want to broadcast your match?
            </h3>
            <p className={`text-xl mb-8 max-w-2xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Connect with our streaming platform and share your games with the world
            </p>
            <button className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-300 ${
              isDarkMode
                ? 'bg-white text-red-600 hover:bg-gray-100'
                : 'bg-black text-red-400 hover:bg-gray-900'
            }`}>
              Start Broadcasting
            </button>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Live;