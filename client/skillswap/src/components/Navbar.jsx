import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white border-b shadow-sm px-6 py-3 flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-blue-600">SkillSwap</Link>

            <div className="flex items-center gap-4">
                <Link to="/" className="text-sm text-gray-700 hover:text-blue-600">Home</Link>
                {isAuthenticated && (
                    <>
                        <Link to="/dashboard" className="text-sm text-gray-700 hover:text-blue-600">Dashboard</Link>
                        <Link to="/notifications/preferences" className="text-sm text-gray-700 hover:text-blue-600">Notifications</Link>
                        <span className="text-sm text-gray-500">({user.role})</span>
                        <button onClick={handleLogout} className="text-sm text-red-600 hover:underline">Logout</button>
                    </>
                )}
                {!isAuthenticated && (
                    <>
                        <Link to="/login" className="btn">Login</Link>
                        <Link to="/signup" className="btn">Signup</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
