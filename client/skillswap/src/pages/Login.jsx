import { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post('/auth/login', form);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-4">Login</h2>
            {error && <p className="text-red-600">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input name="email" placeholder="Email" className="input" onChange={handleChange} />
                <input name="password" type="password" placeholder="Password" className="input" onChange={handleChange} />
                <button type="submit" className="btn w-full">Login</button>
            </form>
        </div>
    );
}

export default Login;
