const express = require('express');
const router = express.Router({ mergeParams: true });

const auth = require('../../middleware/auth');
const allowRoles = require('../../middleware/roles');
const bidCtrl = require('../../controllers/projects/bidController');

// Freelancer adds/edits bids
router.post('/', auth, allowRoles('freelancer'), bidCtrl.submitBid);
router.put('/:bidId', auth, allowRoles('freelancer'), bidCtrl.updateBid);

// Client or freelancer gets all bids
router.get('/', auth, allowRoles('client', 'freelancer'), bidCtrl.getBidsForProject);

module.exports = router;
