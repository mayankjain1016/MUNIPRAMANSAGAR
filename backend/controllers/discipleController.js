import Disciple from '../models/Disciple.js';

export const getAllDisciples = async (req, res) => {
  try {
    const disciples = await Disciple.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
    res.json(disciples);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createDisciple = async (req, res) => {
  try {
    const { name, title, image, description, order } = req.body;
    const disciple = new Disciple({ name, title, image, description, category: 'शिष्य', order });
    await disciple.save();
    res.status(201).json(disciple);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateDisciple = async (req, res) => {
  try {
    const disciple = await Disciple.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!disciple) {
      return res.status(404).json({ message: 'Disciple not found' });
    }
    res.json(disciple);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteDisciple = async (req, res) => {
  try {
    const disciple = await Disciple.findByIdAndDelete(req.params.id);
    if (!disciple) {
      return res.status(404).json({ message: 'Disciple not found' });
    }
    res.json({ message: 'Disciple deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
