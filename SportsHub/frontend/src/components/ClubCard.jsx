import React,{useState} from "react";
import { Search, MapPin, Star, Users, Calendar, Trophy, Heart, MessageCircle, Share2, Plus } from 'lucide-react';
function ClubCard({club}) {
  return (
    <div>
      <div className="bg-gradient-to-br from-emerald-900/40 via-gray-900 to-teal-900/40 rounded-xl overflow-hidden shadow-xl border border-emerald-500/30 hover:border-orange-400 hover:shadow-emerald-500/20 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm">
        <div className="h-32 bg-gradient-to-r from-indigo-600/80 via-purple-600/80 to-pink-600/80 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/30 to-yellow-500/30"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>

          <div className="absolute bottom-4 left-4">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg border border-white/20">
              {club.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </div>
          </div>
          <div className="absolute top-4 right-4 flex items-center bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full border border-yellow-400/30">
            <Star size={14} className="text-yellow-400 mr-1 fill-current" />
            <span className="text-yellow-100 text-sm font-medium">
              {club.rating}
            </span>
          </div>
        </div>

        <div className="p-6 relative">
          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 rounded-xl"></div>

          <div className="relative z-10">
            <h3 className="text-xl font-bold bg-gradient-to-r from-white via-emerald-100 to-teal-100 bg-clip-text text-transparent mb-2">
              {club.name}
            </h3>
            <p className="text-emerald-400 font-medium mb-1">{club.sport}</p>
            <div className="flex items-center text-cyan-300 text-sm mb-3">
              <MapPin size={14} className="mr-1" />
              {club.location}
            </div>

            <p className="text-gray-200 text-sm leading-relaxed mb-4">
              {club.description}
            </p>

            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <div>
                <span className="text-cyan-300">Members:</span>
                <p className="text-white font-medium flex items-center">
                  <Users size={14} className="mr-1 text-emerald-400" />
                  {club.members}
                </p>
              </div>
              <div>
                <span className="text-cyan-300">Founded:</span>
                <p className="text-white font-medium">{club.founded}</p>
              </div>
            </div>

            <div className="mb-4">
              <span className="text-cyan-300 text-sm">Facilities:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {club.facilities.slice(0, 3).map((facility, index) => (
                  <span
                    key={index}
                    className="bg-gradient-to-r from-teal-500/30 to-emerald-500/30 text-teal-200 px-2 py-1 rounded-full text-xs border border-teal-400/40 shadow-sm"
                  >
                    {facility}
                  </span>
                ))}
                {club.facilities.length > 3 && (
                  <span className="bg-gradient-to-r from-orange-500/30 to-yellow-500/30 text-orange-200 px-2 py-1 rounded-full text-xs border border-orange-400/40 shadow-sm">
                    +{club.facilities.length - 3} more
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                {club.joinFee}
              </span>
              <span className="text-cyan-300 text-sm">Membership</span>
            </div>

            <div className="flex space-x-2">
              <button className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-emerald-500/25">
                Join Club
              </button>
              <button className="bg-gradient-to-r from-red-500/80 to-pink-500/80 hover:from-red-500 hover:to-pink-500 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-md">
                <Heart size={16} />
              </button>
              <button className="bg-gradient-to-r from-purple-500/80 to-indigo-500/80 hover:from-purple-500 hover:to-indigo-500 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-md">
                <Share2 size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClubCard;
