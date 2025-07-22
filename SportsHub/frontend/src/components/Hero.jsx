import React, { useEffect, useState } from 'react';
import { Play, Trophy, Users, Target } from 'lucide-react';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const ParallaxElement = ({ children, speed = 0.5 }) => {
    const [offset, setOffset] = useState(0);

    useEffect(() => {
      const handleScroll = () => {
        setOffset(window.pageYOffset * speed);
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, [speed]);

    return (
      <div style={{ transform: `translateY(${offset}px)` }}>
        {children}
      </div>
    );
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-slate-900/20"></div>
        
        {/* Floating Elements */}
        <ParallaxElement speed={0.3}>
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-green-500/20 rounded-full blur-xl float"></div>
        </ParallaxElement>
        
        <ParallaxElement speed={0.5}>
          <div className="absolute top-40 right-20 w-48 h-48 bg-gradient-to-r from-orange-500/20 to-pink-500/20 rounded-full blur-xl float" style={{ animationDelay: '1s' }}></div>
        </ParallaxElement>
        
        <ParallaxElement speed={0.2}>
          <div className="absolute bottom-20 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-xl float" style={{ animationDelay: '2s' }}></div>
        </ParallaxElement>

        {/* Interactive Mouse Follower */}
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-full blur-3xl pointer-events-none transition-all duration-300"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
            <span className="gradient-text">Elevate Your</span>
            <br />
            <span className="text-white">Sports Journey</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Connect with fans, train with AI, build your career. The ultimate platform for players, fans, and clubs.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button className="btn-primary text-lg px-8 py-4 flex items-center gap-2 justify-center">
            <Play className="h-5 w-5" />
            Get Started
          </button>
          <button className="glass text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-all duration-300 flex items-center gap-2 justify-center">
            <Trophy className="h-5 w-5" />
            Watch Demo
          </button>
        </div>

        {/* Feature Pills */}
        <div className="flex flex-wrap gap-4 justify-center">
          <div className="glass px-6 py-3 rounded-full flex items-center gap-2">
            <Users className="h-4 w-4 text-blue-400" />
            <span className="text-sm">10M+ Users</span>
          </div>
          <div className="glass px-6 py-3 rounded-full flex items-center gap-2">
            <Trophy className="h-4 w-4 text-green-400" />
            <span className="text-sm">AI Coaching</span>
          </div>
          <div className="glass px-6 py-3 rounded-full flex items-center gap-2">
            <Target className="h-4 w-4 text-orange-400" />
            <span className="text-sm">Live Matches</span>
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
  );
};

export default Hero;