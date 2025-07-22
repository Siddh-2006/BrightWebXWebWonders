import React, { useState } from 'react';
import { ChevronRight, Calendar, MapPin, Users, Trophy, Star } from 'lucide-react';

const Sports = () => {
  const [selectedSport, setSelectedSport] = useState(0);

  const sports = [
    {
      name: 'Football',
      icon: '⚽',
      color: 'from-green-500 to-blue-500',
      stats: { players: '2.5M', clubs: '15K', matches: '50K' },
      description: 'The beautiful game that unites the world',
      image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      name: 'Basketball',
      icon: '🏀',
      color: 'from-orange-500 to-red-500',
      stats: { players: '1.8M', clubs: '12K', matches: '35K' },
      description: 'Fast-paced action and incredible athleticism',
      image: 'https://images.pexels.com/photos/358042/pexels-photo-358042.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      name: 'Cricket',
      icon: '🏏',
      color: 'from-blue-500 to-purple-500',
      stats: { players: '3.2M', clubs: '20K', matches: '80K' },
      description: 'Strategy, skill, and tradition combined',
      image: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      name: 'Tennis',
      icon: '🎾',
      color: 'from-purple-500 to-pink-500',
      stats: { players: '1.2M', clubs: '8K', matches: '25K' },
      description: 'Precision, power, and mental strength',
      image: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      name: 'Swimming',
      icon: '🏊',
      color: 'from-cyan-500 to-blue-500',
      stats: { players: '900K', clubs: '5K', matches: '15K' },
      description: 'Excellence through dedication and technique',
      image: 'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      name: 'Athletics',
      icon: '🏃',
      color: 'from-yellow-500 to-orange-500',
      stats: { players: '1.5M', clubs: '10K', matches: '40K' },
      description: 'Pure speed, strength, and human potential',
      image: 'https://images.pexels.com/photos/2524874/pexels-photo-2524874.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  return (
    <section id="sports" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="gradient-text">Explore Sports</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover your passion across multiple sports. Each sport has its own dedicated community, training programs, and competitions.
          </p>
        </div>

        {/* Sports Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {sports.map((sport, index) => (
            <button
              key={index}
              onClick={() => setSelectedSport(index)}
              className={`glass px-6 py-3 rounded-full flex items-center gap-3 transition-all duration-300 ${
                selectedSport === index ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'hover:bg-white/20'
              }`}
            >
              <span className="text-2xl">{sport.icon}</span>
              <span className="font-medium">{sport.name}</span>
            </button>
          ))}
        </div>

        {/* Selected Sport Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="mb-6">
              <h3 className="text-4xl font-bold mb-4 flex items-center gap-4">
                <span className="text-5xl">{sports[selectedSport].icon}</span>
                <span className="gradient-text">{sports[selectedSport].name}</span>
              </h3>
              <p className="text-xl text-gray-300 mb-6">
                {sports[selectedSport].description}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="glass p-4 text-center rounded-lg">
                <div className="text-2xl font-bold text-blue-400">
                  {sports[selectedSport].stats.players}
                </div>
                <div className="text-sm text-gray-400">Players</div>
              </div>
              <div className="glass p-4 text-center rounded-lg">
                <div className="text-2xl font-bold text-green-400">
                  {sports[selectedSport].stats.clubs}
                </div>
                <div className="text-sm text-gray-400">Clubs</div>
              </div>
              <div className="glass p-4 text-center rounded-lg">
                <div className="text-2xl font-bold text-orange-400">
                  {sports[selectedSport].stats.matches}
                </div>
                <div className="text-sm text-gray-400">Matches</div>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-300">
                <Calendar className="h-5 w-5 text-blue-400" />
                <span>Tournaments & Events</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="h-5 w-5 text-green-400" />
                <span>Find Local Grounds</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Users className="h-5 w-5 text-orange-400" />
                <span>Join Communities</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Trophy className="h-5 w-5 text-purple-400" />
                <span>Rankings & Achievements</span>
              </div>
            </div>

            <button className="btn-primary mt-8 flex items-center gap-2">
              <span>Explore {sports[selectedSport].name}</span>
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="relative">
            <div className="glass rounded-2xl overflow-hidden">
              <img
                src={sports[selectedSport].image}
                alt={sports[selectedSport].name}
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-300">Top Rated Sport</span>
                </div>
                <h4 className="text-xl font-bold text-white">
                  Join the {sports[selectedSport].name} Community
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sports;