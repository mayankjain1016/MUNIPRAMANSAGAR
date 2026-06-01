import Disciple from '../models/Disciple.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    const { name, title, description, order } = req.body;
    const image = req.file ? `/uploads/disciples/${req.file.filename}` : req.body.image;
    
    const disciple = new Disciple({ name, title, image, description, category: 'शिष्य', order });
    await disciple.save();
    res.status(201).json(disciple);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateDisciple = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.image = `/uploads/disciples/${req.file.filename}`;
      
      // Delete old image
      const oldDisciple = await Disciple.findById(req.params.id);
      if (oldDisciple?.image?.startsWith('/uploads/disciples/')) {
        const oldPath = path.join(__dirname, '..', oldDisciple.image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
    }
    
    const disciple = await Disciple.findByIdAndUpdate(req.params.id, updateData, { new: true });
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
    const disciple = await Disciple.findById(req.params.id);
    if (!disciple) {
      return res.status(404).json({ message: 'Disciple not found' });
    }
    
    // Delete image file
    if (disciple.image?.startsWith('/uploads/disciples/')) {
      const imagePath = path.join(__dirname, '..', disciple.image);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }
    
    await Disciple.findByIdAndDelete(req.params.id);
    res.json({ message: 'Disciple deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
