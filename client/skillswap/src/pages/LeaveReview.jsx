import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api'; // Assuming API.js is set up for making requests

function LeaveReview() {
    const { projectId, freelancerId } = useParams(); // Get projectId and freelancerId from URL
    const [rating, setRating] = useState(0); // Rating (1-5)
    const [review, setReview] = useState(''); // Review text
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if rating and review are provided
        if (rating === 0 || !review) {
            setError('Please provide a rating and review.');
            return;
        }

        try {
            const response = await API.post(`/projects/${projectId}/review`, {
                freelancerId,
                rating,
                review,
            });

            if (response.status === 200) {
                setMessage('Review submitted successfully!');
                setTimeout(() => navigate(`/freelancer/${freelancerId}`), 3000); // Redirect to freelancer's profile
            }
        } catch (error) {
            setError('Error submitting the review.');
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md">
            <h2 className="text-2xl font-bold text-center mb-4">Leave a Review</h2>

            {error && <p className="text-red-600 mb-2">{error}</p>}
            {message && <p className="text-green-600 mb-2">{message}</p>}

            <form onSubmit={handleSubmit}>
                {/* Rating */}
                <div className="mb-4">
                    <label className="block text-lg font-semibold mb-2">Rating (1 to 5)</label>
                    <div className="flex space-x-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                type="button"
                                key={star}
                                className={`text-xl ${star <= rating ? 'text-yellow-500' : 'text-gray-400'}`}
                                onClick={() => setRating(star)}
                            >
                                ★
                            </button>
                        ))}
                    </div>
                </div>

                {/* Review Text */}
                <div className="mb-4">
                    <label className="block text-lg font-semibold mb-2">Review</label>
                    <textarea
                        className="input w-full"
                        placeholder="Write your review here"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                    />
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn w-full bg-blue-600 text-white">
                    Submit Review
                </button>
            </form>
        </div>
    );
}

export default LeaveReview;
