const express = require('express');
const router = express.Router();

const {
  addReview,
  getServiceReviews,
  deleteReview
} = require('../controllers/reviewController');

const protect = require('../middleware/authMiddleware');
const adminOnly = require('../middleware/adminMiddleware');

// ➕ Add a review (customer)
router.post('/', protect, addReview);

// 📖 Get all reviews for a service (public)
router.get('/:serviceId', getServiceReviews);

// ❌ Delete a review (admin only)
router.delete('/:id', protect, adminOnly, deleteReview);

module.exports = router;
