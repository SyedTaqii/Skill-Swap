import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';
import BidCard from '../components/BidCard';

function ProjectDetail() {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [bids, setBids] = useState([]);

    const fetchProject = async () => {
        const res = await API.get(`/projects/${id}`);
        setProject(res.data);
    };

    const fetchBids = async () => {
        const res = await API.get(`/projects/${id}/bids`);
        setBids(res.data);
    };

    const updateBidStatus = async (bidId, status) => {
        await API.put(`/projects/${id}/bids/${bidId}`, { status });
        fetchBids();
    };

    useEffect(() => {
        fetchProject();
        fetchBids();
    }, [id]);

    return (
        <div className="p-6 max-w-5xl mx-auto">
            {project ? (
                <>
                    <h2 className="text-2xl font-bold mb-4">{project.title}</h2>
                    <p className="mb-2"><strong>Description:</strong> {project.description}</p>
                    <p className="mb-2"><strong>Requirements:</strong> {project.requirements}</p>
                    <p className="mb-2"><strong>Deadline:</strong> {new Date(project.deadline).toLocaleDateString()}</p>
                    <p className="mb-4"><strong>Status:</strong> {project.status}</p>

                    <h3 className="text-xl font-semibold mb-2">Bids</h3>
                    <div className="space-y-4">
                        {bids.map(bid => (
                            <BidCard
                                key={bid._id}
                                bid={bid}
                                onAccept={(bidId) => updateBidStatus(bidId, 'accepted')}
                                onReject={(bidId) => updateBidStatus(bidId, 'rejected')}
                            />
                        ))}
                    </div>
                </>
            ) : (
                <p>Loading project...</p>
            )}
        </div>
    );
}

export default ProjectDetail;
