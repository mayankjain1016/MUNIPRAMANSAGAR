import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  coverImage: {
    type: String,
    required: true
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    caption: {
      type: String
    }
  }],
  isPublished: {
    type: Boolean,
    default: true
  },
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const Gallery = mongoose.model('Gallery', gallerySchema);

export default Gallery;
