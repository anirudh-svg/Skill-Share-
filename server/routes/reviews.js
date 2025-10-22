const express = require('express');
const router = express.Router();
const {
  createReview,
  getUserReviews,
} = require('../controllers/reviewController');
const auth = require('../middleware/auth');

router.route('/').post(auth, createReview);
router.route('/user/:userId').get(getUserReviews);

module.exports = router;