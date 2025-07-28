import React, { useState, useEffect } from 'react';
import {
  Search, MapPin, Filter, Calendar, Users,
  Star, Clock, ChevronDown, X, ArrowLeft, Upload, Check,
  Play, Video, Trophy, UserCheck
} from 'lucide-react';
import axios from 'axios';

const Club = ({ isDarkMode }) => {
  const [clubData, setClubData] = useState([]);
  const [filteredClubs, setFilteredClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const [joinFormData, setJoinFormData] = useState({
    age: '',
    skills: '',
    experience: 'Beginner',
    achievements: '',
    certificate: null,
    isPaid: false
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const fetch_data = async () => {
      try {
        const res = await axios.get("http://localhost:3000/clubs", { withCredentials: true });
        if (res.status === 200) {
          setClubData(res.data);
          setFilteredClubs(res.data);
          console.log("Club data fetched:", res.data);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching club data:", err);
        setLoading(false);
      }
    };
    fetch_data();
  }, []);

  // Search and filter functionality
  useEffect(() => {
    let filtered = clubData.filter(club =>
      club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort functionality
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'players':
          return (b.players?.length || 0) - (a.players?.length || 0);
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        default:
          return 0;
      }
    });

    setFilteredClubs(filtered);
  }, [searchTerm, sortBy, clubData]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-black' : 'bg-white'} flex items-center justify-center`}>
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-400"></div>
      </div>
    );
  }

  return (
    <div className={` px-10 min-h-screen ${isDarkMode ? 'bg-transparent text-white' : 'bg-white text-black'} p-6 pt-24`}>
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-10">
        <h1 className="text-4xl font-bold text-center text-orange-400 mb-8">Our Clubs</h1>
        
        {/* Search and Filter Bar */}
        <div className={`${isDarkMode ? 'bg-white/5' : 'bg-black/5'} backdrop-blur-sm rounded-2xl p-6 border border-orange-500/30`}>
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search Bar */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search clubs by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full ${isDarkMode ? 'bg-white/10 text-white' : 'bg-black/10 text-black'} border ${isDarkMode ? 'border-white/20' : 'border-black/20'} rounded-xl pl-12 pr-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 ${isDarkMode ? 'focus:ring-white' : 'focus:ring-black'} focus:border-transparent transition-all duration-300`}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className={`absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 ${isDarkMode ? 'hover:text-white' : 'hover:text-black'} transition-colors`}
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`${isDarkMode ? 'bg-white/10 text-white' : 'bg-black/10 text-black'} border border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent appearance-none pr-10 min-w-[160px]`}
              >
                <option className={isDarkMode ? "bg-black text-white" : "bg-white text-black"} value="name">Sort by Name</option>
                <option className={isDarkMode ? "bg-black text-white" : "bg-white text-black"} value="players">Most Players</option>
                <option className={isDarkMode ? "bg-black text-white" : "bg-white text-black"} value="newest">Newest First</option>
                <option className={isDarkMode ? "bg-black text-white" : "bg-white text-black"} value="oldest">Oldest First</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>

            {/* Results Count */}
            <div className="text-gray-400 text-sm">
              {filteredClubs.length} of {clubData.length} clubs
            </div>
          </div>
        </div>
      </div>

      {/* Club Grid */}
      <div className="max-w-7xl mx-auto">
        {filteredClubs.length === 0 ? (
          <div className="text-center py-20">
            <Search className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-400 mb-2">No clubs found</h3>
            <p className="text-gray-500">Try adjusting your search terms or filters</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
            {filteredClubs.map((club) => (
              <div
                key={club._id}
                className={`group relative overflow-hidden rounded-3xl transition-all duration-300 hover:scale-105 ${
                  isDarkMode
                    ? 'bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10'
                    : 'bg-black/5 backdrop-blur-md border border-black/10 hover:bg-black/10'
                }`}
              >
                {/* Club Header */}
                <div className="relative p-6 pb-4">
                  <div className="flex items-start gap-4 mb-4">
                    {club.logo && (
                      <div className="relative">
                        <img
                          src={club.logo}
                          alt={club.name}
                          className="w-16 h-16 object-cover rounded-xl border-2 border-orange-400/50 shadow-lg"
                          onError={(e) => {
                            e.target.src ="";
                          }}
                        />
                        {club.approved && (
                          <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                    )}
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-orange-400 mb-1 group-hover:text-orange-300 transition-colors">
                        {club.name}
                      </h2>
                      <p className="text-xs text-gray-400">
                        Founded {formatDate(club.createdAt)}
                      </p>
                    </div>
                  </div>
                  
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4 line-clamp-2`}>
                    {club.description}
                  </p>
                </div>

                {/* Club Stats */}
                <div className="px-6 pb-4">
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className={`${isDarkMode ? 'bg-white/10' : 'bg-black/10'} rounded-lg p-3 text-center`}>
                      <Users className="w-5 h-5 text-orange-400 mx-auto mb-1" />
                      <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>{club.players?.length || 0}</p>
                      <p className="text-xs text-gray-400">Players</p>
                    </div>
                    <div className={`${isDarkMode ? 'bg-white/10' : 'bg-black/10'} rounded-lg p-3 text-center`}>
                      <Trophy className="w-5 h-5 text-orange-400 mx-auto mb-1" />
                      <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>{club.matchHistory?.length || 0}</p>
                      <p className="text-xs text-gray-400">Matches</p>
                    </div>
                  </div>

                  {/* Activity Indicators */}
                  <div className="flex justify-center gap-4 mb-4">
                    {club.liveMatches?.length > 0 && (
                      <div className="flex items-center gap-1 bg-red-500/20 text-red-400 px-2 py-1 rounded-full text-xs">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        Live Match
                      </div>
                    )}
                    {club.reels?.length > 0 && (
                      <div className="flex items-center gap-1 bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full text-xs">
                        <Video className="w-3 h-3" />
                        {club.reels.length} Reels
                      </div>
                    )}
                    {club.vlogs?.length > 0 && (
                      <div className="flex items-center gap-1 bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full text-xs">
                        <Play className="w-3 h-3" />
                        {club.vlogs.length} Vlogs
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-gray-800">
                    View Club Details
                  </button>
                </div>

                {/* Highlights Badge */}
                {club.highlights?.length > 0 && (
                  <div className="absolute top-4 right-4 bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full text-xs font-medium">
                    ⭐ {club.highlights.length} Highlights
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Club;