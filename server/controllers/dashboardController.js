const User = require('../models/User');
const Service = require('../models/Service');
const Appointment = require('../models/Appointment');
const Review = require('../models/Review');

// Admin dashboard stats
exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalServices = await Service.countDocuments();
    const totalAppointments = await Appointment.countDocuments();
    const totalReviews = await Review.countDocuments();

    res.status(200).json({
      users: totalUsers,
      services: totalServices,
      appointments: totalAppointments,
      reviews: totalReviews
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getDashboardStats = async (req, res) => {
  try {
    const totalAppointments = await Appointment.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalServices = await Service.countDocuments();

    const completed = await Appointment.countDocuments({ status: 'completed' });
    const approved = await Appointment.countDocuments({ status: 'approved' });
    const cancelled = await Appointment.countDocuments({ status: 'cancelled' });

    res.status(200).json({
      totalAppointments,
      totalUsers,
      totalServices,
      statusCounts: {
        completed,
        approved,
        cancelled,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
