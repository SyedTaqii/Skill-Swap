import { useEffect, useState } from 'react';
import API from '../../services/api';
import { Link } from 'react-router-dom';
import BarChart from '../../components/BarChart';

function FreelancerDashboard() {
    const [stats, setStats] = useState({});
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        API.get('/analytics/freelancer').then(res => setStats(res.data));
        API.get('/projects').then(res => setProjects(res.data));
    }, []);

    const acceptedProjects = projects.filter(p =>
        p.bids.some(b => b.status === 'accepted')
    );

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Freelancer Dashboard</h2>

            {(stats.totalBids !== undefined) && (
                <div className="mb-6">
                    <BarChart
                        labels={['Total Bids', 'Accepted Bids']}
                        data={[stats.totalBids || 0, stats.accepted || 0]}
                        title="Bid Performance"
                    />
                </div>
            )}
            <div className="space-y-2 mb-6">
                <p>⭐ Avg. Bid Price: ${stats.avgBid}</p>
                <p>📊 Acceptance Ratio: {stats.acceptRatio * 100}%</p>
            </div>

            <h3 className="text-lg font-semibold mb-2">📁 My Projects</h3>
            <div className="space-y-3">
                {acceptedProjects.map(project => (
                    <div key={project._id} className="border p-4 rounded bg-white">
                        <div className="flex justify-between items-center">
                            <h4 className="font-bold">{project.title}</h4>
                            <span className="text-sm text-blue-600">{project.status}</span>
                        </div>
                        <Link to={`/freelancer/projects/${project._id}`} className="text-blue-500 underline text-sm">
                            Track Progress
                        </Link>
                    </div>
                ))}
            </div>

            <Link to="/notifications/preferences" className="text-sm text-blue-600 underline">
                Notification Settings
            </Link>

        </div>
    );
}

export default FreelancerDashboard;
