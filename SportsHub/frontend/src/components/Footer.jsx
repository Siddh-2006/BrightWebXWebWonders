import React from 'react';
import { Link } from 'react-router';
import { Trophy, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Linkedin } from 'lucide-react';

const Footer = ({ isDarkMode }) => {
  const footerSections = [
    {
      title: 'Platform',
      links: [
        { name: 'Sports', href: '/sports' },
        { name: 'Live Matches', href: '/live' },
        { name: 'AI Guru', href: '/ai-guru' },
        { name: 'Clubs', href: '/club' },
        // { name: 'Grounds', href: '/grounds' }
      ]
    },
    {
      title: 'For Athletes',
      links: [
        { name: 'Create Profile', href: '/profile' },
        { name: 'Find Clubs', href: '/club' },
        { name: 'Training Programs', href: '/training' },
        { name: 'Competitions', href: '/competitions' },
        { name: 'Community', href: '/community' }
      ]
    },
    {
      title: 'For Clubs',
      links: [
        { name: 'Club Registration', href: '/club-register' },
        { name: 'Find Players', href: '/find-players' },
        { name: 'Manage Teams', href: '/manage-teams' },
        { name: 'Schedule Matches', href: '/schedule' },
        { name: 'Analytics', href: '/analytics' }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '/help' },
        { name: 'Contact Us', href: '/contact' },
        { name: 'Privacy Policy', href: '/privacy-policy' },
        { name: 'Terms of Service', href: '/terms-and-conditon' },
        { name: 'FAQ', href: '/faq' }
      ]
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', color: 'hover:text-blue-500' },
    { icon: Twitter, href: '#', color: 'hover:text-sky-400' },
    { icon: Instagram, href: '#', color: 'hover:text-pink-500' },
    { icon: Youtube, href: '#', color: 'hover:text-red-500' },
    { icon: Linkedin, href: '#', color: 'hover:text-blue-600' }
  ];

  return (
    <footer className={isDarkMode ? 'bg-black/50 text-white' : 'bg-gray-900 text-white'}>
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-6">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                isDarkMode
                  ? 'bg-gradient-to-r from-orange-500 to-red-600'
                  : 'bg-gradient-to-r from-blue-500 to-cyan-400'
              }`}>
                <Trophy className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">
                  Sports<span className={isDarkMode ? 'text-orange-400' : 'text-cyan-400'}>Hub</span>
                </h3>
                <p className="text-sm text-gray-400">Digital Sports Platform</p>
              </div>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Empowering athletes with digital identity and AI coaching. Join the revolution in sports technology.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail className="w-4 h-4" />
                <span className="text-sm">hello@sportshub.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div key={index}>
      {/* Small Screens: Dropdown */}
      <div className="sm:hidden">
        <button
          onClick={() => setOpen(!open)}
          className="flex justify-between w-full text-left text-lg font-semibold mb-3 text-white"
        >
          {section.title}
          <span>{open ? "▲" : "▼"}</span>
        </button>
        {open && (
          <ul className="space-y-2 mb-6">
            {section.links.map((link, linkIndex) => (
              <li key={linkIndex}>
                <Link
                  to={link.href}
                  className="text-gray-400 hover:text-white text-sm block"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Large Screens: Always Visible */}
      <div className="hidden sm:block">
        <h4 className="text-lg font-semibold mb-6">{section.title}</h4>
        <ul className="space-y-3">
          {section.links.map((link, linkIndex) => (
            <li key={linkIndex}>
              <Link
                to={link.href}
                className="text-gray-400 hover:text-white text-sm"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
})}

        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="max-w-md mx-auto text-center lg:text-left lg:max-w-none lg:mx-0">
            <h4 className="text-xl font-semibold mb-4">Stay Updated</h4>
            <p className="text-gray-400 mb-6">
              Get the latest news, updates, and exclusive content delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                  isDarkMode
                    ? 'bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-orange-500'
                    : 'bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:border-blue-500'
                } focus:outline-none`}
              />
              <button className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap ${
                isDarkMode
                  ? 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500'
                  : 'bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500'
              } text-white`}>
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Copyright */}
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 SportsHub. All rights reserved. Built with passion for athletes worldwide.
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm mr-2">Follow us:</span>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={`text-gray-400 ${social.color} transition-colors duration-200 p-2 hover:bg-gray-800 rounded-lg`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className={`w-full h-1 ${
        isDarkMode
          ? 'bg-gradient-to-r from-orange-500 via-red-500 to-purple-600'
          : 'bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500'
      }`}></div>
    </footer>
  );
};

export default Footer;