import React, { useState, useEffect } from 'react';
import API from '../services/api'; // Import API service to fetch data
import AdminStatsChart from '../components/AdminStatsChart'; // Import chart component for stats

function AdminDashboard() {
    const [stats, setStats] = useState({
        users: [],
        projects: [],
        topSkills: [],
        projectStats: [],
    });

    useEffect(() => {
        // Fetch stats data for the admin dashboard
        const fetchStats = async () => {
            try {
                const response = await API.get('/admin/stats');
                setStats(response.data);
            } catch (error) {
                console.error('Error fetching admin stats:', error);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

            {/* User Stats Section */}
            <div className="mb-6">
                <h3 className="font-semibold">👥 User Stats</h3>
                <div className="space-y-2">
                    {stats.users.map((user) => (
                        <p key={user._id}>
                            {user.role}: {user.count} users
                        </p>
                    ))}
                </div>
            </div>

            {/* Project Stats Section */}
            <div className="mb-6">
                <h3 className="font-semibold">📁 Project Stats</h3>
                <div className="space-y-2">
                    {stats.projectStats.map((stat) => (
                        <p key={stat._id}>
                            {stat.status}: {stat.count} projects
                        </p>
                    ))}
                </div>
            </div>

            {/* Top Skills Section */}
            <div className="mb-6">
                <h3 className="font-semibold">🔥 Top Skills</h3>
                <div className="space-y-2">
                    {stats.topSkills.map((skill) => (
                        <p key={skill._id}>
                            {skill.name}: {skill.count}
                        </p>
                    ))}
                </div>
            </div>

            {/* Stats Chart */}
            <div className="mt-6">
                <AdminStatsChart data={stats.projectStats} />
            </div>
        </div>
    );
}

export default AdminDashboard;
