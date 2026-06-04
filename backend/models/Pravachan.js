import mongoose from 'mongoose';

const pravachanSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  videoUrl: {
    type: String,
    required: true,
    trim: true
  },
  thumbnail: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['navin', 'swadhyay', 'samast', 'mala']
  },
  description: {
    type: String,
    trim: true
  },
  duration: {
    type: String
  },
  views: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isLive: {
    type: Boolean,
    default: false
  },
  liveVideoUrl: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Pravachan', pravachanSchema);
