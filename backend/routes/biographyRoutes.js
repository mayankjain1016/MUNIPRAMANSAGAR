import express from 'express';
import { getBiography, createBiography, updateBiography, deleteBiography } from '../controllers/biographyController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getBiography);
router.post('/', protect, createBiography);
router.put('/:id', protect, updateBiography);
router.delete('/:id', protect, deleteBiography);

export default router;
