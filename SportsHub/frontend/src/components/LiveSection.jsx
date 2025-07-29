import React, { useState, useEffect } from 'react';
import { Trophy, Search } from 'lucide-react';
import MatchCard from './MatchCard';

const LiveSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSport, setSelectedSport] = useState('all');
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const year = tomorrow.getFullYear();
    const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const day = String(tomorrow.getDate()).padStart(2, '0');
    const tomorrowDate = `${year}-${month}-${day}`;

    setMatches([
      {
        id: 1,
        sport: 'Football',
        homeTeam: 'Thunder FC',
        awayTeam: 'Lightning United',
        homeScore: 2,
        awayScore: 1,
        status: 'live',
        time: '78\'',
        date: new Date().toISOString().split('T')[0],
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
        date: new Date().toISOString().split('T')[0],
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
        date: new Date().toISOString().split('T')[0],
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
        date: tomorrowDate,
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
        date: tomorrowDate,
        venue: 'Aquatic Center',
        viewers: 0,
        league: 'Championship'
      }
    ]);
  }, []);

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
            <MatchCard key={match.id} match={match} />
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