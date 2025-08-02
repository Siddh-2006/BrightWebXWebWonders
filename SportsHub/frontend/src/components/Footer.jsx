import React, { useState } from 'react';
import { Link } from 'react-router';
import {
  Trophy, Mail, Phone, MapPin,
  Facebook, Twitter, Instagram, Youtube, Linkedin
} from 'lucide-react';
import { ToastContainer } from 'react-toastify';
import { showCustomToast } from '../helper/CustomToast';

const Footer = ({ isDarkMode }) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const footerSections = [
    {
      title: 'Platform',
      links: [
        { name: 'Sports', href: '/sports' },
        { name: 'Live Matches', href: '/live' },
        { name: 'AI Guru', href: '/ai-guru' },
        { name: 'Clubs', href: '/club' },
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Contact Us', href: '/contact-us' },
        { name: 'Privacy Policy', href: '/privacy-policy' },
        { name: 'Terms and Condition', href: '/terms-and-condition' },
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

  const [openSections, setOpenSections] = useState({});

  const toggleSection = (index) => {
    setOpenSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleSubscribe = () => {
    const isValidEmail = /\S+@\S+\.\S+/.test(email);
    if (!isValidEmail) {
      setEmailError("Please enter a valid email");
      return;
    }
    setEmailError("");
    showCustomToast("success", "Thanks for subscribing to our newsletter");
    setEmail("");
  };

  return (
    <footer className={isDarkMode ? 'bg-black/50 text-white' : 'bg-gray-900 text-white'}>
      <div className="max-w-7xl mx-auto mt-5 px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">

          {/* Brand Section */}
          <div className="md:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-xl flex items-center justify-center ${isDarkMode
                ? 'bg-gradient-to-r from-orange-500 to-red-600'
                : 'bg-gradient-to-r from-blue-500 to-cyan-400'}`}>
                <Trophy className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg lg:text-xl font-bold">
                  Sports<span className={isDarkMode ? 'text-orange-400' : 'text-cyan-400'}>Hub</span>
                </h3>
                <p className="text-xs text-gray-400 hidden sm:block">Digital Sports Platform</p>
              </div>
            </Link>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed hidden md:block">
              Empowering athletes with digital identity and AI coaching.
            </p>
            <div className="space-y-2 text-xs lg:text-sm">
              <div className="flex items-center space-x-2 text-gray-400">
                <Mail className="w-3 h-3 lg:w-4 lg:h-4 flex-shrink-0" />
                <span className="truncate">support@sportshub.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Phone className="w-3 h-3 lg:w-4 lg:h-4 flex-shrink-0" />
                <span>+91 7879424006</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <MapPin className="w-3 h-3 lg:w-4 lg:h-4 flex-shrink-0" />
                <span>SVNIT, Surat</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index} className="lg:col-span-1">
              {/* Mobile Accordion */}
              <div className="lg:hidden">
                <button
                  onClick={() => toggleSection(index)}
                  className="flex justify-between items-center w-full text-left text-base font-semibold py-2 text-white border-b border-gray-700"
                >
                  {section.title}
                  <span className="text-sm">{openSections[index] ? "−" : "+"}</span>
                </button>
                {openSections[index] && (
                  <ul className="space-y-2 mt-3 pb-4">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link
                          to={link.href}
                          className="text-gray-400 hover:text-white text-sm block py-1"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Desktop View */}
              <div className="hidden lg:block">
                <h4 className="text-base font-semibold mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        to={link.href}
                        className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

          {/* Newsletter */}
          <div className="md:col-span-2 lg:col-span-1">
            <h4 className="text-base font-semibold mb-3">Stay Updated</h4>
            <p className="text-gray-400 text-sm mb-4">
              Get latest updates delivered to your inbox.
            </p>
            <div className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError("");
                }}
                className={`px-3 py-2 text-sm rounded-lg transition-all duration-300 ${
                  isDarkMode
                    ? "bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-orange-500"
                    : "bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
                } focus:outline-none`}
              />
              {emailError && (
                <p className="text-red-500 text-sm -mt-1">{emailError}</p>
              )}
              <button
                onClick={handleSubscribe}
                className={`px-4 py-2 text-sm rounded-lg font-medium transition-all duration-300 ${
                  isDarkMode
                    ? "bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500"
                    : "bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500"
                } text-white`}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
            <div className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
              © 2025 SportsHub. All rights reserved.
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-gray-400 text-xs mr-2 hidden sm:inline">Follow:</span>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={`text-gray-400 ${social.color} transition-colors duration-200 p-1.5 hover:bg-gray-800 rounded-md`}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Border */}
      <div className={`w-full h-0.5 ${isDarkMode
        ? 'bg-gradient-to-r from-orange-500 via-red-500 to-purple-600'
        : 'bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500'}`}></div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        closeOnClick
        pauseOnHover
        draggable
      />
    </footer>
  );
};

export default Footer;
