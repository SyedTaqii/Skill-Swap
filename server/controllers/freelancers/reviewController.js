const Review = require('../../models/Review');
const User = require('../../models/User');
const Project = require('../../models/Project');

// Client submits review
exports.submitReview = async (req, res) => {
    const { projectId, rating, comment } = req.body;

    try {
        const project = await Project.findById(projectId);
        if (!project || project.clientId.toString() !== req.user.id)
            return res.status(403).json({ error: "Unauthorized or invalid project" });

        const review = new Review({
            projectId,
            clientId: req.user.id,
            freelancerId: project.bids.find(b => b.status === 'accepted')?.freelancerId,
            rating,
            comment
        });

        await review.save();

        // Update freelancer's average rating
        const freelancer = await User.findById(review.freelancerId);
        const totalScore = freelancer.avgRating * freelancer.reviewCount + rating;
        freelancer.reviewCount += 1;
        freelancer.avgRating = totalScore / freelancer.reviewCount;
        await freelancer.save();

        res.status(201).json({ message: 'Review submitted', review });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Freelancer responds to review
exports.respondToReview = async (req, res) => {
    const { reviewId } = req.params;
    const { response } = req.body;

    try {
        const review = await Review.findById(reviewId);
        if (!review || review.freelancerId.toString() !== req.user.id)
            return res.status(403).json({ error: 'Unauthorized' });

        review.response = response;
        await review.save();

        res.json({ message: 'Response saved' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get freelancer reviews
exports.getFreelancerReviews = async (req, res) => {
    const { freelancerId } = req.params;

    try {
        const reviews = await Review.find({ freelancerId }).sort({ createdAt: -1 });
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
