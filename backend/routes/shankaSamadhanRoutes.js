import express from 'express';
import {
  getAllQuestions,
  getHomeQuestions,
  getPopularQuestions,
  getQuestionById,
  getQuestionBySlug,
  searchQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getAllClips,
  getPopularClips,
  getClipById,
  createClip,
  updateClip,
  deleteClip
} from '../controllers/shankaSamadhanController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Question routes
router.get('/home', getHomeQuestions);
router.get('/popular', getPopularQuestions);
router.get('/search', searchQuestions);
router.get('/', getAllQuestions);
router.get('/slug/:slug', getQuestionBySlug);
router.get('/:id', getQuestionById);
router.post('/', protect, createQuestion);
router.put('/:id', protect, updateQuestion);
router.delete('/:id', protect, deleteQuestion);

// Clip routes
router.get('/clips/all', getAllClips);
router.get('/clips/popular', getPopularClips);
router.get('/clips/:id', getClipById);
router.post('/clips', protect, createClip);
router.put('/clips/:id', protect, updateClip);
router.delete('/clips/:id', protect, deleteClip);

export default router;
