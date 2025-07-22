import React, { useState } from 'react';
import { useParams, Link } from 'react-router';
import { Home, Play, Users, MapPin, Calendar, Trophy, Star, MessageCircle } from 'lucide-react';

const SportDetail = () => {
  const { sportName } = useParams();
  const [activeTab, setActiveTab] = useState('home');

  const sportData = {
    football: {
      name: 'Football',
      icon: '⚽',
      color: 'from-green-500 to-blue-500',
      description: 'The beautiful game that unites the world',
      image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=1920'
    },
    basketball: {
      name: 'Basketball',
      icon: '🏀',
      color: 'from-orange-500 to-red-500',
      description: 'Fast-paced action and incredible athleticism',
      image: 'https://images.pexels.com/photos/358042/pexels-photo-358042.jpeg?auto=compress&cs=tinysrgb&w=1920'
    },
    cricket: {
      name: 'Cricket',
      icon: '🏏',
      color: 'from-blue-500 to-purple-500',
      description: 'Strategy, skill, and tradition combined',
      image: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg?auto=compress&cs=tinysrgb&w=1920'
    }
  };

  const sport = sportData[sportName] || sportData.football;

  const tabs = [
    { id: 'home', name: 'Home', icon: Home },
    { id: 'live', name: 'Live', icon: Play },
    { id: 'clubs', name: 'Clubs', icon: Users },
    { id: 'grounds', name: 'Grounds', icon: MapPin },
    { id: 'tournaments', name: 'Tournaments', icon: Trophy },
    { id: 'news', name: 'News', icon: MessageCircle }
  ];

  const vlogs = [
    {
      title: `${sport.name} Training Masterclass`,
      author: 'Pro Sports Academy',
      thumbnail: sport.image,
      duration: '15:30',
      views: '2.3M'
    },
    {
      title: `Best ${sport.name} Moments 2024`,
      author: 'Sports Highlights',
      thumbnail: sport.image,
      duration: '12:45',
      views: '1.8M'
    }
  ];

  const clubs = [
    {
      name: `Elite ${sport.name} Club`,
      members: '2.5K',
      location: 'Mumbai',
      verified: true,
      image: sport.image
    },
    {
      name: `Professional ${sport.name} Academy`,
      members: '1.8K',
      location: 'Delhi',
      verified: true,
      image: sport.image
    }
  ];

  const grounds = [
    {
      name: `${sport.name} Arena`,
      location: 'Mumbai, Maharashtra',
      rating: 4.8,
      price: '₹500/hour',
      image: sport.image
    },
    {
      name: `Sports Complex`,
      location: 'Delhi, NCR',
      rating: 4.6,
      price: '₹400/hour',
      image: sport.image
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-8">
            {/* Vlogs Section */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Latest Vlogs & Posts</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {vlogs.map((vlog, index) => (
                  <div key={index} className="bg-white/5 backdrop-blur-md rounded-xl overflow-hidden border border-orange-500/20">
                    <div className="relative">
                      <img src={vlog.thumbnail} alt={vlog.title} className="w-full h-48 object-cover" />
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                        {vlog.duration}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>
                    <div className="p-4">
                      <h4 className="text-white font-semibold mb-2">{vlog.title}</h4>
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <span>{vlog.author}</span>
                        <span>{vlog.views} views</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quiz Section */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">{sport.name} Quiz & Games</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-orange-500/20">
                  <h4 className="text-white font-semibold mb-2">{sport.name} Legends Quiz</h4>
                  <p className="text-gray-400 text-sm mb-4">Test your knowledge about legendary players</p>
                  <div className="flex items-center justify-between">
                    <span className="text-orange-400 font-semibold">50 coins reward</span>
                    <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg text-sm">
                      Play Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'clubs':
        return (
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">{sport.name} Clubs</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {clubs.map((club, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-md rounded-xl overflow-hidden border border-orange-500/20">
                  <div className="relative">
                    <img src={club.image} alt={club.name} className="w-full h-32 object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="text-white font-semibold">{club.name}</h4>
                      {club.verified && <Star className="h-4 w-4 text-blue-400 fill-current" />}
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                      <span>{club.members} members</span>
                      <span>{club.location}</span>
                    </div>
                    <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 rounded-lg text-sm">
                      Join Club
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'grounds':
        return (
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">{sport.name} Grounds</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {grounds.map((ground, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-md rounded-xl overflow-hidden border border-orange-500/20">
                  <div className="relative">
                    <img src={ground.image} alt={ground.name} className="w-full h-32 object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                  <div className="p-4">
                    <h4 className="text-white font-semibold mb-2">{ground.name}</h4>
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                      <span>{ground.location}</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span>{ground.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-orange-400 font-semibold">{ground.price}</span>
                      <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg text-sm">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <h3 className="text-2xl font-bold text-white mb-4">Coming Soon</h3>
            <p className="text-gray-400">This section is under development</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-orange-900/40 to-gray-900/80"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: `url(${sport.image})` }}
        ></div>
        
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center">
            <div className={`inline-flex items-center gap-4 mb-4 p-4 bg-gradient-to-r ${sport.color} rounded-full`}>
              <span className="text-4xl">{sport.icon}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">{sport.name}</h1>
            <p className="text-xl text-gray-300">{sport.description}</p>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="sticky top-16 z-40 bg-gray-900/95 backdrop-blur-md border-b border-orange-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-all duration-200 border-b-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-orange-400 border-orange-500'
                    : 'text-gray-400 border-transparent hover:text-orange-400'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {renderTabContent()}
        </div>
      </section>
    </div>
  );
};

export default SportDetail;