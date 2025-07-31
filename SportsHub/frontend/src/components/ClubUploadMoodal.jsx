import React, { useState } from 'react';

export default function UploadModal({ isOpen, onClose }) {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [vlogUrl, setVlogUrl] = useState('');
  const [photos, setPhotos] = useState([]);
  const [reels, setReels] = useState([]);

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
    reels.forEach(reel => formData.append('reel', reel));

    const response = await fetch('/upload', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      alert('Post created successfully!');
      onClose();
    } else {
      alert('Failed to create post.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg relative">
        <h2 className="text-xl font-semibold mb-4">Create New Post</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Text</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows="3"
              className="w-full border rounded px-3 py-2"
            ></textarea>
          </div>

          <div>
            <label className="block mb-1 font-medium">Vlog URL</label>
            <input
              type="url"
              value={vlogUrl}
              onChange={(e) => setVlogUrl(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Photos (max 5)</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setPhotos([...e.target.files].slice(0, 5))}
              className="w-full"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Reels (max 5)</label>
            <input
              type="file"
              accept="video/*"
              multiple
              onChange={(e) => setReels([...e.target.files].slice(0, 5))}
              className="w-full"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
