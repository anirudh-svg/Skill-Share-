const User = require('../models/User');

// @desc    Get all users
// @route   GET /api/users
// @access  Public
const getUsers = async (req, res, next) => {
  try {
    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    // Search and filter
    const searchQuery = req.query.search || '';
    const locationFilter = req.query.location || '';
    const skillOfferedFilter = req.query.skillOffered || '';
    const skillWantedFilter = req.query.skillWanted || '';
    
    // Build filter object
    let filter = {};
    
    if (searchQuery) {
      filter.$or = [
        { name: { $regex: searchQuery, $options: 'i' } },
        { bio: { $regex: searchQuery, $options: 'i' } }
      ];
    }
    
    if (locationFilter) {
      filter.location = { $regex: locationFilter, $options: 'i' };
    }
    
    if (skillOfferedFilter) {
      filter['skillsOffered.name'] = { $regex: skillOfferedFilter, $options: 'i' };
    }
    
    if (skillWantedFilter) {
      filter['skillsWanted.name'] = { $regex: skillWantedFilter, $options: 'i' };
    }
    
    // Get users
    const users = await User.find(filter)
      .select('-password')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    
    // Get total count
    const totalCount = await User.countDocuments(filter);
    
    res.json({
      users,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Public
const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    next(error);
  }
};

// @desc    Add rating to user
// @route   POST /api/users/:id/rating
// @access  Private
const addUserRating = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;
    const userId = req.params.id;
    const reviewerId = req.user._id;
    
    // Check if user exists
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check if user is trying to rate themselves
    if (user._id.toString() === reviewerId.toString()) {
      return res.status(400).json({ message: 'You cannot rate yourself' });
    }
    
    // Check if user has already rated this user
    const existingRating = user.ratings.find(
      (r) => r.userId.toString() === reviewerId.toString()
    );
    
    if (existingRating) {
      return res.status(400).json({ message: 'You have already rated this user' });
    }
    
    // Add rating
    user.ratings.push({
      userId: reviewerId,
      rating,
      comment,
    });
    
    // Recalculate average rating
    user.calculateAverageRating();
    
    await user.save();
    
    res.json({
      message: 'Rating added successfully',
      averageRating: user.averageRating,
      totalRatings: user.totalRatings,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getUserById,
  addUserRating,
};