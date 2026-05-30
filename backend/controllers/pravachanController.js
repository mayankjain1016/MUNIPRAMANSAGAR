import Pravachan from '../models/Pravachan.js';

// Helper function to extract YouTube thumbnail
const getYouTubeThumbnail = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  const videoId = (match && match[2].length === 11) ? match[2] : null;
  return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;
};

// Get all pravachans
export const getAllPravachans = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = { isActive: true };
    if (category) filter.category = category;
    
    const pravachans = await Pravachan.find(filter).sort({ createdAt: -1 });
    res.json(pravachans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single pravachan
export const getPravachanById = async (req, res) => {
  try {
    const pravachan = await Pravachan.findById(req.params.id);
    if (!pravachan) return res.status(404).json({ message: 'Pravachan not found' });
    res.json(pravachan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create pravachan
export const createPravachan = async (req, res) => {
  try {
    const { title, videoUrl, thumbnail, category, description, duration } = req.body;
    
    // Auto-generate thumbnail if not provided
    const finalThumbnail = thumbnail || getYouTubeThumbnail(videoUrl);
    
    const pravachan = new Pravachan({
      title,
      videoUrl,
      thumbnail: finalThumbnail,
      category,
      description,
      duration
    });
    
    const savedPravachan = await pravachan.save();
    res.status(201).json(savedPravachan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update pravachan
export const updatePravachan = async (req, res) => {
  try {
    const { title, videoUrl, thumbnail, category, description, duration, isActive } = req.body;
    
    const updateData = { title, videoUrl, category, description, duration, isActive };
    
    // Auto-generate thumbnail if videoUrl changed and no thumbnail provided
    if (videoUrl && !thumbnail) {
      updateData.thumbnail = getYouTubeThumbnail(videoUrl);
    } else if (thumbnail) {
      updateData.thumbnail = thumbnail;
    }
    
    const pravachan = await Pravachan.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!pravachan) return res.status(404).json({ message: 'Pravachan not found' });
    res.json(pravachan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete pravachan
export const deletePravachan = async (req, res) => {
  try {
    const pravachan = await Pravachan.findByIdAndDelete(req.params.id);
    if (!pravachan) return res.status(404).json({ message: 'Pravachan not found' });
    res.json({ message: 'Pravachan deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Increment views
export const incrementViews = async (req, res) => {
  try {
    const pravachan = await Pravachan.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    );
    if (!pravachan) return res.status(404).json({ message: 'Pravachan not found' });
    res.json(pravachan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
