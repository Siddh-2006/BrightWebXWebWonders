import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Sports from './pages/Sports';
import SportDetail from './pages/SportDetail';
import Live from './pages/Live';
import News from './pages/News';
import Profile from './pages/Profile';
import AboutUs from './pages/AboutUs';
import Clubs from './pages/Clubs';
import Login from './pages/Login';
import AICoach from './pages/AICoach';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-orange-900/20 to-gray-900">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sports" element={<Sports />} />
          <Route path="/sports/:sportName" element={<SportDetail />} />
          <Route path="/live" element={<Live />} />
          <Route path="/news" element={<News />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/clubs" element={<Clubs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/ai-coach" element={<AICoach />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;