import express from 'express';
import { uploadImage, deleteImage } from '../controllers/uploadController.js';
import { protect } from '../middleware/auth.js';
import upload, { handleMulterError } from '../middleware/upload.js';

const router = express.Router();

// Upload image route (protected)
router.post('/image', protect, upload.single('image'), handleMulterError, uploadImage);

// Delete image route (protected) - for future use
router.delete('/image', protect, deleteImage);

export default router;
