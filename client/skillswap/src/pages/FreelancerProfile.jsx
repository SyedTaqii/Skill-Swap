import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';

function FreelancerProfile() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        API.get(`/reviews/${id}`).then(res => setReviews(res.data));
        API.get(`/freelancers/search?name=${id}`).then(res => {
            const match = res.data.find(f => f._id === id);
            setUser(match);
        });
    }, [id]);

    return (
        <div className="p-6 max-w-3xl mx-auto">
            {user ? (
                <>
                    <h2 className="text-2xl font-bold">{user.name}</h2>
                    <p className="mb-2">Skills: {user.skills.join(', ')}</p>
                    <p className="mb-2">Level: {user.verification?.level}</p>
                    <p className="mb-2">⭐ Avg Rating: {user.avgRating?.toFixed(1) || 'N/A'}</p>

                    <h3 className="text-xl font-semibold mt-6 mb-2">Reviews</h3>
                    {reviews.length === 0 && <p>No reviews yet.</p>}
                    {reviews.map(r => (
                        <div key={r._id} className="border p-4 rounded mb-2 bg-white">
                            <p className="text-sm text-gray-600">⭐ {r.rating} / 5</p>
                            <p>{r.comment}</p>
                            {r.response && (
                                <p className="text-xs text-blue-600 mt-2">Freelancer: {r.response}</p>
                            )}
                        </div>
                    ))}
                </>
            ) : (
                <p>Loading profile...</p>
            )}
        </div>
    );
}

export default FreelancerProfile;
