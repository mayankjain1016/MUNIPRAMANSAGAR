import express from 'express';
import { getAllPathshala, getAllPathshalaAdmin, createPathshala, updatePathshala, deletePathshala } from '../controllers/pathshalaController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllPathshala);
router.get('/admin', protect, getAllPathshalaAdmin);
router.post('/', protect, createPathshala);
router.put('/:id', protect, updatePathshala);
router.delete('/:id', protect, deletePathshala);

export default router;
