import React ,{useState,useContext}from 'react'
import { Search, MapPin, Star, Users, Calendar, Trophy, Heart, MessageCircle, Share2, Plus } from 'lucide-react';
import navContext from '../../context/navContext';
function Navbar() {
  const nav_context=useContext(navContext);
  return (
    <div>
      <nav className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => nav_context.setActiveTab('players')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                nav_context.activeTab === 'players'
                  ? 'border-orange-500 text-orange-400'
                  : 'border-transparent text-gray-400 hover:text-white hover:border-gray-300'
              }`}
            >
              Players
            </button>
            <button
              onClick={() => nav_context.setActiveTab('clubs')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                nav_context.activeTab === 'clubs'
                  ? 'border-orange-500 text-orange-400'
                  : 'border-transparent text-gray-400 hover:text-white hover:border-gray-300'
              }`}
            >
              Clubs
            </button>
          </div>
        </div>
      </nav>

    </div>
  )
}

export default Navbar
