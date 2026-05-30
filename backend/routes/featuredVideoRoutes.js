import express from 'express';
import {
  getAllFeaturedVideos,
  getFeaturedVideoByPosition,
  upsertFeaturedVideo,
  toggleFeaturedVideo
} from '../controllers/featuredVideoController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getAllFeaturedVideos);
router.get('/:position', getFeaturedVideoByPosition);

// Protected admin routes
router.put('/:position', protect, upsertFeaturedVideo);
router.patch('/:position/toggle', protect, toggleFeaturedVideo);

export default router;
