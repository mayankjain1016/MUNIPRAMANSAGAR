import Pathshala from '../models/Pathshala.js';

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

export const getAllPathshala = async (req, res) => {
  try {
    const videos = await Pathshala.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllPathshalaAdmin = async (req, res) => {
  try {
    const videos = await Pathshala.find().sort({ order: 1, createdAt: -1 });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPathshala = async (req, res) => {
  try {
    const { title, description, youtubeUrl, order } = req.body;
    
    const videoId = extractVideoId(youtubeUrl);
    if (!videoId) {
      return res.status(400).json({ message: 'Invalid YouTube URL' });
    }

    const pathshala = new Pathshala({
      title,
      description,
      youtubeUrl,
      videoId,
      order: order || 0
    });

    await pathshala.save();
    res.status(201).json(pathshala);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePathshala = async (req, res) => {
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

    const pathshala = await Pathshala.findByIdAndUpdate(id, updateData, { new: true });
    
    if (!pathshala) {
      return res.status(404).json({ message: 'Video not found' });
    }

    res.json(pathshala);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePathshala = async (req, res) => {
  try {
    const { id } = req.params;
    const pathshala = await Pathshala.findByIdAndDelete(id);
    
    if (!pathshala) {
      return res.status(404).json({ message: 'Video not found' });
    }

    res.json({ message: 'Video deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
