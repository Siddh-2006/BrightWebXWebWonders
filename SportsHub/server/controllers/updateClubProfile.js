const Club = require('../models/club-model');
const cloudinary = require('../config/cloudinary');
const uploadToCloudinary = require('../utils/uploadToCloudinary');

const editClub = async (req, res) => {
  try {
    const { clubId } = req.params;

    const club = await Club.findById(clubId);
    if (!club) return res.status(404).json({ message: 'Club not found' });

    // ✅ Define fields that can be updated
    const allowedFields = [
      'name','description', 'sports', 'officialEmail',
      'location', 'foundedYear', 'socialLinks',
      'achievements', 'contactNumber', 'website', 'performance'
    ];

    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        try {
          updates[field] = JSON.parse(req.body[field]); // handles object/array fields
        } catch {
          updates[field] = req.body[field]; // fallback to string fields
        }
      }
    }

    // ✅ Handle logo upload if file provided
    if (req.file) {
      // Delete old logo from Cloudinary (optional but clean)
      if (club.logo?.includes('cloudinary.com')) {
        const publicId = club.logo.split('/').pop().split('.')[0]; // crude public ID extraction
        await cloudinary.uploader.destroy(`club_logos/${publicId}`);
      }

      // Upload new logo from buffer
      const logoUrl = await uploadToCloudinary(req.file.buffer, 'club_logos');
      updates.logo = logoUrl;
    }

    // ✅ Update the club
    const updatedClub = await Club.findByIdAndUpdate(clubId, updates, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      message: 'Club profile updated successfully',
      club: updatedClub,
    });

  } catch (error) {
    // console.error('Error editing club:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

module.exports = { editClub };
