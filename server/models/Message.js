const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: String,
    readStatus: { type: Boolean, default: false },
    timestamp: { type: Date, default: Date.now },
    metadata: String, // SHA-256 hash for privacy
});

module.exports = mongoose.model('Message', MessageSchema);
