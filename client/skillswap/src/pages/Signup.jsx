import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For redirection after signup
import { useAuth } from '../context/AuthContext'; // For login function from AuthContext

function Signup() {
    const { login } = useAuth(); // We use the login function from AuthContext after signup
    const navigate = useNavigate(); // For redirecting user after successful signup

    const [name, setName] = useState(''); // Name input state
    const [email, setEmail] = useState(''); // Email input state
    const [password, setPassword] = useState(''); // Password input state
    const [error, setError] = useState(''); // For handling error messages

    const handleSignup = async (e) => {
        e.preventDefault();

        // Validate form inputs
        if (!name || !email || !password) {
            setError('All fields are required');
            return;
        }

        try {
            // API call to signup the user
            const response = await fetch('http://localhost:5000/api/auth/signup', {
                method: 'POST',
                body: JSON.stringify({ name, email, password }),
                headers: { 'Content-Type': 'application/json' },
            });

            const data = await response.json(); // Parse the JSON response

            if (response.ok) {
                // On successful signup, call login function and redirect to dashboard
                login(data.user, data.token);
                navigate('/dashboard'); // Redirect to dashboard
            } else {
                setError(data.error || 'Signup failed, please try again');
            }
        } catch (err) {
            setError('Something went wrong');
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md">
            <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>

            {error && <p className="text-red-600 mb-2">{error}</p>} {/* Show error message */}

            <form onSubmit={handleSignup}>
                <input
                    type="text"
                    className="input w-full mb-4"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)} // Update name state
                />
                <input
                    type="email"
                    className="input w-full mb-4"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Update email state
                />
                <input
                    type="password"
                    className="input w-full mb-4"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // Update password state
                />
                <button type="submit" className="btn w-full mb-4">Sign Up</button>
            </form>

            <div className="text-center mt-4">
                <p>Already have an account? <a href="/login" className="text-blue-600">Login</a></p>
            </div>
        </div>
    );
}

export default Signup;
