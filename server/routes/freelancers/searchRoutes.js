const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const ctrl = require('../../controllers/freelancers/searchController');

// Public or auth can be added for logged-in filtering
router.get('/', ctrl.searchFreelancers);

module.exports = router;
