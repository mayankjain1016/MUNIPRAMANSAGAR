import express from 'express';
import {
  getAllGalleries,
  getGalleryById,
  getHomeGalleries,
  createGallery,
  updateGallery,
  addImagesToGallery,
  deleteImageFromGallery,
  deleteGallery
} from '../controllers/galleryController.js';
import { protect } from '../middleware/authMiddleware.js';
import { uploadGallery } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/home', getHomeGalleries);
router.get('/', getAllGalleries);
router.get('/:id', getGalleryById);
router.post('/', protect, uploadGallery.single('coverImage'), createGallery);
router.put('/:id', protect, uploadGallery.single('coverImage'), updateGallery);
router.post('/:id/images', protect, uploadGallery.array('images', 20), addImagesToGallery);
router.delete('/:id/images/:imageId', protect, deleteImageFromGallery);
router.delete('/:id', protect, deleteGallery);

export default router;
