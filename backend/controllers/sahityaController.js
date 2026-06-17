import Sahitya from '../models/Sahitya.js';

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

// Get all active sahitya videos
export const getAllSahitya = async (req, res) => {
  try {
    const videos = await Sahitya.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all sahitya (admin)
export const getAllSahityaAdmin = async (req, res) => {
  try {
    const videos = await Sahitya.find().sort({ order: 1, createdAt: -1 });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new sahitya video
export const createSahitya = async (req, res) => {
  try {
    const { title, description, youtubeUrl, order } = req.body;
    
    const videoId = extractVideoId(youtubeUrl);
    if (!videoId) {
      return res.status(400).json({ message: 'Invalid YouTube URL' });
    }

    const sahitya = new Sahitya({
      title,
      description,
      youtubeUrl,
      videoId,
      order: order || 0
    });

    await sahitya.save();
    res.status(201).json(sahitya);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update sahitya video
export const updateSahitya = async (req, res) => {
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

    const sahitya = await Sahitya.findByIdAndUpdate(id, updateData, { new: true });
    
    if (!sahitya) {
      return res.status(404).json({ message: 'Video not found' });
    }

    res.json(sahitya);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete sahitya video
export const deleteSahitya = async (req, res) => {
  try {
    const { id } = req.params;
    const sahitya = await Sahitya.findByIdAndDelete(id);
    
    if (!sahitya) {
      return res.status(404).json({ message: 'Video not found' });
    }

    res.json({ message: 'Video deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
