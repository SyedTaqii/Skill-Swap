import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function MainDashboard() {
    const { user } = useAuth(); // Access the authenticated user data
    const navigate = useNavigate(); // For redirecting after determining the user role

    useEffect(() => {
        if (user) {
            // Redirect based on the user's role
            if (user.role === 'client') {
                navigate('/client-dashboard'); // Redirect to Client Dashboard
            } else if (user.role === 'freelancer') {
                navigate('/freelancer-dashboard'); // Redirect to Freelancer Dashboard
            } else if (user.role === 'admin') {
                navigate('/admin-dashboard'); // Redirect to Admin Dashboard
            }
        }
    }, [user, navigate]);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Welcome, {user?.name}</h2>
            <p>Redirecting you to the appropriate dashboard...</p>
        </div>
    );
}

export default MainDashboard;
