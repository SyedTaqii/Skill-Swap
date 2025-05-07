import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the AuthContext to manage authentication state
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // To store user info
    const [isAuthenticated, setIsAuthenticated] = useState(false); // To track if user is logged in

    // Check if user is already logged in on page load
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        if (storedUser && token) {
            setUser(JSON.parse(storedUser)); // Set user info from localStorage
            setIsAuthenticated(true); // User is authenticated
        }
    }, []);

    const login = (userData, token) => {
        localStorage.setItem('user', JSON.stringify(userData)); // Store user info in localStorage
        localStorage.setItem('token', token); // Store token in localStorage
        setUser(userData); // Update user state
        setIsAuthenticated(true); // User is logged in
    };

    const logout = () => {
        localStorage.removeItem('user'); // Remove user info from localStorage
        localStorage.removeItem('token'); // Remove token from localStorage
        setUser(null); // Clear user state
        setIsAuthenticated(false); // Mark as logged out
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext); // Custom hook to use AuthContext
