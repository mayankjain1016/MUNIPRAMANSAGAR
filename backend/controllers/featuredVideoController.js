import FeaturedVideo from '../models/FeaturedVideo.js';

// Get all featured videos (public)
export const getAllFeaturedVideos = async (req, res) => {
  try {
    const videos = await FeaturedVideo.find({ isActive: true }).sort({ position: 1 });
    res.json(videos);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get single featured video by position (public)
export const getFeaturedVideoByPosition = async (req, res) => {
  try {
    const { position } = req.params;
    const video = await FeaturedVideo.findOne({ position: parseInt(position), isActive: true });
    if (!video) {
      return res.status(404).json({ message: 'Featured video not found' });
    }
    res.json(video);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Create or update featured video (admin)
export const upsertFeaturedVideo = async (req, res) => {
  try {
    const { position, title, youtubeUrl } = req.body;

    if (!position || !title || !youtubeUrl) {
      return res.status(400).json({ message: 'Position, title, and youtubeUrl are required' });
    }

    if (position !== 1 && position !== 2) {
      return res.status(400).json({ message: 'Position must be 1 or 2' });
    }

    // Extract video ID from URL
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    ];
    let videoId = null;
    for (const pattern of patterns) {
      const match = youtubeUrl.match(pattern);
      if (match) {
        videoId = match[1];
        break;
      }
    }

    if (!videoId) {
      return res.status(400).json({ message: 'Invalid YouTube URL' });
    }

    const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    const video = await FeaturedVideo.findOneAndUpdate(
      { position },
      {
        position,
        title,
        youtubeUrl,
        videoId,
        thumbnail,
        isActive: req.body.isActive !== undefined ? req.body.isActive : true
      },
      { new: true, upsert: true }
    );

    res.json(video);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Toggle featured video active status (admin)
export const toggleFeaturedVideo = async (req, res) => {
  try {
    const { position } = req.params;
    
    const video = await FeaturedVideo.findOne({ position: parseInt(position) });
    if (!video) {
      return res.status(404).json({ message: 'Featured video not found' });
    }

    video.isActive = !video.isActive;
    await video.save();

    res.json(video);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
