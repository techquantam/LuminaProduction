const express = require('express');
const router = express.Router();
const { getSetting, updateHeroImages, deleteHeroImage } = require('../controllers/siteSettingsController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../config/cloudinary');

// Public: get any setting by key
router.get('/:key', getSetting);

// Admin Protected: update hero images (up to 5 files)
router.put('/hero-images', authMiddleware, upload.fields([
  { name: 'heroImages', maxCount: 5 }
]), (req, res, next) => {
  // Re-map files array for controller
  if (req.files && req.files.heroImages) {
    req.files = req.files.heroImages;
  } else {
    req.files = [];
  }
  next();
}, updateHeroImages);

// Admin Protected: delete a hero image by index
router.delete('/hero-images/:index', authMiddleware, deleteHeroImage);

module.exports = router;
