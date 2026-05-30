import mongoose from 'mongoose';

const featuredVideoSchema = new mongoose.Schema(
  {
    position: {
      type: Number,
      enum: [1, 2],
      unique: true,
      required: true,
      description: 'Position on homepage (1 or 2)'
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    youtubeUrl: {
      type: String,
      required: true,
      trim: true
    },
    videoId: {
      type: String,
      required: true,
      trim: true
    },
    thumbnail: {
      type: String,
      default: null
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

// Auto-generate videoId from URL if not provided
featuredVideoSchema.pre('save', function(next) {
  if (this.youtubeUrl && !this.videoId) {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    ];
    for (const pattern of patterns) {
      const match = this.youtubeUrl.match(pattern);
      if (match) {
        this.videoId = match[1];
        break;
      }
    }
  }
  
  // Auto-generate thumbnail if not provided
  if (this.videoId && !this.thumbnail) {
    this.thumbnail = `https://img.youtube.com/vi/${this.videoId}/maxresdefault.jpg`;
  }
  
  next();
});

export default mongoose.model('FeaturedVideo', featuredVideoSchema);
