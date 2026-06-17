import express from 'express';
import { getLiveStatus, updateLiveStatus } from '../controllers/liveVideoController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getLiveStatus);
router.put('/', protect, updateLiveStatus);

export default router;
