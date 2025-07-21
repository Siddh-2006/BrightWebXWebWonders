import React, { useState } from "react";
import {
  Search,
  MapPin,
  Star,
  Users,
  Calendar,
  Trophy,
  Heart,
  MessageCircle,
  Share2,
  Plus,
} from "lucide-react";
function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div>
      <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="bg-orange-500 w-10 h-10 rounded-lg flex items-center justify-center">
                <Trophy size={24} className="text-white" />
              </div>
              <h1 className=" text-xl sm:text-2xl text-white font-bold">SportsHub</h1>
            </div>


            {/* for large screens */}

            <div className="flex-1 max-w-lg sm:mx-8 mx-1">
              <div className="relative">
                <Search
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search players, clubs, or sports..."
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="hidden items-center space-x-4 sm:flex">
              <button className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
                <Plus size={16} />
                <span>Create Profile</span>
              </button>
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                U
              </div>
            </div>

            {/* for small screens */}
            <div className="hamburger">

            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
