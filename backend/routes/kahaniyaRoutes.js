import express from 'express';
import { getAllKahaniya, getAllKahaniyaAdmin, createKahaniya, updateKahaniya, deleteKahaniya } from '../controllers/kahaniyaController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllKahaniya);
router.get('/admin', protect, getAllKahaniyaAdmin);
router.post('/', protect, createKahaniya);
router.put('/:id', protect, updateKahaniya);
router.delete('/:id', protect, deleteKahaniya);

export default router;
