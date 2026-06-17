import express from 'express';
import { getAllSahitya, getAllSahityaAdmin, createSahitya, updateSahitya, deleteSahitya } from '../controllers/sahityaController.js';
import { protect } from '../middleware/authMiddleware.js';
import { uploadSahitya } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/', getAllSahitya);
router.get('/admin', protect, getAllSahityaAdmin);
router.post('/', protect, uploadSahitya.fields([{ name: 'coverImage', maxCount: 1 }, { name: 'pdfFile', maxCount: 1 }]), createSahitya);
router.put('/:id', protect, uploadSahitya.fields([{ name: 'coverImage', maxCount: 1 }, { name: 'pdfFile', maxCount: 1 }]), updateSahitya);
router.delete('/:id', protect, deleteSahitya);

export default router;
