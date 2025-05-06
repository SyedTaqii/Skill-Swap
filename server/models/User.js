const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ['client', 'freelancer', 'admin'], default: 'client' },
    verified: { type: Boolean, default: false },
    skills: [String],
    portfolio: [String],
    verified: { type: Boolean, default: false },
    verification: {
        level: { type: String, enum: ['Basic', 'Verified', 'Premium'], default: 'Basic' },
        status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
        documents: [String] // paths to uploaded files
    },
    notificationPrefs: {
        email: { type: Boolean, default: true },
        sms: { type: Boolean, default: false },
        inApp: { type: Boolean, default: true }
    },
    avgRating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
