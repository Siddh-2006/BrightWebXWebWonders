import React, { useState } from 'react';
import { Link, useLocation } from 'react-router';
import {motion} from "motion/react"
import { 
  Home, Trophy, Radio, Bell, Brain, Users, User, LogIn, LogOut, 
  Menu, X, Sun, Moon, Zap, Target, Award
} from 'lucide-react';

const Navbar = ({ userType, isLoggedIn, isDarkMode, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Trophy, label: 'Sports', href: '/sports' },
    { icon: Radio, label: 'Live', href: '/live' },
    ...(userType === 'player' ? [
      { icon: Bell, label: 'Notifications', href: '/notifications' },
      { icon: Brain, label: 'AI Guru', href: '/ai-guru' }
    ] : []),
    { icon: Users, label: 'About Us', href: '/about' },
    ...(isLoggedIn ? [
      { icon: User, label: 'Profile', href: '/profile' },
      { icon: LogOut, label: 'Logout', href: '/logout' }
    ] : [
      { icon: LogIn, label: 'Login', href: '/login' }
    ])
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isDarkMode 
          ? 'bg-black/20 backdrop-blur-xl border-b border-orange-500/20' 
          : 'bg-white/20 backdrop-blur-xl border-b border-blue-500/20'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Enhanced Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className={`relative w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-orange-500 to-red-600 group-hover:from-orange-400 group-hover:to-red-500' 
                : 'bg-gradient-to-r from-blue-500 to-cyan-400 group-hover:from-blue-400 group-hover:to-cyan-300'
            }`}>
              <Trophy className="w-7 h-7 text-white" />
              <motion.div
                className="absolute inset-0 rounded-2xl"
                animate={{
                  boxShadow: isDarkMode 
                    ? ['0 0 0 0 rgba(249, 115, 22, 0.4)', '0 0 0 10px rgba(249, 115, 22, 0)', '0 0 0 0 rgba(249, 115, 22, 0.4)']
                    : ['0 0 0 0 rgba(59, 130, 246, 0.4)', '0 0 0 10px rgba(59, 130, 246, 0)', '0 0 0 0 rgba(59, 130, 246, 0.4)']
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <div>
              <h1 className={`text-2xl font-bold transition-colors ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Sports<span className={isDarkMode ? 'text-orange-400' : 'text-blue-500'}>Hub</span>
              </h1>
              <p className={`text-xs transition-colors ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Digital Identity & AI Coaching
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 group relative ${
                  isActive(item.href)
                    ? isDarkMode
                      ? 'bg-orange-500/20 text-orange-400 shadow-lg shadow-orange-500/25'
                      : 'bg-blue-500/20 text-blue-600 shadow-lg shadow-blue-500/25'
                    : isDarkMode
                      ? 'text-gray-300 hover:bg-white/10 hover:text-orange-400'
                      : 'text-gray-700 hover:bg-black/10 hover:text-blue-600'
                }`}
              >
                <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-sm">{item.label}</span>
                {isActive(item.href) && (
                  <motion.div
                    layoutId="activeTab"
                    className={`absolute inset-0 rounded-xl ${
                      isDarkMode ? 'bg-orange-500/10' : 'bg-blue-500/10'
                    }`}
                    style={{ zIndex: -1 }}
                  />
                )}
              </Link>
            ))}
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-3 rounded-xl transition-all duration-300 ${
                isDarkMode
                  ? 'bg-orange-500/20 text-orange-400 hover:bg-orange-500/30'
                  : 'bg-blue-500/20 text-blue-600 hover:bg-blue-500/30'
              }`}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-3">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode
                  ? 'text-orange-400 hover:bg-orange-500/20'
                  : 'text-blue-600 hover:bg-blue-500/20'
              }`}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode
                  ? 'text-white hover:bg-white/10'
                  : 'text-gray-900 hover:bg-black/10'
              }`}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: isMenuOpen ? 1 : 0, 
          height: isMenuOpen ? 'auto' : 0 
        }}
        className={`lg:hidden overflow-hidden ${
          isDarkMode 
            ? 'bg-black/95 backdrop-blur-xl border-t border-orange-500/20' 
            : 'bg-white/95 backdrop-blur-xl border-t border-blue-500/20'
        }`}
      >
        <div className="px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                isActive(item.href)
                  ? isDarkMode
                    ? 'bg-orange-500/20 text-orange-400'
                    : 'bg-blue-500/20 text-blue-600'
                  : isDarkMode
                    ? 'text-gray-300 hover:bg-white/10 hover:text-orange-400'
                    : 'text-gray-700 hover:bg-black/10 hover:text-blue-600'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;