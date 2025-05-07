const mongoose = require('mongoose');

const BidSchema = new mongoose.Schema({
    freelancerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    message: String,
    amount: Number,
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
}, { timestamps: true });

const ProjectSchema = new mongoose.Schema({
    title: String,
    description: String,
    requirements: String,
    deadline: Date,
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['open', 'in progress', 'completed'], default: 'open' },
    bids: [BidSchema],
    timeline: {
        progress: { type: Number, default: 0 }, // percent
        milestones: [{ name: String, status: String }],
        timeLogs: [{ date: Date, hours: Number }]
    },

}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
module.exports.Bid = mongoose.model('Bid', BidSchema);