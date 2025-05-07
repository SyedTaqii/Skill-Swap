const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const roles = require('../../middleware/roles');
const profileCtrl = require('../../controllers/freelancers/profileController');

router.get('/', auth, roles('freelancer'), profileCtrl.getProfile);
router.put('/', auth, roles('freelancer'), profileCtrl.updateProfile);

module.exports = router;
