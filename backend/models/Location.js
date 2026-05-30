import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true
  },
  addressEnglish: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Location = mongoose.model('Location', locationSchema);

export default Location;
