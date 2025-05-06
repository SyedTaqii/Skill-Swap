const Project = require('../../models/Project');

exports.updateTimeline = async (req, res) => {
    const { projectId } = req.params;
    const { progress, milestones, timeLog } = req.body;

    try {
        const project = await Project.findById(projectId);
        if (!project) return res.status(404).json({ error: "Project not found" });

        // Allow only assigned freelancer
        const bid = project.bids.find(b => b.freelancerId.toString() === req.user.id && b.status === 'accepted');
        if (!bid) return res.status(403).json({ error: "Unauthorized" });

        if (progress !== undefined) project.timeline.progress = progress;
        if (milestones) project.timeline.milestones = milestones;
        if (timeLog) project.timeline.timeLogs.push(timeLog);

        await project.save();
        res.json({ message: "Timeline updated", timeline: project.timeline });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
