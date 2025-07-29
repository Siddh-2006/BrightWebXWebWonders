import React, { useState, useEffect } from 'react';
import { Radio, Users, MessageCircle, BarChart3, Clock, MapPin, Trophy, Search } from 'lucide-react';

const LiveSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSport, setSelectedSport] = useState('all');
  const [matches, setMatches] = useState([
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
      league: 'Premier League'
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
      league: 'Championship'
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
      league: 'Grand Slam'
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
      league: 'T20 League'
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
      league: 'Championship'
    }
  ]);

  const sports = ['all', 'Football', 'Basketball', 'Tennis', 'Cricket', 'Swimming'];

  const filteredMatches = matches.filter(match => {
    const matchesSport = selectedSport === 'all' || match.sport === selectedSport;
    const matchesSearch = searchTerm === '' || 
      match.homeTeam.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.awayTeam.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.league.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSport && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'live': return 'bg-red-500';
      case 'upcoming': return 'bg-blue-500';
      case 'finished': return 'bg-gray-500';
      default: return 'bg-gray-500';
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
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">Live</span> Matches
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Watch live matches, engage with community, and never miss the action
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search matches, teams, or leagues..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <div className="flex space-x-2 overflow-x-auto">
            {sports.map((sport) => (
              <button
                key={sport}
                onClick={() => setSelectedSport(sport)}
                className={`px-6 py-3 rounded-xl font-medium whitespace-nowrap transition-all duration-200 ${
                  selectedSport === sport
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {sport === 'all' ? 'All Sports' : sport}
              </button>
            ))}
          </div>
        </div>

        {/* Live Matches Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {filteredMatches.map((match) => (
            <div key={match.id} className="bg-gray-800 rounded-2xl p-6 hover:bg-gray-750 transition-all duration-300 border border-gray-700">
              {/* Match Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className={`${getStatusColor(match.status)} text-white px-3 py-1 rounded-full text-sm font-bold flex items-center space-x-1`}>
                    {match.status === 'live' && <Radio className="w-3 h-3" />}
                    <span>{getStatusText(match.status)}</span>
                  </span>
                  <span className="text-gray-400 text-sm">{match.sport}</span>
                </div>
                <span className="text-gray-400 text-sm">{match.league}</span>
              </div>

              {/* Teams and Score */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {match.homeTeam.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <span className="font-semibold">{match.homeTeam}</span>
                  </div>
                  <span className="text-2xl font-bold">{match.homeScore}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {match.awayTeam.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <span className="font-semibold">{match.awayTeam}</span>
                  </div>
                  <span className="text-2xl font-bold">{match.awayScore}</span>
                </div>
              </div>

              {/* Match Info */}
              <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
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
                {match.status === 'live' && (
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{match.viewers.toLocaleString()} watching</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                {match.status === 'live' ? (
                  <>
                    <button className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                      <Radio className="w-4 h-4" />
                      <span>Watch Live</span>
                    </button>
                    <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
                      <MessageCircle className="w-4 h-4" />
                    </button>
                    <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
                      <BarChart3 className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>Set Reminder</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredMatches.length === 0 && (
          <div className="text-center py-12">
            <Trophy className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No matches found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
        
      </div>
    </section>
  );
};

export default LiveSection;