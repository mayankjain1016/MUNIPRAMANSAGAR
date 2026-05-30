import express from 'express';
import {
  getLocation,
  updateLocation
} from '../controllers/locationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getLocation);
router.put('/', protect, updateLocation);

export default router;
