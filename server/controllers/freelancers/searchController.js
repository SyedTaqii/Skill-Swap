const User = require('../../models/User');

exports.searchFreelancers = async (req, res) => {
    const { skills, level, sort, name } = req.query;

    let filter = { role: 'freelancer' };

    // Filter: Skills
    if (skills) {
        const skillArray = skills.split(','); // e.g. "React,Node"
        filter.skills = { $in: skillArray };
    }

    // Filter: Verification level
    if (level) {
        filter['verification.level'] = level;
    }

    // Filter: Name (optional)
    if (name) {
        filter.name = { $regex: name, $options: 'i' };
    }

    let sortQuery = {};

    // Sort Options
    switch (sort) {
        case 'name':
            sortQuery.name = 1;
            break;
        case 'newest':
            sortQuery.createdAt = -1;
            break;
        case 'rating': // placeholder for later
            sortQuery.avgRating = -1;
            break;
        default:
            sortQuery.createdAt = -1;
    }

    try {
        const freelancers = await User.find(filter)
            .sort(sortQuery)
            .select('-password');

        res.json(freelancers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
