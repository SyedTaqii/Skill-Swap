const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const ctrl = require('../../controllers/notifications/notifyController');

// Send notification (admin/service)
router.post('/email', ctrl.sendNotification); // Could be restricted
router.post('/sms', ctrl.sendNotification);
router.post('/in-app', ctrl.sendNotification);

// Get user notifications
router.get('/', auth, ctrl.getNotifications);

// Mark as read
router.put('/:id/read', auth, ctrl.markRead);

// User updates preferences
router.put('/preferences', auth, ctrl.updatePrefs);

module.exports = router;
