import express from 'express';
import { getAllSahitya, getAllSahityaAdmin, createSahitya, updateSahitya, deleteSahitya } from '../controllers/sahityaController.js';
import { protect } from '../middleware/authMiddleware.js';
import { uploadSahitya } from '../middleware/uploadMiddleware.js';
import multer from 'multer';

const router = express.Router();

router.get('/', getAllSahitya);
router.get('/admin', protect, getAllSahityaAdmin);

const handleUploadError = (err, req, res, next) => {
  console.error('Upload Error:', err);
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({ message: 'File too large! Maximum size is 50MB.' });
    }
    return res.status(400).json({ message: err.message });
  } else if (err) {
    return res.status(400).json({ message: err.message });
  }
  next();
};

router.post('/', protect, uploadSahitya.fields([{ name: 'coverImage', maxCount: 1 }, { name: 'pdfFile', maxCount: 1 }, { name: 'pdfFiles', maxCount: 10 }]), handleUploadError, createSahitya);
router.put('/:id', protect, uploadSahitya.fields([{ name: 'coverImage', maxCount: 1 }, { name: 'pdfFile', maxCount: 1 }, { name: 'pdfFiles', maxCount: 10 }]), handleUploadError, updateSahitya);
router.delete('/:id', protect, deleteSahitya);

export default router;
