import express from 'express';
import * as pravachanController from '../controllers/pravachanController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', pravachanController.getAllPravachans);
router.get('/live/current', pravachanController.getLiveVideo);
router.get('/:id', pravachanController.getPravachanById);
router.patch('/:id/views', pravachanController.incrementViews);

// Protected admin routes
router.post('/', protect, pravachanController.createPravachan);
router.put('/:id', protect, pravachanController.updatePravachan);
router.patch('/:id/live', protect, pravachanController.setLiveVideo);
router.patch('/:id/unlive', protect, pravachanController.unsetLiveVideo);
router.delete('/:id', protect, pravachanController.deletePravachan);

export default router;
