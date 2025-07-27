const mongoose = require('mongoose');
const groundSchema = new mongoose.Schema({
  name: String,
  logo: String,
  photos_of_ground: [String],
  sport: [String],
  money_to_book: String,
  timing: String,
  how_old: Number,
  contact: {
    number: String,
    email: String,
    social_media: {
      facebook: String,
      instagram: String,
      linkedin: String,
      youtube: String
    }
  },
  important_data_to_be_shown: String
});


module.exports = mongoose.model('Ground', groundSchema);