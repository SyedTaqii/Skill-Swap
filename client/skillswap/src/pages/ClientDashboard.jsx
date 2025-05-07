import { useState, useEffect } from 'react';
import API from '../services/api'; // Assuming API.js is set up for making API requests

function ClientDashboard() {
    const [projects, setProjects] = useState([]); // Store client projects

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await API.get('/projects?role=client'); // Get projects for client
                setProjects(response.data); // Update the state with project data
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };
        fetchProjects();
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Client Dashboard</h2>

            <div className="mb-6">
                <h3 className="font-semibold">My Projects</h3>
                {projects.length === 0 ? (
                    <p>No projects found.</p>
                ) : (
                    projects.map((project) => (
                        <div key={project._id} className="border p-4 rounded">
                            <h4>{project.title}</h4>
                            <p>{project.description}</p>
                            <p>Status: {project.status}</p>
                            <button>Edit</button>
                            <button>Delete</button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default ClientDashboard;
