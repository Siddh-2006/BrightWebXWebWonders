import React, { useState } from 'react';
import { Users, MapPin, Star, Trophy, Calendar, Search, Filter, Mail } from 'lucide-react';

const Clubs = () => {
  const [selectedSport, setSelectedSport] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const sports = [
    { id: 'all', name: 'All Sports' },
    { id: 'football', name: 'Football' },
    { id: 'basketball', name: 'Basketball' },
    { id: 'cricket', name: 'Cricket' },
    { id: 'tennis', name: 'Tennis' }
  ];

  const clubs = [
    {
      id: 1,
      name: 'Elite Football Academy',
      sport: 'football',
      location: 'Mumbai, Maharashtra',
      members: 250,
      established: 2015,
      verified: true,
      rating: 4.8,
      description: 'Professional football training academy with state-of-the-art facilities and experienced coaches.',
      image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=800',
      achievements: ['State Champions 2023', 'Youth League Winners', 'Best Academy Award'],
      facilities: ['Professional Ground', 'Gym', 'Medical Room', 'Cafeteria']
    },
    {
      id: 2,
      name: 'Basketball Pro Club',
      sport: 'basketball',
      location: 'Delhi, NCR',
      members: 180,
      established: 2018,
      verified: true,
      rating: 4.6,
      description: 'Premier basketball club focusing on developing young talent for professional leagues.',
      image: 'https://images.pexels.com/photos/358042/pexels-photo-358042.jpeg?auto=compress&cs=tinysrgb&w=800',
      achievements: ['Regional Champions', 'Best Youth Development', 'Tournament Winners'],
      facilities: ['Indoor Court', 'Training Equipment', 'Locker Rooms', 'Video Analysis']
    },
    {
      id: 3,
      name: 'Cricket Excellence Center',
      sport: 'cricket',
      location: 'Bangalore, Karnataka',
      members: 320,
      established: 2012,
      verified: true,
      rating: 4.9,
      description: 'Comprehensive cricket training center with international standard facilities.',
      image: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg?auto=compress&cs=tinysrgb&w=800',
      achievements: ['National Level Players', 'IPL Academy Partner', 'Excellence Award'],
      facilities: ['Multiple Pitches', 'Bowling Machine', 'Fitness Center', 'Hostel']
    },
    {
      id: 4,
      name: 'Tennis Champions Club',
      sport: 'tennis',
      location: 'Chennai, Tamil Nadu',
      members: 120,
      established: 2020,
      verified: true,
      rating: 4.7,
      description: 'Modern tennis club with world-class courts and professional coaching staff.',
      image: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=800',
      achievements: ['Junior Champions', 'Best Facilities', 'Coaching Excellence'],
      facilities: ['Clay Courts', 'Hard Courts', 'Pro Shop', 'Restaurant']
    },
    {
      id: 5,
      name: 'United Football Club',
      sport: 'football',
      location: 'Kolkata, West Bengal',
      members: 200,
      established: 2010,
      verified: false,
      rating: 4.4,
      description: 'Community-focused football club promoting grassroots development.',
      image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=800',
      achievements: ['Local Champions', 'Community Award', 'Youth Development'],
      facilities: ['Training Ground', 'Equipment Room', 'First Aid', 'Parking']
    },
    {
      id: 6,
      name: 'Hoops Basketball Academy',
      sport: 'basketball',
      location: 'Pune, Maharashtra',
      members: 150,
      established: 2019,
      verified: true,
      rating: 4.5,
      description: 'Dedicated to nurturing basketball talent with personalized training programs.',
      image: 'https://images.pexels.com/photos/358042/pexels-photo-358042.jpeg?auto=compress&cs=tinysrgb&w=800',
      achievements: ['Rising Stars Award', 'Best Coaching', 'Youth League'],
      facilities: ['Indoor Court', 'Strength Training', 'Recovery Room', 'Study Hall']
    }
  ];

  const filteredClubs = clubs.filter(club => {
    const matchesSport = selectedSport === 'all' || club.sport === selectedSport;
    const matchesSearch = club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         club.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSport && matchesSearch;
  });

  const handleJoinClub = (clubName) => {
    // Simulate automated email
    alert(`Automated email sent to ${clubName}! They will contact you within a few minutes.`);
  };

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
              Sports
            </span>
            <br />
            <span className="text-white">Clubs</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Discover and join verified sports clubs near you. Connect with like-minded athletes and take your game to the next level.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search clubs or locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 backdrop-blur-md border border-orange-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={selectedSport}
              onChange={(e) => setSelectedSport(e.target.value)}
              className="bg-white/5 backdrop-blur-md border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {sports.map(sport => (
                <option key={sport.id} value={sport.id} className="bg-gray-800">
                  {sport.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Clubs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredClubs.map((club) => (
            <div key={club.id} className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 group">
              <div className="relative">
                <img 
                  src={club.image} 
                  alt={club.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {club.verified && (
                    <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <Star className="h-3 w-3 fill-current" />
                      Verified
                    </span>
                  )}
                  <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium capitalize">
                    {club.sport}
                  </span>
                </div>
                
                {/* Rating */}
                <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                  {club.rating}
                </div>
                
                {/* Club Name */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white mb-1">{club.name}</h3>
                  <div className="flex items-center gap-2 text-gray-300 text-sm">
                    <MapPin className="h-3 w-3" />
                    <span>{club.location}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">{club.description}</p>
                
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-blue-400 mb-1">
                      <Users className="h-4 w-4" />
                      <span className="font-bold">{club.members}</span>
                    </div>
                    <div className="text-xs text-gray-400">Members</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-green-400 mb-1">
                      <Calendar className="h-4 w-4" />
                      <span className="font-bold">{club.established}</span>
                    </div>
                    <div className="text-xs text-gray-400">Established</div>
                  </div>
                </div>
                
                {/* Achievements */}
                <div className="mb-4">
                  <h4 className="text-white font-semibold text-sm mb-2 flex items-center gap-1">
                    <Trophy className="h-4 w-4 text-yellow-400" />
                    Achievements
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {club.achievements.slice(0, 2).map((achievement, index) => (
                      <span key={index} className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs">
                        {achievement}
                      </span>
                    ))}
                    {club.achievements.length > 2 && (
                      <span className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs">
                        +{club.achievements.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Facilities */}
                <div className="mb-6">
                  <h4 className="text-white font-semibold text-sm mb-2">Facilities</h4>
                  <div className="flex flex-wrap gap-1">
                    {club.facilities.slice(0, 3).map((facility, index) => (
                      <span key={index} className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded text-xs">
                        {facility}
                      </span>
                    ))}
                    {club.facilities.length > 3 && (
                      <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded text-xs">
                        +{club.facilities.length - 3}
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Join Button */}
                <button 
                  onClick={() => handleJoinClub(club.name)}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Mail className="h-4 w-4" />
                  Join Club
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredClubs.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-2xl font-bold text-white mb-4">No clubs found</h3>
            <p className="text-gray-400 mb-6">Try adjusting your search criteria or explore different sports.</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedSport('all');
              }}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-orange-500/20">
          <h2 className="text-2xl font-bold text-white mb-4">Can't Find Your Club?</h2>
          <p className="text-gray-300 mb-6">
            Register your sports club on SportsHub and connect with passionate athletes in your area.
          </p>
          <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300">
            Register Your Club
          </button>
        </div>
      </div>
    </div>
  );
};

export default Clubs;