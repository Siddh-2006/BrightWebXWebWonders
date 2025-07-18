// src/routes/index.js (Example using React Router v6)
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home'; // Assuming you have a Home page
import AIGuruPage from '../pages/AIGuruPage'; // Your new AI Guru page

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ai-guru" element={<AIGuruPage />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default AppRoutes;