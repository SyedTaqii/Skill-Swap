import { useState, useEffect } from 'react';
import API from '../services/api'; // Assuming API.js is set up for making API requests
import ProgressBar from '../components/ProgressBar';  // Progress bar component
import PaymentTracking from '../components/PaymentTracking';  // Payment Tracking component
import NotificationIcon from '../components/NotificationIcon'; // Import NotificationIcon component

function FreelancerDashboard() {
    const [projects, setProjects] = useState([]); // Store freelancer projects
    const userId = 'userId123'; // Assuming you fetch userId from context, props, or auth system

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await API.get('/projects?role=freelancer'); // Get projects for freelancer
                setProjects(response.data); // Update the state with project data
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };
        fetchProjects();
    }, []);

    // Calculate project completion percentage based on milestone status
    const calculateCompletionPercentage = (milestones) => {
        const completedMilestones = milestones.filter((milestone) => milestone.status === 'Completed').length;
        return (completedMilestones / milestones.length) * 100;
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Freelancer Dashboard</h2>

                {/* Notification Icon */}
                <NotificationIcon userId={userId} />
            </div>

            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">My Bids</h3>
                <div className="space-y-4">
                    {projects.length === 0 ? (
                        <p>No active bids. <a href="/freelancer-search" className="text-blue-600">Search for projects to bid on</a></p>
                    ) : (
                        projects.map((project) => (
                            <div key={project._id} className="border p-4 rounded bg-white">
                                <h4 className="font-semibold">{project.title}</h4>
                                <p>{project.description}</p>
                                <p>Status: {project.status}</p>

                                {/* Display Progress Bar */}
                                <ProgressBar percentage={calculateCompletionPercentage(project.milestones)} />  {/* Display project progress */}

                                {/* Payment Tracking */}
                                <PaymentTracking projectId={project._id} />  {/* Track payments for milestones */}

                                {/* Link to Track Progress */}
                                <a href={`/freelancer/projects/${project._id}`} className="text-blue-600">Track Progress</a>

                                {/* If project is completed, show Leave a Review link */}
                                {project.status === 'Completed' && (
                                    <div className="mt-4">
                                        <a href={`/freelancer/projects/${project._id}/leave-review`} className="text-blue-600">Leave a Review</a>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default FreelancerDashboard;
