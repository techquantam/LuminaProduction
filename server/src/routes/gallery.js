const express = require('express');
const router = express.Router();
const {
  getAllGalleryItems,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem
} = require('../controllers/galleryController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../config/cloudinary');

router.get('/', getAllGalleryItems);

// Admin Protected Routes
router.post('/', authMiddleware, upload.single('image'), createGalleryItem);
router.put('/:id', authMiddleware, upload.single('image'), updateGalleryItem);
router.delete('/:id', authMiddleware, deleteGalleryItem);

module.exports = router;
