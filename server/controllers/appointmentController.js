const Appointment = require('../models/Appointment');

// ✅ Book an appointment (customer)
exports.bookAppointment = async (req, res) => {
  try {
    const { serviceId, date } = req.body;

    const newAppointment = new Appointment({
      user: req.user.userId, // from token
      service: serviceId,
      appointmentDate: date
    });

    await newAppointment.save();
    res.status(201).json({ message: 'Appointment booked successfully', appointment: newAppointment });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


// 👤 Get current user's appointments
exports.getUserAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.user.userId }).populate('service');
    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// 👨‍💼 Admin: Get all appointments
exports.getAllAppointments = async (req, res) => {
  try {
    const { status, userId } = req.query;

    let filter = {};
    if (status) filter.status = status;
    if (userId) filter.user = userId;

    const appointments = await Appointment.find(filter).populate('service user');
    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ❌ Cancel an appointment
exports.cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findById(id);

    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

    appointment.status = 'cancelled';
    await appointment.save();

    res.status(200).json({ message: 'Appointment cancelled', appointment });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update appointment status (admin only)
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['approved', 'cancelled','completed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    appointment.status = status;
    await appointment.save();

    res.status(200).json({ message: `Appointment ${status}`, appointment });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
