import { Link } from 'react-router-dom';

function FreelancerCard({ freelancer }) {
    return (
        <div className="border rounded-xl p-5 bg-white shadow-md hover:shadow-lg transition space-y-2">
            <h3 className="text-xl font-semibold text-gray-800">{freelancer.name}</h3>
            <p className="text-gray-600">🎓 <span className="font-medium">Skills:</span> {freelancer.skills?.join(', ') || 'N/A'}</p>
            <p className="text-gray-600">✅ <span className="font-medium">Level:</span> {freelancer.verification?.level || 'Basic'}</p>
            <p className="text-gray-600">⭐ <span className="font-medium">Rating:</span> {freelancer.avgRating?.toFixed(1) || 'N/A'} / 5</p>
            <Link
                to={`/freelancers/profile/${freelancer._id}`}
                className="inline-block mt-2 text-blue-600 hover:underline"
            >
                View Profile →
            </Link>
        </div>
    );
}

export default FreelancerCard;
