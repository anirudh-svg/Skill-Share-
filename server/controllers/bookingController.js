const Booking = require('../models/Booking');
const User = require('../models/User');

// @desc    Create a new booking request
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res, next) => {
  try {
    const { providerId, skill, proposedTimeSlots, notes } = req.body;
    const requesterId = req.user._id;
    
    // Check if provider exists
    const provider = await User.findById(providerId);
    if (!provider) {
      return res.status(404).json({ message: 'Provider not found' });
    }
    
    // Check if requester is trying to book themselves
    if (requesterId.toString() === providerId.toString()) {
      return res.status(400).json({ message: 'You cannot book yourself' });
    }
    
    // Create booking
    const booking = await Booking.create({
      requester: requesterId,
      provider: providerId,
      skill,
      proposedTimeSlots,
      notes
    });
    
    // Populate references
    await booking.populate('requester provider');
    
    res.status(201).json(booking);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all bookings for current user
// @route   GET /api/bookings
// @access  Private
const getUserBookings = async (req, res, next) => {
  try {
    const userId = req.user._id;
    
    const bookings = await Booking.find({
      $or: [{ requester: userId }, { provider: userId }]
    })
      .populate('requester provider')
      .sort({ createdAt: -1 });
    
    res.json(bookings);
  } catch (error) {
    next(error);
  }
};

// @desc    Get booking by ID
// @route   GET /api/bookings/:id
// @access  Private
const getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('requester provider');
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // Check if user is part of the booking
    if (
      booking.requester._id.toString() !== req.user._id.toString() &&
      booking.provider._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: 'Not authorized to view this booking' });
    }
    
    res.json(booking);
  } catch (error) {
    next(error);
  }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id/status
// @access  Private
const updateBookingStatus = async (req, res, next) => {
  try {
    const { status, confirmedSlot } = req.body;
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // Check if user is authorized to update status
    if (
      status === 'accepted' || 
      status === 'rejected' || 
      status === 'cancelled'
    ) {
      // Only provider can accept/reject
      if (booking.provider.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to update this booking' });
      }
    } else if (status === 'completed') {
      // Both parties can mark as completed
      if (
        booking.requester.toString() !== req.user._id.toString() &&
        booking.provider.toString() !== req.user._id.toString()
      ) {
        return res.status(403).json({ message: 'Not authorized to update this booking' });
      }
    }
    
    booking.status = status;
    
    if (confirmedSlot && (status === 'accepted')) {
      booking.confirmedSlot = confirmedSlot;
    }
    
    // Generate meeting link for accepted bookings
    if (status === 'accepted' && !booking.meetingLink) {
      // Simple meeting link generation (in real app, integrate with Zoom/Google Meet API)
      booking.meetingLink = `https://meet.google.com/we-grow-${Math.random().toString(36).substr(2, 8)}`;
    }
    
    const updatedBooking = await booking.save();
    
    // Populate references
    await updatedBooking.populate('requester provider');
    
    // Emit socket event for real-time update
    const io = req.app.locals.io;
    if (io) {
      io.to(booking.requester.toString()).emit('booking_updated', updatedBooking);
      io.to(booking.provider.toString()).emit('booking_updated', updatedBooking);
    }
    
    res.json(updatedBooking);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBooking,
  getUserBookings,
  getBookingById,
  updateBookingStatus,
};