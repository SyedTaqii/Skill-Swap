const Project = require('../../models/Project');

// Create a new project
exports.createProject = async (req, res) => {
    try {
        const { title, description, requirements, deadline } = req.body;
        const newProject = new Project({
            title,
            description,
            requirements,
            deadline,
            clientId: req.user.id,
        });

        await newProject.save();
        res.status(201).json({ message: 'Project created', project: newProject });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all projects
exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find().populate('clientId', 'name');
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get single project
exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ error: 'Project not found' });
        res.json(project);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update project (client-only)
exports.updateProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project || project.clientId.toString() !== req.user.id)
            return res.status(403).json({ error: 'Unauthorized' });

        Object.assign(project, req.body);
        await project.save();
        res.json({ message: 'Project updated', project });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete project (client-only)
exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project || project.clientId.toString() !== req.user.id)
            return res.status(403).json({ error: 'Unauthorized' });

        await project.remove();
        res.json({ message: 'Project deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
