import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, User, MessageSquare } from 'lucide-react';
import { showCustomToast } from '../helper/CustomToast';

const ContactUs = ({ isDarkMode }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      showCustomToast("error", "Please fix the errors in the form");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const res = await response.json();
      if (response.ok) {
        showCustomToast("success", res.data.msg + " redirecting...");
        setFormData({ name: '', email: '', message: '' });

        setTimeout(() => {
          // window.location.href = '/';
        }, 2000);
      } else {
        showCustomToast("error", res.message || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error('Error sending message:', error);
      showCustomToast("error", "Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`${isDarkMode ? 'bg-transparent text-white' : 'bg-transparent text-black'} min-h-screen pt-30 py-16 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Contact <span className={isDarkMode ? 'text-orange-400' : 'text-blue-500'}>SportsHub</span>
          </h2>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
            We'd love to hear from you! Whether you have a question about features, trials, pricing, or anything else.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-1">
          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className={`p-6 md:p-8 rounded-2xl shadow-lg ${isDarkMode ? 'bg-gray-900 border border-gray-800' : 'bg-gray-50 border border-gray-200'}`}
          >
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <MessageSquare className={isDarkMode ? 'text-orange-400' : 'text-blue-500'} size={24} />
              Send us a message
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block mb-2 font-medium text-sm">
                  <User size={16} className="inline mr-1" /> Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className={`w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 ${errors.name
                    ? 'border-red-500 focus:ring-red-500'
                    : isDarkMode
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-orange-500'
                      : 'bg-white border-gray-300 text-black placeholder-gray-500 focus:ring-blue-500'
                    }`}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block mb-2 font-medium text-sm">
                  <Mail size={16} className="inline mr-1" /> Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  className={`w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 ${errors.email
                    ? 'border-red-500 focus:ring-red-500'
                    : isDarkMode
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-orange-500'
                      : 'bg-white border-gray-300 text-black placeholder-gray-500 focus:ring-blue-500'
                    }`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block mb-2 font-medium text-sm">
                  <MessageSquare size={16} className="inline mr-1" /> Your Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="5"
                  placeholder="Write your message here..."
                  className={`w-full px-4 py-3 rounded-lg border resize-none transition-all focus:outline-none focus:ring-2 ${errors.message
                    ? 'border-red-500 focus:ring-red-500'
                    : isDarkMode
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-orange-500'
                      : 'bg-white border-gray-300 text-black placeholder-gray-500 focus:ring-blue-500'
                    }`}
                />
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 rounded-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-2 ${isSubmitting
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
