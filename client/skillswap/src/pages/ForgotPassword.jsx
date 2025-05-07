import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
    const [email, setEmail] = useState(''); // Email input state
    const [message, setMessage] = useState(''); // Success message
    const [error, setError] = useState(''); // Error message
    const navigate = useNavigate();

    const handleForgotPassword = async (e) => {
        e.preventDefault();

        if (!email) {
            setError('Please enter your email');
            return;
        }

        try {
            // Send API request to trigger password reset link or OTP
            const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
                method: 'POST',
                body: JSON.stringify({ email }),
                headers: { 'Content-Type': 'application/json' },
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('A password reset link or OTP has been sent to your email');
                // Optionally, redirect to OTP page
                setTimeout(() => navigate('/verify-otp'), 3000); // Redirect after 3 seconds
            } else {
                setError(data.error || 'Error sending reset link');
            }
        } catch (err) {
            setError('Something went wrong');
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md">
            <h2 className="text-2xl font-bold text-center mb-4">Forgot Password</h2>

            {error && <p className="text-red-600 mb-2">{error}</p>} {/* Display error message */}
            {message && <p className="text-green-600 mb-2">{message}</p>} {/* Display success message */}

            <form onSubmit={handleForgotPassword}>
                <input
                    type="email"
                    className="input w-full mb-4"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Update email state
                />
                <button type="submit" className="btn w-full mb-4">Send Reset Link/OTP</button>
            </form>

            <div className="text-center mt-4">
                <p>Remember your password? <a href="/login" className="text-blue-600">Login</a></p>
            </div>
        </div>
    );
}

export default ForgotPassword;
