const express = require('express');
const router = express.Router();
const {
  createService,
  getAllServices,
  updateService,
  deleteService
} = require('../controllers/serviceController');
const protect = require('../middleware/authMiddleware');

// 🧾 Public - Get all services
router.get('/', getAllServices);

// 🔐 Admin-only routes (protected)
router.post('/', protect, createService);
router.put('/:id', protect, updateService);
router.delete('/:id', protect, deleteService);

module.exports = router;
