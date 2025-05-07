import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Assuming useAuth is used for getting the auth state

function Navbar() {
    const { user, logout } = useAuth(); // Get user info and logout method from AuthContext
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // Call the logout function from AuthContext
        navigate('/login'); // Redirect to login page after logout
    };

    return (
        <nav className="bg-blue-600 p-4">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-2xl font-bold">SkillSwap</Link>

                <div className="space-x-4">
                    {user ? (
                        <>
                            {/* If user is logged in, show dashboard links and logout */}
                            {user.role === 'client' && (
                                <Link to="/client-dashboard" className="text-white">Client Dashboard</Link>
                            )}
                            {user.role === 'freelancer' && (
                                <Link to="/freelancer-dashboard" className="text-white">Freelancer Dashboard</Link>
                            )}
                            <button onClick={handleLogout} className="text-white">Logout</button>
                        </>
                    ) : (
                        <>
                            {/* If user is not logged in, show login and signup links */}
                            <Link to="/login" className="text-white">Login</Link>
                            <Link to="/signup" className="text-white">Signup</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
