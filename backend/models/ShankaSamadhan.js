import mongoose from 'mongoose';

const shankaSamadhanSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['spiritual', 'moral', 'life', 'youth', 'family', 'general'],
    default: 'general'
  },
  slug: {
    type: String,
    unique: true
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  views: {
    type: Number,
    default: 0
  },
  isPopular: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const clipSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  videoUrl: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String
  },
  views: {
    type: Number,
    default: 0
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  isPopular: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const ShankaSamadhan = mongoose.model('ShankaSamadhan', shankaSamadhanSchema);
const ShankaSamadhanClip = mongoose.model('ShankaSamadhanClip', clipSchema);

export { ShankaSamadhan, ShankaSamadhanClip };
export default ShankaSamadhan;
