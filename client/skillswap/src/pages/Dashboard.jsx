import { useAuth } from '../context/AuthContext';
import FreelancerDashboard from './dashboard/FreelancerDashboard';
import AdminDashboard from './dashboard/AdminDashboard';
import ClientDashboard from './dashboard/ClientDashboard';

function Dashboard() {
    const { user } = useAuth();

    if (!user) return <div>Loading...</div>;

    switch (user.role) {
        case 'client':
            return <ClientDashboard />;
        case 'freelancer':
            return <FreelancerDashboard />;
        case 'admin':
            return <AdminDashboard />;
        default:
            return <div>Invalid role</div>;
    }
}

export default Dashboard;
