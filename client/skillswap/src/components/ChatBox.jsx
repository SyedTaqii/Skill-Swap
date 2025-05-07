import { useEffect, useRef, useState } from 'react';
import API from '../services/api';
import { useSocket } from '../context/SocketContext';
import { useAuth } from '../context/AuthContext';

function ChatBox({ receiverId }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const socket = useSocket();
    const { user } = useAuth();
    const scrollRef = useRef();

    useEffect(() => {
        if (receiverId) {
            API.get(`/messages/${receiverId}`).then(res => setMessages(res.data));
        }
    }, [receiverId]);

    useEffect(() => {
        if (!socket) return;
        socket.on('message:new', (msg) => {
            if (msg.senderId === receiverId || msg.receiverId === receiverId) {
                setMessages(prev => [...prev, msg]);
            }
        });

        return () => socket.off('message:new');
    }, [socket, receiverId]);

    const sendMessage = async (e) => {
        e.preventDefault();
        const newMsg = {
            receiverId,
            content: input,
        };
        const res = await API.post('/messages', newMsg);
        setMessages(prev => [...prev, res.data]);
        setInput('');
    };

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="border p-4 rounded bg-white max-w-xl mx-auto">
            <div className="h-64 overflow-y-auto mb-4">
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        ref={i === messages.length - 1 ? scrollRef : null}
                        className={`mb-2 ${msg.senderId === user.id ? 'text-right' : 'text-left'}`}
                    >
                        <span className={`inline-block px-3 py-1 rounded ${msg.senderId === user.id ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                            {msg.content}
                        </span>
                    </div>
                ))}
            </div>

            <form onSubmit={sendMessage} className="flex gap-2">
                <input
                    className="input flex-grow"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                />
                <button type="submit" className="btn">Send</button>
            </form>
        </div>
    );
}

export default ChatBox;
