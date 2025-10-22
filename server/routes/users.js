const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUserById,
  addUserRating,
} = require('../controllers/userController');
const auth = require('../middleware/auth');

router.route('/').get(getUsers);
router.route('/:id').get(getUserById);
router.route('/:id/rating').post(auth, addUserRating);

module.exports = router;