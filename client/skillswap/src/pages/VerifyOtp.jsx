import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function VerifyOtp() {
    const [otp, setOtp] = useState(''); // OTP input state
    const [error, setError] = useState(''); // Error message
    const [message, setMessage] = useState(''); // Success message
    const navigate = useNavigate();

    const handleOtpVerification = async (e) => {
        e.preventDefault();

        if (!otp) {
            setError('Please enter the OTP');
            return;
        }

        try {
            // Send API request to verify the OTP
            const response = await fetch('http://localhost:5000/api/auth/verify-otp', {
                method: 'POST',
                body: JSON.stringify({ otp }),
                headers: { 'Content-Type': 'application/json' },
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('OTP verified successfully');
                setTimeout(() => navigate('/reset-password'), 3000); // Redirect to reset password page
            } else {
                setError(data.error || 'Invalid OTP');
            }
        } catch (err) {
            setError('Something went wrong');
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md">
            <h2 className="text-2xl font-bold text-center mb-4">Verify OTP</h2>

            {error && <p className="text-red-600 mb-2">{error}</p>}
            {message && <p className="text-green-600 mb-2">{message}</p>}

            <form onSubmit={handleOtpVerification}>
                <input
                    type="text"
                    className="input w-full mb-4"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)} // Update OTP state
                />
                <button type="submit" className="btn w-full mb-4">Verify OTP</button>
            </form>
        </div>
    );
}

export default VerifyOtp;
