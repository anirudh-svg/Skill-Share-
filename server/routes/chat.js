const express = require('express');
const router = express.Router();
const {
  sendMessage,
  getConversation,
  getUnreadCount,
} = require('../controllers/chatController');
const auth = require('../middleware/auth');

router.route('/send').post(auth, sendMessage);
router.route('/conversation/:userId').get(auth, getConversation);
router.route('/unread-count').get(auth, getUnreadCount);

module.exports = router;