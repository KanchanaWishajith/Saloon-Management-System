const express = require('express');
const router = express.Router();
const {
  createService,
  getAllServices,
  updateService,
  deleteService
} = require('../controllers/serviceController');

const protect = require('../middleware/authMiddleware');
const adminOnly = require('../middleware/adminMiddleware');

// Public route
router.get('/', getAllServices);

// Admin-only routes
router.post('/', protect, adminOnly, createService);
router.put('/:id', protect, adminOnly, updateService);
router.delete('/:id', protect, adminOnly, deleteService);

module.exports = router;
