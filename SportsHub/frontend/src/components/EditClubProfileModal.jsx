import React, { useState } from 'react';

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
  }, [club]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'logo') {
      setForm((prev) => ({ ...prev, logo: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onSave(form);
    setLoading(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className={`w-full max-w-lg rounded-2xl shadow-lg p-8 relative ${isDarkMode ? 'bg-white text-orange-600' : 'bg-white text-orange-600'}`}
        style={{ background: 'linear-gradient(135deg, #ff6600 0%, #ffb347 100%)', color: '#fff' }}>
        <button onClick={onClose} className="absolute top-4 right-4 text-white text-2xl font-bold">&times;</button>
        <h2 className="text-2xl font-bold mb-6 text-white">Edit Club Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" value={form.name} onChange={handleChange} required placeholder="Club Name" className="w-full p-3 rounded-lg bg-white/80 text-orange-700 placeholder-orange-400 focus:outline-none" />
          <input name="foundedYear" value={form.foundedYear} onChange={handleChange} required placeholder="Founded Year" className="w-full p-3 rounded-lg bg-white/80 text-orange-700 placeholder-orange-400 focus:outline-none" />
          <input name="officialEmail" value={form.officialEmail} onChange={handleChange} required placeholder="Official Email" className="w-full p-3 rounded-lg bg-white/80 text-orange-700 placeholder-orange-400 focus:outline-none" />
          <input name="contactNumber" value={form.contactNumber} onChange={handleChange} required placeholder="Contact Number" className="w-full p-3 rounded-lg bg-white/80 text-orange-700 placeholder-orange-400 focus:outline-none" />
          <input name="website" value={form.website} onChange={handleChange} placeholder="Website" className="w-full p-3 rounded-lg bg-white/80 text-orange-700 placeholder-orange-400 focus:outline-none" />
          <input name="logo" type="file" accept="image/*" onChange={handleChange} className="w-full p-3 rounded-lg bg-white/80 text-orange-700 focus:outline-none" />
          <textarea name="description" value={form.description} onChange={handleChange} required placeholder="Description" className="w-full p-3 rounded-lg bg-white/80 text-orange-700 placeholder-orange-400 focus:outline-none" />
          <button type="submit" disabled={loading} className="w-full py-3 rounded-lg font-bold text-lg bg-white text-orange-600 hover:bg-orange-100 transition-all">
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditClubProfileModal;
