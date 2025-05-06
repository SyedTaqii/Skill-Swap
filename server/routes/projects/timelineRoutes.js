const express = require('express');
const router = express.Router({ mergeParams: true });
const auth = require('../../middleware/auth');
const roles = require('../../middleware/roles');
const ctrl = require('../../controllers/projects/timelineController');

router.put('/', auth, roles('freelancer'), ctrl.updateTimeline);

module.exports = router;
