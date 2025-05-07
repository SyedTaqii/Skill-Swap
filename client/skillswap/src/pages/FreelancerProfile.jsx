import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api'; // Assuming API.js is set up for making requests

function FreelancerProfile() {
    const { freelancerId } = useParams(); // Get freelancerId from URL
    const [profile, setProfile] = useState({
        name: '',
        bio: '',
        skills: [],
        portfolio: [],
        location: '',
        hourlyRate: '',
    });
    const [isEditing, setIsEditing] = useState(false); // To toggle edit mode
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch freelancer profile details from backend
        const fetchProfile = async () => {
            try {
                const response = await API.get(`/freelancers/${freelancerId}`);
                setProfile(response.data); // Set profile data for viewing or editing
            } catch (error) {
                setError('Error fetching freelancer profile.');
            }
        };

        fetchProfile();
    }, [freelancerId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    const handleSkillsChange = (e) => {
        setProfile((prevProfile) => ({
            ...prevProfile,
            skills: e.target.value.split(','),
        }));
    };

    const handlePortfolioChange = (e) => {
        setProfile((prevProfile) => ({
            ...prevProfile,
            portfolio: e.target.value.split(','),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await API.put(`/freelancers/${freelancerId}`, profile);
            if (response.status === 200) {
                alert('Profile updated successfully!');
                setIsEditing(false); // Exit editing mode
            }
        } catch (error) {
            setError('Error updating profile.');
        }
    };

    const handleDelete = async () => {
        try {
            const response = await API.delete(`/freelancers/${freelancerId}`);
            if (response.status === 200) {
                alert('Profile deleted successfully!');
                navigate('/'); // Redirect to home page or login after deleting the profile
            }
        } catch (error) {
            setError('Error deleting profile.');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-md">
            <h2 className="text-2xl font-bold text-center mb-4">Freelancer Profile</h2>

            {error && <p className="text-red-600 mb-2">{error}</p>} {/* Display error message */}

            {!isEditing ? (
                <div>
                    <h3 className="text-xl font-semibold mb-2">Profile Details</h3>
                    <p><strong>Name:</strong> {profile.name}</p>
                    <p><strong>Bio:</strong> {profile.bio}</p>
                    <p><strong>Skills:</strong> {profile.skills.join(', ')}</p>
                    <p><strong>Portfolio:</strong> {profile.portfolio.join(', ')}</p>
                    <p><strong>Location:</strong> {profile.location}</p>
                    <p><strong>Hourly Rate:</strong> ${profile.hourlyRate}</p>

                    <button
                        onClick={() => setIsEditing(true)}
                        className="btn bg-yellow-600 text-white mt-4"
                    >
                        Edit Profile
                    </button>
                    <button
                        onClick={handleDelete}
                        className="btn bg-red-600 text-white mt-4 ml-2"
                    >
                        Delete Profile
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <h3 className="text-xl font-semibold mb-2">Edit Profile</h3>
                    <input
                        type="text"
                        className="input w-full mb-4"
                        placeholder="Name"
                        name="name"
                        value={profile.name}
                        onChange={handleChange}
                    />
                    <textarea
                        className="input w-full mb-4"
                        placeholder="Bio"
                        name="bio"
                        value={profile.bio}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        className="input w-full mb-4"
                        placeholder="Skills (comma separated)"
                        name="skills"
                        value={profile.skills.join(',')}
                        onChange={handleSkillsChange}
                    />
                    <input
                        type="text"
                        className="input w-full mb-4"
                        placeholder="Portfolio (comma separated links)"
                        name="portfolio"
                        value={profile.portfolio.join(',')}
                        onChange={handlePortfolioChange}
                    />
                    <input
                        type="text"
                        className="input w-full mb-4"
                        placeholder="Location"
                        name="location"
                        value={profile.location}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        className="input w-full mb-4"
                        placeholder="Hourly Rate"
                        name="hourlyRate"
                        value={profile.hourlyRate}
                        onChange={handleChange}
                    />

                    <button type="submit" className="btn bg-blue-600 text-white w-full mt-4">
                        Save Changes
                    </button>
                </form>
            )}
        </div>
    );
}

export default FreelancerProfile;
