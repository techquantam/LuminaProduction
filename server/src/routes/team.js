const express = require('express');
const router = express.Router();
const {
  getAllTeamMembers,
  createTeamMember,
  deleteTeamMember
} = require('../controllers/teamController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../config/cloudinary');

router.get('/', getAllTeamMembers);

// Admin Protected Routes
router.post('/', authMiddleware, upload.single('image'), createTeamMember);
router.delete('/:id', authMiddleware, deleteTeamMember);

module.exports = router;
