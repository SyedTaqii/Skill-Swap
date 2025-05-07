import { Link } from 'react-router-dom';

function FreelancerCard({ freelancer }) {
    return (
        <div className="border p-4 rounded shadow-sm bg-white space-y-1">
            <h3 className="text-lg font-bold">{freelancer.name}</h3>
            <p>🎓 Skills: {freelancer.skills?.join(', ') || 'N/A'}</p>
            <p>✅ Level: {freelancer.verification?.level || 'Basic'}</p>
            <p>⭐ Rating: {freelancer.avgRating?.toFixed(1) || 'N/A'} / 5</p>
            <Link to={`/freelancers/profile/${freelancer._id}`} className="text-blue-600 underline text-sm">
                View Profile
            </Link>

        </div>
    );
}

export default FreelancerCard;
