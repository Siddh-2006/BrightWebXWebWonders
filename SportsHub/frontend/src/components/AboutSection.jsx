import React from 'react';
import { Users, Target, Zap, Award, Heart, Globe, Rocket, Shield } from 'lucide-react';

const AboutSection = () => {
  const teamMembers = [
    {
      name: 'Alex Rodriguez',
      role: 'Founder & CEO',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Former professional athlete turned tech entrepreneur, passionate about democratizing sports excellence.'
    },
    {
      name: 'Sarah Chen',
      role: 'Head of AI Development',
      image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'AI researcher with 10+ years in computer vision and machine learning for sports analytics.'
    },
    {
      name: 'Marcus Thompson',
      role: 'Sports Director',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Olympic coach and sports scientist, bringing world-class training methodologies to digital platforms.'
    },
    {
      name: 'Emma Wilson',
      role: 'Community Manager',
      image: 'https://images.pexels.com/photos/3756681/pexels-photo-3756681.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Sports journalist and community builder, connecting athletes worldwide through shared passion.'
    }
  ];

  const values = [
    {
      icon: Target,
      title: 'Excellence',
      description: 'We strive for perfection in everything we do, from AI algorithms to user experience.',
      color: 'from-blue-500 to-cyan-400'
    },
    {
      icon: Heart,
      title: 'Passion',
      description: 'Our love for sports drives us to create meaningful connections and experiences.',
      color: 'from-red-500 to-pink-400'
    },
    {
      icon: Globe,
      title: 'Inclusivity',
      description: 'Sports unite us all. We welcome athletes from every background and skill level.',
      color: 'from-green-500 to-emerald-400'
    },
    {
      icon: Rocket,
      title: 'Innovation',
      description: 'We push boundaries with cutting-edge technology to revolutionize sports training.',
      color: 'from-purple-500 to-indigo-400'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Active Athletes', icon: Users },
    { number: '1,200+', label: 'Sports Clubs', icon: Shield },
    { number: '25+', label: 'Sports Covered', icon: Target },
    { number: '98%', label: 'Satisfaction Rate', icon: Award }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">SportsHub</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            We're revolutionizing the sports world by combining cutting-edge AI technology with 
            passionate community building, creating the ultimate platform for athletes to grow, 
            connect, and achieve their dreams.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-r from-blue-500 to-cyan-400 rounded-3xl p-12 text-white mb-20">
          <div className="max-w-4xl mx-auto text-center">
            <Zap className="w-16 h-16 mx-auto mb-6" />
            <h3 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h3>
            <p className="text-xl leading-relaxed">
              "To empower every athlete with digital identity, AI-powered coaching, and a global 
              community that supports their journey from amateur to professional. We believe that 
              with the right tools, guidance, and connections, every athlete can unlock their true potential."
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</h3>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h3 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Our Core Values
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full group-hover:-translate-y-2">
                  <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <h3 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Meet Our Squad
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                  <div className="relative overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h4>
                    <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-3xl p-12 shadow-lg">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8">
              Our Story
            </h3>
            <div className="prose prose-lg mx-auto text-gray-600">
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
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-400 rounded-3xl p-12 text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Join the SportsHub Revolution
            </h3>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Whether you're an athlete looking to improve, a club seeking talent, or a fan wanting 
              to connect with the sports community, there's a place for you here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                Start Your Journey
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors">
                Contact Our Team
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;