import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // To redirect after login
import { useAuth } from '../context/AuthContext'; // Import AuthContext for managing user state

function Login() {
    const { login } = useAuth(); // Get the login function from AuthContext
    const navigate = useNavigate(); // For redirecting the user after login

    const [email, setEmail] = useState(''); // For storing email input
    const [password, setPassword] = useState(''); // For storing password input
    const [error, setError] = useState(''); // For handling error messages

    // Handle login
    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent the form from submitting

        if (!email || !password) {
            setError('Please fill in both fields');
            return;
        }

        try {
            // API call to login the user
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }), // Send email and password to the backend
            });

            const data = await response.json(); // Parse the response from the backend

            if (response.ok) {
                // If login is successful, store the user data and token
                login(data.user, data.token);
                navigate('/dashboard'); // Redirect to dashboard based on the role
            } else {
                setError(data.error || 'Login failed, please try again');
            }
        } catch (err) {
            setError('Something went wrong');
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md">
            <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

            {error && <p className="text-red-600 mb-2">{error}</p>} {/* Display error messages */}

            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    className="input w-full mb-4"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Update email state
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="input w-full mb-4"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // Update password state
                />
                <button type="submit" className="btn w-full mb-4">Login</button>
            </form>

            <div className="text-center mt-4">
                <p>Don't have an account? <a href="/signup" className="text-blue-600">Sign Up</a></p>
                <p><a href="/forgot-password" className="text-blue-600">Forgot Password?</a></p>
            </div>
        </div>
    );
}

export default Login;
