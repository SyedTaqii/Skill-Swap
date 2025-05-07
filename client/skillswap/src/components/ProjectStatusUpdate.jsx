import React, { useState } from 'react';
import API from '../services/api'; // Assuming API.js is set up for making requests

function ProjectStatusUpdate({ projectId }) {
    const [status, setStatus] = useState('');
    const [updateMessage, setUpdateMessage] = useState('');
    const [error, setError] = useState('');

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    const handleUpdateMessageChange = (e) => {
        setUpdateMessage(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await API.put(`/projects/${projectId}/status`, {
                status,
                updateMessage,
            });

            if (response.status === 200) {
                alert('Project status updated successfully!');
                setStatus('');
                setUpdateMessage('');
            }
        } catch (error) {
            setError('Error updating project status.');
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto bg-white rounded shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Update Project Status</h3>

            {error && <p className="text-red-600 mb-2">{error}</p>} {/* Display error message */}

            <form onSubmit={handleSubmit}>
                {/* Status Update */}
                <div className="mb-4">
                    <label className="block">Project Status</label>
                    <select
                        className="input w-full"
                        value={status}
                        onChange={handleStatusChange}
                        required
                    >
                        <option value="">Select Status</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="On Hold">On Hold</option>
                    </select>
                </div>

                {/* Timeline Update Message */}
                <div className="mb-4">
                    <label className="block">Update Message</label>
                    <textarea
                        className="input w-full"
                        placeholder="Enter status update message (optional)"
                        value={updateMessage}
                        onChange={handleUpdateMessageChange}
                    />
                </div>

                <button type="submit" className="btn bg-blue-600 text-white w-full">
                    Update Status
                </button>
            </form>
        </div>
    );
}

export default ProjectStatusUpdate;
