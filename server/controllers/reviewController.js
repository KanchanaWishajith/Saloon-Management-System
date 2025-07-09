const Review = require('../models/Review');

// ➕ Add a review (customer)
exports.addReview = async (req, res) => {
  try {
    const { service, rating, comment } = req.body;

    // Check if user already reviewed this service
    const existing = await Review.findOne({ user: req.user.userId, service });
    if (existing) {
      return res.status(400).json({ message: 'You already reviewed this service' });
    }

    const newReview = new Review({
      user: req.user.userId,
      service,
      rating,
      comment
    });

    await newReview.save();
    res.status(201).json({ message: 'Review added', review: newReview });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// 📖 Get all reviews for a service (public)
exports.getServiceReviews = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const reviews = await Review.find({ service: serviceId }).populate('user', 'name');
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ❌ Delete a review (admin only)
exports.deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    await Review.findByIdAndDelete(id);
    res.status(200).json({ message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
