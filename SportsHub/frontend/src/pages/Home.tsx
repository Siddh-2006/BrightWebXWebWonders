import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { 
  Play, ArrowRight, Zap, Target, Users, Heart, MessageCircle, 
  Share2, Eye, Trophy, Star, TrendingUp, Award, Calendar
} from 'lucide-react';

interface HomeProps {
  isDarkMode: boolean;
}

const Home: React.FC<HomeProps> = ({ isDarkMode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 4 + 1,
        opacity: Math.random() * 0.6 + 0.2
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

  const featuredContent = [
    {
      id: 1,
      type: 'highlight',
      title: 'Cristiano Ronaldo\'s Legendary Free Kick Collection',
      author: 'CR7 Official',
      sport: 'Football',
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
      likes: 15420,
      views: 2840000,
      duration: '8:45'
    },
    {
      id: 2,
      type: 'vlog',
      title: 'Day in the Life: NBA Training Camp',
      author: 'LeBron James',
      sport: 'Basketball',
      image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80',
      likes: 23100,
      views: 1560000,
      duration: '12:30'
    },
    {
      id: 3,
      type: 'post',
      title: 'Serena Williams: The Greatest Tennis Player Ever',
      author: 'Tennis Legends',
      sport: 'Tennis',
      image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=800&q=80',
      likes: 8750,
      views: 945000,
      duration: '5:20'
    }
  ];

  const inspirationalQuotes = [
    {
      quote: "Champions aren't made in comfort zones. They're forged in the fire of dedication.",
      author: "Michael Jordan",
      sport: "Basketball"
    },
    {
      quote: "The more difficult the victory, the greater the happiness in winning.",
      author: "Pelé",
      sport: "Football"
    },
    {
      quote: "You have to believe in yourself when no one else does.",
      author: "Serena Williams",
      sport: "Tennis"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20"
    >
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none"
        />
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-64 h-64 border-2 border-current rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-32 w-48 h-48 border-2 border-current rounded-lg rotate-45 animate-bounce"></div>
          <div className="absolute bottom-32 left-1/4 w-32 h-32 bg-current rounded-full animate-ping"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Main Headline */}
            <div className="space-y-6">
              <motion.h1 
                className="text-6xl md:text-8xl font-bold leading-tight"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className={`bg-gradient-to-r ${
                  isDarkMode 
                    ? 'from-orange-400 to-red-500' 
                    : 'from-blue-500 to-cyan-400'
                } bg-clip-text text-transparent`}>
                  SportsHub
                </span>
              </motion.h1>
              <motion.p 
                className={`text-2xl md:text-3xl font-light max-w-4xl mx-auto ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Empowering Athletes with Digital Identity and AI Coaching
              </motion.p>
            </div>

            {/* Inspirational Quote Carousel */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className={`${
                isDarkMode 
                  ? 'bg-white/5 backdrop-blur-md border-orange-500/20' 
                  : 'bg-black/5 backdrop-blur-md border-blue-500/20'
              } rounded-3xl p-8 max-w-5xl mx-auto border`}
            >
              <blockquote className="text-2xl md:text-4xl font-medium italic mb-6">
                "{inspirationalQuotes[0].quote}"
              </blockquote>
              <p className={`text-xl ${
                isDarkMode ? 'text-orange-400' : 'text-blue-600'
              }`}>
                - {inspirationalQuotes[0].author}, {inspirationalQuotes[0].sport}
              </p>
            </motion.div>

            {/* Feature Highlights */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
            >
              <div className={`${
                isDarkMode 
                  ? 'bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10' 
                  : 'bg-black/5 backdrop-blur-sm border-black/10 hover:bg-black/10'
              } rounded-2xl p-8 border transition-all duration-300 group`}>
                <Zap className={`w-16 h-16 mx-auto mb-6 group-hover:scale-110 transition-transform ${
                  isDarkMode ? 'text-orange-400' : 'text-blue-500'
                }`} />
                <h3 className="text-2xl font-semibold mb-4">AI-Powered Growth</h3>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                  Personalized coaching and posture correction with advanced AI technology
                </p>
              </div>
              <div className={`${
                isDarkMode 
                  ? 'bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10' 
                  : 'bg-black/5 backdrop-blur-sm border-black/10 hover:bg-black/10'
              } rounded-2xl p-8 border transition-all duration-300 group`}>
                <Target className={`w-16 h-16 mx-auto mb-6 group-hover:scale-110 transition-transform ${
                  isDarkMode ? 'text-green-400' : 'text-green-500'
                }`} />
                <h3 className="text-2xl font-semibold mb-4">Digital Identity</h3>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                  Build your sports profile and connect with clubs worldwide
                </p>
              </div>
              <div className={`${
                isDarkMode 
                  ? 'bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10' 
                  : 'bg-black/5 backdrop-blur-sm border-black/10 hover:bg-black/10'
              } rounded-2xl p-8 border transition-all duration-300 group`}>
                <Users className={`w-16 h-16 mx-auto mb-6 group-hover:scale-110 transition-transform ${
                  isDarkMode ? 'text-purple-400' : 'text-purple-500'
                }`} />
                <h3 className="text-2xl font-semibold mb-4">Live Community</h3>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                  Real-time matches, live chats, and community engagement
                </p>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Link
                to="/sports"
                className={`${
                  isDarkMode
                    ? 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500'
                    : 'bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500'
                } text-white px-10 py-5 rounded-2xl font-semibold text-lg transition-all duration-300 flex items-center space-x-3 group shadow-2xl hover:shadow-3xl transform hover:-translate-y-1`}
              >
                <span>Explore Sports</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/ai-guru"
                className={`border-2 px-10 py-5 rounded-2xl font-semibold text-lg transition-all duration-300 flex items-center space-x-3 group ${
                  isDarkMode
                    ? 'border-orange-500/50 text-orange-400 hover:bg-orange-500/10'
                    : 'border-blue-500/50 text-blue-600 hover:bg-blue-500/10'
                }`}
              >
                <Play className="w-6 h-6" />
                <span>Try AI Guru</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
        >
          <div className={`w-8 h-12 border-2 rounded-full flex justify-center ${
            isDarkMode ? 'border-orange-500/50' : 'border-blue-500/50'
          }`}>
            <div className={`w-1 h-4 rounded-full mt-2 animate-pulse ${
              isDarkMode ? 'bg-orange-400' : 'bg-blue-500'
            }`}></div>
          </div>
        </motion.div>
      </section>

      {/* Featured Content Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Featured <span className={`${
                isDarkMode 
                  ? 'bg-gradient-to-r from-orange-400 to-red-500' 
                  : 'bg-gradient-to-r from-blue-500 to-cyan-400'
              } bg-clip-text text-transparent`}>Content</span>
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Discover amazing vlogs, posts, and highlights from athletes around the world
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {featuredContent.map((content, index) => (
              <motion.div
                key={content.id}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`${
                  isDarkMode 
                    ? 'bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10' 
                    : 'bg-black/5 backdrop-blur-md border-black/10 hover:bg-black/10'
                } rounded-3xl overflow-hidden border transition-all duration-300 group hover:scale-105`}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={content.image} 
                    alt={content.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium text-white ${
                    content.type === 'highlight' ? 'bg-yellow-500' :
                    content.type === 'vlog' ? 'bg-red-500' : 'bg-blue-500'
                  }`}>
                    {content.type.charAt(0).toUpperCase() + content.type.slice(1)}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
                    {content.duration}
                  </div>
                  {content.type === 'vlog' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Play className="w-10 h-10 text-white ml-1" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 line-clamp-2">
                    {content.title}
                  </h3>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className={`font-medium ${
                        isDarkMode ? 'text-orange-400' : 'text-blue-600'
                      }`}>
                        {content.author}
                      </p>
                      <p className={`text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {content.sport}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-current/10">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Heart className="w-5 h-5 text-red-500" />
                        <span className="text-sm font-medium">{content.likes.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-5 h-5" />
                        <span className="text-sm font-medium">{content.views.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className={`p-2 rounded-lg transition-colors ${
                        isDarkMode 
                          ? 'hover:bg-white/10' 
                          : 'hover:bg-black/10'
                      }`}>
                        <MessageCircle className="w-5 h-5" />
                      </button>
                      <button className={`p-2 rounded-lg transition-colors ${
                        isDarkMode 
                          ? 'hover:bg-white/10' 
                          : 'hover:bg-black/10'
                      }`}>
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/sports"
              className={`inline-flex items-center space-x-2 px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                isDarkMode
                  ? 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500'
                  : 'bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500'
              } text-white shadow-lg hover:shadow-xl`}
            >
              <span>Explore All Content</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;