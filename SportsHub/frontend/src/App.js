import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Sports from './components/Sports';
import AICoach from './components/AICoach';
import LiveSection from './components/LiveSection';
import Stats from './components/Stats';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Header />
      <Hero />
      <Features />
      <Sports />
      <AICoach />
      <LiveSection />
      <Stats />
      <Footer />
    </div>
  );
}

export default App;