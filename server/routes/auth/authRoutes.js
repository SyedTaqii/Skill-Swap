const express = require('express');
const router = express.Router();
const { signup, login, verifyUser, resetPassword } = require('../../controllers/auth/authController');

router.post('/signup', signup);
router.post('/login', login);
// routes/auth.js
router.post("/verify", verifyUser);
router.post("/reset-password", resetPassword);
module.exports = router;
