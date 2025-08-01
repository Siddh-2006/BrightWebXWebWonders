import React, { useState } from 'react';
import { Mail, Send, User, MessageSquare } from 'lucide-react';
import { showCustomToast } from '../helper/CustomToast';
import { ToastContainer } from 'react-toastify';

const ContactUs = ({ isDarkMode }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    else if (formData.name.trim().length < 2) newErrors.name = 'Name must be at least 2 characters';

    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';

    if (!formData.message.trim()) newErrors.message = 'Message is required';
    else if (formData.message.trim().length < 10) newErrors.message = 'Message must be at least 10 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      showCustomToast("success", "Thanks for contacting us! We’ll get back to you soon.");
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1200);
  };

  return (
    <div className={`${isDarkMode ? 'text-white' : 'text-black'} min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-4">
            Contact <span className={isDarkMode ? 'bg-gradient-to-r from-orange-400 to-orange-700 bg-clip-text text-transparent' : 'bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent'}>SportsHub</span>
          </h2>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
            We'd love to hear from you! Whether it's feedback, feature suggestions, or questions.
          </p>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className={`p-6 md:p-8 rounded-2xl shadow-lg space-y-6 ${
            isDarkMode
              ? 'bg-gray-900/30 border border-gray-800'
              : 'bg-white border border-gray-200'
          }`}
        >
          <h3 className="text-2xl font-semibold flex items-center gap-2 mb-5">
            <MessageSquare className={isDarkMode ? 'text-orange-400' : 'text-blue-500'} />
            Send us a message
          </h3>

          {/* Name Field */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              <User size={16} className="inline mr-1" /> Full Name
            </label>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your name"
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all ${
                errors.name
                  ? 'border-red-500 focus:ring-red-500'
                  : isDarkMode
                  ? 'bg-gray-800/30 border-gray-700 text-white placeholder-gray-400 focus:ring-orange-500'
                  : 'bg-gray-50 border-gray-300 text-black placeholder-gray-500 focus:ring-blue-500'
              }`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Email Field */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              <Mail size={16} className="inline mr-1" /> Email
            </label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="you@example.com"
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all ${
                errors.email
                  ? 'border-red-500 focus:ring-red-500'
                  : isDarkMode
                  ? 'bg-gray-800/30 border-gray-700 text-white placeholder-gray-400 focus:ring-orange-500'
                  : 'bg-gray-50 border-gray-300 text-black placeholder-gray-500 focus:ring-blue-500'
              }`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Message Field */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              <MessageSquare size={16} className="inline mr-1" /> Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows="5"
              placeholder="Type your message here..."
              className={`w-full px-4 py-3 rounded-lg border resize-none focus:outline-none focus:ring-2 transition-all ${
                errors.message
                  ? 'border-red-500 focus:ring-red-500'
                  : isDarkMode
                  ? 'bg-gray-800/30 border-gray-700 text-white placeholder-gray-400 focus:ring-orange-500'
                  : 'bg-gray-50 border-gray-300 text-black placeholder-gray-500 focus:ring-blue-500'
              }`}
            />
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 rounded-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-2 ${
              isSubmitting
                ? 'opacity-70 cursor-not-allowed'
                : isDarkMode
                ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white shadow-lg hover:shadow-orange-500/25'
                : 'bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white shadow-lg hover:shadow-blue-500/25'
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Sending...
              </>
            ) : (
              <>
                <Send size={18} />
                Send Message
              </>
            )}
          </button>
        </form>
      </div>

      {/* Toast container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        pauseOnHover
        draggable
      />
    </div>
  );
};

export default ContactUs;
