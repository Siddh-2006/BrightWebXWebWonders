import React from 'react';
import { ArrowRight, Users, Calendar, Trophy, Target } from 'lucide-react';

const SportsSection = () => {
  const sports = [
    {
      id: 1,
      name: 'Football',
      description: 'The beautiful game that unites the world. Join clubs, compete in tournaments, and showcase your skills.',
      image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=800',
      participants: 15420,
      upcomingEvents: 23,
      topClubs: ['Thunder FC', 'Lightning United', 'Storm City'],
      icon: '⚽'
    },
    {
      id: 2,
      name: 'Basketball',
      description: 'Fast-paced action and incredible athleticism. Experience the thrill of the court.',
      image: 'https://images.pexels.com/photos/358042/pexels-photo-358042.jpeg?auto=compress&cs=tinysrgb&w=800',
      participants: 12890,
      upcomingEvents: 18,
      topClubs: ['Hoops Elite', 'Court Kings', 'Slam Dunkers'],
      icon: '🏀'
    },
    {
      id: 3,
      name: 'Tennis',
      description: 'Precision, power, and mental strength. Master the art of tennis with expert coaching.',
      image: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=800',
      participants: 8750,
      upcomingEvents: 15,
      topClubs: ['Ace Tennis Club', 'Racket Masters', 'Court Champions'],
      icon: '🎾'
    },
    {
      id: 4,
      name: 'Swimming',
      description: 'Dive into excellence. Perfect your technique and compete in aquatic sports.',
      image: 'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=800',
      participants: 6420,
      upcomingEvents: 12,
      topClubs: ['Aqua Sharks', 'Wave Riders', 'Pool Legends'],
      icon: '🏊'
    },
    {
      id: 5,
      name: 'Cricket',
      description: 'The gentleman\'s game with strategic depth. Join the cricket community and play with passion.',
      image: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg?auto=compress&cs=tinysrgb&w=800',
      participants: 11200,
      upcomingEvents: 20,
      topClubs: ['Royal Cricketers', 'Boundary Hunters', 'Wicket Warriors'],
      icon: '🏏'
    },
    {
      id: 6,
      name: 'Track & Field',
      description: 'Push your limits in athletics. Sprint, jump, throw - discover your athletic potential.',
      image: 'https://images.pexels.com/photos/2402777/pexels-photo-2402777.jpeg?auto=compress&cs=tinysrgb&w=800',
      participants: 9340,
      upcomingEvents: 16,
      topClubs: ['Speed Demons', 'Track Stars', 'Field Masters'],
      icon: '🏃'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Explore <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">Sports</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover your passion, join communities, and compete at the highest level across multiple sports disciplines
          </p>
        </div>

        {/* Sports Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sports.map((sport) => (
            <div key={sport.id} className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
              {/* Sport Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={sport.image} 
                  alt={sport.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute top-4 right-4 text-4xl">{sport.icon}</div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-2xl font-bold text-white mb-1">{sport.name}</h3>
                </div>
              </div>

              {/* Sport Content */}
              <div className="p-6">
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {sport.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <Users className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                    <p className="text-sm font-semibold text-gray-900">{sport.participants.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">Players</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-green-500 mx-auto mb-1" />
                    <p className="text-sm font-semibold text-gray-900">{sport.upcomingEvents}</p>
                    <p className="text-xs text-gray-500">Events</p>
                  </div>
                </div>

                {/* Top Clubs */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                    <Trophy className="w-4 h-4 text-yellow-500 mr-1" />
                    Top Clubs
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {sport.topClubs.map((club, index) => (
                      <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                        {club}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-500 transition-all duration-300 flex items-center justify-center space-x-2 group">
                  <span>Explore {sport.name}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-cyan-400/0 group-hover:from-blue-500/10 group-hover:to-cyan-400/10 transition-all duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-400 rounded-2xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Don't see your sport? We're always expanding!
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Request new sports, suggest improvements, or join our community to help shape the future of SportsHub
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
              Request New Sport
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SportsSection;