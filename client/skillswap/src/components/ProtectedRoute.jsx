import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children }) {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" />; // Redirect to login if not authenticated
    }

    return children; // If authenticated, render the protected component
}

export default ProtectedRoute;
