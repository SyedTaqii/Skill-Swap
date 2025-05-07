import { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [form, setForm] = useState({ name: '', email: '', password: '', role: 'client' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/auth/signup', form);
            navigate('/login');
        } catch (err) {
            setError('Signup failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4">
                <h2 className="text-2xl font-bold text-center text-blue-600">Sign Up</h2>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    className="w-full border p-2 rounded"
                    value={form.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full border p-2 rounded"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full border p-2 rounded"
                    value={form.password}
                    onChange={handleChange}
                    required
                />
                <select
                    name="role"
                    className="w-full border p-2 rounded"
                    value={form.role}
                    onChange={handleChange}
                >
                    <option value="client">Client</option>
                    <option value="freelancer">Freelancer</option>
                </select>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                    Sign Up
                </button>
            </form>
        </div>
    );
}

export default Signup;
