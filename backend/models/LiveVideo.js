import mongoose from 'mongoose';

const liveVideoSchema = new mongoose.Schema({
  isLive: {
    type: Boolean,
    default: false,
  },
  videoUrl: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

export default mongoose.model('LiveVideo', liveVideoSchema);
