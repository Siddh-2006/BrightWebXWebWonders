import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Sports from './pages/Sports';
import Live from './pages/Live';
import Notifications from './pages/Notifications';
import AIGuru from './pages/AIGuru';
import About from './pages/About';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Footer from './components/Footer';

function App() {
  const [userType, setUserType] = useState<'player' | 'faculty' | 'guest'>('player');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white' 
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900'
    }`}>
      <Router>
        <Navbar 
          userType={userType} 
          isLoggedIn={isLoggedIn} 
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
        />
        
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home isDarkMode={isDarkMode} />} />
            <Route path="/sports" element={<Sports isDarkMode={isDarkMode} />} />
            <Route path="/live" element={<Live isDarkMode={isDarkMode} />} />
            <Route path="/notifications" element={<Notifications isDarkMode={isDarkMode} userType={userType} />} />
            <Route path="/ai-guru" element={<AIGuru isDarkMode={isDarkMode} />} />
            <Route path="/about" element={<About isDarkMode={isDarkMode} />} />
            <Route path="/profile" element={<Profile isDarkMode={isDarkMode} />} />
            <Route path="/login" element={<Login isDarkMode={isDarkMode} setIsLoggedIn={setIsLoggedIn} />} />
          </Routes>
        </AnimatePresence>
        
        <Footer isDarkMode={isDarkMode} />
      </Router>
    </div>
  );
}

export default App;