import express from 'express';
import { getAllDisciples, createDisciple, updateDisciple, deleteDisciple } from '../controllers/discipleController.js';
import { protect } from '../middleware/authMiddleware.js';
import { uploadDisciple } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/', getAllDisciples);
router.post('/', protect, uploadDisciple.single('image'), createDisciple);
router.put('/:id', protect, uploadDisciple.single('image'), updateDisciple);
router.delete('/:id', protect, deleteDisciple);

export default router;
