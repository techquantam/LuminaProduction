const express = require('express');
const router = express.Router();
const {
  submitContactForm,
  getAllContactSubmissions,
  updateContactStatus,
  deleteContactSubmission,
  requestCredentials
} = require('../controllers/contactController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', submitContactForm);
router.post('/credentials', requestCredentials);

// Admin Protected Routes
router.get('/', authMiddleware, getAllContactSubmissions);
router.put('/:id', authMiddleware, updateContactStatus);
router.delete('/:id', authMiddleware, deleteContactSubmission);

module.exports = router;
