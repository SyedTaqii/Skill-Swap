function BidCard({ bid, onAccept, onReject }) {
    return (
        <div className="border rounded-xl p-6 bg-white shadow-md space-y-3">
            <p><strong>Freelancer:</strong> {bid.freelancerId?.name || 'N/A'}</p>
            <p><strong>Message:</strong> {bid.message}</p>
            <p><strong>Amount:</strong> ${bid.amount}</p>
            <p><strong>Status:</strong> <span className="font-semibold capitalize">{bid.status}</span></p>

            {bid.status === 'pending' && (
                <div className="flex gap-3 mt-4">
                    <button
                        onClick={() => onAccept(bid._id)}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium"
                    >
                        Accept
                    </button>
                    <button
                        onClick={() => onReject(bid._id)}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium"
                    >
                        Reject
                    </button>
                </div>
            )}
        </div>
    );
}

export default BidCard;
