import React, { useState, useEffect } from 'react';
import API from '../services/api';  // API service to fetch freelancers

function FreelancerVerification() {
    const [freelancers, setFreelancers] = useState([]);

    useEffect(() => {
        // Fetch freelancers awaiting verification
        const fetchFreelancers = async () => {
            try {
                const response = await API.get('/admin/freelancers');
                setFreelancers(response.data);
            } catch (error) {
                console.error('Error fetching freelancers:', error);
            }
        };
        fetchFreelancers();
    }, []);

    const handleApproval = async (freelancerId, status) => {
        try {
            const response = await API.put(`/admin/freelancers/${freelancerId}/verify`, { status });
            alert(`Freelancer ${status === 'approved' ? 'approved' : 'rejected'} successfully!`);
            setFreelancers(freelancers.filter((freelancer) => freelancer._id !== freelancerId));
        } catch (error) {
            console.error('Error updating freelancer verification:', error);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Freelancer Verification</h2>
            <div>
                {freelancers.length === 0 ? (
                    <p>No freelancers awaiting verification.</p>
                ) : (
                    freelancers.map((freelancer) => (
                        <div key={freelancer._id} className="border p-4 rounded mb-4">
                            <p><strong>{freelancer.name}</strong></p>
                            <p>Email: {freelancer.email}</p>
                            <div>
                                <button
                                    onClick={() => handleApproval(freelancer._id, 'approved')}
                                    className="btn bg-green-600 text-white mr-2"
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={() => handleApproval(freelancer._id, 'rejected')}
                                    className="btn bg-red-600 text-white"
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default FreelancerVerification;
