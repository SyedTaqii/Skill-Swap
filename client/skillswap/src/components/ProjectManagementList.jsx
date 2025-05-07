import React, { useState, useEffect } from 'react';
import API from '../services/api'; // API service for making requests

function ProjectManagementList() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await API.get('/admin/projects');
                setProjects(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching projects.');
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const handleStatusChange = async (projectId, status) => {
        try {
            await API.put(`/admin/projects/${projectId}/status`, { status });
            setProjects(projects.map((project) =>
                project._id === projectId ? { ...project, status } : project
            ));
            alert(`Project ${status === 'approved' ? 'approved' : 'rejected'} successfully!`);
        } catch (error) {
            setError('Error updating project status.');
        }
    };

    if (loading) return <p>Loading projects...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-semibold">Project Management</h3>
            <table className="table-auto w-full border">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border">Title</th>
                        <th className="px-4 py-2 border">Description</th>
                        <th className="px-4 py-2 border">Status</th>
                        <th className="px-4 py-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project) => (
                        <tr key={project._id}>
                            <td className="px-4 py-2 border">{project.title}</td>
                            <td className="px-4 py-2 border">{project.description}</td>
                            <td className="px-4 py-2 border">{project.status}</td>
                            <td className="px-4 py-2 border">
                                <button
                                    onClick={() => handleStatusChange(project._id, 'approved')}
                                    className="btn bg-green-600 text-white mr-2"
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={() => handleStatusChange(project._id, 'rejected')}
                                    className="btn bg-red-600 text-white"
                                >
                                    Reject
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProjectManagementList;
