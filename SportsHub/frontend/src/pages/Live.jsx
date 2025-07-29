import React, { useState, useEffect, useContext } from 'react';
import axios from "axios"
import { motion } from 'framer-motion';
import {
  Radio, Users, MessageCircle, BarChart3, Clock, MapPin, Trophy, Search,
  Filter, Play, Eye, Star, Calendar, Target, Zap
} from 'lucide-react';
import Loader from '../helper/Loader';
import LoginContext from '../context/loginContext';
import { useNavigate } from 'react-router';
import ReminderModal from '../components/ReminderModal';
import useReminder from '../hooks/useReminder';
import reminderService from '../services/reminderService';
import ActiveReminders from '../components/ActiveReminders';
const Live = ({ isDarkMode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSport, setSelectedSport] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [liveMatches, setLiveMatches] = useState([]);
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [finished, setfinishedMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentClub, setCurrentClub] = useState(null);
  const { isLoggedIn, userType } = useContext(LoginContext);
  const[userData,setUserData]=useState(null);
  const navigate=useNavigate();
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [reminderModalOpen, setReminderModalOpen] = useState(false);
  useEffect(()=>{

    // check if the user is admin
    const checkAdmin = async () => {
      try {
        const res = await axios.get("http://localhost:3000/users/profile", { withCredentials: true });
        if (res.status === 200) {
          setUserData(res.data);
          console.log(res.data)
        }
      } catch (err) {
        console.error("user is not logged in");
      }
    }


    const fetch_live=async ()=>{
      try{
      const res =await axios.get("http://localhost:3000/match/live",{withCredentials:true});
      if(res.status==200){
        setLiveMatches((prev)=>([...res.data.matches]));
        console.log(res.data.matches);
      }
      const res2 =await axios.get("http://localhost:3000/match/upcoming",{withCredentials:true});
      if(res2.status==200){
        setUpcomingMatches((prev)=>([...res2.data.matches]));
        console.log(res2.data.matches);
      }
      const res3 =await axios.get("http://localhost:3000/match/past",{withCredentials:true});
      if(res3.status==200){
        setfinishedMatches((prev)=>([...res3.data.matches]));
        console.log(res3.data.matches);
      }
      setLoading(false);
    }catch(err){
      console.log(err)
    }
    }
    fetch_live()
    checkAdmin();
  },[])
  const all_matches = liveMatches.concat(upcomingMatches).concat(finished);
 
  const sports = ['all', 'football', 'basketball', 'tennis', 'cricket', 'swimming'];
  const statuses = ['all', 'Live', 'Not Started', 'Ended'];

  const filteredMatches = all_matches.filter(match => {
    const matchesSport = selectedSport === 'all' || match.sport === selectedSport;
    const matchesStatus = selectedStatus === 'all' || match.status === selectedStatus;
    const matchesSearch = searchTerm === '' || 
      match.clubA.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.clubB.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.matchType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.location.city.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSport && matchesStatus && matchesSearch;
  });
  console.log(filteredMatches)

  const getStatusColor = (status) => {
    try{
    switch (status) {
      case 'Live': return isDarkMode ? 'bg-red-500' : 'bg-red-500';
      case 'Not Started': return isDarkMode ? 'bg-blue-500' : 'bg-blue-500';
      case 'ended': return isDarkMode ? 'bg-gray-500' : 'bg-gray-500';
      default: return isDarkMode ? 'bg-gray-500' : 'bg-gray-500';
    }}
    catch(err){
      console.log(err)
      
    }
  };

  const getStatusText = (status) => {
    try{
    switch (status) {
      
      case 'Live': return 'LIVE';
      case 'Not Started': return 'UPCOMING';
      case 'ended': return 'ENDED';
      default: return status.toUpperCase();
    }}
    catch(err){
      console.log(err)
    }
  };

  const handleBroadcastClick = async () => {
    if (isLoggedIn && userType === 'club') {
      try {
        const res = await axios.get("http://localhost:3000/api/club/my-club", { withCredentials: true });
        if (res.status === 200) {
          setCurrentClub(res.data);
          setIsModalOpen(true);
        }
      } catch (err) {
        console.error("Error fetching club data:", err);
      }
    } else {
      // Handle case where user is not a logged-in club
      alert("You must be logged in as a club to start a broadcast.");
    }
  };

  const handleSetReminder = (match) => {
    // Convert match data to the format expected by ReminderModal
    const reminderMatch = {
      homeTeam: match.clubA.name,
      awayTeam: match.clubB.name,
      date: match.date,
      time: match.startTime
    };
    setSelectedMatch(reminderMatch);
    setReminderModalOpen(true);
  };

  const handleReminderSet = (minutes) => {
    if (!selectedMatch) return;
    
    const result = reminderService.scheduleReminder(selectedMatch, minutes);
    
    if (result.success) {
      // Show success message
      alert(`✅ ${result.message}\nScheduled for: ${result.scheduledFor.toLocaleString()}`);
    } else {
      // Show error message
      alert(`❌ Failed to set reminder: ${result.message}`);
    }
    
    setReminderModalOpen(false);
    setSelectedMatch(null);
  };

  const closeReminderModal = () => {
    setReminderModalOpen(false);
    setSelectedMatch(null);
  };

  if(loading) return <Loader isDarkMode={isDarkMode} />
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
              Live <span className={`${isDarkMode
            ? 'bg-gradient-to-r from-orange-400 to-red-500'
            : 'bg-gradient-to-r from-blue-500 to-cyan-400'
          } bg-clip-text text-transparent`}>Matches</span> 
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
      <section >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {filteredMatches.map((match, index) => (
              <motion.div
                key={match._id}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.01 }}
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
                        {match.status === 'Live' && <Radio className="w-3 h-3 animate-pulse" />}
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
                      {match.matchType}
                    </span>
                  </div>

                  {/* Teams and Score */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <img 
                          src={match.clubA.logo} 
                          alt={match.clubA.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-current/20"
                        />
                        <span className="font-semibold text-lg">{match.clubA.name}</span>
                      </div>
                      <span className="text-3xl font-bold">{match.score.clubA}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <img 
                          src={match.clubB.logo} 
                          alt={match.clubB.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-current/20"
                        />
                        <span className="font-semibold text-lg">{match.clubB.name}</span>
                      </div>
                      <span className="text-3xl font-bold">{match.score.clubB}</span>
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
                        <span>{match.startTime}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{match.venueName}</span>
                      </div>
                    </div>
                    {match.status === 'Live' && match.viewsCount > 0 && (
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{match.viewsCount.toLocaleString()} watching</span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    {match.status === 'Live' ? (
                      <>
                        <button className={`flex-1 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                          isDarkMode
                            ? 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-400 hover:to-pink-500'
                            : 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700'
                        } text-white shadow-lg hover:shadow-xl`}
                        onClick={()=>{
                          navigate(`/live_match/${match.sport}/${match._id}`)
                        }}
                        >
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
                      
                    ) : match.status === 'Not Started' ? (
                      <button
                        onClick={() => handleSetReminder(match)}
                        className={`flex-1 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
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
                  {(match.status === 'Live')?(
                    <button className="w-full p-2 my-2 rounded-4xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
                     onClick={()=>{
                      navigate(`/live_match_admin/${match.sport}/${match._id}`)}}>
                    Admin Panel
                    </button>
                  ):(null)}
                </div>

                {/* Hover Effect */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none ${
                  match.status === 'Live'
                    ? 'bg-gradient-to-r from-red-500/5 to-pink-500/5'
                    : match.status === 'Not Started'
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
      
      {/* Reminder Modal */}
      {reminderModalOpen && selectedMatch && (
        <ReminderModal
          match={selectedMatch}
          onClose={closeReminderModal}
          onSetReminder={handleReminderSet}
        />
      )}
      
      {/* Active Reminders */}
      <ActiveReminders isDarkMode={isDarkMode} />
    </motion.div>
  );
};

export default Live;