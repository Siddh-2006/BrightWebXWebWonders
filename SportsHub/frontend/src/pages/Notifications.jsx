import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, Users, Briefcase, Trophy, MessageCircle, Calendar, 
  CheckCircle, X, Filter, Search, Star, Award, Target
} from 'lucide-react';

const Notifications = ({ isDarkMode, userType }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const playerNotifications = [
    {
      id: 1,
      type: 'clubs',
      title: 'Thunder FC wants you to join!',
      message: 'Thunder FC has reviewed your profile and would like to invite you to join their team. They have excellent facilities and professional coaching staff.',
      time: '2 hours ago',
      read: false,
      icon: Users,
      color: 'text-blue-400',
      action: 'View Club',
      clubInfo: {
        name: 'Thunder FC',
        rating: 4.8,
        members: 45,
        location: 'Los Angeles, CA'
      }
    },
    {
      id: 2,
      type: 'jobs',
      title: 'New Coaching Position Available',
      message: 'Elite Sports Academy is looking for a football coach. Your profile matches their requirements perfectly.',
      time: '5 hours ago',
      read: false,
      icon: Briefcase,
      color: 'text-green-400',
      action: 'Apply Now'
    },
    {
      id: 3,
      type: 'achievements',
      title: 'Achievement Unlocked: AI Guru Master!',
      message: 'Congratulations! You\'ve used AI Guru for 30 consecutive days and improved your skills significantly.',
      time: '1 day ago',
      read: true,
      icon: Award,
      color: 'text-yellow-400',
      action: 'View Achievement'
    },
    {
      id: 4,
      type: 'clubs',
      title: 'Lightning United Match Invitation',
      message: 'Lightning United has invited you to participate in their upcoming friendly match this weekend.',
      time: '2 days ago',
      read: true,
      icon: Trophy,
      color: 'text-purple-400',
      action: 'Respond'
    }
  ];

  const facultyNotifications = [
    {
      id: 1,
      type: 'challenges',
      title: 'Challenge Request from Storm City FC',
      message: 'Storm City FC has challenged your team to a match with a $5,000 prize pool. Review their team stats and decide.',
      time: '1 hour ago',
      read: false,
      icon: Trophy,
      color: 'text-red-400',
      action: 'Review Challenge',
      challengeInfo: {
        club: 'Storm City FC',
        prizePool: '$5,000',
        winRate: '78%',
        matchesPlayed: 45,
        location: 'Storm Arena',
        date: '2024-02-15'
      }
    },
    {
      id: 2,
      type: 'clubs',
      title: 'New Player Application',
      message: 'Alex Rodriguez has applied to join your club. His profile shows excellent skills in midfield position.',
      time: '3 hours ago',
      read: false,
      icon: Users,
      color: 'text-blue-400',
      action: 'Review Application'
    },
    {
      id: 3,
      type: 'challenges',
      title: 'Challenge Accepted by Phoenix United',
      message: 'Phoenix United has accepted your challenge for the championship match. Match details have been confirmed.',
      time: '6 hours ago',
      read: true,
      icon: CheckCircle,
      color: 'text-green-400',
      action: 'View Details'
    }
  ];

  const notifications = userType === 'faculty' ? facultyNotifications : playerNotifications;

  const filters = userType === 'faculty' 
    ? [
        { id: 'all', label: 'All', icon: Bell },
        { id: 'challenges', label: 'Challenges', icon: Trophy },
        { id: 'clubs', label: 'Club Management', icon: Users }
      ]
    : [
        { id: 'all', label: 'All', icon: Bell },
        { id: 'clubs', label: 'Clubs', icon: Users },
        { id: 'jobs', label: 'Jobs', icon: Briefcase },
        { id: 'achievements', label: 'Achievements', icon: Award }
      ];

  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = activeFilter === 'all' || notification.type === activeFilter;
    const matchesSearch = searchTerm === '' || 
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20"
    >
      {/* Header */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center mb-6">
              <div className={`relative w-16 h-16 rounded-2xl flex items-center justify-center ${
                isDarkMode
                  ? 'bg-gradient-to-r from-orange-500 to-red-600'
                  : 'bg-gradient-to-r from-blue-500 to-cyan-400'
              }`}>
                <Bell className="w-8 h-8 text-white" />
                {unreadCount > 0 && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{unreadCount}</span>
                  </div>
                )}
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Notifications
            </h1>
            <p className={`text-xl max-w-3xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Stay updated with the latest {userType === 'faculty' ? 'club management and challenge' : 'club invitations, job opportunities, and achievement'} notifications
            </p>
          </motion.div>

          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search notifications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-12 pr-4 py-4 rounded-2xl font-medium transition-all duration-300 ${
                    isDarkMode
                      ? 'bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 focus:border-orange-500'
                      : 'bg-black/10 backdrop-blur-md border border-black/20 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                  } focus:outline-none`}
                />
              </div>
              <div className="flex space-x-2 overflow-x-auto">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`flex items-center space-x-2 px-6 py-4 rounded-2xl font-medium whitespace-nowrap transition-all duration-300 ${
                      activeFilter === filter.id
                        ? isDarkMode
                          ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                          : 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                        : isDarkMode
                          ? 'bg-white/10 text-gray-300 hover:bg-white/20'
                          : 'bg-black/10 text-gray-700 hover:bg-black/20'
                    }`}
                  >
                    <filter.icon className="w-5 h-5" />
                    <span>{filter.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-w-4xl mx-auto space-y-6">
            {filteredNotifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`group relative overflow-hidden rounded-2xl transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10' 
                    : 'bg-black/5 backdrop-blur-md border border-black/10 hover:bg-black/10'
                } ${!notification.read ? 'ring-2 ring-current/20' : ''}`}
              >
                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      isDarkMode ? 'bg-white/10' : 'bg-black/10'
                    }`}>
                      <notification.icon className={`w-6 h-6 ${notification.color}`} />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className={`text-lg font-bold ${!notification.read ? 'text-current' : isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {notification.title}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <span className={`text-sm ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            {notification.time}
                          </span>
                          {!notification.read && (
                            <div className={`w-3 h-3 rounded-full ${
                              isDarkMode ? 'bg-orange-400' : 'bg-blue-500'
                            }`}></div>
                          )}
                        </div>
                      </div>
                      
                      <p className={`mb-4 leading-relaxed ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {notification.message}
                      </p>

                      {/* Additional Info for Challenges */}
                      {notification.type === 'challenges' && 'challengeInfo' in notification && (
                        <div className={`p-4 rounded-xl mb-4 ${
                          isDarkMode ? 'bg-white/5' : 'bg-black/5'
                        }`}>
                          <h4 className="font-semibold mb-3">Challenge Details</h4>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Prize Pool:</span>
                              <p className="font-semibold text-green-400">{notification.challengeInfo.prizePool}</p>
                            </div>
                            <div>
                              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Win Rate:</span>
                              <p className="font-semibold">{notification.challengeInfo.winRate}</p>
                            </div>
                            <div>
                              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Matches:</span>
                              <p className="font-semibold">{notification.challengeInfo.matchesPlayed}</p>
                            </div>
                            <div>
                              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Location:</span>
                              <p className="font-semibold">{notification.challengeInfo.location}</p>
                            </div>
                            <div>
                              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Date:</span>
                              <p className="font-semibold">{notification.challengeInfo.date}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Additional Info for Club Invitations */}
                      {notification.type === 'clubs' && 'clubInfo' in notification && (
                        <div className={`p-4 rounded-xl mb-4 ${
                          isDarkMode ? 'bg-white/5' : 'bg-black/5'
                        }`}>
                          <h4 className="font-semibold mb-3">Club Information</h4>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Rating:</span>
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <span className="font-semibold">{notification.clubInfo.rating}</span>
                              </div>
                            </div>
                            <div>
                              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Members:</span>
                              <p className="font-semibold">{notification.clubInfo.members}</p>
                            </div>
                            <div>
                              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Location:</span>
                              <p className="font-semibold">{notification.clubInfo.location}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex items-center space-x-3">
                        <button className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                          isDarkMode
                            ? 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500'
                            : 'bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500'
                        } text-white shadow-lg hover:shadow-xl`}>
                          {notification.action}
                        </button>
                        {!notification.read && (
                          <button className={`px-4 py-3 rounded-xl transition-all duration-300 ${
                            isDarkMode 
                              ? 'bg-white/10 hover:bg-white/20' 
                              : 'bg-black/10 hover:bg-black/20'
                          }`}>
                            <CheckCircle className="w-5 h-5" />
                          </button>
                        )}
                        <button className={`px-4 py-3 rounded-xl transition-all duration-300 ${
                          isDarkMode 
                            ? 'bg-white/10 hover:bg-white/20' 
                            : 'bg-black/10 hover:bg-black/20'
                        }`}>
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Unread Indicator */}
                {!notification.read && (
                  <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                    isDarkMode ? 'bg-orange-400' : 'bg-blue-500'
                  }`}></div>
                )}
              </motion.div>
            ))}
          </div>

          {/* No Results */}
          {filteredNotifications.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Bell className={`w-20 h-20 mx-auto mb-6 ${
                isDarkMode ? 'text-gray-600' : 'text-gray-400'
              }`} />
              <h3 className={`text-2xl font-bold mb-4 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                No notifications found
              </h3>
              <p className={isDarkMode ? 'text-gray-500' : 'text-gray-500'}>
                Try adjusting your search or filter criteria
              </p>
            </motion.div>
          )}

          {/* Mark All as Read */}
          {unreadCount > 0 && (
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <button className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                isDarkMode
                  ? 'bg-white/10 hover:bg-white/20 text-white'
                  : 'bg-black/10 hover:bg-black/20 text-gray-900'
              }`}>
                Mark All as Read
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </motion.div>
  );
};

export default Notifications;