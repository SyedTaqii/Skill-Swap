import React, { useState, useEffect } from 'react';
import API from '../services/api'; // Assuming API.js is set up for making requests

function PaymentTracking({ projectId }) {
    const [milestones, setMilestones] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch milestones and payment status for the project
        const fetchMilestones = async () => {
            try {
                const response = await API.get(`/projects/${projectId}/milestones`);
                setMilestones(response.data);
            } catch (error) {
                setError('Error fetching milestones and payment details.');
            }
        };

        fetchMilestones();
    }, [projectId]);

    const handleMarkAsPaid = async (milestoneId) => {
        try {
            const response = await API.put(`/projects/${projectId}/milestones/${milestoneId}/mark-paid`);
            if (response.status === 200) {
                setMilestones((prevMilestones) =>
                    prevMilestones.map((milestone) =>
                        milestone._id === milestoneId
                            ? { ...milestone, paymentStatus: 'Paid' }
                            : milestone
                    )
                );
                alert('Milestone payment marked as paid.');
            }
        } catch (error) {
            setError('Error marking milestone as paid.');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-md">
            <h2 className="text-2xl font-bold text-center mb-4">Payment Tracking</h2>

            {error && <p className="text-red-600 mb-2">{error}</p>}

            <h3 className="text-xl font-semibold mb-4">Milestones Payments</h3>
            <ul className="space-y-4">
                {milestones.map((milestone) => (
                    <li key={milestone._id} className="border p-4 rounded">
                        <h4 className="text-lg font-semibold">{milestone.title}</h4>
                        <p><strong>Budget:</strong> ${milestone.budget}</p>
                        <p><strong>Deadline:</strong> {milestone.deadline}</p>
                        <p><strong>Payment Status:</strong> {milestone.paymentStatus}</p>

                        {/* Button to mark as paid */}
                        {milestone.paymentStatus !== 'Paid' && (
                            <button
                                onClick={() => handleMarkAsPaid(milestone._id)}
                                className="btn bg-green-600 text-white"
                            >
                                Mark as Paid
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PaymentTracking;
