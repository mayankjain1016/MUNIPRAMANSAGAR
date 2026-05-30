import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  excerpt: {
    type: String
  },
  image: {
    type: String
  },
  category: {
    type: String,
    enum: ['general', 'event', 'announcement', 'media'],
    default: 'general'
  },
  date: {
    type: Date,
    default: Date.now
  },
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

const News = mongoose.model('News', newsSchema);

export default News;
