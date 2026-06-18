const express = require('express');
const router = express.Router();
const {
  getAllProjects,
  getFeaturedProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
} = require('../controllers/projectController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../config/cloudinary');

router.get('/', getAllProjects);
router.get('/featured', getFeaturedProjects);
router.get('/:id', getProjectById);

// Admin Protected Routes
const uploadFields = upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'subImages', maxCount: 10 }
]);

router.post('/', authMiddleware, uploadFields, createProject);
router.put('/:id', authMiddleware, uploadFields, updateProject);
router.delete('/:id', authMiddleware, deleteProject);

module.exports = router;
