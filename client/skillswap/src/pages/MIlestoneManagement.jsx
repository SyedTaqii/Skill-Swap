import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api'; // Assuming API.js is set up for making requests

function MilestoneManagement() {
    const { projectId } = useParams(); // Get projectId from the URL
    const [milestones, setMilestones] = useState([]);
    const [newMilestone, setNewMilestone] = useState({
        title: '',
        budget: '',
        deadline: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch milestones for the project
        const fetchMilestones = async () => {
            try {
                const response = await API.get(`/projects/${projectId}/milestones`);
                setMilestones(response.data);
            } catch (error) {
                setError('Error fetching milestones.');
            }
        };

        fetchMilestones();
    }, [projectId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewMilestone((prevMilestone) => ({
            ...prevMilestone,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post(`/projects/${projectId}/milestones`, newMilestone);
            setMilestones((prevMilestones) => [...prevMilestones, response.data]);
            setNewMilestone({ title: '', budget: '', deadline: '' }); // Reset form
            alert('Milestone created successfully!');
        } catch (error) {
            setError('Error creating milestone.');
        }
    };

    const handleCompleteMilestone = async (milestoneId) => {
        try {
            const response = await API.put(`/projects/${projectId}/milestones/${milestoneId}/complete`);
            setMilestones((prevMilestones) =>
                prevMilestones.map((milestone) =>
                    milestone._id === milestoneId ? { ...milestone, status: 'Completed' } : milestone
                )
            );
            alert('Milestone marked as completed!');
        } catch (error) {
            setError('Error marking milestone as completed.');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-md">
            <h2 className="text-2xl font-bold text-center mb-4">Milestone Management</h2>

            {error && <p className="text-red-600 mb-2">{error}</p>} {/* Display error message */}

            <h3 className="text-xl font-semibold mb-4">Milestones</h3>
            <ul className="space-y-4">
                {milestones.map((milestone) => (
                    <li key={milestone._id} className="border p-4 rounded">
                        <h4 className="text-lg font-semibold">{milestone.title}</h4>
                        <p><strong>Budget:</strong> ${milestone.budget}</p>
                        <p><strong>Deadline:</strong> {milestone.deadline}</p>
                        <p><strong>Status:</strong> {milestone.status}</p>

                        {/* Show the 'Complete' button only if the milestone is not completed yet */}
                        {milestone.status !== 'Completed' && (
                            <button
                                onClick={() => handleCompleteMilestone(milestone._id)}
                                className="btn bg-green-600 text-white"
                            >
                                Mark as Completed
                            </button>
                        )}
                    </li>
                ))}
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-4">Create New Milestone</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block">Milestone Title</label>
                    <input
                        type="text"
                        className="input w-full"
                        placeholder="Enter milestone title"
                        name="title"
                        value={newMilestone.title}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-4">
                    <label className="block">Budget</label>
                    <input
                        type="number"
                        className="input w-full"
                        placeholder="Enter milestone budget"
                        name="budget"
                        value={newMilestone.budget}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-4">
                    <label className="block">Deadline</label>
                    <input
                        type="date"
                        className="input w-full"
                        name="deadline"
                        value={newMilestone.deadline}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" className="btn bg-blue-600 text-white w-full">
                    Create Milestone
                </button>
            </form>
        </div>
    );
}

export default MilestoneManagement;
