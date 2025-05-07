import { useEffect, useState } from 'react';
import API from '../../services/api';
import PieChart from '../../components/PieChart';
import { Link } from 'react-router-dom';

function AdminDashboard() {
    const [data, setData] = useState({ users: [], popularSkills: [], projectStats: [] });

    useEffect(() => {
        API.get('/analytics/admin').then(res => setData(res.data));
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <div>
                    <h3 className="font-semibold mb-2">👥 Users by Role</h3>
                    <PieChart
                        labels={data.users.map(u => u._id)}
                        data={data.users.map(u => u.count)}
                    />
                </div>

                <div>
                    <h3 className="font-semibold mb-2">🔥 Top Skills</h3>
                    <PieChart
                        labels={data.popularSkills.map(s => s._id)}
                        data={data.popularSkills.map(s => s.count)}
                    />
                </div>

                <div>
                    <h3 className="font-semibold mb-2">📁 Project Status</h3>
                    <PieChart
                        labels={data.projectStats.map(p => p._id)}
                        data={data.projectStats.map(p => p.count)}
                    />
                </div>
            </div>

            <Link to="/notifications/preferences" className="text-sm text-blue-600 underline">
                Notification Settings
            </Link>


        </div>
    );
}

export default AdminDashboard;
