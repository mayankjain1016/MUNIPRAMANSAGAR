import express from 'express';
import { getAllDisciples, createDisciple, updateDisciple, deleteDisciple } from '../controllers/discipleController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllDisciples);
router.post('/', protect, createDisciple);
router.put('/:id', protect, updateDisciple);
router.delete('/:id', protect, deleteDisciple);

export default router;
