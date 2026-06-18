const express = require('express');
const router = express.Router();
const {
  getAllClients,
  createClient,
  deleteClient
} = require('../controllers/clientController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../config/cloudinary');

router.get('/', getAllClients);

// Admin Protected Routes
router.post('/', authMiddleware, upload.single('logo'), createClient);
router.delete('/:id', authMiddleware, deleteClient);

module.exports = router;
