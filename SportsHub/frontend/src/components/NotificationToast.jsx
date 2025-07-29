import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Trophy, Users, MessageCircle, CheckCircle, AlertCircle, Info } from 'lucide-react';

const NotificationToast = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const handleNotificationEvent = (event) => {
      const { type, title, message, duration = 5000 } = event.detail;
      
      const newNotification = {
        id: Date.now(),
        type,
        title,
        message,
        duration,
        timestamp: new Date()
      };

      setNotifications(prev => [...prev, newNotification]);

      // Auto-remove after specified duration
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
      }, duration);
    };

    window.addEventListener('sportsHubNotification', handleNotificationEvent);
    
    return () => {
      window.removeEventListener('sportsHubNotification', handleNotificationEvent);
    };
  }, []);

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
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
      case 'message':
        return MessageCircle;
      case 'success':
        return CheckCircle;
      case 'error':
        return AlertCircle;
      case 'info':
        return Info;
      default:
        return Bell;
    }
  };

  const getNotificationColors = (type) => {
    switch (type) {
      case 'challenge_request':
        return {
          bg: 'from-red-500 to-red-600',
          border: 'border-red-400',
          icon: 'text-red-100'
        };
      case 'challenge_accepted':
      case 'success':
        return {
          bg: 'from-green-500 to-green-600',
          border: 'border-green-400',
          icon: 'text-green-100'
        };
      case 'challenge_declined':
      case 'error':
        return {
          bg: 'from-red-500 to-red-600',
          border: 'border-red-400',
          icon: 'text-red-100'
        };
      case 'club_invitation':
      case 'join_request':
      case 'info':
        return {
          bg: 'from-blue-500 to-blue-600',
          border: 'border-blue-400',
          icon: 'text-blue-100'
        };
      case 'message':
        return {
          bg: 'from-purple-500 to-purple-600',
          border: 'border-purple-400',
          icon: 'text-purple-100'
        };
      default:
        return {
          bg: 'from-gray-500 to-gray-600',
          border: 'border-gray-400',
          icon: 'text-gray-100'
        };
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      <AnimatePresence>
        {notifications.map((notification) => {
          const Icon = getNotificationIcon(notification.type);
          const colors = getNotificationColors(notification.type);
          
          return (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: 300, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 300, scale: 0.8 }}
              className={`bg-gradient-to-r ${colors.bg} text-white p-4 rounded-lg shadow-2xl border ${colors.border} backdrop-blur-md`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Icon className={`w-5 h-5 ${colors.icon}`} />
                  <span className="font-bold text-sm">{notification.title}</span>
                </div>
                <button
                  onClick={() => removeNotification(notification.id)}
                  className={`${colors.icon} hover:text-white transition-colors p-1 rounded-full hover:bg-white/20`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="mb-2">
                <p className="text-sm text-white/90 leading-relaxed">
                  {notification.message}
                </p>
              </div>

              <div className="text-xs text-white/75 opacity-75">
                {notification.timestamp.toLocaleTimeString()}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

// Helper function to trigger notification toasts
export const showNotificationToast = (type, title, message, duration = 5000) => {
  const event = new CustomEvent('sportsHubNotification', {
    detail: { type, title, message, duration }
  });
  window.dispatchEvent(event);
};

export default NotificationToast;