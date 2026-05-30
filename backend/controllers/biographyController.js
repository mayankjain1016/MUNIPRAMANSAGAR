import Biography from '../models/Biography.js';

export const getBiography = async (req, res) => {
  try {
    const biography = await Biography.findOne({ isActive: true }).sort({ createdAt: -1 });
    if (!biography) {
      return res.status(404).json({ message: 'Biography not found' });
    }
    res.json(biography);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createBiography = async (req, res) => {
  try {
    const { title, content, heroImage, images } = req.body;
    const biography = new Biography({ title, content, heroImage, images });
    await biography.save();
    res.status(201).json(biography);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateBiography = async (req, res) => {
  try {
    const biography = await Biography.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!biography) {
      return res.status(404).json({ message: 'Biography not found' });
    }
    res.json(biography);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteBiography = async (req, res) => {
  try {
    const biography = await Biography.findByIdAndDelete(req.params.id);
    if (!biography) {
      return res.status(404).json({ message: 'Biography not found' });
    }
    res.json({ message: 'Biography deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
