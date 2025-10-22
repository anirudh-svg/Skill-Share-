const Message = require('../models/Message');
const User = require('../models/User');
const Booking = require('../models/Booking');

// @desc    Send a new message
// @route   POST /api/chat/send
// @access  Private
const sendMessage = async (req, res, next) => {
  try {
    const { recipientId, bookingId, content } = req.body;
    const senderId = req.user._id;
    
    // Check if recipient exists
    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({ message: 'Recipient not found' });
    }
    
    // Check if sender is trying to message themselves
    if (senderId.toString() === recipientId.toString()) {
      return res.status(400).json({ message: 'You cannot message yourself' });
    }
    
    // If bookingId is provided, verify it exists and involves both users
    if (bookingId) {
      const booking = await Booking.findById(bookingId);
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }
      
      // Check if both users are part of the booking
      if (
        booking.requester.toString() !== senderId.toString() &&
        booking.requester.toString() !== recipientId.toString()
      ) {
        return res.status(403).json({ message: 'Not authorized to message about this booking' });
      }
      
      if (
        booking.provider.toString() !== senderId.toString() &&
        booking.provider.toString() !== recipientId.toString()
      ) {
        return res.status(403).json({ message: 'Not authorized to message about this booking' });
      }
    }
    
    // Create message
    const message = await Message.create({
      sender: senderId,
      recipient: recipientId,
      booking: bookingId,
      content
    });
    
    // Populate references
    await message.populate('sender recipient');
    
    // Emit socket event for real-time messaging
    const io = req.app.locals.io;
    if (io) {
      io.to(recipientId.toString()).emit('new_message', message);
      io.to(senderId.toString()).emit('message_sent', message);
    }
    
    res.status(201).json(message);
  } catch (error) {
    next(error);
  }
};

// @desc    Get conversation between two users
// @route   GET /api/chat/conversation/:userId
// @access  Private
const getConversation = async (req, res, next) => {
  try {
    const currentUserId = req.user._id;
    const otherUserId = req.params.userId;
    
    // Check if other user exists
    const otherUser = await User.findById(otherUserId);
    if (!otherUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Get messages between the two users
    const messages = await Message.find({
      $or: [
        { sender: currentUserId, recipient: otherUserId },
        { sender: otherUserId, recipient: currentUserId }
      ]
    })
      .populate('sender recipient')
      .sort({ createdAt: 1 });
    
    // Mark messages as read
    await Message.updateMany(
      { recipient: currentUserId, sender: otherUserId, isRead: false },
      { isRead: true }
    );
    
    res.json(messages);
  } catch (error) {
    next(error);
  }
};

// @desc    Get unread messages count
// @route   GET /api/chat/unread-count
// @access  Private
const getUnreadCount = async (req, res, next) => {
  try {
    const userId = req.user._id;
    
    const unreadCount = await Message.countDocuments({
      recipient: userId,
      isRead: false
    });
    
    res.json({ unreadCount });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  sendMessage,
  getConversation,
  getUnreadCount,
};