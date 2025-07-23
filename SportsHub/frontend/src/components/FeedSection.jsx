import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Play, Eye, Calendar, MapPin, Trophy } from 'lucide-react';

const FeedSection = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [posts, setPosts] = useState([
    {
      id: 1,
      type: 'highlight',
      title: 'Championship Winning Goal - Last Minute Drama!',
      author: 'Marcus Rodriguez',
      club: 'Thunder FC',
      sport: 'Football',
      content: 'What a match! 90th minute and we scored the winning goal. The crowd went absolutely wild!',
      image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=800',
      likes: 1247,
      comments: 89,
      views: 15420,
      timestamp: '2 hours ago',
      isLiked: false
    },
    {
      id: 2,
      type: 'vlog',
      title: 'My Daily Training Routine - Road to Nationals',
      author: 'Sarah Chen',
      club: 'Elite Athletics',
      sport: 'Track & Field',
      content: 'Join me for a day in my training routine as I prepare for the national championships. Early morning starts, intense workouts, and mental preparation.',
      image: 'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=800',
      likes: 892,
      comments: 156,
      views: 8934,
      timestamp: '5 hours ago',
      isLiked: true
    },
    {
      id: 3,
      type: 'post',
      title: 'New Training Facility Opens - State of the Art Equipment',
      author: 'Coach Williams',
      club: 'Phoenix Sports Academy',
      sport: 'Multi-Sport',
      content: 'Excited to announce our new training facility with cutting-edge equipment and AI-powered performance analysis. Book your session now!',
      image: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=800',
      likes: 634,
      comments: 78,
      views: 4521,
      timestamp: '1 day ago',
      isLiked: false
    },
    {
      id: 4,
      type: 'highlight',
      title: 'Perfect Strike - Tennis Championship Finals',
      author: 'Emma Thompson',
      club: 'Ace Tennis Club',
      sport: 'Tennis',
      content: 'The moment that won me the championship! Perfect timing, perfect execution. Years of training led to this single shot.',
      image: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=800',
      likes: 2156,
      comments: 234,
      views: 28750,
      timestamp: '3 days ago',
      isLiked: true
    }
  ]);

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const filteredPosts = activeFilter === 'all' 
    ? posts 
    : posts.filter(post => post.type === activeFilter.slice(0, -1));

  const getTypeIcon = (type) => {
    switch (type) {
      case 'vlog': return <Play className="w-4 h-4" />;
      case 'highlight': return <Trophy className="w-4 h-4" />;
      default: return <MessageCircle className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'vlog': return 'bg-red-500';
      case 'highlight': return 'bg-yellow-500';
      default: return 'bg-blue-500';
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Community <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">Feed</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay connected with the latest vlogs, posts, and highlights from athletes and clubs worldwide
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl p-2 shadow-lg border border-gray-200">
            {['all', 'vlogs', 'posts', 'highlights'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-3 rounded-lg font-medium capitalize transition-all duration-200 ${
                  activeFilter === filter
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-blue-500 hover:bg-blue-50'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {filteredPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
              {/* Post Image */}
              <div className="relative overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className={`absolute top-4 left-4 ${getTypeColor(post.type)} text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1`}>
                  {getTypeIcon(post.type)}
                  <span className="capitalize">{post.type}</span>
                </div>
                {post.type === 'vlog' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Play className="w-8 h-8 text-white ml-1" />
                    </div>
                  </div>
                )}
              </div>

              {/* Post Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {post.author.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{post.author}</p>
                      <p className="text-sm text-gray-500">{post.club} • {post.sport}</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{post.timestamp}</span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.content}
                </p>

                {/* Post Stats */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-6">
                    <button 
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center space-x-2 transition-colors ${
                        post.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
                      <span className="font-medium">{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
                      <MessageCircle className="w-5 h-5" />
                      <span className="font-medium">{post.comments}</span>
                    </button>
                    <div className="flex items-center space-x-2 text-gray-500">
                      <Eye className="w-5 h-5" />
                      <span className="font-medium">{post.views.toLocaleString()}</span>
                    </div>
                  </div>
                  <button className="text-gray-500 hover:text-blue-500 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-500 transition-all duration-300 shadow-lg hover:shadow-xl">
            Load More Content
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeedSection;