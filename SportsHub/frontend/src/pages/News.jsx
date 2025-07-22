import React, { useState } from 'react';
import { Clock, User, Eye, MessageCircle, Share2, Bookmark, TrendingUp, Filter } from 'lucide-react';

const News = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All News', color: 'from-orange-500 to-red-500' },
    { id: 'football', name: 'Football', color: 'from-green-500 to-blue-500' },
    { id: 'basketball', name: 'Basketball', color: 'from-orange-500 to-red-500' },
    { id: 'cricket', name: 'Cricket', color: 'from-blue-500 to-purple-500' },
    { id: 'trending', name: 'Trending', color: 'from-purple-500 to-pink-500' }
  ];

  const newsArticles = [
    {
      id: 1,
      title: 'Manchester United Signs New Star Player in Record Deal',
      excerpt: 'The Red Devils have secured their biggest signing of the season with a groundbreaking transfer that could reshape their entire strategy.',
      category: 'football',
      author: 'Sports Reporter',
      publishedAt: '2 hours ago',
      readTime: '3 min read',
      views: '15.2K',
      comments: 234,
      image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=800',
      trending: true
    },
    {
      id: 2,
      title: 'NBA Finals: Lakers vs Warriors - The Ultimate Showdown',
      excerpt: 'Two basketball giants prepare for what promises to be the most exciting finals series in recent memory.',
      category: 'basketball',
      author: 'Basketball Insider',
      publishedAt: '4 hours ago',
      readTime: '5 min read',
      views: '28.7K',
      comments: 567,
      image: 'https://images.pexels.com/photos/358042/pexels-photo-358042.jpeg?auto=compress&cs=tinysrgb&w=800',
      trending: true
    },
    {
      id: 3,
      title: 'Cricket World Cup: India Dominates in Semi-Final Victory',
      excerpt: 'A spectacular performance leads India to the finals with record-breaking statistics and outstanding individual performances.',
      category: 'cricket',
      author: 'Cricket Correspondent',
      publishedAt: '6 hours ago',
      readTime: '4 min read',
      views: '42.1K',
      comments: 892,
      image: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg?auto=compress&cs=tinysrgb&w=800',
      trending: true
    },
    {
      id: 4,
      title: 'Transfer Window Update: Top 10 Moves That Shocked Everyone',
      excerpt: 'From surprise signings to unexpected departures, this transfer window has been full of surprises.',
      category: 'football',
      author: 'Transfer Expert',
      publishedAt: '8 hours ago',
      readTime: '6 min read',
      views: '19.8K',
      comments: 445,
      image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=800',
      trending: false
    },
    {
      id: 5,
      title: 'Rising Stars: Young Athletes Making Their Mark',
      excerpt: 'Meet the next generation of sports superstars who are already making waves in their respective fields.',
      category: 'all',
      author: 'Youth Sports Writer',
      publishedAt: '12 hours ago',
      readTime: '7 min read',
      views: '12.4K',
      comments: 178,
      image: 'https://images.pexels.com/photos/2524874/pexels-photo-2524874.jpeg?auto=compress&cs=tinysrgb&w=800',
      trending: false
    },
    {
      id: 6,
      title: 'Technology in Sports: AI Coaching Revolution',
      excerpt: 'How artificial intelligence is transforming the way athletes train and compete in modern sports.',
      category: 'all',
      author: 'Tech Sports Writer',
      publishedAt: '1 day ago',
      readTime: '8 min read',
      views: '8.9K',
      comments: 156,
      image: 'https://images.pexels.com/photos/2524874/pexels-photo-2524874.jpeg?auto=compress&cs=tinysrgb&w=800',
      trending: false
    }
  ];

  const filteredNews = activeCategory === 'all' 
    ? newsArticles 
    : activeCategory === 'trending'
    ? newsArticles.filter(article => article.trending)
    : newsArticles.filter(article => article.category === activeCategory);

  const trendingTopics = [
    { topic: 'Manchester United Transfer', posts: '2.3K' },
    { topic: 'NBA Finals 2024', posts: '1.8K' },
    { topic: 'Cricket World Cup', posts: '3.1K' },
    { topic: 'Olympic Preparations', posts: '945' },
    { topic: 'AI in Sports', posts: '567' }
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
              Sports News
            </span>
            <br />
            <span className="text-white">& Updates</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Stay updated with the latest sports news, breaking stories, and in-depth analysis from around the world.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 ${
                activeCategory === category.id
                  ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                  : 'bg-white/10 backdrop-blur-md text-gray-300 hover:text-white hover:bg-white/20'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Article */}
            {filteredNews.length > 0 && (
              <div className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 mb-8">
                <div className="relative">
                  <img 
                    src={filteredNews[0].image} 
                    alt={filteredNews[0].title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  {filteredNews[0].trending && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      Trending
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h2 className="text-2xl font-bold text-white mb-2">{filteredNews[0].title}</h2>
                    <p className="text-gray-300 text-sm mb-3">{filteredNews[0].excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {filteredNews[0].author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {filteredNews[0].publishedAt}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {filteredNews[0].views}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* News Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredNews.slice(1).map((article) => (
                <div key={article.id} className="group bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 hover:scale-105">
                  <div className="relative">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    {article.trending && (
                      <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        Trending
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-orange-300 transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">{article.excerpt}</p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {article.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {article.publishedAt}
                        </div>
                      </div>
                      <span className="text-orange-400">{article.readTime}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {article.views}
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-3 w-3" />
                          {article.comments}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="text-gray-400 hover:text-orange-400 transition-colors">
                          <Share2 className="h-4 w-4" />
                        </button>
                        <button className="text-gray-400 hover:text-orange-400 transition-colors">
                          <Bookmark className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending Topics */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-orange-500/20">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-orange-400" />
                Trending Topics
              </h3>
              <div className="space-y-3">
                {trendingTopics.map((topic, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
                    <span className="text-white text-sm font-medium">{topic.topic}</span>
                    <span className="text-orange-400 text-xs">{topic.posts}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-blue-500/20">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Filter className="h-5 w-5 text-blue-400" />
                Today's Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Articles Published</span>
                  <span className="text-white font-bold">24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Total Views</span>
                  <span className="text-green-400 font-bold">156K</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Comments</span>
                  <span className="text-blue-400 font-bold">2.3K</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Shares</span>
                  <span className="text-purple-400 font-bold">890</span>
                </div>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl p-6 border border-orange-500/30">
              <h3 className="text-xl font-bold text-white mb-2">Stay Updated</h3>
              <p className="text-gray-300 text-sm mb-4">Get the latest sports news delivered to your inbox.</p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;