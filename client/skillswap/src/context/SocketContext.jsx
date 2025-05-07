import { createContext, useContext, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const { user } = useAuth();
    const socket = useRef(null);

    useEffect(() => {
        if (user) {
            socket.current = io('http://localhost:5000', {
                query: { userId: user.id },
            });
        }
        return () => socket.current?.disconnect();
    }, [user]);

    return (
        <SocketContext.Provider value={socket.current}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => useContext(SocketContext);
