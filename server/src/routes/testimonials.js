const express = require('express');
const router = express.Router();
const {
  getAllTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
} = require('../controllers/testimonialController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../config/cloudinary');

router.get('/', getAllTestimonials);

// Admin Protected Routes
router.post('/', authMiddleware, upload.single('image'), createTestimonial);
router.put('/:id', authMiddleware, upload.single('image'), updateTestimonial);
router.delete('/:id', authMiddleware, deleteTestimonial);

module.exports = router;
