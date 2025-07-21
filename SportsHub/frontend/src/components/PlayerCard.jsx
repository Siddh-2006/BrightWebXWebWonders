import React,{useState} from 'react'
import { Search, MapPin, Star, Users, Calendar, Trophy, Heart, MessageCircle, Share2, Plus } from 'lucide-react';
import NavbarProfiles from './UI/NavbarProfiles';
function PlayerCard({player}) {
  return (
    <div>
    <NavbarProfiles/>
      <div className="bg-gradient-to-br from-purple-900/50 via-gray-900 to-blue-900/50 rounded-xl overflow-hidden shadow-xl border border-purple-500/30 hover:border-orange-400 hover:shadow-orange-500/20 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm">
      <div className="p-6 relative">
        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-purple-500/5 rounded-xl"></div>
        
        <div className="flex items-start space-x-4 relative z-10">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
              {player.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-green-400 to-emerald-500 w-5 h-5 rounded-full border-2 border-gray-900 shadow-md"></div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold bg-gradient-to-r from-white via-orange-100 to-purple-100 bg-clip-text text-transparent mb-1">{player.name}</h3>
            <p className="text-orange-400 font-medium">{player.sport} • {player.position}</p>
            <div className="flex items-center text-cyan-300 text-sm mt-1">
              <MapPin size={14} className="mr-1" />
              {player.location}
            </div>
          </div>
          <div className="flex items-center bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-400/30 px-2 py-1 rounded-full backdrop-blur-sm">
            <Star size={14} className="text-orange-400 mr-1 fill-current" />
            <span className="text-orange-100 text-sm font-medium">{player.rating}</span>
          </div>
        </div>
        
        <p className="text-gray-200 mt-4 text-sm leading-relaxed relative z-10">{player.bio}</p>
        
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm relative z-10">
          <div>
            <span className="text-cyan-300">Experience:</span>
            <p className="text-white font-medium">{player.experience}</p>
          </div>
          <div>
            <span className="text-cyan-300">Availability:</span>
            <p className="text-white font-medium">{player.availability}</p>
          </div>
        </div>

        <div className="mt-4 relative z-10">
          <span className="text-cyan-300 text-sm">Achievements:</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {player.achievements.map((achievement, index) => (
              <span key={index} className="bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-purple-200 px-2 py-1 rounded-full text-xs border border-purple-400/40 shadow-sm">
                {achievement}
              </span>
            ))}
          </div>
        </div>

        <div className="flex space-x-2 mt-6 relative z-10">
          <button className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-orange-500/25">
            Connect
          </button>
          <button className="bg-gradient-to-r from-red-500/80 to-pink-500/80 hover:from-red-500 hover:to-pink-500 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-md">
            <Heart size={16} />
          </button>
          <button className="bg-gradient-to-r from-blue-500/80 to-cyan-500/80 hover:from-blue-500 hover:to-cyan-500 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-md">
            <MessageCircle size={16} />
          </button>
          <button className="bg-gradient-to-r from-purple-500/80 to-indigo-500/80 hover:from-purple-500 hover:to-indigo-500 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-md">
            <Share2 size={16} />
          </button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default PlayerCard

