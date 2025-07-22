import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Target, Zap, Award, Heart, Globe, Rocket, Shield,
  Trophy, Star, TrendingUp, Calendar, Mail, Phone, MapPin,
  Linkedin, Twitter, Github
} from 'lucide-react';

interface AboutProps {
  isDarkMode: boolean;
}

const About: React.FC<AboutProps> = ({ isDarkMode }) => {
  const teamMembers = [
    {
      name: 'Alex Rodriguez',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      bio: 'Former professional athlete turned tech entrepreneur, passionate about democratizing sports excellence.',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'alex@sportshub.com'
      }
    },
    {
      name: 'Sarah Chen',
      role: 'Head of AI Development',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=400&q=80',
      bio: 'AI researcher with 10+ years in computer vision and machine learning for sports analytics.',
      social: {
        linkedin: '#',
        github: '#',
        email: 'sarah@sportshub.com'
      }
    },
    {
      name: 'Marcus Thompson',
      role: 'Sports Director',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
      bio: 'Olympic coach and sports scientist, bringing world-class training methodologies to digital platforms.',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'marcus@sportshub.com'
      }
    },
    {
      name: 'Emma Wilson',
      role: 'Community Manager',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80',
      bio: 'Sports journalist and community builder, connecting athletes worldwide through shared passion.',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'emma@sportshub.com'
      }
    }
  ];

  const values = [
    {
      icon: Target,
      title: 'Excellence',
      description: 'We strive for perfection in everything we do, from AI algorithms to user experience.',
      color: isDarkMode ? 'from-blue-500 to-cyan-400' : 'from-blue-600 to-cyan-500'
    },
    {
      icon: Heart,
      title: 'Passion',
      description: 'Our love for sports drives us to create meaningful connections and experiences.',
      color: isDarkMode ? 'from-red-500 to-pink-400' : 'from-red-600 to-pink-500'
    },
    {
      icon: Globe,
      title: 'Inclusivity',
      description: 'Sports unite us all. We welcome athletes from every background and skill level.',
      color: isDarkMode ? 'from-green-500 to-emerald-400' : 'from-green-600 to-emerald-500'
    },
    {
      icon: Rocket,
      title: 'Innovation',
      description: 'We push boundaries with cutting-edge technology to revolutionize sports training.',
      color: isDarkMode ? 'from-purple-500 to-indigo-400' : 'from-purple-600 to-indigo-500'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Active Athletes', icon: Users },
    { number: '1,200+', label: 'Sports Clubs', icon: Shield },
    { number: '25+', label: 'Sports Covered', icon: Target },
    { number: '98%', label: 'Satisfaction Rate', icon: Award }
  ];

  const milestones = [
    {
      year: '2023',
      title: 'SportsHub Founded',
      description: 'Started with a vision to democratize sports excellence through AI technology.'
    },
    {
      year: '2023',
      title: 'AI Guru Launch',
      description: 'Launched our revolutionary AI coaching platform with posture analysis.'
    },
    {
      year: '2024',
      title: '10K Athletes',
      description: 'Reached our first major milestone of 10,000 active athletes.'
    },
    {
      year: '2024',
      title: 'Global Expansion',
      description: 'Expanded to serve athletes and clubs across 50+ countries worldwide.'
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
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-64 h-64 border-2 border-current rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 border-2 border-current rounded-lg rotate-45 animate-bounce"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              About <span className={`${
                isDarkMode 
                  ? 'bg-gradient-to-r from-orange-400 to-red-500' 
                  : 'bg-gradient-to-r from-blue-500 to-cyan-400'
              } bg-clip-text text-transparent`}>SportsHub</span>
            </h1>
            <p className={`text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              We're revolutionizing the sports world by combining cutting-edge AI technology with 
              passionate community building, creating the ultimate platform for athletes to grow, 
              connect, and achieve their dreams.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className={`rounded-3xl p-12 text-center ${
              isDarkMode
                ? 'bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30'
                : 'bg-gradient-to-r from-blue-500/20 to-cyan-400/20 border border-blue-500/30'
            }`}
          >
            <Zap className={`w-20 h-20 mx-auto mb-6 ${
              isDarkMode ? 'text-orange-400' : 'text-blue-500'
            }`} />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl leading-relaxed max-w-4xl mx-auto">
              "To empower every athlete with digital identity, AI-powered coaching, and a global 
              community that supports their journey from amateur to professional. We believe that 
              with the right tools, guidance, and connections, every athlete can unlock their true potential."
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <div className={`overflow-hidden rounded-3xl p-8 transition-all duration-300 group-hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10' 
                    : 'bg-black/5 backdrop-blur-md border border-black/10 hover:bg-black/10'
                }`}>
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform ${
                    isDarkMode
                      ? 'bg-gradient-to-r from-orange-500 to-red-600'
                      : 'bg-gradient-to-r from-blue-500 to-cyan-400'
                  }`}>
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-4xl font-bold mb-2">{stat.number}</h3>
                  <p className={`font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Core Values</h2>
            <p className={`text-xl max-w-3xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              The principles that guide everything we do at SportsHub
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className={`overflow-hidden rounded-3xl p-8 transition-all duration-300 h-full group-hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10' 
                    : 'bg-black/5 backdrop-blur-md border border-black/10 hover:bg-black/10'
                }`}>
                  <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                  <p className={`leading-relaxed ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Meet Our Squad</h2>
            <p className={`text-xl max-w-3xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              The passionate team behind SportsHub's innovation
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className={`overflow-hidden rounded-3xl transition-all duration-300 group-hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10' 
                    : 'bg-black/5 backdrop-blur-md border border-black/10 hover:bg-black/10'
                }`}>
                  <div className="relative overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                    <p className={`font-medium mb-3 ${
                      isDarkMode ? 'text-orange-400' : 'text-blue-600'
                    }`}>
                      {member.role}
                    </p>
                    <p className={`text-sm leading-relaxed mb-4 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {member.bio}
                    </p>
                    <div className="flex items-center space-x-3">
                      {member.social.linkedin && (
                        <a href={member.social.linkedin} className={`p-2 rounded-lg transition-colors ${
                          isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'
                        }`}>
                          <Linkedin className="w-5 h-5" />
                        </a>
                      )}
                      {member.social.twitter && (
                        <a href={member.social.twitter} className={`p-2 rounded-lg transition-colors ${
                          isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'
                        }`}>
                          <Twitter className="w-5 h-5" />
                        </a>
                      )}
                      {member.social.github && (
                        <a href={member.social.github} className={`p-2 rounded-lg transition-colors ${
                          isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'
                        }`}>
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                      <a href={`mailto:${member.social.email}`} className={`p-2 rounded-lg transition-colors ${
                        isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'
                      }`}>
                        <Mail className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Journey</h2>
            <p className={`text-xl max-w-3xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Key milestones in our mission to revolutionize sports
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className={`absolute left-1/2 transform -translate-x-1/2 w-1 h-full ${
              isDarkMode ? 'bg-orange-500/30' : 'bg-blue-500/30'
            }`}></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className="flex-1 px-8">
                    <div className={`p-6 rounded-2xl ${
                      isDarkMode 
                        ? 'bg-white/5 backdrop-blur-md border border-white/10' 
                        : 'bg-black/5 backdrop-blur-md border border-black/10'
                    }`}>
                      <div className={`text-2xl font-bold mb-2 ${
                        isDarkMode ? 'text-orange-400' : 'text-blue-600'
                      }`}>
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-bold mb-3">{milestone.title}</h3>
                      <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Timeline Dot */}
                  <div className={`w-6 h-6 rounded-full border-4 ${
                    isDarkMode 
                      ? 'bg-orange-500 border-orange-300' 
                      : 'bg-blue-500 border-blue-300'
                  }`}></div>
                  
                  <div className="flex-1"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className={`rounded-3xl p-12 ${
              isDarkMode 
                ? 'bg-white/5 backdrop-blur-md border border-white/10' 
                : 'bg-black/5 backdrop-blur-md border border-black/10'
            }`}
          >
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">Our Story</h2>
              <div className={`prose prose-lg mx-auto ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <p className="text-xl leading-relaxed mb-6">
                  SportsHub was born from a simple observation: talented athletes everywhere lacked access 
                  to professional coaching, quality training facilities, and meaningful connections with 
                  clubs and peers. Our founder, Alex Rodriguez, experienced this firsthand during his 
                  professional sports career.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  In 2023, we assembled a team of sports professionals, AI researchers, and technology 
                  experts to create something revolutionary. We envisioned a platform where geography, 
                  resources, and connections would no longer limit an athlete's potential.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  Today, SportsHub serves over 50,000 athletes across 25+ sports, providing AI-powered 
                  coaching, digital identity management, live streaming capabilities, and a thriving 
                  community that spans the globe. We're not just a platform – we're a movement toward 
                  democratizing sports excellence.
                </p>
                <p className="text-lg leading-relaxed">
                  Our journey has just begun. With every athlete who improves their technique through 
                  our AI Guru, every club that finds their perfect player match, and every live stream 
                  that brings communities together, we're building the future of sports.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h2>
            <p className={`text-xl max-w-3xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Have questions or want to learn more? We'd love to hear from you.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className={`text-center p-8 rounded-2xl ${
              isDarkMode 
                ? 'bg-white/5 backdrop-blur-md border border-white/10' 
                : 'bg-black/5 backdrop-blur-md border border-black/10'
            }`}>
              <Mail className={`w-12 h-12 mx-auto mb-4 ${
                isDarkMode ? 'text-orange-400' : 'text-blue-500'
              }`} />
              <h3 className="text-xl font-bold mb-2">Email Us</h3>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                hello@sportshub.com
              </p>
            </div>
            <div className={`text-center p-8 rounded-2xl ${
              isDarkMode 
                ? 'bg-white/5 backdrop-blur-md border border-white/10' 
                : 'bg-black/5 backdrop-blur-md border border-black/10'
            }`}>
              <Phone className={`w-12 h-12 mx-auto mb-4 ${
                isDarkMode ? 'text-orange-400' : 'text-blue-500'
              }`} />
              <h3 className="text-xl font-bold mb-2">Call Us</h3>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                +1 (555) 123-4567
              </p>
            </div>
            <div className={`text-center p-8 rounded-2xl ${
              isDarkMode 
                ? 'bg-white/5 backdrop-blur-md border border-white/10' 
                : 'bg-black/5 backdrop-blur-md border border-black/10'
            }`}>
              <MapPin className={`w-12 h-12 mx-auto mb-4 ${
                isDarkMode ? 'text-orange-400' : 'text-blue-500'
              }`} />
              <h3 className="text-xl font-bold mb-2">Visit Us</h3>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                San Francisco, CA
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className={`rounded-3xl p-12 text-center ${
              isDarkMode
                ? 'bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30'
                : 'bg-gradient-to-r from-blue-500/20 to-cyan-400/20 border border-blue-500/30'
            }`}
          >
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Join the SportsHub Revolution
            </h3>
            <p className={`text-xl mb-8 max-w-2xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Whether you're an athlete looking to improve, a club seeking talent, or a fan wanting 
              to connect with the sports community, there's a place for you here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                isDarkMode
                  ? 'bg-white text-orange-600 hover:bg-gray-100'
                  : 'bg-black text-blue-400 hover:bg-gray-900'
              }`}>
                Start Your Journey
              </button>
              <button className={`border-2 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                isDarkMode
                  ? 'border-orange-500/50 text-orange-400 hover:bg-orange-500/10'
                  : 'border-blue-500/50 text-blue-600 hover:bg-blue-500/10'
              }`}>
                Contact Our Team
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;