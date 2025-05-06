const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const roles = require('../../middleware/roles');
const ctrl = require('../../controllers/analytics/analyticsController');

// Client
router.get('/client', auth, roles('client'), ctrl.clientStats);

// Freelancer
router.get('/freelancer', auth, roles('freelancer'), ctrl.freelancerStats);

// Admin
router.get('/admin', auth, roles('admin'), ctrl.adminStats);

module.exports = router;
