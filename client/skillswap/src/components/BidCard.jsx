function BidCard({ bid, onAccept, onReject }) {
    return (
        <div className="border rounded p-4 bg-white shadow-sm space-y-2">
            <p><strong>Freelancer:</strong> {bid.freelancerId?.name || 'N/A'}</p>
            <p><strong>Message:</strong> {bid.message}</p>
            <p><strong>Amount:</strong> ${bid.amount}</p>
            <p><strong>Status:</strong> <span className="font-semibold">{bid.status}</span></p>

            {bid.status === 'pending' && (
                <div className="flex gap-2">
                    <button onClick={() => onAccept(bid._id)} className="btn bg-green-600 hover:bg-green-700">Accept</button>
                    <button onClick={() => onReject(bid._id)} className="btn bg-red-600 hover:bg-red-700">Reject</button>
                </div>
            )}
        </div>
    );
}

export default BidCard;
