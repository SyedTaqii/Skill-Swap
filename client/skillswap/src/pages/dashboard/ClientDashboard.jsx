import { useEffect, useState } from 'react';
import API from '../../services/api';
import { Link } from 'react-router-dom';
import BarChart from '../../components/BarChart';

function ClientDashboard() {
    const [stats, setStats] = useState({});
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        API.get('/analytics/client').then(res => setStats(res.data));
        API.get('/projects').then(res => setProjects(res.data));
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Client Dashboard</h2>

            {(stats.total !== undefined) && (
                <div className="mb-6">
                    <BarChart
                        labels={['Total', 'In Progress', 'Completed']}
                        data={[stats.total, stats.inProgress, stats.completed]}
                        title="Project Status"
                    />
                </div>
            )}

            <Link to="/projects/new" className="btn inline-block mb-6">+ Post New Project</Link>

            <h3 className="text-lg font-semibold mb-2">🗂 My Projects</h3>
            <div className="space-y-3">
                {projects.map((project) => (
                    <div key={project._id} className="border p-4 rounded bg-white">
                        <div className="flex justify-between items-center">
                            <h4 className="font-bold">{project.title}</h4>
                            <span className={`text-sm ${project.status === 'completed' ? 'text-green-600' : 'text-yellow-600'}`}>
                                {project.status}
                            </span>
                        </div>
                        <p className="text-sm text-gray-600">{project.description.slice(0, 100)}...</p>
                        <Link to={`/projects/${project._id}`} className="text-blue-600 underline text-sm">
                            View Details
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

export default ClientDashboard;
