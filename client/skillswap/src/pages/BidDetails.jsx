import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api'; // Assuming API.js is set up for making requests

function BidDetails() {
    const { projectId } = useParams(); // Get project ID from URL
    const [project, setProject] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch project and bid details from backend
        const fetchProjectDetails = async () => {
            try {
                const response = await API.get(`/projects/${projectId}`);
                setProject(response.data);
            } catch (error) {
                setError('Error fetching project details.');
            }
        };
        fetchProjectDetails();
    }, [projectId]);

    const handleApproveBid = async (bidId) => {
        try {
            // API call to approve the bid
            const response = await API.put(`/projects/${projectId}/bids/${bidId}/approve`);

            // Update the project data locally
            const updatedProject = {
                ...project, bids: project.bids.map(bid =>
                    bid._id === bidId ? { ...bid, status: 'accepted' } : { ...bid, status: 'rejected' }
                )
            };

            setProject(updatedProject); // Update project state locally
            alert('Bid approved successfully!');
        } catch (error) {
            setError('Error approving bid');
        }
    };

    const handleRejectBid = async (bidId) => {
        try {
            // API call to reject the bid
            const response = await API.put(`/projects/${projectId}/bids/${bidId}/reject`);

            // Update the project data locally
            const updatedProject = {
                ...project, bids: project.bids.map(bid =>
                    bid._id === bidId ? { ...bid, status: 'rejected' } : bid
                )
            };

            setProject(updatedProject); // Update project state locally
            alert('Bid rejected successfully!');
        } catch (error) {
            setError('Error rejecting bid');
        }
    };

    if (error) return <p>{error}</p>;

    return (
        <div className="p-6">
            {project ? (
                <div>
                    <h2 className="text-2xl font-bold mb-4">{project.title}</h2>
                    <p><strong>Description:</strong> {project.description}</p>
                    <p><strong>Status:</strong> {project.status}</p>

                    <div className="mt-4">
                        <h3 className="text-lg font-semibold mb-2">Freelancer Bids</h3>
                        {project.bids.length === 0 ? (
                            <p>No bids placed yet.</p>
                        ) : (
                            <ul className="space-y-4">
                                {project.bids.map((bid) => (
                                    <li key={bid._id} className="border p-4 rounded">
                                        <h4 className="font-semibold">{bid.freelancer.name}</h4>
                                        <p><strong>Bid Amount:</strong> ${bid.amount}</p>
                                        <p><strong>Status:</strong> {bid.status}</p>
                                        <p><strong>Message:</strong> {bid.message}</p>
                                        {bid.status === 'pending' && (
                                            <div className="space-x-2 mt-2">
                                                <button
                                                    onClick={() => handleApproveBid(bid._id)}
                                                    className="btn bg-green-600 text-white"
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => handleRejectBid(bid._id)}
                                                    className="btn bg-red-600 text-white"
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            ) : (
                <p>Loading project details...</p>
            )}
        </div>
    );
}

export default BidDetails;
