import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Sports from './pages/Sports';
import SportSpecific from './pages/SportSpecific';
import Quiz from './pages/Quiz';
import Live from './pages/Live';
import Notifications from './pages/Notifications';
import AIGuru from './components/AIGuru';
import About from './pages/About';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Footer from './components/Footer';
import ReminderToast from './components/ReminderToast';
import NotificationToast from './components/NotificationToast';
import { useContext } from 'react';
import loginContext from './context/loginContext';
import Logout from './pages/Logout';
import axios from 'axios';
import LivePage from './pages/LivePage';
import LiveScoreAdmin from './pages/LiveScoreAdmin';
import Club from './pages/Club';
import ClubDetails from './pages/ClubDetails';
import ChallengeDetails from './pages/ChallengeDetails';

function App() {
  const [userType, setUserType] = useState('player');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const login_info = useContext(loginContext);
  console.log(login_info)
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  // check to see if the user is logged in

  useEffect(() => {
    const fetch_user = async () => {
      try {
        const res = await axios.get("http://localhost:3000/users/profile", { withCredentials: true });
        if (res.status == 200) {
          login_info.setIsLoggedIn(true);
          localStorage.setItem("username", res.data.fullname);
        }
        else {
          login_info.setIsLoggedIn(false);
        }
      } catch (err) {
        console.log(err)
        login_info.setIsLoggedIn(false);
      }
    }
    fetch_user()
  }, [])

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode
      ? 'bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white'
      : 'bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900'
      }`}>
      <Router>
        <Navbar
          userType={userType}
          isLoggedIn={login_info.isLoggedIn}
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
        />

        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home isDarkMode={isDarkMode} />} />
            <Route path="/sports" element={<Sports isDarkMode={isDarkMode} />} />
            <Route path="/sports/:sport" element={<SportSpecific isDarkMode={isDarkMode} />} />
            <Route path="/quiz" element={<Quiz isDarkMode={isDarkMode} />} />
            <Route path="/live" element={<Live isDarkMode={isDarkMode} />} />
            <Route path="/notifications" element={<Notifications isDarkMode={isDarkMode} userType={userType} />} />
            <Route path="/ai-guru" element={<AIGuru isDarkMode={isDarkMode} />} />
            <Route path="/about" element={<About isDarkMode={isDarkMode} />} />
            <Route path="/profile" element={<Profile isDarkMode={isDarkMode} isLoggedIn={login_info.isLoggedIn} />} />
            <Route path="/login" element={<Login isDarkMode={isDarkMode} setIsLoggedIn={login_info.setIsLoggedIn} isLoggedIn={login_info.isLoggedIn} />} />
            <Route path="/logout" element={<Logout setIsLoggedIn={login_info.setIsLoggedIn} />} />
            <Route path="/club" element={<Club isDarkMode={isDarkMode} />} />
            <Route path="/club/:clubName" element={<ClubDetails isDarkMode={isDarkMode} />} />
            <Route path="/challenges/:challengeId" element={<ChallengeDetails isDarkMode={isDarkMode} />} />
            <Route path="/live_match/:sport/:matchId" element={<LivePage />}></Route>
            <Route path="/live_match_admin/:sport/:matchId" element={<LiveScoreAdmin />}></Route>
          </Routes>
        </AnimatePresence>

        <Footer isDarkMode={isDarkMode} />
        
        {/* Global Toast Systems */}
        <ReminderToast />
        <NotificationToast />
      </Router>
    </div>
  );
}

export default App;