import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';

function SubmitReview() {
    const { projectId } = useParams();
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/reviews', { projectId, rating, comment });
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to submit review');
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-4">Submit Review</h2>
            {error && <p className="text-red-600">{error}</p>}

            <form onSubmit={submit} className="space-y-4">
                <label>Rating (1–5)</label>
                <input
                    type="number"
                    min="1"
                    max="5"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="input"
                />
                <textarea
                    placeholder="Leave a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="input h-24"
                />
                <button type="submit" className="btn w-full">Submit Review</button>
            </form>
        </div>
    );
}

export default SubmitReview;
