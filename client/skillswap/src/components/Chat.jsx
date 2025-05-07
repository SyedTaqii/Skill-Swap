import React, { useState, useEffect } from 'react';
import { useSocket } from '../context/SocketContext'; // Import the custom hook

const Chat = ({ projectId, userId }) => {
    const { socket, isConnected } = useSocket();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Listen for incoming messages
        socket.on('message', (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        // Cleanup when component unmounts
        return () => {
            socket.off('message');
        };
    }, [socket]);

    const sendMessage = () => {
        if (message.trim() !== '') {
            const msg = {
                projectId,
                userId,
                text: message,
            };
            socket.emit('sendMessage', msg);
            setMessage('');
        }
    };

    return (
        <div>
            <h3>Chat</h3>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>{msg.text}</div>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="p-2 border rounded"
            />
            <button onClick={sendMessage} className="btn bg-blue-600 text-white">
                Send
            </button>
            {!isConnected && <p>Disconnected from server</p>}
        </div>
    );
};

export default Chat;
