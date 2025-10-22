const Review = require('../models/Review');
const Booking = require('../models/Booking');
const User = require('../models/User');

// @desc    Create a new review
// @route   POST /api/reviews
// @access  Private
const createReview = async (req, res, next) => {
  try {
    const { bookingId, rating, comment } = req.body;
    const reviewerId = req.user._id;
    
    // Check if booking exists
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // Check if booking is completed
    if (booking.status !== 'completed') {
      return res.status(400).json({ message: 'Can only review completed bookings' });
    }
    
    // Determine who is the reviewer and who is being reviewed
    let reviewedId;
    if (booking.requester.toString() === reviewerId.toString()) {
      reviewedId = booking.provider;
    } else if (booking.provider.toString() === reviewerId.toString()) {
      reviewedId = booking.requester;
    } else {
      return res.status(403).json({ message: 'Not authorized to review this booking' });
    }
    
    // Check if review already exists for this booking
    const existingReview = await Review.findOne({ booking: bookingId });
    if (existingReview) {
      return res.status(400).json({ message: 'Review already exists for this booking' });
    }
    
    // Create review
    const review = await Review.create({
      reviewer: reviewerId,
      reviewed: reviewedId,
      booking: bookingId,
      rating,
      comment,
      skill: booking.skill
    });
    
    // Populate references
    await review.populate('reviewer reviewed');
    
    // Add rating to user's profile
    const reviewedUser = await User.findById(reviewedId);
    if (reviewedUser) {
      reviewedUser.ratings.push({
        userId: reviewerId,
        rating,
        comment,
      });
      
      // Recalculate average rating
      reviewedUser.calculateAverageRating();
      await reviewedUser.save();
    }
    
    res.status(201).json(review);
  } catch (error) {
    next(error);
  }
};

// @desc    Get reviews for a user
// @route   GET /api/reviews/user/:userId
// @access  Public
const getUserReviews = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    
    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const reviews = await Review.find({ reviewed: userId })
      .populate('reviewer', 'name profilePicture')
      .sort({ createdAt: -1 });
    
    res.json(reviews);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createReview,
  getUserReviews,
};