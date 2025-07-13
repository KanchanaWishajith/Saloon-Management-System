const express = require('express');
const router = express.Router();

const {
  bookAppointment,
  getUserAppointments,
  getAllAppointments,
  cancelAppointment,
  updateAppointmentStatus
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

router.put('/status/:id', protect, adminOnly, updateAppointmentStatus);

module.exports = router;
