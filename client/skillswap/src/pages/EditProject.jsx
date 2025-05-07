import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api'; // Assuming API.js is set up for making requests

function EditProject() {
    const { projectId } = useParams(); // Get projectId from the URL
    const [project, setProject] = useState({
        title: '',
        description: '',
        budget: '',
        deadline: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch project details from backend
        const fetchProjectDetails = async () => {
            try {
                const response = await API.get(`/projects/${projectId}`);
                setProject(response.data); // Set project data for editing
            } catch (error) {
                setError('Error fetching project details.');
            }
        };

        fetchProjectDetails();
    }, [projectId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProject((prevProject) => ({
            ...prevProject,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await API.put(`/projects/${projectId}`, project);

            if (response.status === 200) {
                alert('Project updated successfully!');
                navigate(`/client-dashboard`); // Redirect to client dashboard after successful edit
            }
        } catch (error) {
            setError('Error updating project.');
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md">
            <h2 className="text-2xl font-bold text-center mb-4">Edit Project</h2>

            {error && <p className="text-red-600 mb-2">{error}</p>} {/* Display error message */}

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="input w-full mb-4"
                    placeholder="Project Title"
                    name="title"
                    value={project.title}
                    onChange={handleChange}
                />
                <textarea
                    className="input w-full mb-4"
                    placeholder="Project Description"
                    name="description"
                    value={project.description}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    className="input w-full mb-4"
                    placeholder="Budget"
                    name="budget"
                    value={project.budget}
                    onChange={handleChange}
                />
                <input
                    type="date"
                    className="input w-full mb-4"
                    name="deadline"
                    value={project.deadline}
                    onChange={handleChange}
                />
                <button type="submit" className="btn w-full bg-blue-600 text-white">
                    Update Project
                </button>
            </form>
        </div>
    );
}

export default EditProject;
