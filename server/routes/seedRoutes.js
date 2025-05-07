const express = require('express');
const router = express.Router();
const { seedDatabase } = require('../controllers/seedController');

// Admin route to seed the database
router.post('/seed', seedDatabase);

module.exports = router;
