import SantKiAdalat from '../models/SantKiAdalat.js';

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

export const getAllSantKiAdalat = async (req, res) => {
  try {
    const videos = await SantKiAdalat.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllSantKiAdalatAdmin = async (req, res) => {
  try {
    const videos = await SantKiAdalat.find().sort({ order: 1, createdAt: -1 });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createSantKiAdalat = async (req, res) => {
  try {
    const { title, description, youtubeUrl, order } = req.body;
    
    const videoId = extractVideoId(youtubeUrl);
    if (!videoId) {
      return res.status(400).json({ message: 'Invalid YouTube URL' });
    }

    const santKiAdalat = new SantKiAdalat({
      title,
      description,
      youtubeUrl,
      videoId,
      order: order || 0
    });

    await santKiAdalat.save();
    res.status(201).json(santKiAdalat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSantKiAdalat = async (req, res) => {
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

    const santKiAdalat = await SantKiAdalat.findByIdAndUpdate(id, updateData, { new: true });
    
    if (!santKiAdalat) {
      return res.status(404).json({ message: 'Video not found' });
    }

    res.json(santKiAdalat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteSantKiAdalat = async (req, res) => {
  try {
    const { id } = req.params;
    const santKiAdalat = await SantKiAdalat.findByIdAndDelete(id);
    
    if (!santKiAdalat) {
      return res.status(404).json({ message: 'Video not found' });
    }

    res.json({ message: 'Video deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
