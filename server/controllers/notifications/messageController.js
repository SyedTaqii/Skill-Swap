const Message = require('../../models/Message');
const { sha256Hash } = require('../../utils/hash');

exports.sendMessage = async (req, res) => {
    const { receiverId, content } = req.body;

    try {
        const newMsg = new Message({
            senderId: req.user.id,
            receiverId,
            content,
            metadata: sha256Hash(`${req.user.id}-${receiverId}-${Date.now()}`)
        });

        await newMsg.save();

        // Emit via WebSocket
        req.app.get('io').to(receiverId).emit('message:new', newMsg);

        res.status(201).json(newMsg);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getMessages = async (req, res) => {
    const { receiverId } = req.params;

    try {
        const messages = await Message.find({
            $or: [
                { senderId: req.user.id, receiverId },
                { senderId: receiverId, receiverId: req.user.id }
            ]
        }).sort({ timestamp: 1 });

        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.markAsRead = async (req, res) => {
    const { messageId } = req.params;

    try {
        const message = await Message.findById(messageId);
        if (!message || message.receiverId.toString() !== req.user.id)
            return res.status(403).json({ error: 'Unauthorized' });

        message.readStatus = true;
        await message.save();

        res.json({ message: 'Marked as read' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
