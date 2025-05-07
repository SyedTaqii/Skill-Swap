import { useAuth } from '../context/AuthContext';
import FreelancerDashboard from './dashboard/FreelancerDashboard';
import AdminDashboard from './dashboard/AdminDashboard';
import ClientDashboard from './dashboard/ClientDashboard';

function Dashboard() {
    const { user } = useAuth();

    if (!user) return <div className="text-center py-10 text-gray-600">Loading...</div>;

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {user.role === 'client' && <ClientDashboard />}
            {user.role === 'freelancer' && <FreelancerDashboard />}
            {user.role === 'admin' && <AdminDashboard />}
        </div>
    );
}

export default Dashboard;
