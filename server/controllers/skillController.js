const Skill = require('../models/Skill');

// @desc    Get all skills
// @route   GET /api/skills
// @access  Public
const getSkills = async (req, res, next) => {
  try {
    // Search query
    const searchQuery = req.query.search || '';
    
    // Build filter
    const filter = searchQuery 
      ? { name: { $regex: searchQuery, $options: 'i' } } 
      : {};
    
    // Get skills
    const skills = await Skill.find(filter)
      .sort({ popularity: -1, name: 1 });
    
    res.json(skills);
  } catch (error) {
    next(error);
  }
};

// @desc    Get popular skills
// @route   GET /api/skills/popular
// @access  Public
const getPopularSkills = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    
    const skills = await Skill.find()
      .sort({ popularity: -1 })
      .limit(limit);
    
    res.json(skills);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new skill (admin only)
// @route   POST /api/skills
// @access  Private/Admin
const createSkill = async (req, res, next) => {
  try {
    const { name, category, description } = req.body;
    
    // Check if skill already exists
    const existingSkill = await Skill.findOne({ 
      name: { $regex: new RegExp(`^${name}$`, 'i') } 
    });
    
    if (existingSkill) {
      return res.status(400).json({ message: 'Skill already exists' });
    }
    
    // Create skill
    const skill = await Skill.create({
      name,
      category,
      description
    });
    
    res.status(201).json(skill);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSkills,
  getPopularSkills,
  createSkill,
};