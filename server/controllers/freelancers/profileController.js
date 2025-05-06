const User = require('../../models/User');

// Get own freelancer profile
exports.getProfile = async (req, res) => {
    const user = await User.findById(req.user.id);
    if (user.role !== 'freelancer') return res.status(403).json({ error: "Access denied" });

    res.json(user);
};

// Update freelancer profile
exports.updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (user.role !== 'freelancer') return res.status(403).json({ error: "Access denied" });

        const { name, skills, portfolio } = req.body;

        user.name = name || user.name;
        user.skills = skills || user.skills;
        user.portfolio = portfolio || user.portfolio;

        await user.save();

        res.json({ message: "Profile updated", user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
