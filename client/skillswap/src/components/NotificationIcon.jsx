import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import API from '../services/api';

function NotificationIcon({ userId }) {
    const [notifications, setNotifications] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Establish socket connection
        const socket = io('http://localhost:5000'); // Ensure this URL points to your server

        // Fetch unread notifications on load
        const fetchNotifications = async () => {
            try {
                const response = await API.get(`/notifications/${userId}`);
                setNotifications(response.data);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        // Listen for new notifications from the server
        socket.on('new_notification', (notification) => {
            setNotifications((prevNotifications) => [notification, ...prevNotifications]); // Add new notification
        });

        // Fetch notifications initially
        fetchNotifications();

        // Cleanup socket connection when component unmounts
        return () => {
            socket.disconnect();
        };
    }, [userId]);

    const markAsRead = async (notificationId) => {
        try {
            await API.put(`/notifications/${notificationId}/mark-read`);
            setNotifications(notifications.filter((n) => n._id !== notificationId)); // Remove read notification
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    return (
        <div className="relative">
            <button onClick={() => setIsOpen(!isOpen)} className="text-xl">
                <i className="fas fa-bell"></i>
            </button>
            <div className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 text-xs">
                {notifications.length}
            </div>
            {isOpen && (
                <div className="absolute bg-white shadow-md w-64 mt-2 p-4 rounded">
                    {notifications.length === 0 ? (
                        <p>No new notifications</p>
                    ) : (
                        notifications.map((notification) => (
                            <div key={notification._id} className="p-2">
                                <p>{notification.message}</p>
                                <button
                                    onClick={() => markAsRead(notification._id)}
                                    className="text-blue-600"
                                >
                                    Mark as Read
                                </button>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

export default NotificationIcon;
