const Notification = require('../../models/Notification');
const User = require('../../models/User');
const { sendEmail } = require('../../utils/mailer');
const { sendSMS } = require('../../utils/sms');

// Send in-app + optional email/sms
exports.sendNotification = async (req, res) => {
    const { userId, content } = req.body;

    try {
        const user = await User.findById(userId);
        const prefs = user.notificationPrefs;

        // In-app
        if (prefs.inApp) {
            const note = new Notification({ userId, type: 'in-app', content });
            await note.save();
        }

        // Email
        if (prefs.email) sendEmail(user.email, "SkillSwap Notification", content);

        // SMS (mocked)
        if (prefs.sms) sendSMS(user.phone || "0000000000", content);

        res.json({ message: "Notification dispatched" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Mark read
exports.markRead = async (req, res) => {
    try {
        const note = await Notification.findById(req.params.id);
        if (note.userId.toString() !== req.user.id) return res.status(403).json({ error: 'Unauthorized' });

        note.read = true;
        await note.save();
        res.json({ message: 'Marked as read' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all notifications
exports.getNotifications = async (req, res) => {
    const notes = await Notification.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(notes);
};

// Update preferences
exports.updatePrefs = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        user.notificationPrefs = req.body;
        await user.save();
        res.json({ message: "Preferences updated", prefs: user.notificationPrefs });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
