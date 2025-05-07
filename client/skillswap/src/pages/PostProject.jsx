import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api'; // Assuming API.js is set up for making API requests

function PostProject() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [budget, setBudget] = useState('');
    const [deadline, setDeadline] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // For redirecting after successful project creation

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Form validation
        if (!title || !description || !budget || !deadline) {
            setError('All fields are required');
            return;
        }

        try {
            // API call to create a new project
            const response = await API.post('/projects', { title, description, budget, deadline });

            if (response.status === 201) {
                setMessage('Project posted successfully!');
                // Redirect to client dashboard after a successful project post
                setTimeout(() => navigate('/client-dashboard'), 3000);
            } else {
                setError('Failed to post project');
            }
        } catch (error) {
            setError('Something went wrong');
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md">
            <h2 className="text-2xl font-bold text-center mb-4">Post a New Project</h2>

            {error && <p className="text-red-600 mb-2">{error}</p>}
            {message && <p className="text-green-600 mb-2">{message}</p>}

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="input w-full mb-4"
                    placeholder="Project Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    className="input w-full mb-4"
                    placeholder="Project Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="number"
                    className="input w-full mb-4"
                    placeholder="Budget"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                />
                <input
                    type="date"
                    className="input w-full mb-4"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                />
                <button type="submit" className="btn w-full mb-4">Post Project</button>
            </form>
        </div>
    );
}

export default PostProject;
