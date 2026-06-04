import express from 'express';
import { getAllSantKiAdalat, getAllSantKiAdalatAdmin, createSantKiAdalat, updateSantKiAdalat, deleteSantKiAdalat } from '../controllers/santKiAdalatController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllSantKiAdalat);
router.get('/admin', protect, getAllSantKiAdalatAdmin);
router.post('/', protect, createSantKiAdalat);
router.put('/:id', protect, updateSantKiAdalat);
router.delete('/:id', protect, deleteSantKiAdalat);

export default router;
