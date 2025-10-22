const express = require('express');
const router = express.Router();
const {
  createBooking,
  getUserBookings,
  getBookingById,
  updateBookingStatus,
} = require('../controllers/bookingController');
const auth = require('../middleware/auth');

router.route('/')
  .post(auth, createBooking)
  .get(auth, getUserBookings);

router.route('/:id')
  .get(auth, getBookingById);

router.route('/:id/status')
  .put(auth, updateBookingStatus);

module.exports = router;