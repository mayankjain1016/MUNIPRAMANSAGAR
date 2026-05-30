import express from 'express';
import * as pravachanController from '../controllers/pravachanController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', pravachanController.getAllPravachans);
router.get('/:id', pravachanController.getPravachanById);
router.patch('/:id/views', pravachanController.incrementViews);

// Protected admin routes
router.post('/', protect, pravachanController.createPravachan);
router.put('/:id', protect, pravachanController.updatePravachan);
router.delete('/:id', protect, pravachanController.deletePravachan);

export default router;
