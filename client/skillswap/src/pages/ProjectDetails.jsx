import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';

import ProjectStatusUpdate from '../components/ProjectStatusUpdate';  // Project Status Update Component
import PaymentTracking from '../components/PaymentTracking';        // Payment Tracking Component
import ProgressBar from '../components/ProgressBar';                // Progress Bar Component
import LeaveReview from '../components/LeaveReview';
import ClientReviews from '../components/ClientReviews';              // Leave Review Component
import Chat from '../components/Chat';  // Import the Chat Component

function ProjectDetails() {
    const { projectId, clientId } = useParams(); // Get projectId and clientId from URL
    const [project, setProject] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
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

    const handleDelete = async () => {
        try {
            const response = await API.delete(`/projects/${projectId}`);
            if (response.status === 200) {
                alert('Project deleted successfully!');
                navigate('/client-dashboard'); // Redirect to the client dashboard after successful deletion
            }
        } catch (error) {
            setError('Error deleting project.');
        }
    };

    const handleUpdateStatus = async (milestoneId, newStatus) => {
        try {
            const response = await API.put(`/projects/${projectId}/milestones/${milestoneId}/status`, { status: newStatus });
            const updatedMilestones = project.milestones.map((milestone) =>
                milestone._id === milestoneId ? { ...milestone, status: newStatus } : milestone
            );
            setProject({ ...project, milestones: updatedMilestones });
            alert('Milestone status updated successfully');
        } catch (error) {
            setError('Error updating milestone status');
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

                    {/* Display Project Progress */}
                    <ProgressBar percentage={project.progress} />  {/* Displays the overall project progress */}

                    {/* Milestone Completion */}
                    <div className="mt-4">
                        <h3 className="text-xl font-semibold mb-2">Milestones</h3>
                        <ul className="space-y-2">
                            {project.milestones.map((milestone, index) => (
                                <li key={index}>
                                    <p><strong>Milestone:</strong> {milestone.name}</p>
                                    <p>Status: {milestone.status}</p>
                                    {milestone.status === 'In Progress' && (
                                        <button
                                            onClick={() => handleUpdateStatus(milestone._id, 'Completed')}
                                            className="btn bg-green-600 text-white"
                                        >
                                            Mark as Completed
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Update Project Status */}
                    {project.status !== 'Completed' && (
                        <div className="mt-4">
                            <button
                                onClick={() => handleUpdateStatus('In Progress')}
                                className="btn bg-yellow-600 text-white"
                            >
                                Mark as In Progress
                            </button>
                        </div>
                    )}
                    {project.status === 'In Progress' && (
                        <div className="mt-4">
                            <button
                                onClick={() => handleUpdateStatus('Completed')}
                                className="btn bg-blue-600 text-white"
                            >
                                Mark as Completed
                            </button>
                        </div>
                    )}

                    {/* Delete Project */}
                    <div className="mt-4">
                        <button
                            onClick={handleDelete}
                            className="btn bg-red-600 text-white mt-4"
                        >
                            Delete Project
                        </button>
                    </div>

                    {/* Status Update */}
                    <ProjectStatusUpdate projectId={projectId} />  {/* Allow updating project status */}

                    {/* Payment Tracking */}
                    <PaymentTracking projectId={projectId} />  {/* Track payments for milestones */}

                    {/* Leave a Review for the Client (if project is completed) */}
                    {project.status === 'Completed' && (
                        <LeaveReview projectId={projectId} clientId={clientId} />
                    )}

                    <ClientReviews clientId={clientId} />

                    {/* Chat Component for Real-Time Messaging */}
                    <Chat projectId={projectId} userId={clientId} />  {/* Real-time chat for project communication */}

                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default ProjectDetails;
