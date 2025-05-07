const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const messageCtrl = require('../../controllers/notifications/messageController');

// Auth required
router.post('/', auth, messageCtrl.sendMessage);
router.get('/:receiverId', auth, messageCtrl.getMessages);
router.put('/read/:messageId', auth, messageCtrl.markAsRead);

module.exports = router;
