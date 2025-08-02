import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Building,
  Calendar,
  Mail,
  Phone,
  Globe,
  Upload,
  Image as ImageIcon,
  Edit3,
  Save,
  AlertCircle,
  Check
} from 'lucide-react';

const EditClubProfileModal = ({ isOpen, onClose, club, onSave, isDarkMode }) => {
  const [form, setForm] = useState({
    name: club?.name || '',
    description: club?.description || '',
    foundedYear: club?.foundedYear || '',
    officialEmail: club?.officialEmail || '',
    contactNumber: club?.contactNumber || '',
    website: club?.website || '',
    logo: null,
  });
  const [loading, setLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState(club?.logo || null);
  const [errors, setErrors] = useState({});

  React.useEffect(() => {
    setForm({
      name: club?.name || '',
      description: club?.description || '',
      foundedYear: club?.foundedYear || '',
      officialEmail: club?.officialEmail || '',
      contactNumber: club?.contactNumber || '',
      website: club?.website || '',
      logo: null,
    });
    setLogoPreview(club?.logo || null);
    setErrors({});
  }, [club]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    if (name === 'logo') {
      const file = files[0];
      setForm((prev) => ({ ...prev, logo: file }));
      
      // Create preview URL
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setLogoPreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.name.trim()) newErrors.name = 'Club name is required';
    if (!form.description.trim()) newErrors.description = 'Description is required';
    if (!form.foundedYear.trim()) newErrors.foundedYear = 'Founded year is required';
    if (!form.officialEmail.trim()) newErrors.officialEmail = 'Email is required';
    if (!form.contactNumber.trim()) newErrors.contactNumber = 'Contact number is required';
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (form.officialEmail && !emailRegex.test(form.officialEmail)) {
      newErrors.officialEmail = 'Please enter a valid email address';
    }
    
    // Year validation
    const currentYear = new Date().getFullYear();
    if (form.foundedYear && (form.foundedYear < 1800 || form.foundedYear > currentYear)) {
      newErrors.foundedYear = `Year must be between 1800 and ${currentYear}`;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      await onSave(form);
      onClose();
    } catch (error) {
      console.error('Error saving club:', error);
    } finally {
      setLoading(false);
    }
  };

  const inputFields = [
    {
      name: 'name',
      placeholder: 'Club Name',
      icon: Building,
      type: 'text',
      required: true
    },
    {
      name: 'foundedYear',
      placeholder: 'Founded Year',
      icon: Calendar,
      type: 'number',
      required: true
    },
    {
      name: 'officialEmail',
      placeholder: 'Official Email',
      icon: Mail,
      type: 'email',
      required: true
    },
    {
      name: 'contactNumber',
      placeholder: 'Contact Number',
      icon: Phone,
      type: 'tel',
      required: true
    },
    {
      name: 'website',
      placeholder: 'Website URL (optional)',
      icon: Globe,
      type: 'url',
      required: false
    }
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`relative w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-2xl ${
              isDarkMode
                ? 'bg-gray-900/95 backdrop-blur-md border border-white/10'
                : 'bg-white/95 backdrop-blur-md border border-black/10'
            } shadow-2xl`}
          >
            {/* Header */}
            <div className={`px-8 py-6 border-b ${
              isDarkMode ? 'border-white/10' : 'border-black/10'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    isDarkMode
                      ? 'bg-orange-500/20 border border-orange-500/30'
                      : 'bg-blue-500/20 border border-blue-500/30'
                  }`}>
                    <Edit3 className={`w-6 h-6 ${
                      isDarkMode ? 'text-orange-400' : 'text-blue-500'
                    }`} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Edit Club Profile</h2>
                    <p className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Update your club information
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                    isDarkMode
                      ? 'hover:bg-white/10 text-gray-400 hover:text-white'
                      : 'hover:bg-black/10 text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 overflow-y-auto max-h-[calc(90vh-140px)]">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Logo Upload Section */}
                <div className="space-y-4">
                  <label className="block text-sm font-medium">
                    Club Logo
                  </label>
                  <div className="flex items-center space-x-6">
                    <div className={`w-20 h-20 rounded-xl overflow-hidden border-2 border-dashed flex items-center justify-center ${
                      isDarkMode
                        ? 'border-white/20 bg-white/5'
                        : 'border-black/20 bg-black/5'
                    }`}>
                      {logoPreview ? (
                        <img
                          src={logoPreview}
                          alt="Logo preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ImageIcon className={`w-8 h-8 ${
                          isDarkMode ? 'text-gray-600' : 'text-gray-400'
                        }`} />
                      )}
                    </div>
                    <div className="flex-1">
                      <label className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg cursor-pointer transition-colors ${
                        isDarkMode
                          ? 'bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 border border-orange-500/30'
                          : 'bg-blue-500/20 text-blue-600 hover:bg-blue-500/30 border border-blue-500/30'
                      }`}>
                        <Upload className="w-4 h-4" />
                        <span>Upload Logo</span>
                        <input
                          name="logo"
                          type="file"
                          accept="image/*"
                          onChange={handleChange}
                          className="hidden"
                        />
                      </label>
                      <p className={`text-xs mt-1 ${
                        isDarkMode ? 'text-gray-500' : 'text-gray-500'
                      }`}>
                        PNG, JPG up to 5MB
                      </p>
                    </div>
                  </div>
                </div>

                {/* Input Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {inputFields.map((field) => (
                    <div key={field.name} className="space-y-2">
                      <label className="block text-sm font-medium">
                        {field.placeholder}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                      </label>
                      <div className="relative">
                        <field.icon className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`} />
                        <input
                          name={field.name}
                          type={field.type}
                          value={form[field.name]}
                          onChange={handleChange}
                          required={field.required}
                          placeholder={field.placeholder}
                          className={`w-full pl-11 pr-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 ${
                            errors[field.name]
                              ? 'border-red-500 focus:ring-red-500/20'
                              : isDarkMode
                              ? 'bg-white/5 border-white/10 text-white placeholder-gray-400 focus:border-orange-500/50 focus:ring-orange-500/20'
                              : 'bg-black/5 border-black/10 text-gray-900 placeholder-gray-500 focus:border-blue-500/50 focus:ring-blue-500/20'
                          }`}
                        />
                        {errors[field.name] && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <AlertCircle className="w-5 h-5 text-red-500" />
                          </div>
                        )}
                      </div>
                      {errors[field.name] && (
                        <p className="text-red-500 text-xs flex items-center space-x-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors[field.name]}</span>
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      required
                      placeholder="Tell us about your club..."
                      rows={4}
                      className={`w-full p-4 rounded-xl border transition-all focus:outline-none focus:ring-2 resize-none ${
                        errors.description
                          ? 'border-red-500 focus:ring-red-500/20'
                          : isDarkMode
                          ? 'bg-white/5 border-white/10 text-white placeholder-gray-400 focus:border-orange-500/50 focus:ring-orange-500/20'
                          : 'bg-black/5 border-black/10 text-gray-900 placeholder-gray-500 focus:border-blue-500/50 focus:ring-blue-500/20'
                      }`}
                    />
                    {errors.description && (
                      <div className="absolute right-3 top-3">
                        <AlertCircle className="w-5 h-5 text-red-500" />
                      </div>
                    )}
                  </div>
                  {errors.description && (
                    <p className="text-red-500 text-xs flex items-center space-x-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.description}</span>
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={onClose}
                    className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all ${
                      isDarkMode
                        ? 'bg-white/10 text-gray-300 hover:bg-white/20'
                        : 'bg-black/10 text-gray-700 hover:bg-black/20'
                    }`}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all flex items-center justify-center space-x-2 ${
                      loading
                        ? 'opacity-50 cursor-not-allowed'
                        : isDarkMode
                        ? 'bg-orange-500 hover:bg-orange-400 text-white'
                        : 'bg-blue-500 hover:bg-blue-400 text-white'
                    }`}
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        <span>Save Changes</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditClubProfileModal;