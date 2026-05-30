import express from 'express';
import multer from 'multer';
import path from 'path';
import {
  getLatestNews,
  getAllNews,
  getPublishedNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews
} from '../controllers/newsController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/news/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'news-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed!'));
  }
});

router.get('/latest', getLatestNews);
router.get('/published', getPublishedNews);
router.get('/all', protect, getAllNews);
router.get('/:id', getNewsById);
router.post('/', protect, upload.single('image'), createNews);
router.put('/:id', protect, upload.single('image'), updateNews);
router.delete('/:id', protect, deleteNews);

export default router;
