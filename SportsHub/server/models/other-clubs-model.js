const mongoose = require('mongoose');

const otherClubSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: String,
  description: String,
  founded: Number,
  type: {
    type: String,
    enum: ['Private', 'Public','Academy']
  },
  sports: [String],
  website: String,
  logo: String,
  contact: {
    number: String,
    email: String,
    social_media: {
      facebook: String,
      instagram: String,
      linkedin: String,
      youtube: String
    }
  }
});

module.exports = mongoose.model('OtherClub', otherClubSchema);