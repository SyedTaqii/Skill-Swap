const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { saltRounds } = require('./config');

exports.hashPassword = async (password) => await bcrypt.hash(password, saltRounds);
exports.comparePassword = async (plain, hash) => await bcrypt.compare(plain, hash);

// Hashing function for sensitive data (e.g., email)
exports.sha256Hash = (data) => {
    return crypto.createHash('sha256').update(data).digest('hex');
};

