const express = require('express');
const router = express.Router();
const {
  getSkills,
  getPopularSkills,
  createSkill,
} = require('../controllers/skillController');
const auth = require('../middleware/auth');

router.route('/').get(getSkills);
router.route('/popular').get(getPopularSkills);
// Note: createSkill would typically have admin middleware
router.route('/').post(auth, createSkill);

module.exports = router;