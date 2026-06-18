const express = require('express');
const router = express.Router();
const {
  submitContactForm,
  getAllContactSubmissions,
  updateContactStatus,
  deleteContactSubmission
} = require('../controllers/contactController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', submitContactForm);

// Admin Protected Routes
router.get('/', authMiddleware, getAllContactSubmissions);
router.put('/:id', authMiddleware, updateContactStatus);
router.delete('/:id', authMiddleware, deleteContactSubmission);

module.exports = router;
