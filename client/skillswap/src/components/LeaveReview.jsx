import React, { useState, useEffect } from 'react';
import API from '../services/api'; // Assuming API.js is set up for making requests
import { useParams, useNavigate } from 'react-router-dom';

function LeaveReview() {
    const { projectId, clientId } = useParams(); // Get projectId and clientId from URL
    const [rating, setRating] = useState(0);
    const [comments, setComments] = useState('');
    const [error, setError] = useState('');
    const [project, setProject] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch project details to ensure the project is completed
        const fetchProject = async () => {
            try {
                const response = await API.get(`/projects/${projectId}`);
                setProject(response.data);
            } catch (error) {
                setError('Error fetching project details');
            }
        };
        fetchProject();
    }, [projectId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rating < 1 || rating > 5) {
            setError('Please provide a valid rating between 1 and 5');
            return;
        }

        try {
            const reviewData = { rating, comments, clientId };
            const response = await API.post(`/projects/${projectId}/reviews`, reviewData);

            if (response.status === 200) {
                alert('Review submitted successfully!');
                navigate(`/projects/${projectId}`);  // Redirect to the project details page
            }
        } catch (error) {
            setError('Error submitting the review.');
        }
    };

    if (!project) {
        return <div>Loading project details...</div>;
    }

    return (
        <div className="p-6 max-w-md mx-auto bg-white rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4">Leave a Review</h2>

            {error && <p className="text-red-600">{error}</p>}

            <h3 className="text-lg font-semibold mb-4">Rate Client: {project.client.name}</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block">Rating</label>
                    <select
                        className="input w-full"
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        required
                    >
                        <option value="0">Select Rating</option>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <option key={star} value={star}>
                                {star} Star{star > 1 ? 's' : ''}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block">Comments</label>
                    <textarea
                        className="input w-full"
                        placeholder="Enter your comments about the client"
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn bg-blue-600 text-white w-full">
                    Submit Review
                </button>
            </form>
        </div>
    );
}

export default LeaveReview;
