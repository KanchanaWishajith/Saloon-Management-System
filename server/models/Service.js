const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  duration: {
    type: String,
    required: true // e.g., "30 minutes"
  },
  description: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
