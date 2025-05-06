const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const roles = require('../../middleware/roles');
const upload = require('../../middleware/upload');
const ctrl = require('../../controllers/admin/verificationController');

// Freelancer uploads
router.post('/upload', auth, roles('freelancer'), upload.array('documents', 3), ctrl.uploadDocuments);

// Admin views & verifies
router.get('/pending', auth, roles('admin'), ctrl.getPendingVerifications);
router.put('/:userId', auth, roles('admin'), ctrl.verifyFreelancer);

module.exports = router;
