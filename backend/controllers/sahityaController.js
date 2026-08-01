import Sahitya from '../models/Sahitya.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getAllSahitya = async (req, res) => {
  try {
    const books = await Sahitya.find().sort({ order: 1, createdAt: -1 });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllSahityaAdmin = async (req, res) => {
  try {
    const books = await Sahitya.find().sort({ order: 1, createdAt: -1 });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createSahitya = async (req, res) => {
  try {
    const { title, author, description, order } = req.body;
    
    if (!req.files || !req.files.coverImage) {
      return res.status(400).json({ message: 'Cover image is required' });
    }

    const pdfFiles = req.files.pdfFiles ? req.files.pdfFiles.map(f => f.filename) : [];
    const pdfFile = req.files.pdfFile ? req.files.pdfFile[0].filename : undefined;

    if (pdfFiles.length === 0 && !pdfFile) {
      return res.status(400).json({ message: 'At least one PDF file is required' });
    }

    const book = new Sahitya({
      title,
      author: author || 'आचार्य श्री निर्भय सागर जी',
      description,
      coverImage: req.files.coverImage[0].filename,
      pdfFile: pdfFile,
      pdfFiles: pdfFiles,
      order: order || 0
    });

    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateSahitya = async (req, res) => {
  try {
    const { title, author, description, order } = req.body;
    const book = await Sahitya.findById(req.params.id);
    
    if (!book) return res.status(404).json({ message: 'Book not found' });

    book.title = title || book.title;
    book.author = author || book.author;
    book.description = description || book.description;
    book.order = order !== undefined ? order : book.order;

    let retainedPdfs = req.body.existingPdfFiles || [];
    if (typeof retainedPdfs === 'string') retainedPdfs = [retainedPdfs];

    if (req.files) {
      if (req.files.coverImage) {
        const oldCoverPath = path.join(__dirname, '../uploads/sahitya', book.coverImage);
        if (fs.existsSync(oldCoverPath)) fs.unlinkSync(oldCoverPath);
        book.coverImage = req.files.coverImage[0].filename;
      }
      
      let newPdfs = [];
      if (req.files.pdfFiles) {
        newPdfs = req.files.pdfFiles.map(f => f.filename);
      }
      if (req.files.pdfFile) {
        book.pdfFile = req.files.pdfFile[0].filename;
      }
      
      const allOldPdfs = [...(book.pdfFiles || [])];
      allOldPdfs.forEach(oldPdf => {
          if (!retainedPdfs.includes(oldPdf)) {
              const oldPdfPath = path.join(__dirname, '../uploads/sahitya', oldPdf);
              if (fs.existsSync(oldPdfPath)) fs.unlinkSync(oldPdfPath);
          }
      });
      
      book.pdfFiles = [...retainedPdfs, ...newPdfs];
      
      if (book.pdfFile && !retainedPdfs.includes(book.pdfFile) && !req.files.pdfFile) {
          book.pdfFile = undefined;
      }
    } else {
      const allOldPdfs = [...(book.pdfFiles || [])];
      allOldPdfs.forEach(oldPdf => {
          if (!retainedPdfs.includes(oldPdf)) {
              const oldPdfPath = path.join(__dirname, '../uploads/sahitya', oldPdf);
              if (fs.existsSync(oldPdfPath)) fs.unlinkSync(oldPdfPath);
          }
      });
      book.pdfFiles = retainedPdfs;
      if (book.pdfFile && !retainedPdfs.includes(book.pdfFile)) {
          book.pdfFile = undefined;
      }
    }

    await book.save();
    res.json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteSahitya = async (req, res) => {
  try {
    const book = await Sahitya.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    const coverPath = path.join(__dirname, '../uploads/sahitya', book.coverImage);
    if (fs.existsSync(coverPath)) fs.unlinkSync(coverPath);
    
    const allPdfs = [...(book.pdfFiles || [])];
    if (book.pdfFile && !allPdfs.includes(book.pdfFile)) allPdfs.push(book.pdfFile);
    
    allPdfs.forEach(pdf => {
        const pdfPath = path.join(__dirname, '../uploads/sahitya', pdf);
        if (fs.existsSync(pdfPath)) fs.unlinkSync(pdfPath);
    });

    await Sahitya.findByIdAndDelete(req.params.id);
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
