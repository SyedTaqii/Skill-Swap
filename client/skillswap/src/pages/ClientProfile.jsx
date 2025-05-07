import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api'; // Assuming API.js is set up for making API requests
import ClientReviews from '../components/ClientReviews'; // Import the ClientReviews component

function ClientProfile() {
    const { clientId } = useParams(); // Get the clientId from URL params
    const [client, setClient] = useState(null); // Store the client details
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch client details from the backend
        const fetchClientDetails = async () => {
            try {
                const response = await API.get(`/clients/${clientId}`);
                setClient(response.data); // Set client details to state
            } catch (error) {
                setError('Error fetching client details');
            }
        };
        fetchClientDetails();
    }, [clientId]);

    if (error) {
        return <p className="text-red-600">{error}</p>;
    }

    if (!client) {
        return <p>Loading...</p>; // Show loading text until client data is fetched
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">{client.name}'s Profile</h2>

            {/* Client Information */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold">Client Details</h3>
                <p><strong>Email:</strong> {client.email}</p>
                <p><strong>Company:</strong> {client.company}</p>
                <p><strong>Location:</strong> {client.location}</p>
                <p><strong>Phone:</strong> {client.phone}</p>
            </div>

            {/* Client Reviews Section */}
            <ClientReviews clientId={clientId} />
        </div>
    );
}

export default ClientProfile;
