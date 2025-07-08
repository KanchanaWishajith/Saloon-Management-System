const Service = require('../models/Service');

// Create a new service (Admin only)
exports.createService = async (req, res) => {
  try {
    const { name, price, duration, description } = req.body;

    const newService = new Service({ name, price, duration, description });
    await newService.save();

    res.status(201).json({ message: 'Service created successfully', service: newService });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get all services
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update service (Admin only)
exports.updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedService = await Service.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ message: 'Service updated', service: updatedService });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete service (Admin only)
exports.deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    await Service.findByIdAndDelete(id);
    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
