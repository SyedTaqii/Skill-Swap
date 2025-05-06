const jwt = require('jsonwebtoken');
const { jwtSecret } = require('./config');

exports.generateToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        jwtSecret,
        { expiresIn: '7d' }
    );
};

exports.verifyToken = (token) => jwt.verify(token, jwtSecret);
