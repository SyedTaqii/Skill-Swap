const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const socketIO = require('socket.io');
const authRoutes = require('./routes/auth/authRoutes');
const projectRoutes = require('./routes/projects/projects');
const messageRoutes = require('./routes/notifications/messageRoutes');
const profileRoutes = require('./routes/freelancers/profileRoutes');
const timelineRoutes = require('./routes/projects/timelineRoutes');
const verifyRoutes = require('./routes/admin/verificationRoutes');
const notifyRoutes = require('./routes/notifications/notifyRoutes');
const analyticsRoutes = require('./routes/analytics/analyticsRoutes');
const freelancerSearchRoutes = require('./routes/freelancers/searchRoutes');
const reviewRoutes = require('./routes/freelancers/reviewRoutes');

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
    cors: { origin: '*' }
});

// WebSocket mock event
io.on('connection', socket => {
    const userId = socket.handshake.query.userId;
    if (userId) socket.join(userId);

    socket.on('disconnect', () => {
        console.log(`User ${userId} disconnected`);
    });
});


// Attach to app for controller access
app.set('io', io);

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

app.use('/api/projects', projectRoutes);

app.use('/api/messages', messageRoutes);

app.use('/api/freelancer/profile', profileRoutes);

app.use('/api/projects/:projectId/timeline', timelineRoutes);

app.use('/api/admin/verify', verifyRoutes);

app.use('/api/notify', notifyRoutes);

app.use('/api/analytics', analyticsRoutes);

app.use('/api/freelancers/search', freelancerSearchRoutes);

app.use('/api/reviews', reviewRoutes);

// MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB Connected");
}).catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
