const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const roles = require('../../middleware/roles');
const ctrl = require('../../controllers/freelancers/reviewController');

// Client submits review
router.post('/', auth, roles('client'), ctrl.submitReview);

// Freelancer responds to review
router.put('/:reviewId/respond', auth, roles('freelancer'), ctrl.respondToReview);

// Get all reviews for a freelancer
router.get('/:freelancerId', ctrl.getFreelancerReviews);

module.exports = router;
