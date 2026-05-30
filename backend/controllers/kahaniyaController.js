import Kahaniya from '../models/Kahaniya.js';

// Extract YouTube video ID from URL
const extractVideoId = (url) => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /^([a-zA-Z0-9_-]{11})$/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
};

// Get all active kahaniya videos
export const getAllKahaniya = async (req, res) => {
  try {
    const videos = await Kahaniya.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all kahaniya (admin)
export const getAllKahaniyaAdmin = async (req, res) => {
  try {
    const videos = await Kahaniya.find().sort({ order: 1, createdAt: -1 });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new kahaniya video
export const createKahaniya = async (req, res) => {
  try {
    const { title, description, youtubeUrl, order } = req.body;
    
    const videoId = extractVideoId(youtubeUrl);
    if (!videoId) {
      return res.status(400).json({ message: 'Invalid YouTube URL' });
    }

    const kahaniya = new Kahaniya({
      title,
      description,
      youtubeUrl,
      videoId,
      order: order || 0
    });

    await kahaniya.save();
    res.status(201).json(kahaniya);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update kahaniya video
export const updateKahaniya = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, youtubeUrl, order, isActive } = req.body;
    
    const updateData = { title, description, order, isActive };
    
    if (youtubeUrl) {
      const videoId = extractVideoId(youtubeUrl);
      if (!videoId) {
        return res.status(400).json({ message: 'Invalid YouTube URL' });
      }
      updateData.youtubeUrl = youtubeUrl;
      updateData.videoId = videoId;
    }

    const kahaniya = await Kahaniya.findByIdAndUpdate(id, updateData, { new: true });
    
    if (!kahaniya) {
      return res.status(404).json({ message: 'Video not found' });
    }

    res.json(kahaniya);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete kahaniya video
export const deleteKahaniya = async (req, res) => {
  try {
    const { id } = req.params;
    const kahaniya = await Kahaniya.findByIdAndDelete(id);
    
    if (!kahaniya) {
      return res.status(404).json({ message: 'Video not found' });
    }

    res.json({ message: 'Video deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
