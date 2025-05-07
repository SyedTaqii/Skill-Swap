import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api'; // Assuming API.js is set up for making requests

function PaymentDetails() {
    const { projectId } = useParams(); // Get project ID from the URL
    const [project, setProject] = useState(null);
    const [error, setError] = useState('');
    const [paymentStatus, setPaymentStatus] = useState(''); // Track payment status (Pending/Completed)
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch project details and payment status from backend
        const fetchProjectDetails = async () => {
            try {
                const response = await API.get(`/projects/${projectId}`);
                setProject(response.data);
                setPaymentStatus(response.data.paymentStatus); // Set initial payment status
            } catch (error) {
                setError('Error fetching project details.');
            }
        };
        fetchProjectDetails();
    }, [projectId]);

    const handleMakePayment = async (amount) => {
        try {
            // Simulate payment process (use actual payment gateway like Stripe/PayPal in production)
            const response = await API.post(`/projects/${projectId}/payment`, { amount });

            if (response.status === 200) {
                setPaymentStatus('Paid'); // Update payment status to 'Paid'
                alert('Payment successful!');
            }
        } catch (error) {
            setError('Error making payment');
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

                    {/* Payment Details */}
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold mb-2">Payment Information</h3>
                        <p><strong>Payment Status:</strong> {paymentStatus}</p>
                        <p><strong>Total Amount:</strong> ${project.budget}</p>

                        {/* Payment Button */}
                        {paymentStatus === 'Pending' && (
                            <button
                                onClick={() => handleMakePayment(project.budget)}
                                className="btn bg-green-600 text-white mt-4"
                            >
                                Make Payment
                            </button>
                        )}

                        {paymentStatus === 'Paid' && (
                            <p className="text-green-600 mt-4">Payment completed successfully!</p>
                        )}
                    </div>
                </div>
            ) : (
                <p>Loading project details...</p>
            )}
        </div>
    );
}

export default PaymentDetails;
