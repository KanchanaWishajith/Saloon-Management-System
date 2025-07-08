const express = require('express');
const router = express.Router();

const {
  bookAppointment,
  getUserAppointments,
  getAllAppointments,
  cancelAppointment
} = require('../controllers/appointmentController');

const protect = require('../middleware/authMiddleware');
const adminOnly = require('../middleware/adminMiddleware');

// 👤 Book an appointment (customer)
router.post('/', protect, bookAppointment);

// 👤 Get logged-in user's appointments
router.get('/my', protect, getUserAppointments);

// 👨‍💼 Admin: Get all appointments
router.get('/', protect, adminOnly, getAllAppointments);

// ❌ Cancel an appointment (customer or admin)
router.put('/cancel/:id', protect, cancelAppointment);

module.exports = router;
