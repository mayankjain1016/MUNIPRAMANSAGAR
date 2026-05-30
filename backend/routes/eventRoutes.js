import express from 'express';
import {
  getActiveEvents,
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
} from '../controllers/eventController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public read routes
router.get('/active', getActiveEvents);
router.get('/', getAllEvents);
router.get('/:id', getEventById);

// Protected write routes
router.post('/', protect, createEvent);
router.put('/:id', protect, updateEvent);
router.delete('/:id', protect, deleteEvent);

export default router;
