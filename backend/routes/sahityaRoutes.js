import express from 'express';
import { getAllSahitya, getAllSahityaAdmin, createSahitya, updateSahitya, deleteSahitya } from '../controllers/sahityaController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllSahitya);
router.get('/admin', protect, getAllSahityaAdmin);
router.post('/', protect, createSahitya);
router.put('/:id', protect, updateSahitya);
router.delete('/:id', protect, deleteSahitya);

export default router;
