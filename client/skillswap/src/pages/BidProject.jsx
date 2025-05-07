import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api'; // Assuming API.js is set up for making requests

function BidProject() {
    const { projectId } = useParams(); // Get projectId from the URL
    const [bid, setBid] = useState({
        price: '',
        proposal: '',
        timeline: '',
        bidType: '', // 'hourly' or 'fixed'
    });
    const [project, setProject] = useState(null);
    const [error, setError] = useState('');
    const [existingBid, setExistingBid] = useState(null); // To check if the freelancer already placed a bid
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch project details and check for existing bid
        const fetchProjectDetails = async () => {
            try {
                const response = await API.get(`/projects/${projectId}`);
                setProject(response.data); // Set project data
                // Check if the freelancer already placed a bid on the project
                const freelancerBid = response.data.bids.find(bid => bid.freelancerId === 'YOUR_FREELANCER_ID'); // Replace with actual freelancer ID
                if (freelancerBid) {
                    setExistingBid(freelancerBid);
                    setBid({
                        price: freelancerBid.price,
                        proposal: freelancerBid.proposal,
                        timeline: freelancerBid.timeline,
                        bidType: freelancerBid.bidType,
                    });
                }
            } catch (error) {
                setError('Error fetching project details.');
            }
        };

        fetchProjectDetails();
    }, [projectId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBid((prevBid) => ({
            ...prevBid,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (existingBid) {
                // Update existing bid
                const response = await API.put(`/projects/${projectId}/bids/${existingBid._id}`, bid);
                alert('Bid updated successfully!');
            } else {
                // Place new bid
                const response = await API.post(`/projects/${projectId}/bids`, bid);
                alert('Bid placed successfully!');
            }
            navigate(`/projects/${projectId}`); // Redirect to project details page after placing/updating bid
        } catch (error) {
            setError('Error submitting the bid.');
        }
    };

    const handleWithdrawBid = async () => {
        try {
            const response = await API.delete(`/projects/${projectId}/bids/${existingBid._id}`);
            alert('Bid withdrawn successfully!');
            navigate(`/projects/${projectId}`);
        } catch (error) {
            setError('Error withdrawing the bid.');
        }
    };

    if (error) return <p>{error}</p>;

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md">
            <h2 className="text-2xl font-bold text-center mb-4">{project ? `Bid for ${project.title}` : 'Loading Project...'}</h2>

            {project ? (
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block">Bid Price</label>
                        <input
                            type="number"
                            className="input w-full"
                            placeholder="Enter bid price"
                            name="price"
                            value={bid.price}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block">Proposal</label>
                        <textarea
                            className="input w-full"
                            placeholder="Write your proposal"
                            name="proposal"
                            value={bid.proposal}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block">Estimated Timeline</label>
                        <input
                            type="text"
                            className="input w-full"
                            placeholder="Enter estimated timeline"
                            name="timeline"
                            value={bid.timeline}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block">Bid Type</label>
                        <select
                            className="input w-full"
                            name="bidType"
                            value={bid.bidType}
                            onChange={handleChange}
                        >
                            <option value="hourly">Hourly</option>
                            <option value="fixed">Fixed Price</option>
                        </select>
                    </div>

                    <button type="submit" className="btn bg-blue-600 text-white w-full">
                        {existingBid ? 'Update Bid' : 'Place Bid'}
                    </button>

                    {existingBid && (
                        <button
                            type="button"
                            onClick={handleWithdrawBid}
                            className="btn bg-red-600 text-white w-full mt-4"
                        >
                            Withdraw Bid
                        </button>
                    )}
                </form>
            ) : (
                <p>Loading project details...</p>
            )}
        </div>
    );
}

export default BidProject;
