import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import {
  Bell, Users, Briefcase, Trophy, MessageCircle, Calendar,
  CheckCircle, X, Filter, Search, Star, Award, Target, Zap, Clock
} from 'lucide-react';
import loginContext from '../context/loginContext';
import { challengeService } from '../services/challengeService';
import reminderService from '../services/reminderService';
import { showNotificationToast } from '../components/NotificationToast';

const Notifications = ({ isDarkMode, userType, isAdmin }) => {
  const [pendingClubs, setPendingClubs] = useState([]);
  const [pendingLoading, setPendingLoading] = useState(false);
  // Fetch pending clubs if admin
  useEffect(() => {
    if (!isAdmin) return;
    const fetchPendingClubs = async () => {
      setPendingLoading(true);
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/clubs/pending-clubs`, { withCredentials: true });
        setPendingClubs(res.data);
      } catch (err) {
        setPendingClubs([]);
      } finally {
        setPendingLoading(false);
      }
    };
    fetchPendingClubs();
  }, [isAdmin]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [reminderNotifications, setReminderNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isClubOwner, setIsClubOwner] = useState(false);
  
  const login_info = useContext(loginContext);

  // Load reminder notifications (for all users)
  const loadReminderNotifications = () => {
    const reminders = reminderService.getAllReminders();
    const reminderNotifs = reminders.map(reminder => ({
      id: `reminder-${reminder.matchKey}`,
      type: 'reminder',
      title: `Match Reminder: ${reminder.match.homeTeam} vs ${reminder.match.awayTeam}`,
      message: `You'll be notified ${reminder.minutes} minutes before the match starts`,
      time: formatTimeAgo(reminder.createdAt),
      read: true, // Reminders are always considered "read" since they're user-created
      icon: Bell,
      color: 'text-orange-400',
      action: 'View Match',
      actionUrl: null,
      reminderInfo: {
        match: reminder.match,
        minutes: reminder.minutes,
        scheduledFor: reminder.scheduledFor,
        matchKey: reminder.matchKey
      }
    }));
    setReminderNotifications(reminderNotifs);
  };

  // Fetch notifications and check if user is club owner
  useEffect(() => {
    const fetchData = async () => {
      // Always load reminder notifications (for both logged-in and non-logged-in users)
      loadReminderNotifications();

      if (!login_info.isLoggedIn) {
        setLoading(false);
        return;
      }

      try {
        // Check if user owns a club
        try {
          await challengeService.getMyClub();
          setIsClubOwner(true);
        } catch (err) {
          setIsClubOwner(false);
        }

        // Fetch club notifications
        const notificationsData = await challengeService.getNotifications();
        
        // Transform backend notifications to match frontend format
        const transformedNotifications = notificationsData.map(notification => ({
          id: notification._id,
          type: notification.type,
          title: notification.title,
          message: notification.message,
          time: formatTimeAgo(notification.createdAt),
          read: notification.read,
          icon: getNotificationIcon(notification.type),
          color: getNotificationColor(notification.type),
          action: getNotificationAction(notification.type),
          actionUrl: notification.actionUrl,
          challengeInfo: notification.data ? {
            club: notification.data.challengerClub?.name || notification.data.opponentClub?.name,
            prizePool: notification.data.prizePool,
            location: notification.data.location,
            date: notification.data.date,
            sport: notification.data.sport
          } : null,
          challengeId: notification.data?.challengeId
        }));

        setNotifications(transformedNotifications);
        
        // Show toast for new unread notifications (only if this isn't the initial load)
        if (notifications.length > 0) {
          const newUnreadCount = transformedNotifications.filter(n => !n.read).length;
          const oldUnreadCount = notifications.filter(n => !n.read).length;
          
          if (newUnreadCount > oldUnreadCount) {
            const newNotificationsCount = newUnreadCount - oldUnreadCount;
            showNotificationToast(
              'info',
              'New Notifications',
              `You have ${newNotificationsCount} new notification${newNotificationsCount > 1 ? 's' : ''}!`,
              5000
            );
          }
        }
      } catch (err) {
        console.error('Error fetching notifications:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Set up interval to refresh reminders every minute
    const interval = setInterval(loadReminderNotifications, 60000);
    return () => clearInterval(interval);
  }, [login_info.isLoggedIn]);

  // Helper functions
  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'challenge_request':
      case 'challenge_accepted':
      case 'challenge_declined':
        return Trophy;
      case 'club_invitation':
      case 'join_request':
        return Users;
      default:
        return Bell;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'challenge_request':
        return 'text-red-400';
      case 'challenge_accepted':
        return 'text-green-400';
      case 'challenge_declined':
        return 'text-orange-400';
      case 'club_invitation':
      case 'join_request':
        return 'text-blue-400';
      default:
        return 'text-gray-400';
    }
  };

  const getNotificationAction = (type) => {
    switch (type) {
      case 'challenge_request':
        return 'Review Challenge';
      case 'challenge_accepted':
      case 'challenge_declined':
        return 'View Details';
      case 'club_invitation':
        return 'View Club';
      case 'join_request':
        return 'Review Application';
      default:
        return 'View';
    }
  };

  // Handle challenge actions
  const handleChallengeAction = async (notification, action) => {
    if (!notification.challengeId) return;

    try {
      if (action === 'accept') {
        await challengeService.acceptChallenge(notification.challengeId);
        showNotificationToast(
          'challenge_accepted',
          'Challenge Accepted!',
          `You have successfully accepted the challenge from ${notification.challengeInfo?.club || 'the club'}.`,
          6000
        );
      } else if (action === 'decline') {
        await challengeService.declineChallenge(notification.challengeId);
        showNotificationToast(
          'challenge_declined',
          'Challenge Declined',
          `You have declined the challenge from ${notification.challengeInfo?.club || 'the club'}.`,
          6000
        );
      }
      
      // Refresh notifications
      const notificationsData = await challengeService.getNotifications();
      const transformedNotifications = notificationsData.map(notification => ({
        id: notification._id,
        type: notification.type,
        title: notification.title,
        message: notification.message,
        time: formatTimeAgo(notification.createdAt),
        read: notification.read,
        icon: getNotificationIcon(notification.type),
        color: getNotificationColor(notification.type),
        action: getNotificationAction(notification.type),
        actionUrl: notification.actionUrl,
        challengeInfo: notification.data ? {
          club: notification.data.challengerClub?.name || notification.data.opponentClub?.name,
          prizePool: notification.data.prizePool,
          location: notification.data.location,
          date: notification.data.date,
          sport: notification.data.sport
        } : null,
        challengeId: notification.data?.challengeId
      }));
      setNotifications(transformedNotifications);
    } catch (err) {
      showNotificationToast(
        'error',
        'Error Processing Challenge',
        err.msg || err.message || 'An unexpected error occurred while processing the challenge.',
        8000
      );
    }
  };

  // Handle reminder deletion
  const handleReminderDelete = (matchKey) => {
    reminderService.clearReminder(matchKey);
    loadReminderNotifications();
    showNotificationToast(
      'success',
      'Reminder Cancelled',
      'Your match reminder has been successfully cancelled.',
      4000
    );
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      const unreadNotifications = notifications.filter(n => !n.read);
      
      if (unreadNotifications.length === 0) {
        showNotificationToast(
          'info',
          'No Unread Notifications',
          'All notifications are already marked as read.',
          3000
        );
        return;
      }

      // Mark all unread notifications as read
      await Promise.all(
        unreadNotifications.map(notification =>
          challengeService.markNotificationAsRead(notification.id)
        )
      );

      setNotifications(prev =>
        prev.map(n => ({ ...n, read: true }))
      );

      showNotificationToast(
        'success',
        'All Marked as Read',
        `Successfully marked ${unreadNotifications.length} notification${unreadNotifications.length > 1 ? 's' : ''} as read.`,
        4000
      );
    } catch (err) {
      console.error('Error marking all notifications as read:', err);
      showNotificationToast(
        'error',
        'Error',
        'Failed to mark all notifications as read.',
        4000
      );
    }
  };

  // Mark notification as read
  const markAsRead = async (notificationId) => {
    try {
      await challengeService.markNotificationAsRead(notificationId);
      setNotifications(prev =>
        prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
      );
      showNotificationToast(
        'success',
        'Marked as Read',
        'Notification has been marked as read.',
        3000
      );
    } catch (err) {
      console.error('Error marking notification as read:', err);
      showNotificationToast(
        'error',
        'Error',
        'Failed to mark notification as read.',
        4000
      );
    }
  };

  // Combine all notifications (club + reminders)
  const allNotifications = login_info.isLoggedIn
    ? [...notifications, ...reminderNotifications]
    : reminderNotifications;

  const filters = login_info.isLoggedIn
    ? (isClubOwner
        ? [
            { id: 'all', label: 'All', icon: Bell },
            { id: 'reminder', label: 'Reminders', icon: Clock },
            { id: 'challenge_request', label: 'Challenge Requests', icon: Trophy },
            { id: 'challenge_accepted', label: 'Accepted', icon: CheckCircle },
            { id: 'challenge_declined', label: 'Declined', icon: X }
          ]
        : [
            { id: 'all', label: 'All', icon: Bell },
            { id: 'reminder', label: 'Reminders', icon: Clock },
            { id: 'club_invitation', label: 'Club Invitations', icon: Users },
            { id: 'join_request', label: 'Join Requests', icon: Award }
          ])
    : [
        { id: 'all', label: 'All', icon: Bell },
        { id: 'reminder', label: 'Reminders', icon: Clock }
      ];

  const filteredNotifications = allNotifications.filter(notification => {
    const matchesFilter = activeFilter === 'all' || notification.type === activeFilter;
    const matchesSearch = searchTerm === '' ||
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const unreadCount = allNotifications.filter(n => !n.read).length;

  if (loading) {
    return (
      <div className={`min-h-screen pt-20 flex items-center justify-center ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
        <div className={`animate-spin rounded-full h-32 w-32 border-b-2 ${isDarkMode ? 'border-orange-600' : 'border-blue-600'}`}></div>
      </div>
    );
  }


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20"
    >
      {/* Admin Pending Clubs Section */}
      {isAdmin && (
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
              <span className={isDarkMode ? 'text-orange-400' : 'text-blue-500'}>Pending Clubs</span>
            </h2>
            {pendingLoading ? (
              <div className="py-8 text-center text-lg">Loading pending clubs...</div>
            ) : pendingClubs.length === 0 ? (
              <div className="py-8 text-center text-gray-400">No pending clubs.</div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {pendingClubs.map(club => (
                  <div key={club._id} className={`rounded-xl p-6 shadow ${isDarkMode ? 'bg-white/10' : 'bg-black/10'}`}>
                    <div className="flex items-center gap-4 mb-3">
                      <img src={club.logo} alt={club.name} className="w-16 h-16 object-cover rounded-xl border-2" />
                      <div>
                        <h3 className="text-xl font-bold mb-1">{club.name}</h3>
                        <p className="text-sm text-gray-400">{club.officialEmail}</p>
                      </div>
                    </div>
                    <p className="mb-3 text-gray-300">{club.description}</p>
                    <button
                      onClick={async () => {
                        try {
                          await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/clubs/${club._id}/approve`, {}, { withCredentials: true });
                          setPendingClubs(prev => prev.filter(c => c._id !== club._id));
                          alert('Club approved!');
                        } catch (err) {
                          alert('Failed to approve club.');
                        }
                      }}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${isDarkMode ? 'bg-gradient-to-r from-orange-500 to-green-500' : 'bg-gradient-to-r from-blue-500 to-green-400'} text-white shadow-lg hover:shadow-xl`}
                    >
                      Approve
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}
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
              {login_info.isLoggedIn
                ? `Stay updated with match reminders and ${isClubOwner ? 'club management and challenge' : 'club invitations and join request'} notifications`
                : 'Stay updated with your match reminders'
              }
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
                      {(notification.type.includes('challenge') && notification.challengeInfo) && (
                        <div className={`p-4 rounded-xl mb-4 ${
                          isDarkMode ? 'bg-white/5' : 'bg-black/5'
                        }`}>
                          <h4 className="font-semibold mb-3">Challenge Details</h4>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                            {notification.challengeInfo.club && (
                              <div>
                                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Club:</span>
                                <p className="font-semibold">{notification.challengeInfo.club}</p>
                              </div>
                            )}
                            {notification.challengeInfo.sport && (
                              <div>
                                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Sport:</span>
                                <p className="font-semibold">{notification.challengeInfo.sport}</p>
                              </div>
                            )}
                            {notification.challengeInfo.prizePool && (
                              <div>
                                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Prize Pool:</span>
                                <p className="font-semibold text-green-400">{notification.challengeInfo.prizePool}</p>
                              </div>
                            )}
                            {notification.challengeInfo.location && (
                              <div>
                                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Location:</span>
                                <p className="font-semibold">{notification.challengeInfo.location}</p>
                              </div>
                            )}
                            {notification.challengeInfo.date && (
                              <div>
                                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Date:</span>
                                <p className="font-semibold">{notification.challengeInfo.date}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Additional Info for Reminders */}
                      {(notification.type === 'reminder' && notification.reminderInfo) && (
                        <div className={`p-4 rounded-xl mb-4 ${
                          isDarkMode ? 'bg-orange-500/10' : 'bg-orange-50'
                        }`}>
                          <h4 className="font-semibold mb-3 flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-orange-500" />
                            Reminder Details
                          </h4>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Match:</span>
                              <p className="font-semibold">{notification.reminderInfo.match.homeTeam} vs {notification.reminderInfo.match.awayTeam}</p>
                            </div>
                            <div>
                              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Reminder Time:</span>
                              <p className="font-semibold text-orange-500">{notification.reminderInfo.minutes} minutes before</p>
                            </div>
                            <div>
                              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Scheduled For:</span>
                              <p className="font-semibold">{new Date(notification.reminderInfo.scheduledFor).toLocaleString()}</p>
                            </div>
                            {notification.reminderInfo.match.venue && (
                              <div>
                                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Venue:</span>
                                <p className="font-semibold">{notification.reminderInfo.match.venue}</p>
                              </div>
                            )}
                            {notification.reminderInfo.match.sport && (
                              <div>
                                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Sport:</span>
                                <p className="font-semibold">{notification.reminderInfo.match.sport}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex items-center space-x-3">
                        {/* Challenge-specific actions */}
                        {notification.type === 'challenge_request' && (
                          <>
                            <button
                              onClick={() => handleChallengeAction(notification, 'accept')}
                              className="px-6 py-3 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white shadow-lg hover:shadow-xl"
                            >
                              Accept Challenge
                            </button>
                            <button
                              onClick={() => handleChallengeAction(notification, 'decline')}
                              className="px-6 py-3 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-400 hover:to-pink-500 text-white shadow-lg hover:shadow-xl"
                            >
                              Decline
                            </button>
                          </>
                        )}
                        
                        {/* Reminder-specific actions */}
                        {notification.type === 'reminder' && (
                          <button
                            onClick={() => handleReminderDelete(notification.reminderInfo.matchKey)}
                            className="px-6 py-3 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-400 hover:to-pink-500 text-white shadow-lg hover:shadow-xl"
                          >
                            Cancel Reminder
                          </button>
                        )}
                        
                        {/* Default action button for other notifications */}
                        {notification.type !== 'challenge_request' && notification.type !== 'reminder' && (
                          <button
                            onClick={() => {
                              if (notification.actionUrl) {
                                window.location.href = notification.actionUrl;
                              }
                            }}
                            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                            isDarkMode
                                ? 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500'
                                : 'bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500'
                            } text-white shadow-lg hover:shadow-xl`}
                          >
                            {notification.action}
                          </button>
                        )}
                        
                        {/* Mark as read button */}
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className={`px-4 py-3 rounded-xl transition-all duration-300 ${
                              isDarkMode
                                ? 'bg-white/10 hover:bg-white/20'
                                : 'bg-black/10 hover:bg-black/20'
                            }`}
                            title="Mark as read"
                          >
                            <CheckCircle className="w-5 h-5" />
                          </button>
                        )}
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
              <button
                onClick={markAllAsRead}
                className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-300 ${
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