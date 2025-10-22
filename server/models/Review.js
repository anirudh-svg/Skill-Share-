const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reviewed: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    maxlength: 500
  },
  skill: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Index for better query performance
reviewSchema.index({ reviewer: 1, reviewed: 1 });
reviewSchema.index({ booking: 1 });
reviewSchema.index({ reviewed: 1 });
reviewSchema.index({ rating: 1 });

// Prevent duplicate reviews for the same booking
reviewSchema.index({ booking: 1 }, { unique: true });

module.exports = mongoose.model('Review', reviewSchema);