const express = require('express');
const router = express.Router();
const { getDashboardStats } = require('../controllers/dashboardController');
const protect = require('../middleware/authMiddleware');
const adminOnly = require('../middleware/adminMiddleware');

// 🔐 Admin dashboard stats
router.get('/', protect, adminOnly, getDashboardStats);

module.exports = router;
