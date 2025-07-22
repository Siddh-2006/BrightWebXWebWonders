import React from 'react';
import { Link } from 'react-router';
import { ChevronRight, Users, Trophy, Calendar, MapPin } from 'lucide-react';

const Sports = () => {
  const sports = [
    {
      name: 'Football',
      slug: 'football',
      icon: '⚽',
      color: 'from-green-500 to-blue-500',
      stats: { players: '2.5M', clubs: '15K', matches: '50K' },
      description: 'The beautiful game that unites the world',
      image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=800',
      popularity: 95
    },
    {
      name: 'Basketball',
      slug: 'basketball',
      icon: '🏀',
      color: 'from-orange-500 to-red-500',
      stats: { players: '1.8M', clubs: '12K', matches: '35K' },
      description: 'Fast-paced action and incredible athleticism',
      image: 'https://images.pexels.com/photos/358042/pexels-photo-358042.jpeg?auto=compress&cs=tinysrgb&w=800',
      popularity: 88
    },
    {
      name: 'Cricket',
      slug: 'cricket',
      icon: '🏏',
      color: 'from-blue-500 to-purple-500',
      stats: { players: '3.2M', clubs: '20K', matches: '80K' },
      description: 'Strategy, skill, and tradition combined',
      image: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg?auto=compress&cs=tinysrgb&w=800',
      popularity: 92
    },
    {
      name: 'Tennis',
      slug: 'tennis',
      icon: '🎾',
      color: 'from-purple-500 to-pink-500',
      stats: { players: '1.2M', clubs: '8K', matches: '25K' },
      description: 'Precision, power, and mental strength',
      image: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=800',
      popularity: 75
    },
    {
      name: 'Swimming',
      slug: 'swimming',
      icon: '🏊',
      color: 'from-cyan-500 to-blue-500',
      stats: { players: '900K', clubs: '5K', matches: '15K' },
      description: 'Excellence through dedication and technique',
      image: 'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=800',
      popularity: 68
    },
    {
      name: 'Athletics',
      slug: 'athletics',
      icon: '🏃',
      color: 'from-yellow-500 to-orange-500',
      stats: { players: '1.5M', clubs: '10K', matches: '40K' },
      description: 'Pure speed, strength, and human potential',
      image: 'https://images.pexels.com/photos/2524874/pexels-photo-2524874.jpeg?auto=compress&cs=tinysrgb&w=800',
      popularity: 82
    },
    {
      name: 'Badminton',
      slug: 'badminton',
      icon: '🏸',
      color: 'from-red-500 to-orange-500',
      stats: { players: '800K', clubs: '6K', matches: '20K' },
      description: 'Speed, agility, and precision in every shot',
      image: 'https://images.pexels.com/photos/2524874/pexels-photo-2524874.jpeg?auto=compress&cs=tinysrgb&w=800',
      popularity: 70
    },
    {
      name: 'Hockey',
      slug: 'hockey',
      icon: '🏑',
      color: 'from-indigo-500 to-purple-500',
      stats: { players: '600K', clubs: '4K', matches: '12K' },
      description: 'Team spirit and strategic gameplay',
      image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=800',
      popularity: 65
    },
    {
      name: 'Volleyball',
      slug: 'volleyball',
      icon: '🏐',
      color: 'from-pink-500 to-red-500',
      stats: { players: '700K', clubs: '5K', matches: '18K' },
      description: 'Teamwork and explosive power',
      image: 'https://images.pexels.com/photos/358042/pexels-photo-358042.jpeg?auto=compress&cs=tinysrgb&w=800',
      popularity: 72
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-orange-900/40 to-gray-900/80"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=1920)'
          }}
        ></div>
        
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6">
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Choose Your
            </span>
            <br />
            <span className="text-white">Passion</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Explore different sports, join communities, and discover your athletic journey with our comprehensive sports platform.
          </p>
        </div>
      </section>

      {/* Sports Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full font-medium transition-all duration-300 hover:scale-105">
              All Sports
            </button>
            <button className="px-6 py-3 bg-white/10 backdrop-blur-md text-gray-300 rounded-full font-medium hover:text-white hover:bg-white/20 transition-all duration-300">
              Team Sports
            </button>
            <button className="px-6 py-3 bg-white/10 backdrop-blur-md text-gray-300 rounded-full font-medium hover:text-white hover:bg-white/20 transition-all duration-300">
              Individual
            </button>
            <button className="px-6 py-3 bg-white/10 backdrop-blur-md text-gray-300 rounded-full font-medium hover:text-white hover:bg-white/20 transition-all duration-300">
              Popular
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sports.map((sport, index) => (
              <Link
                key={index}
                to={`/sports/${sport.slug}`}
                className="group bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-orange-500/20 hover:border-orange-500/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/20 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative">
                  <img
                    src={sport.image}
                    alt={sport.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/60 transition-all duration-300"></div>
                  
                  {/* Sport Icon */}
                  <div className="absolute top-4 left-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${sport.color} rounded-full flex items-center justify-center text-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg`}>
                      {sport.icon}
                    </div>
                  </div>
                  
                  {/* Popularity Badge */}
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {sport.popularity}% Popular
                  </div>
                  
                  {/* Sport Name */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-orange-300 transition-colors duration-300">{sport.name}</h3>
                    <p className="text-gray-300 text-sm group-hover:text-gray-200 transition-colors duration-300">{sport.description}</p>
                  </div>
                </div>
                
                <div className="p-6">
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center group-hover:scale-105 transition-transform duration-300">
                      <div className="text-lg font-bold text-orange-400 group-hover:text-orange-300">{sport.stats.players}</div>
                      <div className="text-xs text-gray-400 group-hover:text-gray-300">Players</div>
                    </div>
                    <div className="text-center group-hover:scale-105 transition-transform duration-300">
                      <div className="text-lg font-bold text-blue-400 group-hover:text-blue-300">{sport.stats.clubs}</div>
                      <div className="text-xs text-gray-400 group-hover:text-gray-300">Clubs</div>
                    </div>
                    <div className="text-center group-hover:scale-105 transition-transform duration-300">
                      <div className="text-lg font-bold text-green-400 group-hover:text-green-300">{sport.stats.matches}</div>
                      <div className="text-xs text-gray-400 group-hover:text-gray-300">Matches</div>
                    </div>
                  </div>
                  
                  {/* Features */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Calendar className="h-4 w-4 text-orange-400" />
                      <span>Tournaments & Events</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <MapPin className="h-4 w-4 text-blue-400" />
                      <span>Find Local Grounds</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Users className="h-4 w-4 text-green-400" />
                      <span>Join Communities</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Trophy className="h-4 w-4 text-purple-400" />
                      <span>Rankings & Achievements</span>
                    </div>
                  </div>
                  
                  {/* Explore Button */}
                  <div className="flex items-center justify-between bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg p-3 group-hover:from-orange-500/20 group-hover:to-red-500/20 transition-all duration-300">
                    <span className="text-orange-400 font-semibold group-hover:text-orange-300 transition-colors">
                      Explore {sport.name}
                    </span>
                    <ChevronRight className="h-5 w-5 text-orange-400 group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Can't Find Your Sport?
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            We're constantly adding new sports to our platform. Let us know what you'd like to see!
          </p>
          <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300">
            Request a Sport
          </button>
        </div>
      </section>
    </div>
  );
};

export default Sports;