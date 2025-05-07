import { useState } from 'react';
import ChatBox from '../components/ChatBox';

function Chat() {
    const [receiverId, setReceiverId] = useState('');

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">💬 Chat</h2>

            <div className="mb-4">
                <input
                    placeholder="Enter receiver's user ID"
                    className="input w-full"
                    value={receiverId}
                    onChange={(e) => setReceiverId(e.target.value)}
                />
            </div>

            {receiverId && <ChatBox receiverId={receiverId} />}
        </div>
    );
}

export default Chat;
