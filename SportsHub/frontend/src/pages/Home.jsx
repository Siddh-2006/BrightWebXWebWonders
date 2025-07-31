import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Play, ArrowRight, Zap, Target, Users, Heart, MessageCircle,
  Share2, Eye, Trophy, Star, TrendingUp, Award, Calendar
} from 'lucide-react';
import QuizSection from '../components/QuizSection.jsx';
import { showNotificationToast } from '../components/NotificationToast';

const Home = ({ isDarkMode }) => {
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];

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

  // Responsive quote carousel state
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
  const [quoteIdx, setQuoteIdx] = React.useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIdx((prev) => (prev + 1) % inspirationalQuotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20"
    >
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Parallax Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none"
        />
        {/* Parallax/animated background shapes */}
        <div className="absolute inset-0 opacity-10 select-none">
          <div className="absolute top-10 left-4 w-40 h-40 border-2 border-current rounded-full animate-pulse" style={{filter:'blur(2px)'}}></div>
          <div className="absolute top-32 right-10 w-32 h-32 border-2 border-current rounded-lg rotate-45 animate-bounce" style={{filter:'blur(1px)'}}></div>
          <div className="absolute bottom-24 left-1/4 w-24 h-24 bg-current rounded-full animate-ping" style={{filter:'blur(3px)'}}></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 text-center">
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
            {/* Quote Carousel */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className={`relative rounded-3xl p-6 sm:p-8 max-w-5xl mx-auto border overflow-hidden shadow-lg ${
                isDarkMode 
                  ? 'bg-white/5 backdrop-blur-md border-orange-500/20' 
                  : 'bg-black/5 backdrop-blur-md border-blue-500/20'
              }`}
            >
              {/* Animated gradient border */}
              <div className="absolute -inset-1 rounded-3xl pointer-events-none z-0 animate-gradient-x bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 opacity-30" style={{filter: isDarkMode ? 'blur(8px)' : 'blur(6px)'}}></div>
              <blockquote className="relative z-10 text-2xl md:text-4xl font-medium italic mb-6 min-h-[60px] flex items-center justify-center transition-all duration-500">
                <motion.span
                  key={quoteIdx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  "{inspirationalQuotes[quoteIdx].quote}"
                </motion.span>
              </blockquote>
              <p className={`relative z-10 text-xl transition-colors duration-500 ${
                isDarkMode ? 'text-orange-400' : 'text-blue-600'
              }`}>
                - {inspirationalQuotes[quoteIdx].author}, {inspirationalQuotes[quoteIdx].sport}
              </p>
              {/* Carousel dots */}
              <div className="relative z-10 flex justify-center mt-4 gap-2">
                {inspirationalQuotes.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setQuoteIdx(i)}
                    className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                      quoteIdx === i
                        ? isDarkMode
                          ? 'bg-orange-400 border-orange-500'
                          : 'bg-blue-500 border-blue-600'
                        : isDarkMode
                          ? 'bg-white/10 border-orange-500/30'
                          : 'bg-black/10 border-blue-500/30'
                    }`}
                    aria-label={`Show quote ${i+1}`}
                  />
                ))}
              </div>
            </motion.div>

            {/* Feature Highlights */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto"
            >
              {/* Feature Card 1 */}
              <div
                onClick={() => navigate('/ai-guru')}
                className={`group cursor-pointer rounded-2xl p-6 sm:p-8 border transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1 ${
                  isDarkMode
                    ? 'bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10'
                    : 'bg-black/5 backdrop-blur-sm border-black/10 hover:bg-black/10'
                }`}
              >
                <Zap className={`w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform ${
                  isDarkMode ? 'text-orange-400' : 'text-blue-500'
                }`} />
                <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4">AI-Powered Growth</h3>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                  Personalized coaching and posture correction with advanced AI technology
                </p>
              </div>
              {/* Feature Card 2 */}
              <div
                onClick={() => navigate('/profile')}
                className={`group cursor-pointer rounded-2xl p-6 sm:p-8 border transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1 ${
                  isDarkMode
                    ? 'bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10'
                    : 'bg-black/5 backdrop-blur-sm border-black/10 hover:bg-black/10'
                }`}
              >
                <Target className={`w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform ${
                  isDarkMode ? 'text-green-400' : 'text-green-500'
                }`} />
                <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4">Digital Identity</h3>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                  Build your sports profile and connect with clubs worldwide
                </p>
              </div>
              {/* Feature Card 3 */}
              <div
                onClick={() => navigate('/live')}
                className={`group cursor-pointer rounded-2xl p-6 sm:p-8 border transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1 ${
                  isDarkMode
                    ? 'bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10'
                    : 'bg-black/5 backdrop-blur-sm border-black/10 hover:bg-black/10'
                }`}
              >
                <Users className={`w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform ${
                  isDarkMode ? 'text-purple-400' : 'text-purple-500'
                }`} />
                <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4">Live Community</h3>
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
              <button
                onClick={() => navigate('/sports')}
                className={`${
                  isDarkMode
                    ? 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500'
                    : 'bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500'
                } text-white px-10 py-5 rounded-2xl font-semibold text-lg transition-all duration-300 flex items-center space-x-3 group shadow-2xl hover:shadow-3xl transform hover:-translate-y-1`}
              >
                <span>Explore Sports</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigate('/ai-guru')}
                className={`border-2 px-10 py-5 rounded-2xl font-semibold text-lg transition-all duration-300 flex items-center space-x-3 group ${
                  isDarkMode
                    ? 'border-orange-500/50 text-orange-400 hover:bg-orange-500/10'
                    : 'border-blue-500/50 text-blue-600 hover:bg-blue-500/10'
                }`}
              >
                <Play className="w-6 h-6" />
                <span>Try AI Guru</span>
              </button>
            </motion.div>

          </motion.div>
        </div>

        {/* Scroll Indicator */}
        {/* Scroll Indicator - more visible on mobile */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20"
        >
          <div className={`w-8 h-12 border-2 rounded-full flex justify-center items-start ${
            isDarkMode ? 'border-orange-500/50' : 'border-blue-500/50'
          }`}>
            <div className={`w-1 h-4 rounded-full mt-2 animate-pulse ${
              isDarkMode ? 'bg-orange-400' : 'bg-blue-500'
            }`}></div>
          </div>
        </motion.div>
      </section>

      {/* Featured Content Section */}
      <section className="py-10 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
              Featured <span className={`bg-clip-text text-transparent ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-orange-400 to-red-500' 
                  : 'bg-gradient-to-r from-blue-500 to-cyan-400'
              }`}>Content</span>
            </h2>
            <p className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Discover amazing vlogs, posts, and highlights from athletes around the world
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredContent.map((content, index) => (
              <motion.div
                key={content.id}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`rounded-3xl overflow-hidden border transition-all duration-300 group hover:scale-[1.03] shadow-md hover:shadow-xl ${
                  isDarkMode 
                    ? 'bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10' 
                    : 'bg-black/5 backdrop-blur-md border-black/10 hover:bg-black/10'
                }`}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={content.image} 
                    alt={content.title}
                    className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className={`absolute top-3 left-3 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium text-white ${
                    content.type === 'highlight' ? 'bg-yellow-500' :
                    content.type === 'vlog' ? 'bg-red-500' : 'bg-blue-500'
                  }`}>
                    {content.type.charAt(0).toUpperCase() + content.type.slice(1)}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/50 text-white px-2 py-1 rounded text-xs sm:text-sm">
                    {content.duration}
                  </div>
                  {content.type === 'vlog' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 sm:w-20 sm:h-20 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Play className="w-7 h-7 sm:w-10 sm:h-10 text-white ml-1" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 line-clamp-2">
                    {content.title}
                  </h3>
                  <div className="flex items-center justify-between mb-2 sm:mb-4">
                    <div>
                      <p className={`font-medium ${
                        isDarkMode ? 'text-orange-400' : 'text-blue-600'
                      }`}>
                        {content.author}
                      </p>
                      <p className={`text-xs sm:text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {content.sport}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-current/10">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className="flex items-center space-x-1">
                        <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                        <span className="text-xs sm:text-sm font-medium">{content.likes.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-xs sm:text-sm font-medium">{content.views.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <button className={`p-1 sm:p-2 rounded-lg transition-colors ${
                        isDarkMode 
                          ? 'hover:bg-white/10' 
                          : 'hover:bg-black/10'
                      }`}>
                        <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                      <button className={`p-1 sm:p-2 rounded-lg transition-colors ${
                        isDarkMode 
                          ? 'hover:bg-white/10' 
                          : 'hover:bg-black/10'
                      }`}>
                        <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
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
            className="text-center mt-8 md:mt-12"
          >
            <button
              onClick={() => navigate('/sports')}
              className={`inline-flex items-center space-x-2 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 ${
                isDarkMode
                  ? 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500'
                  : 'bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500'
              } text-white shadow-lg hover:shadow-xl text-base sm:text-lg`}
            >
              <span>Explore All Content</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Quiz Section */}
      <QuizSection isDarkMode={isDarkMode} />
    </motion.div>
  );
};

export default Home;