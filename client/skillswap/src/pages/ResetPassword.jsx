import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ResetPassword() {
    const [password, setPassword] = useState(''); // New password input state
    const [confirmPassword, setConfirmPassword] = useState(''); // Confirm password state
    const [error, setError] = useState(''); // Error message state
    const [message, setMessage] = useState(''); // Success message state
    const navigate = useNavigate();

    const handlePasswordReset = async (e) => {
        e.preventDefault();

        if (!password || !confirmPassword) {
            setError('Please fill in both password fields');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            // API request to reset the password
            const response = await fetch('http://localhost:5000/api/auth/reset-password', {
                method: 'POST',
                body: JSON.stringify({ password }),
                headers: { 'Content-Type': 'application/json' },
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Password reset successful');
                setTimeout(() => navigate('/login'), 3000); // Redirect to login after successful reset
            } else {
                setError(data.error || 'Error resetting password');
            }
        } catch (err) {
            setError('Something went wrong');
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md">
            <h2 className="text-2xl font-bold text-center mb-4">Reset Password</h2>

            {error && <p className="text-red-600 mb-2">{error}</p>} {/* Display error message */}
            {message && <p className="text-green-600 mb-2">{message}</p>} {/* Display success message */}

            <form onSubmit={handlePasswordReset}>
                <input
                    type="password"
                    className="input w-full mb-4"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // Update password state
                />
                <input
                    type="password"
                    className="input w-full mb-4"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)} // Update confirmPassword state
                />
                <button type="submit" className="btn w-full mb-4">Reset Password</button>
            </form>

            <div className="text-center mt-4">
                <p>Remember your password? <a href="/login" className="text-blue-600">Login</a></p>
            </div>
        </div>
    );
}

export default ResetPassword;
