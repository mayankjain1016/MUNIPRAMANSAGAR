import News from '../models/News.js';

// Get latest news
export const getLatestNews = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const news = await News.find({ isPublished: true })
      .sort({ date: -1 })
      .limit(limit);
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all news (including drafts for admin)
export const getAllNews = async (req, res) => {
  try {
    const news = await News.find().sort({ date: -1 });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get published news only
export const getPublishedNews = async (req, res) => {
  try {
    const news = await News.find({ isPublished: true }).sort({ date: -1 });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get news by ID
export const getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }
    news.views += 1;
    await news.save();
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create news
export const createNews = async (req, res) => {
  try {
    const newsData = { ...req.body };
    if (req.file) {
      newsData.image = `/uploads/${req.file.filename}`;
    }
    const news = new News(newsData);
    const newNews = await news.save();
    res.status(201).json(newNews);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update news
export const updateNews = async (req, res) => {
  try {
    const newsData = { ...req.body };
    if (req.file) {
      newsData.image = `/uploads/${req.file.filename}`;
    }
    const news = await News.findByIdAndUpdate(
      req.params.id,
      newsData,
      { new: true }
    );
    res.json(news);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete news
export const deleteNews = async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);
    res.json({ message: 'News deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
