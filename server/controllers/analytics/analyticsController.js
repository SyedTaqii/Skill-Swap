const Project = require('../../models/Project');
const User = require('../../models/User');

// Client: Get their own project stats
exports.clientStats = async (req, res) => {
    const userId = req.user.id;

    try {
        const total = await Project.countDocuments({ clientId: userId });
        const completed = await Project.countDocuments({ clientId: userId, status: 'completed' });
        const inProgress = await Project.countDocuments({ clientId: userId, status: 'in progress' });

        res.json({ total, completed, inProgress });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Freelancer: Get bid analytics
exports.freelancerStats = async (req, res) => {
    const userId = req.user.id;

    try {
        const projects = await Project.find({ 'bids.freelancerId': userId });

        let totalBids = 0, accepted = 0, avgBid = 0, bidSum = 0;

        projects.forEach(project => {
            project.bids.forEach(bid => {
                if (bid.freelancerId.toString() === userId) {
                    totalBids++;
                    bidSum += bid.amount || 0;
                    if (bid.status === 'accepted') accepted++;
                }
            });
        });

        avgBid = totalBids > 0 ? (bidSum / totalBids).toFixed(2) : 0;
        const acceptRatio = totalBids > 0 ? (accepted / totalBids).toFixed(2) : 0;

        res.json({ totalBids, accepted, avgBid, acceptRatio });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Admin: Platform-wide analytics
exports.adminStats = async (req, res) => {
    try {
        const users = await User.aggregate([
            {
                $group: {
                    _id: '$role',
                    count: { $sum: 1 }
                }
            }
        ]);

        const popularSkills = await User.aggregate([
            { $unwind: '$skills' },
            {
                $group: {
                    _id: '$skills',
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } },
            { $limit: 10 }
        ]);

        const projectStats = await Project.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ]);

        res.json({ users, popularSkills, projectStats });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
