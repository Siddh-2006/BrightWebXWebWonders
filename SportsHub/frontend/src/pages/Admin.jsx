import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import {
  Shield,
  Users,
  Clock,
  Check,
  X,
  AlertCircle,
  Building,
  Calendar,
  MapPin,
  User,
  ChevronRight,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Star,
  TrendingUp,
  Activity,
  Award
} from 'lucide-react';
import { showCustomToast } from '../helper/CustomToast';
import { ToastContainer } from 'react-toastify';
import AccessDenied from '../components/AccessDenied';
import { useNavigate } from 'react-router';

const Admin = ({ isDarkMode }) => {
  const [pendingClubs, setPendingClubs] = useState([]);
  const [allClubs, setAllClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClub, setSelectedClub] = useState(null);
  const [denied,setDenied] = useState(false);
  const navigate=useNavigate();

  useEffect(() => {
    fetchPendingClubs();
    fetchAllClubs();
  }, []);

  const fetchPendingClubs = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/clubs/pending-clubs`, {
        withCredentials: true,
      });
      setPendingClubs(res.data);
    } catch (err) {
      if(err.status==403 || err.status==401){
        setDenied(true);
      }
      else{
      showCustomToast('error', 'Failed to fetch pending clubs');}
    }
  };

  const fetchAllClubs = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/clubs`, {
        withCredentials: true,
      });
      setAllClubs(res.data);
    } catch (err) {
      showCustomToast('error', 'Failed to fetch clubs');
    } finally {
      setLoading(false);
    }
  };

  const approveClub = async (clubId) => {
    try {
      await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/clubs/${clubId}/approve`, {}, {
        withCredentials: true,
      });
      setPendingClubs(pendingClubs.filter(club => club._id !== clubId));
      showCustomToast('success', 'Club approved successfully!');
      fetchAllClubs(); // Refresh all clubs list
    } catch (err) {
      showCustomToast('error', 'Failed to approve club');
    }
  };

  const rejectClub = async (clubId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/clubs/${clubId}`, {
        withCredentials: true,
      });
      setPendingClubs(pendingClubs.filter(club => club._id !== clubId));
      showCustomToast('success', 'Club rejected successfully!');
    } catch (err) {
      showCustomToast('error', 'Failed to reject club');
    }
  };

  const filteredClubs = allClubs.filter(club =>
    club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    club.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    {
      label: 'Total Clubs',
      value: allClubs.length,
      icon: Building,
      change: '+12%',
      color: isDarkMode ? 'text-blue-400' : 'text-blue-500'
    },
    {
      label: 'Pending Approvals',
      value: pendingClubs.length,
      icon: Clock,
      change: '-5%',
      color: isDarkMode ? 'text-orange-400' : 'text-orange-500'
    },
   
  ];

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen pt-20 flex items-center justify-center"
      >
        <div className="text-center">
          <Activity className={`w-12 h-12 mx-auto mb-4 animate-spin ${isDarkMode ? 'text-orange-400' : 'text-blue-500'}`} />
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Loading admin dashboard...
          </p>
        </div>
      </motion.div>
    );
  }
  if(denied) 
    return(<AccessDenied isDarkMode={isDarkMode}/>)
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20"
    >
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <Shield className={`w-8 h-8 ${isDarkMode ? 'text-orange-400' : 'text-blue-500'}`} />
            <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          </div>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Manage clubs and monitor platform activity
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-6 rounded-2xl ${
                isDarkMode
                  ? 'bg-white/5 backdrop-blur-md border-white/10'
                  : 'bg-black/5 backdrop-blur-md border-black/10'
              } border`}
            >
              <div className="flex items-center justify-between mb-4">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
                <span
                  className={`text-sm font-medium px-2 py-1 rounded-full ${
                    stat.change.startsWith('+')
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}
                >
                  {stat.change}
                </span>
              </div>
              <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 flex-wrap mb-8">
          {[
            { id: 'pending', label: 'Pending Approvals', icon: Clock },
            { id: 'all', label: 'All Clubs', icon: Building },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? isDarkMode
                    ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                    : 'bg-blue-500/20 text-blue-600 border border-blue-500/30'
                  : isDarkMode
                  ? 'text-gray-400 hover:text-white hover:bg-white/5'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-black/5'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
        {/* Tab Content */}
        {activeTab === 'pending' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-2xl ${
              isDarkMode
                ? 'bg-white/5 backdrop-blur-md border-white/10'
                : 'bg-black/5 backdrop-blur-md border-black/10'
            } border`}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Pending Club Approvals</h2>
              <div className="flex items-center space-x-2">
                <AlertCircle className={`w-5 h-5 ${isDarkMode ? 'text-orange-400' : 'text-orange-500'}`} />
                <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {pendingClubs.length} awaiting review
                </span>
              </div>
            </div>

            {pendingClubs.length === 0 ? (
              <div className="text-center py-12">
                <Check className={`w-16 h-16 mx-auto mb-4 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  No pending approvals
                </p>
                <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  All clubs have been reviewed
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingClubs.map((club) => (
                  <motion.div
                    key={club._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`p-6 rounded-xl ${
                      isDarkMode ? 'bg-white/5' : 'bg-black/5'
                    } border ${
                      isDarkMode ? 'border-white/10' : 'border-black/10'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <Building className={`w-6 h-6 ${isDarkMode ? 'text-orange-400' : 'text-blue-500'}`} />
                          <h3 className="text-xl font-bold">{club.name}</h3>
                        </div>
                        <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {club.description}
                        </p>
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>Applied {new Date(club.createdAt || Date.now()).toLocaleDateString()}</span>
                          </div>
                          {club.location && (
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>{club.location.country}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex mt-4 items-center sm:space-x-3 sm:ml-6">
                        <button
                          onClick={() => setSelectedClub(club)}
                          className={`p-2 rounded-lg transition-colors ${
                            isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'
                          }`}
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        
                        <button
                          onClick={() => approveClub(club._id)}
                          className="px-4 py-2 bg-green-500/20 text-green-400 hover:bg-green-500/30 rounded-lg transition-colors flex items-center space-x-2"
                        >
                          <Check className="w-4 h-4" />
                          <span>Approve</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'all' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-2xl ${
              isDarkMode
                ? 'bg-white/5 backdrop-blur-md border-white/10'
                : 'bg-black/5 backdrop-blur-md border-black/10'
            } border`}
          >
            <div className="flex flex-wrap items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">All Registered Clubs</h2>
              <div className="flex  items-center space-x-4">
                <div className="relative">
                  <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  <input
                    type="text"
                    placeholder="Search clubs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`pl-10 pr-4 py-2 rounded-lg border transition-colors ${
                      isDarkMode
                        ? 'bg-white/5 border-white/10 text-white placeholder-gray-400'
                        : 'bg-black/5 border-black/10 text-gray-900 placeholder-gray-500'
                    }`}
                  />
                </div>
              </div>
            </div>

            {filteredClubs.length === 0 ? (
              <div className="text-center py-12">
                <Building className={`w-16 h-16 mx-auto mb-4 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  No clubs found
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredClubs.map((club) => (
                  <motion.div
                    key={club._id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`p-6 rounded-xl ${
                      isDarkMode ? 'bg-white/5' : 'bg-black/5'
                    } border ${
                      isDarkMode ? 'border-white/10' : 'border-black/10'
                    } hover:shadow-lg transition-all duration-300`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Building className={`w-6 h-6 ${isDarkMode ? 'text-orange-400' : 'text-blue-500'}`} />
                        <h3 className="font-bold text-lg">{club.name}</h3>
                      </div>
                      <button className={`p-1 rounded hover:bg-white/10 transition-colors`}>
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <p className={`text-sm mb-4 line-clamp-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {club.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{club.members?.length || 0}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span>4.8</span>
                        </div>
                      </div>
                      <button
                        className={`flex items-center space-x-1 px-3 py-1 rounded-lg text-sm transition-colors ${
                          isDarkMode
                            ? 'bg-orange-500/20 text-orange-400 hover:bg-orange-500/30'
                            : 'bg-blue-500/20 text-blue-600 hover:bg-blue-500/30'
                        }`}
                        onClick={()=>{navigate(`/club/${club.name}`)}}
                      >
                        <span>View</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'analytics' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-2xl ${
              isDarkMode
                ? 'bg-white/5 backdrop-blur-md border-white/10'
                : 'bg-black/5 backdrop-blur-md border-black/10'
            } border text-center py-20`}
          >
            <Activity className={`w-16 h-16 mx-auto mb-4 ${isDarkMode ? 'text-orange-400' : 'text-blue-500'}`} />
            <h3 className="text-xl font-bold mb-2">Analytics Dashboard</h3>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Advanced analytics and reporting features coming soon
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Admin;