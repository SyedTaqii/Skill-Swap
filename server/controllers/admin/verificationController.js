const User = require('../../models/User');
const Verification = require('../../models/Verification');

// Upload documents (freelancer)
exports.uploadDocuments = async (req, res) => {
    try {
        const files = req.files.map(file => file.path);
        const user = await User.findById(req.user.id);

        user.verification.status = 'pending';
        user.verification.documents = files;
        await user.save();

        res.status(200).json({ message: 'Documents uploaded', files });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Admin approves/rejects verification
exports.verifyFreelancer = async (req, res) => {
    const { userId } = req.params;
    const { level, status } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user || user.role !== 'freelancer')
            return res.status(404).json({ error: 'Freelancer not found' });

        user.verification.level = level;
        user.verification.status = status;

        await user.save();
        res.json({ message: `User verification ${status}` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all pending verifications (admin only)
exports.getPendingVerifications = async (req, res) => {
    try {
        const users = await User.find({ 'verification.status': 'pending', role: 'freelancer' });
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
