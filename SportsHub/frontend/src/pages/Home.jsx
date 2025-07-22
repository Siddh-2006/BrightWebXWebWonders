import React, { useState, useEffect } from 'react';
import { Play, Trophy, Gift, Gamepad2, FileText, TrendingUp, Star, Award, Users, Target, Brain, Zap, Clock, Heart } from 'lucide-react';

const Home = () => {
  const [featuredContent, setFeaturedContent] = useState([]);

  useEffect(() => {
    // Mock data for vlogs, posts, etc.
    setFeaturedContent([
      {
        id: 1,
        type: 'vlog',
        title: 'Behind the Scenes: Manchester United Training',
        author: 'Manchester United FC',
        verified: true,
        thumbnail: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=800',
        views: '2.3M',
        duration: '12:45'
      },
      {
        id: 2,
        type: 'post',
        title: 'Victory Celebration: Champions League Final',
        author: 'Real Madrid CF',
        verified: true,
        thumbnail: 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=800',
        likes: '45K',
        comments: '2.1K'
      },
      {
        id: 3,
        type: 'vlog',
        title: 'Day in Life of a Professional Basketball Player',
        author: 'Los Angeles Lakers',
        verified: true,
        thumbnail: 'https://images.pexels.com/photos/358042/pexels-photo-358042.jpeg?auto=compress&cs=tinysrgb&w=800',
        views: '1.8M',
        duration: '15:30'
      }
    ]);
  }, []);

  const highlights = [
    {
      title: 'Champions League Final',
      description: 'Epic showdown between two legendary teams',
      image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=800',
      sport: 'Football'
    },
    {
      title: 'NBA Finals Game 7',
      description: 'Historic overtime thriller',
      image: 'https://images.pexels.com/photos/358042/pexels-photo-358042.jpeg?auto=compress&cs=tinysrgb&w=800',
      sport: 'Basketball'
    },
    {
      title: 'World Cup Cricket Final',
      description: 'Last ball finish in the ultimate showdown',
      image: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg?auto=compress&cs=tinysrgb&w=800',
      sport: 'Cricket'
    }
  ];

  const quizzes = [
    { title: 'Football Legends Quiz', reward: 50, difficulty: 'Medium', participants: '12K' },
    { title: 'Basketball History Challenge', reward: 75, difficulty: 'Hard', participants: '8K' },
    { title: 'Cricket World Cup Trivia', reward: 40, difficulty: 'Easy', participants: '15K' }
  ];

  const merchandise = [
    {
      name: 'Indian Cricket Jersey',
      price: 500,
      image: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg?auto=compress&cs=tinysrgb&w=400',
      coins: true
    },
    {
      name: 'Sports Cap Collection',
      price: 200,
      image: 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=400',
      coins: true
    },
    {
      name: 'Premium Sports Accessories',
      price: 300,
      image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=400',
      coins: true
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Enhanced Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-orange-900/40 to-gray-900/80"></div>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=1920)'
          }}
        ></div>
        
        {/* Enhanced Floating Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent animate-gradient">
                Welcome to
              </span>
              <br />
              <span className="text-white">SportsHub</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Your ultimate destination for sports content, AI coaching, and community engagement
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="group bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 flex items-center gap-2 justify-center hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25">
              <Play className="h-5 w-5 group-hover:scale-110 transition-transform" />
              Explore Content
            </button>
            <button className="group bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-all duration-300 border border-orange-500/30 hover:border-orange-500/50 hover:scale-105">
              <Trophy className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform" />
              Join Community
            </button>
          </div>

          {/* Enhanced Feature Pills */}
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full flex items-center gap-2 border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300">
              <Users className="h-4 w-4 text-blue-400" />
              <span className="text-sm">10M+ Users</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full flex items-center gap-2 border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300">
              <Brain className="h-4 w-4 text-green-400" />
              <span className="text-sm">AI Coaching</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full flex items-center gap-2 border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300">
              <Target className="h-4 w-4 text-orange-400" />
              <span className="text-sm">Live Matches</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full flex items-center gap-2 border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300">
              <Zap className="h-4 w-4 text-purple-400" />
              <span className="text-sm">Real-time Stats</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* New Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Features for Everyone
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Whether you're a passionate fan, aspiring player, or club manager, SportsHub has something special for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: 'AI Coach',
                description: 'Get personalized training advice and posture correction from our advanced AI system.',
                color: 'from-blue-500 to-purple-500',
                audience: 'Players'
              },
              {
                icon: Users,
                title: 'Fan Engagement',
                description: 'Join communities, participate in quizzes, and earn coins for exclusive merchandise.',
                color: 'from-green-500 to-blue-500',
                audience: 'Fans'
              },
              {
                icon: Trophy,
                title: 'Club Management',
                description: 'Manage your team, challenge other clubs, and discover new talent.',
                color: 'from-orange-500 to-red-500',
                audience: 'Clubs'
              },
              {
                icon: Play,
                title: 'Live Streaming',
                description: 'Watch live matches with real-time chat and prediction polls.',
                color: 'from-purple-500 to-pink-500',
                audience: 'All'
              },
              {
                icon: Heart,
                title: 'Community',
                description: 'Connect with verified clubs, players, and passionate fans worldwide.',
                color: 'from-cyan-500 to-blue-500',
                audience: 'All'
              },
              {
                icon: Gift,
                title: 'Rewards',
                description: 'Earn points through activities and redeem them for exclusive sports merchandise.',
                color: 'from-yellow-500 to-orange-500',
                audience: 'Fans'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/10"
              >
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${feature.color} mr-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white group-hover:text-orange-300 transition-colors">{feature.title}</h3>
                    <span className="text-sm text-gray-400">{feature.audience}</span>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Audience Tabs */}
          <div className="mt-16 text-center">
            <div className="inline-flex bg-white/5 backdrop-blur-md rounded-full p-2 mb-8 border border-orange-500/20">
              <button className="px-6 py-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium transition-all duration-300">
                For Fans
              </button>
              <button className="px-6 py-2 rounded-full text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300">
                For Players
              </button>
              <button className="px-6 py-2 rounded-full text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300">
                For Clubs
              </button>
            </div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-10 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 right-20 w-3 h-3 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-orange-500 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Today's Highlights
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((highlight, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 group">
                <div className="relative">
                  <img 
                    src={highlight.image} 
                    alt={highlight.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium">
                      {highlight.sport}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{highlight.title}</h3>
                  <p className="text-gray-300">{highlight.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Featured Content
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredContent.map((content) => (
              <div key={content.id} className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 group">
                <div className="relative">
                  <img 
                    src={content.thumbnail} 
                    alt={content.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  
                  {content.type === 'vlog' && (
                    <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-xs">
                      {content.duration}
                    </div>
                  )}
                  
                  <div className="absolute top-4 left-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      content.type === 'vlog' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
                    }`}>
                      {content.type.toUpperCase()}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2">{content.title}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-gray-300 text-sm">{content.author}</span>
                    {content.verified && (
                      <Star className="h-4 w-4 text-blue-400 fill-current" />
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    {content.views && (
                      <span>{content.views} views</span>
                    )}
                    {content.likes && (
                      <span>{content.likes} likes</span>
                    )}
                    {content.comments && (
                      <span>{content.comments} comments</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quizzes & Games */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Quizzes & Games
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {quizzes.map((quiz, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <Gamepad2 className="h-8 w-8 text-orange-400" />
                  <div>
                    <h3 className="text-lg font-bold text-white">{quiz.title}</h3>
                    <p className="text-sm text-gray-400">{quiz.participants} participants</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    quiz.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                    quiz.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {quiz.difficulty}
                  </span>
                  <div className="flex items-center gap-1 text-orange-400">
                    <Trophy className="h-4 w-4" />
                    <span className="font-semibold">{quiz.reward} coins</span>
                  </div>
                </div>
                
                <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300">
                  Play Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Merchandise */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Exclusive Merchandise
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {merchandise.map((item, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 group">
                <div className="relative">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Coins Only
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2">{item.name}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-orange-400">
                      <Trophy className="h-4 w-4" />
                      <span className="font-semibold">{item.price} coins</span>
                    </div>
                    <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300">
                      Redeem
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900/50 backdrop-blur-md border-t border-orange-500/20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-4">
                SportsHub
              </h3>
              <p className="text-gray-300 mb-4">
                Your ultimate destination for sports content, AI coaching, and community engagement.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="/sports" className="text-gray-400 hover:text-orange-400 transition-colors">Sports</a></li>
                <li><a href="/live" className="text-gray-400 hover:text-orange-400 transition-colors">Live</a></li>
                <li><a href="/news" className="text-gray-400 hover:text-orange-400 transition-colors">News</a></li>
                <li><a href="/clubs" className="text-gray-400 hover:text-orange-400 transition-colors">Clubs</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="/about" className="text-gray-400 hover:text-orange-400 transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">Help</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">© 2024 SportsHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;