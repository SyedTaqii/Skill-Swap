const mongoose = require('mongoose');

const VerificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    documents: [String],
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    level: { type: String, enum: ['Basic', 'Verified', 'Premium'], default: 'Basic' },
}, { timestamps: true });

module.exports = mongoose.model('Verification', VerificationSchema);
