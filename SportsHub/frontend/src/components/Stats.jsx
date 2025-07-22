import React, { useState, useEffect } from 'react';
import { Trophy, Users, Target, Zap, TrendingUp, Award, Clock, Star } from 'lucide-react';

const Stats = () => {
  const [counters, setCounters] = useState({
    users: 0,
    matches: 0,
    clubs: 0,
    countries: 0
  });

  const finalStats = {
    users: 2500000,
    matches: 50000,
    clubs: 15000,
    countries: 195
  };

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = duration / steps;

    const timer = setInterval(() => {
      setCounters(prev => ({
        users: Math.min(prev.users + finalStats.users / steps, finalStats.users),
        matches: Math.min(prev.matches + finalStats.matches / steps, finalStats.matches),
        clubs: Math.min(prev.clubs + finalStats.clubs / steps, finalStats.clubs),
        countries: Math.min(prev.countries + finalStats.countries / steps, finalStats.countries)
      }));
    }, increment);

    setTimeout(() => clearInterval(timer), duration);
    return () => clearInterval(timer);
  }, []);

  const achievements = [
    {
      icon: Trophy,
      title: 'Global Sports Platform',
      description: 'Leading the way in digital sports engagement',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Users,
      title: 'Thriving Community',
      description: 'Millions of fans, players, and clubs connected',
      color: 'from-blue-500 to-purple-500'
    },
    {
      icon: Target,
      title: 'AI-Powered Training',
      description: 'Revolutionary coaching technology',
      color: 'from-green-500 to-blue-500'
    },
    {
      icon: Zap,
      title: 'Live Sports Action',
      description: 'Real-time matches and instant engagement',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const milestones = [
    { year: '2020', event: 'SportsHub Founded', description: 'Started with a vision to revolutionize sports' },
    { year: '2021', event: 'AI Coach Launch', description: 'First AI-powered sports coaching platform' },
    { year: '2022', event: '1M Users Milestone', description: 'Reached our first million active users' },
    { year: '2023', event: 'Global Expansion', description: 'Expanded to 50+ countries worldwide' },
    { year: '2024', event: 'Live Streaming', description: 'Launched live match streaming platform' }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="gradient-text">By the Numbers</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            SportsHub is trusted by millions worldwide. Here's how we're making an impact in the sports community.
          </p>
        </div>

        {/* Stats Counter */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="glass p-6 rounded-2xl text-center card">
            <div className="text-4xl sm:text-5xl font-bold gradient-text mb-2">
              {Math.floor(counters.users / 1000000)}M+
            </div>
            <div className="text-gray-400 font-medium">Active Users</div>
          </div>
          <div className="glass p-6 rounded-2xl text-center card">
            <div className="text-4xl sm:text-5xl font-bold gradient-text mb-2">
              {Math.floor(counters.matches / 1000)}K+
            </div>
            <div className="text-gray-400 font-medium">Matches Streamed</div>
          </div>
          <div className="glass p-6 rounded-2xl text-center card">
            <div className="text-4xl sm:text-5xl font-bold gradient-text mb-2">
              {Math.floor(counters.clubs / 1000)}K+
            </div>
            <div className="text-gray-400 font-medium">Clubs Registered</div>
          </div>
          <div className="glass p-6 rounded-2xl text-center card">
            <div className="text-4xl sm:text-5xl font-bold gradient-text mb-2">
              {Math.floor(counters.countries)}+
            </div>
            <div className="text-gray-400 font-medium">Countries</div>
          </div>
        </div>

        {/* Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {achievements.map((achievement, index) => (
            <div key={index} className="glass p-6 rounded-2xl card">
              <div className={`w-12 h-12 bg-gradient-to-r ${achievement.color} rounded-lg flex items-center justify-center mb-4`}>
                <achievement.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{achievement.title}</h3>
              <p className="text-gray-300 text-sm">{achievement.description}</p>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="glass rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Our Journey</h3>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-gray-800 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-4 w-4 text-blue-400" />
                        <span className="text-blue-400 font-bold">{milestone.year}</span>
                      </div>
                      <h4 className="text-white font-semibold mb-1">{milestone.event}</h4>
                      <p className="text-gray-300 text-sm">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-slate-900"></div>
                  </div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recognition */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-white mb-8">Recognition & Awards</h3>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="glass p-6 rounded-lg flex items-center gap-4">
              <Star className="h-8 w-8 text-yellow-400 fill-current" />
              <div className="text-left">
                <div className="text-white font-bold">Best Sports App 2024</div>
                <div className="text-gray-400 text-sm">Tech Innovation Awards</div>
              </div>
            </div>
            <div className="glass p-6 rounded-lg flex items-center gap-4">
              <Trophy className="h-8 w-8 text-orange-400" />
              <div className="text-left">
                <div className="text-white font-bold">Digital Sports Pioneer</div>
                <div className="text-gray-400 text-sm">Sports Technology Summit</div>
              </div>
            </div>
            <div className="glass p-6 rounded-lg flex items-center gap-4">
              <Award className="h-8 w-8 text-purple-400" />
              <div className="text-left">
                <div className="text-white font-bold">Community Choice Award</div>
                <div className="text-gray-400 text-sm">Global Sports Forum</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

export default Stats;