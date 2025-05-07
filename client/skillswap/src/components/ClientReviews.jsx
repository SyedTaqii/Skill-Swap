import React, { useState, useEffect } from 'react';
import API from '../services/api'; // Assuming API.js is set up for making requests

function ClientReviews({ clientId }) {
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch reviews for the client
        const fetchReviews = async () => {
            try {
                const response = await API.get(`/clients/${clientId}/reviews`);
                setReviews(response.data);
            } catch (error) {
                setError('Error fetching reviews.');
            }
        };
        fetchReviews();
    }, [clientId]);

    return (
        <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Client Reviews</h3>
            {error && <p className="text-red-600">{error}</p>}

            <div className="space-y-4">
                {reviews.length === 0 ? (
                    <p>No reviews yet. Be the first to leave a review!</p>
                ) : (
                    reviews.map((review) => (
                        <div key={review._id} className="border p-4 rounded bg-white">
                            <div className="flex items-center">
                                <span className="font-semibold">{review.freelancerId.name}</span>
                                <span className="ml-2 text-yellow-600">{'★'.repeat(review.rating)}</span>
                            </div>
                            <p>{review.comments}</p>
                            <p className="text-sm text-gray-600">Submitted on: {new Date(review.date).toLocaleDateString()}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default ClientReviews;
