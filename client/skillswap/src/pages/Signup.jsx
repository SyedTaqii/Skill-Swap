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
            setError(err.response?.data?.error || 'Signup failed');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-4">Signup</h2>
            {error && <p className="text-red-600">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input name="name" placeholder="Name" className="input" onChange={handleChange} />
                <input name="email" placeholder="Email" className="input" onChange={handleChange} />
                <input name="password" type="password" placeholder="Password" className="input" onChange={handleChange} />
                <select name="role" className="input" onChange={handleChange}>
                    <option value="client">Client</option>
                    <option value="freelancer">Freelancer</option>
                </select>
                <button type="submit" className="btn w-full">Create Account</button>
            </form>
        </div>
    );
}

export default Signup;
