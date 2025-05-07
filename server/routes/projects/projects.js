const express = require('express');
const router = express.Router();
const bidRoutes = require('./bidRoutes');
const auth = require('../../middleware/auth');
const allowRoles = require('../../middleware/roles');
const projectController = require('../../controllers/projects/projectController');

// Public
router.get('/', projectController.getAllProjects);
router.get('/:id', projectController.getProjectById);

// Client-only
router.post('/', auth, allowRoles('client'), projectController.createProject);
router.put('/:id', auth, allowRoles('client'), projectController.updateProject);
router.delete('/:id', auth, allowRoles('client'), projectController.deleteProject);

// Freelancer-only
router.use('/:projectId/bids', bidRoutes);

module.exports = router;
