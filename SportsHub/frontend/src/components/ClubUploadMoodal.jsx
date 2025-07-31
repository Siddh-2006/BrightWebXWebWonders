import React, { useState } from 'react';
import { X, Upload, Image, Video, Link as LinkIcon, Type, FileText } from 'lucide-react';

export default function ClubUploadModal({ isOpen, onClose, club, isDarkMode, onPostSuccess }) {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [vlogUrl, setVlogUrl] = useState('');
  const [photos, setPhotos] = useState([]);
  const [reel, setReel] = useState([]); // field name should be 'reel' to match backend

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Title is required.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('text', text);
    formData.append('vlogUrl', vlogUrl);
    photos.forEach(photo => formData.append('photos', photo));
    reel.forEach(video => formData.append('reel', video));

    try {
      const response = await fetch('http://localhost:3000/posts/add', {
        method: 'POST',
        body: formData,
        credentials: 'include', // send cookies for auth
      });

      if (response.ok) {
        alert('Post created successfully!');
        if (onPostSuccess) onPostSuccess(); // let parent refresh club details
        onClose();
        // Reset form
        setTitle('');
        setText('');
        setVlogUrl('');
        setPhotos([]);
        setReel([]);
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to create post.');
      }
    } catch (err) {
      alert('Failed to create post.');
      console.log('Error:', err);
    }
  };

  if (!isOpen) return null;

  const accentColor = isDarkMode ? 'text-orange-500' : 'text-blue-500';
  const accentBg = isDarkMode ? 'bg-orange-500' : 'bg-blue-500';
  const accentHover = isDarkMode ? 'hover:bg-orange-600' : 'hover:bg-blue-600';
  const cardBg = isDarkMode ? 'bg-gray-800/95' : 'bg-white/95';
  const inputBg = isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50';
  const inputBorder = isDarkMode ? 'border-gray-600' : 'border-gray-300';
  const inputFocus = isDarkMode ? 'focus:border-orange-500 focus:ring-orange-500/20' : 'focus:border-blue-500 focus:ring-blue-500/20';
  const textColor = isDarkMode ? 'text-white' : 'text-gray-900';
  const labelColor = isDarkMode ? 'text-gray-300' : 'text-gray-700';

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4">
      <div className={`${cardBg} backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-2xl relative border ${isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'} max-h-[90vh] overflow-y-auto`}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
            isDarkMode 
              ? 'hover:bg-gray-700/50 text-gray-400 hover:text-white' 
              : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-8">
          <h2 className={`text-3xl font-bold ${accentColor} mb-2 flex items-center`}>
            <Upload className="w-8 h-8 mr-3" />
            Create New Post
          </h2>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
            Share your club's latest updates, achievements, and moments
          </p>
        </div>

        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
          {/* Title Field */}
          <div className="space-y-2">
            <label className={`block font-semibold ${labelColor} flex items-center`}>
              <Type className="w-4 h-4 mr-2" />
              Post Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Enter an engaging title for your post..."
              className={`w-full ${inputBg} ${inputBorder} ${inputFocus} ${textColor} rounded-xl px-4 py-3 transition-all duration-200 focus:outline-none focus:ring-2 placeholder-gray-400`}
            />
          </div>

          {/* Text Content */}
          <div className="space-y-2">
            <label className={`block font-semibold ${labelColor} flex items-center`}>
              <FileText className="w-4 h-4 mr-2" />
              Description
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows="4"
              placeholder="Tell your story, share updates, or describe your achievements..."
              className={`w-full ${inputBg} ${inputBorder} ${inputFocus} ${textColor} rounded-xl px-4 py-3 transition-all duration-200 focus:outline-none focus:ring-2 placeholder-gray-400 resize-none`}
            />
          </div>

          {/* Vlog URL */}
          <div className="space-y-2">
            <label className={`block font-semibold ${labelColor} flex items-center`}>
              <LinkIcon className="w-4 h-4 mr-2" />
              Vlog URL
            </label>
            <input
              type="url"
              value={vlogUrl}
              onChange={(e) => setVlogUrl(e.target.value)}
              placeholder="https://youtube.com/watch?v=..."
              className={`w-full ${inputBg} ${inputBorder} ${inputFocus} ${textColor} rounded-xl px-4 py-3 transition-all duration-200 focus:outline-none focus:ring-2 placeholder-gray-400`}
            />
            <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              Paste a YouTube URL or direct video link
            </p>
          </div>

          {/* Photos Upload */}
          <div className="space-y-2">
            <label className={`block font-semibold ${labelColor} flex items-center`}>
              <Image className="w-4 h-4 mr-2" />
              Photos (max 5)
            </label>
            <div className={`relative ${inputBg} ${inputBorder} rounded-xl p-6 transition-all duration-200 hover:border-opacity-60`}>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setPhotos([...e.target.files].slice(0, 5))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="text-center">
                <Image className={`w-12 h-12 mx-auto mb-3 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                <p className={`${textColor} font-medium mb-1`}>
                  {photos.length > 0 ? `${photos.length} file(s) selected` : 'Click to upload photos'}
                </p>
                <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  JPG, PNG, GIF up to 10MB each
                </p>
              </div>
            </div>
            {photos.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {Array.from(photos).map((file, idx) => (
                  <span key={idx} className={`text-xs px-2 py-1 rounded-full ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'}`}>
                    {file.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Reels Upload */}
          <div className="space-y-2">
            <label className={`block font-semibold ${labelColor} flex items-center`}>
              <Video className="w-4 h-4 mr-2" />
              Reels (max 5)
            </label>
            <div className={`relative ${inputBg} ${inputBorder} rounded-xl p-6 transition-all duration-200 hover:border-opacity-60`}>
              <input
                type="file"
                accept="video/*"
                multiple
                onChange={(e) => setReel([...e.target.files].slice(0, 5))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="text-center">
                <Video className={`w-12 h-12 mx-auto mb-3 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                <p className={`${textColor} font-medium mb-1`}>
                  {reel.length > 0 ? `${reel.length} file(s) selected` : 'Click to upload videos'}
                </p>
                <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  MP4, MOV, AVI up to 50MB each
                </p>
              </div>
            </div>
            {reel.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {Array.from(reel).map((file, idx) => (
                  <span key={idx} className={`text-xs px-2 py-1 rounded-full ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'}`}>
                    {file.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200/20">
            <button
              type="button"
              onClick={onClose}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                isDarkMode
                  ? 'bg-gray-700/50 hover:bg-gray-700 text-gray-300 hover:text-white border border-gray-600'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 border border-gray-300'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-8 py-3 ${accentBg} ${accentHover} text-white rounded-xl font-medium transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isDarkMode ? 'focus:ring-orange-500' : 'focus:ring-blue-500'
              } shadow-lg`}
            >
              Create Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}