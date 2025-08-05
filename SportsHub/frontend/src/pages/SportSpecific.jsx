import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import {
  Home, Radio, MapPin, Users, Play, Trophy, Star, Calendar,
  Clock, Eye, Heart, MessageCircle, Share2, ArrowLeft, Filter,
  Search, Target, Award, Zap, Video, BookOpen, Brain,
} from 'lucide-react';
import QuizSection from '../components/QuizSection';
import axios from "axios"

const SportSpecific = ({ isDarkMode }) => {
  const { sport } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [allClubs, setallClubs] = useState(null);
  const [allGround, setAllGround] = useState(null);
  const canvasRef = useRef(null);
  // fetch clubs function
  const fetch_clubs = async () => {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/clubs`, { withCredentials: true });
    if (res.status == 200) {
      setallClubs(...res.data);
    }
  }
  const fetch_grounds = async (sport) => {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/grounds/${sport[0].toUpperCase() + sport.toLowerCase().substring(1)}`, { withCredentials: true });
    if (res.status == 200) {
      setAllGround(res.data);
    }
  }
  // 3D Background Animation Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.4 + 0.1
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = isDarkMode
          ? `rgba(249, 115, 22, ${particle.opacity})`
          : `rgba(59, 130, 246, ${particle.opacity})`;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isDarkMode]);

  // Sport data mapping
  const sportsData = {
    football: {
      name: 'Football',
      icon: '⚽',
      color: 'from-green-500 to-emerald-600',
      description: 'The beautiful game that unites the world',
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80'
    },
    basketball: {
      name: 'Basketball',
      icon: '🏀',
      color: 'from-orange-500 to-red-600',
      description: 'Fast-paced action and incredible athleticism',
      image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80'
    },
    tennis: {
      name: 'Tennis',
      icon: '🎾',
      color: 'from-yellow-500 to-orange-600',
      description: 'Precision, power, and mental strength',
      image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=1200&q=80'
    },
    swimming: {
      name: 'Swimming',
      icon: '🏊',
      color: 'from-blue-500 to-cyan-600',
      description: 'Dive into excellence and perfect your technique',
      image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1200&q=80'
    },
    cricket: {
      name: 'Cricket',
      icon: '🏏',
      color: 'from-green-600 to-blue-600',
      description: 'The gentleman\'s game with strategic depth',
      image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80'
    },
    'track-field': {
      name: 'Track & Field',
      icon: '🏃',
      color: 'from-purple-500 to-pink-600',
      description: 'Push your limits in athletics',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80'
    }
  };

  // Get the sport key from URL parameter
  const sportKey = sport?.toLowerCase().replace(/\s+/g, '-').replace('&', '');
  const currentSport = sportsData[sportKey] || sportsData.football;

  // Sample data for different sections
  const sampleContent = {
    vlogs: [
      {
        id: 1,
        title: `${currentSport.name} Training Techniques`,
        thumbnail: currentSport.image,
        duration: '12:45',
        views: '15.2K',
        author: 'Coach Mike',
        uploadTime: '2 days ago'
      },
      {
        id: 2,
        title: `Professional ${currentSport.name} Analysis`,
        thumbnail: currentSport.image,
        duration: '8:30',
        views: '8.7K',
        author: 'Sports Analyst',
        uploadTime: '1 week ago'
      },
      {
        id: 3,
        title: `${currentSport.name} Workout Routine`,
        thumbnail: currentSport.image,
        duration: '15:20',
        views: '22.1K',
        author: 'Fitness Pro',
        uploadTime: '3 days ago'
      }
    ],
    highlights: [
      {
        id: 1,
        title: `Best ${currentSport.name} Moments 2024`,
        thumbnail: currentSport.image,
        duration: '5:45',
        views: '45.2K',
        likes: '2.1K',
        uploadTime: '1 day ago'
      },
      {
        id: 2,
        title: `Championship ${currentSport.name} Finals`,
        thumbnail: currentSport.image,
        duration: '7:30',
        views: '67.8K',
        likes: '3.4K',
        uploadTime: '5 days ago'
      },
      {
        id: 3,
        title: `Amazing ${currentSport.name} Skills`,
        thumbnail: currentSport.image,
        duration: '4:15',
        views: '28.9K',
        likes: '1.8K',
        uploadTime: '1 week ago'
      }
    ],
    posts: [
      {
        id: 1,
        author: 'SportsFan123',
        content: `Just watched an amazing ${currentSport.name} match! The level of skill was incredible. What are your thoughts on the latest championship?`,
        timestamp: '2 hours ago',
        likes: 45,
        comments: 12,
        shares: 5
      },
      {
        id: 2,
        author: 'ProAthlete',
        content: `Training hard for the upcoming ${currentSport.name} season. Here are my top 3 tips for beginners getting into the sport...`,
        timestamp: '1 day ago',
        likes: 128,
        comments: 23,
        shares: 15
      },
      {
        id: 3,
        author: 'CoachExpert',
        content: `New training methodology for ${currentSport.name} is showing great results. Focus on fundamentals and consistency!`,
        timestamp: '3 days ago',
        likes: 89,
        comments: 18,
        shares: 8
      }
    ],
    liveMatches: [
      {
        id: 1,
        teamA: 'Thunder FC',
        teamB: 'Lightning United',
        scoreA: 2,
        scoreB: 1,
        status: 'Live',
        viewers: '12.5K',
        time: '78\'',
        venue: 'Central Stadium'
      },
      {
        id: 2,
        teamA: 'Storm City',
        teamB: 'Rapid Rangers',
        scoreA: 0,
        scoreB: 0,
        status: 'Starting Soon',
        viewers: '8.2K',
        time: '15:30',
        venue: 'Sports Complex'
      }
    ],
    clubs: [
      {
        id: 1,
        name: `Elite ${currentSport.name} Club`,
        logo: currentSport.image,
        members: 245,
        location: 'Downtown',
        rating: 4.8,
        description: `Premier ${currentSport.name} club with professional coaching`
      },
      {
        id: 2,
        name: `${currentSport.name} Academy`,
        logo: currentSport.image,
        members: 189,
        location: 'Uptown',
        rating: 4.6,
        description: `Youth development and training academy`
      },
      {
        id: 3,
        name: `Community ${currentSport.name}`,
        logo: currentSport.image,
        members: 156,
        location: 'Suburbs',
        rating: 4.5,
        description: `Friendly community club for all skill levels`
      }
    ],
    grounds: [
      {
        id: 1,
        name: `Central ${currentSport.name} Stadium`,
        image: currentSport.image,
        capacity: 15000,
        location: 'City Center',
        rating: 4.9,
        facilities: ['Parking', 'Cafeteria', 'Pro Shop', 'Locker Rooms']
      },
      {
        id: 2,
        name: `Sports Complex Arena`,
        image: currentSport.image,
        capacity: 8500,
        location: 'Sports District',
        rating: 4.7,
        facilities: ['Parking', 'Medical Center', 'Training Rooms']
      },
      {
        id: 3,
        name: `Community ${currentSport.name} Field`,
        image: currentSport.image,
        capacity: 3000,
        location: 'Residential Area',
        rating: 4.4,
        facilities: ['Basic Amenities', 'Parking']
      }
    ]
  };

  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'live', label: 'Live', icon: Radio },
    { id: 'grounds', label: 'Grounds', icon: MapPin },
    { id: 'clubs', label: 'Clubs', icon: Users }
  ];

  const renderHomeContent = () => (
    <div className="space-y-12">
      {/* Vlogs Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold flex items-center space-x-2">
            <Video className="w-6 h-6" />
            <span>{currentSport.name} Vlogs</span>
          </h3>
          <button className={`text-sm font-medium ${isDarkMode ? 'text-orange-400 hover:text-orange-300' : 'text-blue-500 hover:text-blue-600'}`}>
            View All
          </button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleContent.vlogs.map((vlog) => (
            <motion.div
              key={vlog.id}
              whileHover={{ scale: 1.02 }}
              className={`group rounded-2xl overflow-hidden ${isDarkMode ? 'bg-white/5 border border-white/10' : 'bg-black/5 border border-black/10'
                }`}
            >
              <div className="relative">
                <img src={vlog.thumbnail} alt={vlog.title} className="w-full h-48 object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Play className="w-12 h-12 text-white" />
                </div>
                <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-sm">
                  {vlog.duration}
                </div>
              </div>
              <div className="p-4">
                <h4 className="font-semibold mb-2 line-clamp-2">{vlog.title}</h4>
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} space-y-1`}>
                  <div className="flex items-center justify-between">
                    <span>{vlog.author}</span>
                    <span>{vlog.views} views</span>
                  </div>
                  <div>{vlog.uploadTime}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Highlights Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold flex items-center space-x-2">
            <Star className="w-6 h-6" />
            <span>{currentSport.name} Highlights</span>
          </h3>
          <button className={`text-sm font-medium ${isDarkMode ? 'text-orange-400 hover:text-orange-300' : 'text-blue-500 hover:text-blue-600'}`}>
            View All
          </button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleContent.highlights.map((highlight) => (
            <motion.div
              key={highlight.id}
              whileHover={{ scale: 1.02 }}
              className={`group rounded-2xl overflow-hidden ${isDarkMode ? 'bg-white/5 border border-white/10' : 'bg-black/5 border border-black/10'
                }`}
            >
              <div className="relative">
                <img src={highlight.thumbnail} alt={highlight.title} className="w-full h-48 object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Play className="w-12 h-12 text-white" />
                </div>
                <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-sm">
                  {highlight.duration}
                </div>
              </div>
              <div className="p-4">
                <h4 className="font-semibold mb-2 line-clamp-2">{highlight.title}</h4>
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} flex items-center justify-between`}>
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{highlight.views}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Heart className="w-4 h-4" />
                      <span>{highlight.likes}</span>
                    </span>
                  </div>
                  <span>{highlight.uploadTime}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Posts Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold flex items-center space-x-2">
            <MessageCircle className="w-6 h-6" />
            <span>{currentSport.name} Community Posts</span>
          </h3>
          <button className={`text-sm font-medium ${isDarkMode ? 'text-orange-400 hover:text-orange-300' : 'text-blue-500 hover:text-blue-600'}`}>
            View All
          </button>
        </div>
        <div className="space-y-4">
          {sampleContent.posts.map((post) => (
            <motion.div
              key={post.id}
              whileHover={{ scale: 1.01 }}
              className={`p-6 rounded-2xl ${isDarkMode ? 'bg-white/5 border border-white/10' : 'bg-black/5 border border-black/10'
                }`}
            >
              <div className="flex items-start space-x-4">
                <div className={`w-10 h-10 rounded-full ${isDarkMode ? 'bg-orange-500' : 'bg-blue-500'} flex items-center justify-center text-white font-semibold`}>
                  {post.author[0]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-semibold">{post.author}</span>
                    <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {post.timestamp}
                    </span>
                  </div>
                  <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {post.content}
                  </p>
                  <div className="flex items-center space-x-6">
                    <button className="flex items-center space-x-1 text-sm hover:text-red-500 transition-colors">
                      <Heart className="w-4 h-4" />
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-sm hover:text-blue-500 transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.comments}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-sm hover:text-green-500 transition-colors">
                      <Share2 className="w-4 h-4" />
                      <span>{post.shares}</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quiz Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold flex items-center space-x-2">
            <Brain className="w-6 h-6" />
            <span>{currentSport.name} Quiz Challenge</span>
          </h3>
        </div>
        <div className={`p-8 rounded-2xl text-center ${isDarkMode
          ? 'bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30'
          : 'bg-gradient-to-r from-blue-500/20 to-cyan-400/20 border border-blue-500/30'
          }`}>
          <Brain className={`w-16 h-16 mx-auto mb-4 ${isDarkMode ? 'text-orange-400' : 'text-blue-500'}`} />
          <h4 className="text-2xl font-bold mb-4">Test Your {currentSport.name} Knowledge!</h4>
          <p className={`text-lg mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Challenge yourself with our AI-generated quiz featuring questions about {currentSport.name}
          </p>
          <Link
            to="/quiz"
            state={{ selectedSport: currentSport.name }}
            className={`inline-flex items-center space-x-2 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 ${isDarkMode
              ? 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500'
              : 'bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500'
              } text-white shadow-lg hover:shadow-xl`}
          >
            <Target className="w-5 h-5" />
            <span>Start {currentSport.name} Quiz</span>
          </Link>
        </div>
      </section>
    </div>
  );

  const renderLiveContent = () => (
    <div className="space-y-8">
      <div className="grid lg:grid-cols-2 gap-8">
        {sampleContent.liveMatches.map((match) => (
          <motion.div
            key={match.id}
            whileHover={{ scale: 1.02 }}
            className={`p-6 rounded-2xl ${isDarkMode ? 'bg-white/5 border border-white/10' : 'bg-black/5 border border-black/10'
              }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-bold ${match.status === 'Live'
                ? 'bg-red-500 text-white'
                : 'bg-blue-500 text-white'
                }`}>
                {match.status === 'Live' && <Radio className="w-3 h-3 inline mr-1" />}
                {match.status}
              </span>
              <div className="flex items-center space-x-1 text-sm">
                <Eye className="w-4 h-4" />
                <span>{match.viewers} watching</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold">{match.teamA}</span>
                <span className="text-2xl font-bold">{match.scoreA}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold">{match.teamB}</span>
                <span className="text-2xl font-bold">{match.scoreB}</span>
              </div>
            </div>

            <div className={`mt-4 pt-4 border-t ${isDarkMode ? 'border-white/10' : 'border-black/10'} flex items-center justify-between text-sm`}>
              <div className="flex items-center space-x-4">
                <span className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{match.time}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{match.venue}</span>
                </span>
              </div>
            </div>

            <button className={`w-full mt-4 py-3 rounded-xl font-semibold transition-all duration-300 ${match.status === 'Live'
              ? 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-400 hover:to-pink-500 text-white'
              : 'bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white'
              }`}>
              {match.status === 'Live' ? 'Watch Live' : 'Set Reminder'}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderClubsContent = () => {
    if(!allClubs)fetch_clubs();
    return (
      <div className="space-y-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleContent.clubs.map((club) => (
            <motion.div
              key={club.id}
              whileHover={{ scale: 1.02 }}
              className={`p-6 rounded-2xl ${isDarkMode ? 'bg-white/5 border border-white/10' : 'bg-black/5 border border-black/10'
                }`}
            >
              <div className="flex items-center space-x-4 mb-4">
                <img src={club.logo} alt={club.name} className="w-16 h-16 rounded-full object-cover" />
                <div>
                  <h4 className="font-bold text-lg">{club.name}</h4>
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{club.location}</span>
                  </div>
                </div>
              </div>

              <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {club.description}
              </p>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">{club.members} members</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm">{club.rating}</span>
                </div>
              </div>

              <button className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${isDarkMode
                ? 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500'
                : 'bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500'
                } text-white`}>
                Join Club
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    )
  };

  const renderGroundsContent = () => {
    if (!allGround) {
      fetch_grounds(sport);
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    // Check if allGround has results
    if (!allGround.results || allGround.results.length === 0) {
      return (
        <div className="text-center py-12">
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            No grounds available for {sport}
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allGround.results.map((ground) => (
            <motion.div
              key={ground._id}
              whileHover={{ scale: 1.02 }}
              className={`rounded-2xl overflow-hidden ${isDarkMode
                  ? 'bg-white/5 border border-white/10'
                  : 'bg-black/5 border border-black/10'
                }`}
            >
              {/* Ground Image */}
              <img
                src={ground.photos_of_ground?.[0] || 'https://placehold.co/600x400/CCCCCC/333333?text=No+Image'}
                alt={ground.name}
                className="w-full h-48 object-cover"
              />

              <div className="p-6">
                {/* Ground Name */}
                <h4 className="font-bold text-lg mb-2">{ground.name}</h4>

                {/* Sports offered */}
                <div className="flex items-center space-x-2 mb-2 text-sm">
                  <span className="font-medium">Sports:</span>
                  <span>{ground.sport?.join(', ') || 'Not specified'}</span>
                </div>

                {/* Pricing and Timing */}
                <div className="flex items-center justify-between mb-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <span className="font-medium">Price:</span>
                    <span className="text-green-600 font-semibold">{ground.money_to_book}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-xs">{ground.how_old} years old</span>
                  </div>
                </div>

                {/* Timing */}
                <div className="mb-4 text-sm">
                  <span className="font-medium">Timing: </span>
                  <span>{ground.timing}</span>
                </div>

                {/* Important Information */}
                {ground.important_data_to_be_shown && (
                  <div className="mb-4">
                    <h5 className="font-semibold text-sm mb-2">Facilities:</h5>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                      {ground.important_data_to_be_shown}
                    </p>
                  </div>
                )}

                {/* Contact Information */}
                <div className="mb-4 text-xs space-y-1">
                  {ground.contact?.number && (
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">Phone:</span>
                      <a
                        href={`tel:${ground.contact.number}`}
                        className="text-blue-500 hover:underline"
                      >
                        {ground.contact.number}
                      </a>
                    </div>
                  )}
                  {ground.contact?.email && (
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">Email:</span>
                      <a
                        href={`mailto:${ground.contact.email}`}
                        className="text-blue-500 hover:underline"
                      >
                        {ground.contact.email}
                      </a>
                    </div>
                  )}
                </div>

                {/* Social Media Links */}
                {ground.contact?.social_media && (
                  <div className="flex space-x-2 mb-4">
                    {ground.contact.social_media.facebook && (
                      <a
                        href={ground.contact.social_media.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook w-4 h-4" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                      </a>
                    )}
                    {ground.contact.social_media.instagram && (
                      <a
                        href={ground.contact.social_media.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-600 hover:text-pink-800"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-instagram w-4 h-4" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
                      </a>
                    )}
                  </div>
                )}

                {/* Book Button */}
                <a
                  className={`w-full py-3 rounded-xl p-4 font-semibold transition-all duration-300 ${isDarkMode
                      ? 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500'
                      : 'bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500'
                    } text-white`}
                  href ={`mailto:${ground.contact.email}`}
                >
                  Book Ground
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination Info */}
        {allGround.totalPages > 1 && (
          <div className="text-center mt-8">
            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Page {allGround.currentPage} of {allGround.totalPages}
              ({allGround.totalGrounds} total grounds)
            </p>
          </div>
        )}
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return renderHomeContent();
      case 'live': return renderLiveContent();
      case 'clubs': return renderClubsContent();
      case 'grounds': return renderGroundsContent();
      default: return renderHomeContent();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`min-h-screen pt-20 ${isDarkMode ? 'bg-transparent text-white' : 'bg-gray-50 text-gray-900'}`}
    >
      {/* 3D Background Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
      />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className={`absolute top-20 left-20 w-64 h-64 rounded-full blur-3xl animate-pulse ${isDarkMode ? 'bg-orange-500' : 'bg-blue-500'}`}></div>
          <div className={`absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl animate-pulse delay-1000 ${isDarkMode ? 'bg-red-500' : 'bg-cyan-500'}`}></div>
          <div className="absolute top-40 right-32 w-48 h-48 border-2 border-current rounded-lg rotate-45 animate-bounce"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <button
              onClick={() => navigate('/sports')}
              className={`inline-flex items-center space-x-2 mb-6 transition-colors ${isDarkMode ? 'text-white/80 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Sports</span>
            </button>

            <div className="text-6xl mb-4">{currentSport.icon}</div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className={`${isDarkMode
                ? 'bg-gradient-to-r from-orange-400 to-red-500'
                : 'bg-gradient-to-r from-blue-500 to-cyan-400'
                } bg-clip-text text-transparent`}>
                {currentSport.name}
              </span>
            </h1>
            <p className={`text-xl md:text-2xl max-w-3xl mx-auto mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
              {currentSport.description}
            </p>

            {/* Sport-specific Navigation */}
            <>
              {/* Mobile Dropdown (visible on small screens) */}
              <div className="sm:hidden mb-4">
                <select
                  value={activeTab}
                  onChange={(e) => setActiveTab(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl font-semibold transition-all duration-300 border ${isDarkMode
                    ? 'bg-white/5 text-white border-white/10'
                    : 'bg-black/5 text-black border-black/10'
                    }`}
                >
                  {tabs.map((tab) => (
                    <option className={(isDarkMode) ? ('bg-black/80') : ('bg-white')} key={tab.id} value={tab.id}>
                      {tab.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tab Buttons (hidden on small screens) */}
              <div
                className={`hidden sm:inline-flex rounded-2xl p-2 space-x-2 border ${isDarkMode
                  ? 'bg-white/5 backdrop-blur-md border-white/10'
                  : 'bg-black/5 backdrop-blur-md border-black/10'
                  }`}
              >
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${activeTab === tab.id
                        ? isDarkMode
                          ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white'
                          : 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white'
                        : isDarkMode
                          ? 'text-gray-300 hover:text-white hover:bg-white/10'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-black/10'
                        }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </>

          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="relative py-20 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search and Filter Bar */}
          {/* {(activeTab === 'clubs' || activeTab === 'grounds') && (
            <div className="mb-8">
              <div className={`${isDarkMode ? 'bg-white/5' : 'bg-black/5'
                } backdrop-blur-sm rounded-2xl p-6 border ${isDarkMode ? 'border-white/10' : 'border-black/10'
                }`}>
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder={`Search ${activeTab}...`}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={`w-full pl-12 pr-4 py-3 rounded-xl font-medium transition-all duration-300 ${isDarkMode
                        ? 'bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-400'
                        : 'bg-black/10 backdrop-blur-md border border-black/20 text-gray-900 placeholder-gray-500'
                        } focus:outline-none`}
                    />
                  </div>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 ${isDarkMode
                      ? 'bg-white/10 backdrop-blur-md border border-white/20 text-white'
                      : 'bg-black/10 backdrop-blur-md border border-black/20 text-gray-900'
                      } focus:outline-none`}
                  >
                    <option value="all">All {activeTab}</option>
                    <option value="nearby">Nearby</option>
                    <option value="popular">Most Popular</option>
                    <option value="newest">Newest</option>
                  </select>
                </div>
              </div>
            </div>
          )} */}

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`${isDarkMode ? 'bg-white/5 backdrop-blur-md border-white/10' : 'bg-black/5 backdrop-blur-md border-black/10'
              } rounded-3xl p-8 border`}
          >
            {renderContent()}
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default SportSpecific;