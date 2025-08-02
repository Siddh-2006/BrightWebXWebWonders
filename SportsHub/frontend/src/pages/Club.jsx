import React, { useState, useEffect, useContext } from 'react';
import {
  Search, MapPin, Filter, Calendar, Users,
  Star, Clock, ChevronDown, X, ArrowLeft, Upload, Check,
  Play, Video, Trophy, UserCheck, Zap, Eye
} from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import loginContext from '../context/loginContext';
import { challengeService } from '../services/challengeService';
import ChallengeModal from '../components/ChallengeModal';
import AddClubModal from '../components/AddClubModal';

const Club = ({ isDarkMode }) => {
  // State hooks for storing data and UI behavior
  const [clubData, setClubData] = useState([]); // all clubs
  const [filteredClubs, setFilteredClubs] = useState([]); // filtered clubs
  const [loading, setLoading] = useState(true); // loading state
  const [searchTerm, setSearchTerm] = useState(''); // search input
  const [sortBy, setSortBy] = useState('name'); // current sort option
  const [userClub, setUserClub] = useState(null); // user's own club
  const [isClubOwner, setIsClubOwner] = useState(false); // whether user owns a club
  const [challengeModalOpen, setChallengeModalOpen] = useState(false);
  const [selectedClubToChallenge, setSelectedClubToChallenge] = useState(null);
  const [addClubModalOpen, setAddClubModalOpen] = useState(false);
  // Add Club handler
  const handleAddClub = async (clubData) => {
    try {
      const formData = new FormData();
      for (const key in clubData) {
        if (clubData[key] !== undefined && clubData[key] !== null && clubData[key] !== '') {
          if (key === 'logo' && clubData.logo) {
            formData.append('logo', clubData.logo);
          } else {
            formData.append(key, String(clubData[key]));
          }
        }
      }
      await axios.post(`${process.env.BACKEND_URL}/clubs/register`, formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      window.location.reload();
    } catch (err) {
      console.error('Add club error:', err?.response || err);
      alert('Failed to add club.');
    }
  };
  
  const login_info = useContext(loginContext);

  // Fetch clubs and user's club data from API on component mount
  useEffect(() => {
    const fetch_data = async () => {
      try {
        // Fetch all clubs
        const res = await axios.get(`${process.env.BACKEND_URL}/clubs`, { withCredentials: true });
        if (res.status === 200) {
          console.log("Fetched clubs:", res.data);
          setClubData(res.data);
          setFilteredClubs(res.data);
        }

        // Check if user owns a club (only if logged in)
        if (login_info.isLoggedIn) {
          try {
            const myClubRes = await challengeService.getMyClub();
            setUserClub(myClubRes);
            setIsClubOwner(true);
          } catch (err) {
            // User doesn't own a club
            setIsClubOwner(false);
          }
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching club data:", err);
        setLoading(false);
      }
    };
    fetch_data();
  }, [login_info.isLoggedIn]);

  // Handle filtering and sorting whenever search term, sort option or data changes
  useEffect(() => {
    let filtered = clubData.filter(club =>
      club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

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

  // Format date into a readable string
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Handle challenge club
  const handleChallengeClub = (club) => {
    if (!isClubOwner) {
      alert('You need to own a club to challenge other clubs!');
      return;
    }
    if (userClub && club._id === userClub._id) {
      alert('You cannot challenge your own club!');
      return;
    }
    setSelectedClubToChallenge(club);
    setChallengeModalOpen(true);
  };

  // Show loading spinner while data is being fetched
  if (loading) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-black' : 'bg-white'} flex items-center justify-center`}>
        <div className={`animate-spin rounded-full h-32 w-32 border-b-2 ${isDarkMode ? 'border-orange-600' : 'border-blue-600'}`}></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
    <div className={`px-5 min-h-screen ${isDarkMode ? 'bg-transparent text-white' : 'bg-white text-black'} p-6 pt-24`}>
      {/* Header */}
      <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                >
      <div className="max-w-7xl mx-auto mb-10">
        <div className="flex flex-col md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className={`text-5xl md:text-7xl font-bold text-center mb-2 mt-15`}>Club <span className={`${isDarkMode
              ? 'bg-gradient-to-r from-orange-400 to-red-500'
              : 'bg-gradient-to-r from-blue-500 to-cyan-400'
              } bg-clip-text text-transparent`}>Hub</span></h1>
            <p className={`text-xl md:text-2xl max-w-4xl text-center md:text-left ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Dive into the club’s story, stars, and unforgettable highlights.</p>
          </div>
        </div>
        {/* Search and Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-center mb-10">
          {/* Search input */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 " />
            <input
              type="text"
              placeholder="Search clubs by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-12 pr-4 py-4 rounded-2xl font-medium transition-all duration-300 focus:outline-none ${isDarkMode
                ? 'bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 focus:border-orange-500'
                : 'bg-black/10 backdrop-blur-md border border-black/20 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                }`}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className={`absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 ${isDarkMode ? 'hover:text-white' : 'hover:text-black'
                  } transition-colors`}
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Sort dropdown (optional) */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`pl-4 pr-10 py-4 rounded-2xl font-medium appearance-none focus:outline-none transition-all duration-300 ${isDarkMode
                ? 'bg-white/10 text-white border border-white/20 backdrop-blur-md focus:border-orange-500'
                : 'bg-black/10 text-gray-900 border border-black/20 backdrop-blur-md focus:border-blue-500'
                }`}
            >
              <option className={isDarkMode ? "bg-black text-white" : "bg-white text-black"} value="name">Sort by Name</option>
              <option className={isDarkMode ? "bg-black text-white" : "bg-white text-black"} value="players">Most Players</option>
              <option className={isDarkMode ? "bg-black text-white" : "bg-white text-black"} value="newest">Newest First</option>
              <option className={isDarkMode ? "bg-black text-white" : "bg-white text-black"} value="oldest">Oldest First</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
          </div>

          <button
            onClick={() => setAddClubModalOpen(true)}
            className="px-6 py-3 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 bg-gradient-to-r from-orange-500 to-yellow-400 text-white hover:from-orange-600 hover:to-yellow-500"
          >
            + Add Club
          </button>
        </div>

      </div>
</motion.div>
      {/* Club Cards */}
      <div className="max-w-7xl mx-auto py-14">
        {/* No results fallback */}
        {filteredClubs.length === 0 ? (
          <div className="text-center py-20">
            <Search className="w-16 h-16 text-gray-500 mx-auto mb-4 "  />
            <h3 className="text-2xl font-semibold text-gray-400 mb-2">No clubs found</h3>
            <p className="text-gray-500">Try adjusting your search terms or filters</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
            {filteredClubs.map((club) => (
              <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
              <div
                key={club._id}
                className={`group relative overflow-hidden rounded-3xl transition-all duration-300 hover:scale-105 ${isDarkMode
                  ? 'bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10'
                  : 'bg-black/5 backdrop-blur-md border border-black/10 hover:bg-black/10'
                  }`}
              >
                <div className="relative pt-6 pl-2 lg:p-6 pb-4">
                  {/* Club Header Info */}
                  <div className="flex items-start gap-4 mb-4">
                    {/* Club Logo */}
                    {club.logo && (
                      <div className="relative">
                        <img
                          src={club.logo}
                          alt={club.name}
                          className={`w-16 h-16 object-cover rounded-xl border-2 ${isDarkMode ? 'border-orange-400/50' : 'border-blue-400/50'} shadow-lg`}
                          onError={(e) => {
                            e.target.src = "";
                          }}
                        />
                        {/* Approved Badge */}
                        {club.approved && (
                          <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                    )}
                    <div className="flex-1">
                      <h2 className={`text-xl font-bold mb-1 transition-colors ${isDarkMode ? 'text-orange-400 group-hover:text-orange-300' : 'text-blue-400 group-hover:text-blue-300'}`}>
                        {club.name}
                      </h2>
                      <p className="text-xs text-gray-400">
                        Founded {formatDate(club.createdAt)}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4 line-clamp-2`}>
                    {club.description}
                  </p>
                </div>

                {/* Stats */}
                <div className="px-6 pb-4">
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {/* Player Count */}
                    <div className={`${isDarkMode ? 'bg-white/10' : 'bg-black/10'} rounded-lg p-3 text-center`}>
                      <Users className={`${isDarkMode ? 'text-orange-400' : 'text-blue-400'} w-5 h-5 mx-auto mb-1`} />
                      <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>{club.players?.length || 0}</p>
                      <p className="text-xs text-gray-400">Players</p>
                    </div>
                    {/* Match Count */}
                    <div className={`${isDarkMode ? 'bg-white/10' : 'bg-black/10'} rounded-lg p-3 text-center`}>
                      <Trophy className={`${isDarkMode ? 'text-orange-400' : 'text-blue-400'} w-5 h-5 mx-auto mb-1`} />
                      <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>{club.matchHistory?.length || 0}</p>
                      <p className="text-xs text-gray-400">Matches</p>
                    </div>
                  </div>

                  {/* Tags: Live, Reels, Vlogs */}
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

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    {/* View Details Button */}
                    <Link to={`/club/${encodeURIComponent(club.name)}`}>
                      <button className={`w-full cursor-pointer ${isDarkMode
                        ? 'bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:border-white/30'
                        : 'bg-black/10 hover:bg-black/20 backdrop-blur-sm border border-black/20 hover:border-black/30'
                      } text-white font-medium py-2.5 rounded-lg transition-all duration-300 hover:scale-[1.02] focus:outline-none flex items-center justify-center space-x-2`}>
                        <Eye className="w-4 h-4" />
                        <span>View Details</span>
                      </button>
                    </Link>

                    {/* Challenge Button - Only show for club owners */}
                    {isClubOwner && userClub && club._id !== userClub._id && (
                      <button
                        onClick={() => handleChallengeClub(club)}
                        className={`w-full cursor-pointer ${isDarkMode
                          ? 'bg-orange-500/20 hover:bg-orange-500/30 backdrop-blur-sm border border-orange-500/30 hover:border-orange-500/50 text-orange-300 hover:text-orange-200'
                          : 'bg-blue-500/20 hover:bg-blue-500/30 backdrop-blur-sm border border-blue-500/30 hover:border-blue-500/50 text-blue-600 hover:text-blue-700'
                        } font-medium py-2.5 rounded-lg transition-all duration-300 hover:scale-[1.02] focus:outline-none flex items-center justify-center space-x-2`}>
                        <Zap className="w-4 h-4" />
                        <span>Challenge</span>
                      </button>
                    )}

                    {/* Show "Your Club" indicator */}
                    {isClubOwner && userClub && club._id === userClub._id && (
                      <div className={`w-full text-center py-2.5 rounded-lg ${isDarkMode
                        ? 'bg-green-500/20 border border-green-500/30 text-green-400'
                        : 'bg-green-500/20 border border-green-500/30 text-green-600'
                      } font-medium flex items-center justify-center space-x-2 backdrop-blur-sm`}>
                        <Check className="w-4 h-4" />
                        <span>Your Club</span>
                      </div>
                    )}
                  </div>

                </div>

                {/* Highlight Badge */}
                {club.highlights?.length > 0 && (
                  <div className="absolute top-4 right-4 bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full text-xs font-medium">
                    ⭐ {club.highlights.length} Highlights
                  </div>
                )}
              </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Challenge Modal */}
      <ChallengeModal
        isOpen={challengeModalOpen}
        onClose={() => setChallengeModalOpen(false)}
        targetClub={selectedClubToChallenge}
        isDarkMode={isDarkMode}
      />
      <AddClubModal
        isOpen={addClubModalOpen}
        onClose={() => setAddClubModalOpen(false)}
        onAdd={handleAddClub}
        isDarkMode={isDarkMode}
      />
    </div>
    </motion.div>
  );
};

export default Club;
