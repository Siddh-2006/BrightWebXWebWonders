import React, { useState } from 'react';
import { Link } from 'react-router';
import { Trophy, Facebook, Twitter, Instagram, Youtube, Linkedin } from 'lucide-react';

const Footer = ({ isDarkMode }) => {
  // Minimal footer links
  const footerLinks = [
    { name: 'Home', href: '/' },
    { name: 'Sports', href: '/sports' },
    { name: 'Live', href: '/live' },
    { name: 'Clubs', href: '/clubs' },
    { name: 'Contact', href: '/contact' }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', color: 'hover:text-blue-500' },
    { icon: Twitter, href: '#', color: 'hover:text-sky-400' },
    { icon: Instagram, href: '#',  color: 'hover:text-pink-500' },
    { icon: Youtube, href: '#', color: 'hover:text-red-500' },
    { icon: Linkedin, href: '#', color: 'hover:text-blue-600' }
  ];

  const [showContact, setShowContact] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setShowContact(false);
      setEmail('');
      setMessage('');
    }, 2000);
  };


  return (
    <footer className={isDarkMode ? 'bg-black/80 text-white' : 'bg-gray-900 text-white'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
          {/* Brand Section */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link to="/" className="flex items-center space-x-3 mb-2">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg ${
                isDarkMode
                  ? 'bg-gradient-to-r from-orange-500 to-red-600'
                  : 'bg-gradient-to-r from-blue-500 to-cyan-400'
              }`}>
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">
                Sports<span className={isDarkMode ? 'text-orange-400' : 'text-cyan-400'}>Hub</span>
              </span>
            </Link>
            <span className="text-xs text-gray-400 text-center md:text-left">Empowering athletes with digital identity and AI coaching.</span>
          </div>

          {/* Footer Links */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-semibold text-base mb-1">Quick Links</span>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              {footerLinks.map((link, idx) => (
                <Link
                  key={idx}
                  to={link.href}
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-semibold text-base mb-1">Follow Us</span>
            <div className="flex gap-2">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={`text-gray-400 ${social.color} transition-colors duration-200 p-2 hover:bg-gray-800 rounded-lg`}
                  aria-label={social.icon.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Stay Connected Button & Slide-out */}
          <div className="flex flex-col items-center md:items-end w-full">
            <button
              onClick={() => setShowContact((v) => !v)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap mb-2 shadow ${
                isDarkMode
                  ? 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500'
                  : 'bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500'
              } text-white`}
            >
              {showContact ? 'Close' : 'Stay Connected'}
            </button>
            <div
              className={`overflow-hidden transition-all duration-500 ${
                showContact ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
              } w-full bg-black/80 rounded-lg p-4 ${isDarkMode ? 'border border-orange-500/30' : 'border border-blue-500/30'} shadow-lg`}
              style={{ pointerEvents: showContact ? 'auto' : 'none' }}
            >
              <form onSubmit={handleContactSubmit} className="flex flex-col gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Your email"
                  required
                  className="px-3 py-2 rounded bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none"
                />
                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Your message"
                  required
                  className="px-3 py-2 rounded bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none resize-none"
                  rows={3}
                />
                <button
                  type="submit"
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap ${
                    isDarkMode
                      ? 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500'
                      : 'bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500'
                  } text-white`}
                  disabled={sent}
                >
                  {sent ? 'Sent!' : 'Send'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-2">
            <div className="text-gray-400 text-xs md:text-sm text-center md:text-left">
              © 2025 SportsHub. All rights reserved. Built with passion for athletes worldwide.
            </div>
          </div>
        </div>
      </div>
      <div className={`w-full h-1 ${
        isDarkMode
          ? 'bg-gradient-to-r from-orange-500 via-red-500 to-purple-600'
          : 'bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500'
      }`}></div>
    </footer>
  );
};

export default Footer;