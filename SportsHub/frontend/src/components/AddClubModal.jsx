import React, { useState } from 'react';

const AddClubModal = ({ isOpen, onClose, onAdd, isDarkMode }) => {
  const [form, setForm] = useState({
    name: '',
    foundedYear: '',
    description: '',
    officialEmail: '',
    contactNumber: '',
    logo: null,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onAdd(form);
    setLoading(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className={`w-full max-w-lg rounded-2xl shadow-lg p-8 relative ${isDarkMode ? 'bg-white text-orange-600' : 'bg-white text-orange-600'}`}
        style={{ background: 'linear-gradient(135deg, #ff6600 0%, #ffb347 100%)', color: '#fff' }}>
        <button onClick={onClose} className="absolute top-4 right-4 text-white text-2xl font-bold">&times;</button>
        <h2 className="text-2xl font-bold mb-6 text-white">Add New Club</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" value={form.name} onChange={handleChange} required placeholder="Club Name *" className="w-full p-3 rounded-lg bg-white/80 text-orange-700 placeholder-orange-400 focus:outline-none" />
          <input name="foundedYear" value={form.foundedYear} onChange={handleChange} placeholder="Founded Year (Optional)" className="w-full p-3 rounded-lg bg-white/80 text-orange-700 placeholder-orange-400 focus:outline-none" />
          <input name="officialEmail" value={form.officialEmail} onChange={handleChange} placeholder="Official Email (Optional)" className="w-full p-3 rounded-lg bg-white/80 text-orange-700 placeholder-orange-400 focus:outline-none" />
          <input name="contactNumber" value={form.contactNumber} onChange={handleChange} placeholder="Contact Number (Optional)" className="w-full p-3 rounded-lg bg-white/80 text-orange-700 placeholder-orange-400 focus:outline-none" />
          <input name="logo" type="file" accept="image/*" onChange={handleChange} className="w-full p-3 rounded-lg bg-white/80 text-orange-700 placeholder-orange-400 focus:outline-none" />
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description (Optional)" className="w-full p-3 rounded-lg bg-white/80 text-orange-700 placeholder-orange-400 focus:outline-none" />
          <button type="submit" disabled={loading} className="w-full py-3 rounded-lg font-bold text-lg bg-white text-orange-600 hover:bg-orange-100 transition-all">
            {loading ? 'Adding...' : 'Add Club'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddClubModal;
