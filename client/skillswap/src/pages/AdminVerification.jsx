import { useEffect, useState } from 'react';
import API from '../services/api';

function AdminVerification() {
    const [requests, setRequests] = useState([]);

    const fetchPending = async () => {
        const res = await API.get('/admin/verify/pending');
        setRequests(res.data);
    };

    const updateStatus = async (userId, status, level) => {
        await API.put(`/admin/verify/${userId}`, { status, level });
        fetchPending(); // Refresh list
    };

    useEffect(() => {
        fetchPending();
    }, []);

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h2 className="text-xl font-bold mb-4">🧾 Pending Verifications</h2>

            {requests.length === 0 ? (
                <p>No pending requests.</p>
            ) : (
                requests.map(user => (
                    <div key={user._id} className="border p-4 rounded mb-4 bg-white shadow">
                        <h3 className="font-bold">{user.name}</h3>
                        <p>Email: {user.email}</p>
                        <p>Requested Level: {user.verification.level}</p>
                        <p>Status: <span className="text-yellow-600">{user.verification.status}</span></p>

                        <div className="mt-2">
                            <h4 className="font-semibold">Documents:</h4>
                            {user.verification.documents?.map((doc, idx) => (
                                <a
                                    key={idx}
                                    href={`http://localhost:5000/${doc}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-blue-600 underline block text-sm"
                                >
                                    View Document {idx + 1}
                                </a>
                            ))}
                        </div>

                        <div className="flex gap-3 mt-4">
                            <button
                                onClick={() => updateStatus(user._id, 'approved', 'Verified')}
                                className="btn bg-green-600 hover:bg-green-700"
                            >
                                Approve
                            </button>
                            <button
                                onClick={() => updateStatus(user._id, 'rejected', 'Basic')}
                                className="btn bg-red-600 hover:bg-red-700"
                            >
                                Reject
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default AdminVerification;
