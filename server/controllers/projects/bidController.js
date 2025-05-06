const Project = require('../../models/Project');

exports.submitBid = async (req, res) => {
    const { projectId } = req.params;
    const { message, amount } = req.body;

    try {
        const project = await Project.findById(projectId);
        if (!project) return res.status(404).json({ error: "Project not found" });

        const newBid = {
            freelancerId: req.user.id,
            message,
            amount,
            status: 'pending'
        };

        project.bids.push(newBid);
        await project.save();

        // Emit via socket
        req.app.get('io').emit('bid:new', { projectId, bid: newBid });

        res.status(201).json({ message: 'Bid submitted', bid: newBid });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateBid = async (req, res) => {
    const { projectId, bidId } = req.params;
    const { message, amount } = req.body;

    try {
        const project = await Project.findById(projectId);
        if (!project) return res.status(404).json({ error: "Project not found" });

        const bid = project.bids.id(bidId);
        if (!bid) return res.status(404).json({ error: "Bid not found" });
        if (bid.freelancerId.toString() !== req.user.id) return res.status(403).json({ error: "Unauthorized" });

        bid.message = message;
        bid.amount = amount;

        await project.save();

        // Emit update
        req.app.get('io').emit('bid:updated', { projectId, bid });

        res.json({ message: 'Bid updated', bid });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getBidsForProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.projectId).populate('bids.freelancerId', 'name');
        if (!project) return res.status(404).json({ error: 'Project not found' });

        res.json(project.bids);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
