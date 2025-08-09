import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { 
  ArrowRight, Users, Calendar, Trophy, Target, Search, Filter,
  MapPin, Star, Clock, Play, Eye, Heart
} from 'lucide-react';
import { showCustomToast } from '../helper/CustomToast';
const Sports = ({ isDarkMode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [RequestedField,setRequestedField] = useState(false);

  const sports = [
    {
      id: 1,
      name: 'Football',
      description: 'The beautiful game that unites the world. Join clubs, compete in tournaments, and showcase your skills with legendary players.',
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
      participants: 15420,
      upcomingEvents: 23,
      topClubs: ['Thunder FC', 'Lightning United', 'Storm City'],
      icon: '⚽',
      category: 'team',
      legends: [
        { name: 'Pelé', image: 'https://res.cloudinary.com/dddwnvp4w/image/upload/v1754408034/images_pvczl5.jpg' },
        { name: 'Ronaldo', image: 'https://res.cloudinary.com/dddwnvp4w/image/upload/v1754407871/images_iptp6l.jpg' },
        { name: 'Messi', image: 'https://res.cloudinary.com/dddwnvp4w/image/upload/v1754407781/xbuydizxwdjbz5e8wkyt.jpg' },
      ]
      
    },
    {
      id: 2,
      name: 'Basketball',
      description: 'Fast-paced action and incredible athleticism. Experience the thrill of the court with basketball legends.',
      image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80',
      participants: 12890,
      upcomingEvents: 18,
      topClubs: ['Hoops Elite', 'Court Kings', 'Slam Dunkers'],
      icon: '🏀',
      category: 'team',
      legends: [
        { name: 'Michael Jordan', image: 'https://res.cloudinary.com/dddwnvp4w/image/upload/v1754408285/pv8u9h2jtxb4ahiqvsqz.jpg' },
        { name: 'LeBron James', image: 'https://res.cloudinary.com/dddwnvp4w/image/upload/v1754408422/wfap7fp41iynl5aeestn.jpg' },
        { name: 'Kobe Bryant', image: 'https://res.cloudinary.com/dddwnvp4w/image/upload/v1754408497/f6juwz6h7tpfq8dzkc6i.jpg' }
      ]
    },
    {
      id: 3,
      name: 'Tennis',
      description: 'Precision, power, and mental strength. Master the art of tennis with expert coaching from tennis legends.',
      image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=800&q=80',
      participants: 8750,
      upcomingEvents: 15,
      topClubs: ['Ace Tennis Club', 'Racket Masters', 'Court Champions'],
      icon: '🎾',
      category: 'individual',
      legends: [
        { name: 'Serena Williams', image: 'https://res.cloudinary.com/dddwnvp4w/image/upload/v1754408607/lkcbwcmodmya4twxdbcf.jpg' },
        { name: 'Roger Federer', image: 'https://res.cloudinary.com/dddwnvp4w/image/upload/v1754408669/fi5lxufdrprvyehsyvbx.jpg' },
        { name: 'Rafael Nadal', image: 'https://res.cloudinary.com/dddwnvp4w/image/upload/v1754408718/ux92zfuqciikk45eqmhx.jpg' }
      ]
    },
    {
      id: 4,
      name: 'Swimming',
      description: 'Dive into excellence. Perfect your technique and compete in aquatic sports with swimming champions.',
      image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=800&q=80',
      participants: 6420,
      upcomingEvents: 12,
      topClubs: ['Aqua Sharks', 'Wave Riders', 'Pool Legends'],
      icon: '🏊',
      category: 'individual',
      legends: [
        { name: 'Michael Phelps', image: 'https://res.cloudinary.com/dddwnvp4w/image/upload/v1754408792/tfqxyiohqh2iwu3eklhs.jpg' },
        { name: 'Katie Ledecky', image: 'https://res.cloudinary.com/dddwnvp4w/image/upload/v1754408854/jzjhsk5pcohdqtxa9vwg.jpg' },
        { name: 'Adam Peaty', image: 'https://res.cloudinary.com/dddwnvp4w/image/upload/v1754408901/ekevvl9sfg7uq0wk69ay.jpg' }
      ]
    },
    {
      id: 5,
      name: 'Cricket',
      description: 'The gentleman\'s game with strategic depth. Join the cricket community and play with passion alongside cricket legends.',
      image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80',
      participants: 11200,
      upcomingEvents: 20,
      topClubs: ['Royal Cricketers', 'Boundary Hunters', 'Wicket Warriors'],
      icon: '🏏',
      category: 'team',
      legends: [
        { name: 'Sachin Tendulkar', image: 'https://res.cloudinary.com/dddwnvp4w/image/upload/v1754408951/hbtuuxizw6ygogtunwzb.jpg' },
        { name: 'Virat Kohli', image: 'https://res.cloudinary.com/dddwnvp4w/image/upload/v1754408991/ccdspnq8x1qj7uop08vz.jpg' },
        { name: 'MS Dhoni', image: 'https://res.cloudinary.com/dddwnvp4w/image/upload/v1754409030/hritbfl6tgltxtyuejzj.jpg' }
      ]
    },
    {
      id: 6,
      name: 'Track & Field',
      description: 'Push your limits in athletics. Sprint, jump, throw - discover your athletic potential with track legends.',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80',
      participants: 9340,
      upcomingEvents: 16,
      topClubs: ['Speed Demons', 'Track Stars', 'Field Masters'],
      icon: '🏃',
      category: 'individual',
      legends: [
        { name: 'Usain Bolt', image: 'https://res.cloudinary.com/dddwnvp4w/image/upload/v1754409098/images_z1wdje.jpg' },
        { name: 'Carl Lewis', image: 'https://res.cloudinary.com/dddwnvp4w/image/upload/v1754409146/qbwlufrocfo9iot8gahs.jpg' },
        { name: 'Florence Griffith-Joyner', image: 'https://res.cloudinary.com/dddwnvp4w/image/upload/v1754409197/ikeuvzjzsoavmsjfadzb.jpg' }
      ]
    }
  ];

  const categories = [
    { id: 'all', label: 'All Sports' },
    { id: 'team', label: 'Team Sports' },
    { id: 'individual', label: 'Individual Sports' }
  ];

  const filteredSports = sports.filter(sport => {
    const matchesSearch = sport.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sport.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || sport.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20"
    >
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
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
              Explore <span className={`${
                isDarkMode 
                  ? 'bg-gradient-to-r from-orange-400 to-red-500' 
                  : 'bg-gradient-to-r from-blue-500 to-cyan-400'
              } bg-clip-text text-transparent`}>Sports</span>
            </h1>
            <p className={`text-xl md:text-2xl max-w-4xl mx-auto mb-12 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Discover your passion, join communities, and compete at the highest level across multiple sports disciplines
            </p>

            {/* Search and Filter */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search sports, clubs, or events..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full pl-12 pr-4 py-4 rounded-2xl font-medium transition-all duration-300 ${
                      isDarkMode
                        ? 'bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 focus:border-orange-500'
                        : 'bg-black/10 backdrop-blur-md border border-black/20 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                    } focus:outline-none`}
                  />
                </div>
                <div className="flex flex-wrap space-x-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-6 py-4 rounded-2xl font-medium transition-all duration-300 whitespace-nowrap ${
                        selectedCategory === category.id
                          ? isDarkMode
                            ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                            : 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                          : isDarkMode
                            ? 'bg-white/10 text-gray-300 hover:bg-white/20'
                            : 'bg-black/10 text-gray-700 hover:bg-black/20'
                      } mb-3`}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sports Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSports.map((sport, index) => (
              <motion.div
                key={sport.id}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`group relative overflow-hidden rounded-3xl transition-all duration-500 hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10' 
                    : 'bg-black/5 backdrop-blur-md border border-black/10 hover:bg-black/10'
                }`}
              >
                {/* Sport Image */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={sport.image} 
                    alt={sport.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute top-4 right-4 text-4xl">{sport.icon}</div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-3xl font-bold text-white mb-2">{sport.name}</h3>
                    <div className="flex items-center space-x-4 text-white/80">
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span className="text-sm">{sport.participants.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{sport.upcomingEvents} events</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sport Content */}
                <div className="p-6">
                  <p className={`mb-6 leading-relaxed ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {sport.description}
                  </p>

                  {/* Legends Section */}
                  <div className="mb-6">
                    <h4 className={`text-sm font-semibold mb-3 flex items-center ${
                      isDarkMode ? 'text-orange-400' : 'text-blue-600'
                    }`}>
                      <Trophy className="w-4 h-4 mr-1" />
                      Hall of Fame
                    </h4>
                    <div className="flex space-x-2">
                      {sport.legends.slice(0, 3).map((legend, idx) => (
                        <div key={idx} className="relative group/legend">
                          <img 
                            src={legend.image} 
                            alt={legend.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-current/20 group-hover/legend:scale-110 transition-transform"
                          />
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/legend:opacity-100 transition-opacity whitespace-nowrap">
                            {legend.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Top Clubs */}
                  <div className="mb-6">
                    <h4 className={`text-sm font-semibold mb-3 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Top Clubs
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {sport.topClubs.map((club, idx) => (
                        <span 
                          key={idx} 
                          className={`text-xs px-3 py-1 rounded-full ${
                            isDarkMode 
                              ? 'bg-white/10 text-gray-300' 
                              : 'bg-black/10 text-gray-700'
                          }`}
                        >
                          {club}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link
                    to={`/sports/${sport.name.toLowerCase().replace(/\s+/g, '-').replace('&', '')}`}
                    className={`w-full flex items-center justify-center space-x-2 py-4 rounded-2xl font-semibold transition-all duration-300 group/btn ${
                      isDarkMode
                        ? 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500'
                        : 'bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500'
                    } text-white shadow-lg hover:shadow-xl`}
                  >
                    <span>Explore {sport.name}</span>
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>

                {/* Hover Effect Overlay */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-orange-500/5 to-red-500/5' 
                    : 'bg-gradient-to-r from-blue-500/5 to-cyan-400/5'
                }`}></div>
              </motion.div>
            ))}
          </div>

          {/* No Results */}
          {filteredSports.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Trophy className={`w-20 h-20 mx-auto mb-6 ${
                isDarkMode ? 'text-gray-600' : 'text-gray-400'
              }`} />
              <h3 className={`text-2xl font-bold mb-4 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                No sports found
              </h3>
              <p className={isDarkMode ? 'text-gray-500' : 'text-gray-500'}>
                Try adjusting your search or filter criteria
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
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
              Don't see your sport? We're always expanding!
            </h3>
            <p className={`text-xl mb-8 max-w-2xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Request new sports, suggest improvements, or join our community to help shape the future of SportsHub
            </p>
            
            <button className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-300 ${
              isDarkMode
                ? 'bg-white text-orange-600 hover:bg-gray-100'
                : 'bg-black text-blue-400 hover:bg-gray-900'
            }`}
            onClick={()=>{setRequestedField(true)}}
            >
              Request New Sport
            </button>
            <br></br>
            <form onSubmit={(e)=>{e.preventDefault();setRequestedField(false);showCustomToast("success","your suggestion was submitted successfullly");}} className={`${(RequestedField)?(`block`):(`hidden`)} mt-2`}>
            <input required={true} type="text" placeholder='Enter your suggestion' className="w-full sm:w-auto border-2 border-orange-500 p-2 rounded-2xl"></input>
            <button type="submit" className="p-2 border-2 m-2 border-orange-500 rounded-2xl">
              Submit
            </button>
           </form>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Sports;