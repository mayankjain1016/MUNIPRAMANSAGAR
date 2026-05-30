import Gallery from '../models/Gallery.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get all galleries
export const getAllGalleries = async (req, res) => {
  try {
    const galleries = await Gallery.find({ isPublished: true }).sort({ date: -1 });
    res.json(galleries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get gallery by ID
export const getGalleryById = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) {
      return res.status(404).json({ message: 'Gallery not found' });
    }
    gallery.views += 1;
    await gallery.save();
    res.json(gallery);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get home page galleries (limited)
export const getHomeGalleries = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 4;
    const galleries = await Gallery.find({ isPublished: true })
      .sort({ date: -1 })
      .limit(limit)
      .select('title coverImage date');
    res.json(galleries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create gallery with cover image
export const createGallery = async (req, res) => {
  try {
    const { title, description, date, isPublished } = req.body;
    const coverImage = req.file ? `/uploads/gallery/${req.file.filename}` : '';

    const gallery = new Gallery({
      title,
      description,
      date,
      coverImage,
      isPublished: isPublished === 'true'
    });
    
    const newGallery = await gallery.save();
    res.status(201).json(newGallery);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update gallery
export const updateGallery = async (req, res) => {
  try {
    const { title, description, date, isPublished } = req.body;
    const updateData = { title, description, date, isPublished: isPublished === 'true' };
    
    if (req.file) {
      updateData.coverImage = `/uploads/gallery/${req.file.filename}`;
      
      // Delete old cover image
      const oldGallery = await Gallery.findById(req.params.id);
      if (oldGallery?.coverImage) {
        const oldPath = path.join(__dirname, '..', oldGallery.coverImage);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
    }
    
    const gallery = await Gallery.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    res.json(gallery);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add images to gallery
export const addImagesToGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) {
      return res.status(404).json({ message: 'Gallery not found' });
    }
    
    const newImages = req.files.map((file, index) => ({
      url: `/uploads/gallery/${file.filename}`,
      caption: req.body.captions ? req.body.captions[index] || '' : ''
    }));
    
    gallery.images.push(...newImages);
    await gallery.save();
    res.json(gallery);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete image from gallery
export const deleteImageFromGallery = async (req, res) => {
  try {
    const { id, imageId } = req.params;
    const gallery = await Gallery.findById(id);
    
    if (!gallery) {
      return res.status(404).json({ message: 'Gallery not found' });
    }
    
    const image = gallery.images.id(imageId);
    if (image) {
      const imagePath = path.join(__dirname, '..', image.url);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
      gallery.images.pull(imageId);
      await gallery.save();
    }
    
    res.json(gallery);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete gallery
export const deleteGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    
    if (gallery) {
      // Delete cover image
      if (gallery.coverImage) {
        const coverPath = path.join(__dirname, '..', gallery.coverImage);
        if (fs.existsSync(coverPath)) fs.unlinkSync(coverPath);
      }
      
      // Delete all gallery images
      gallery.images.forEach(image => {
        const imagePath = path.join(__dirname, '..', image.url);
        if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
      });
    }
    
    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ message: 'Gallery deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
