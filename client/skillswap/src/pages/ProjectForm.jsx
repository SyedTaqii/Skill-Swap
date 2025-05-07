import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function ProjectForm() {
    const [form, setForm] = useState({
        title: '',
        description: '',
        requirements: '',
        deadline: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await API.post('/projects', form);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.error || 'Project creation failed');
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-4">Post a New Project</h2>
            {error && <p className="text-red-600">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    name="title"
                    placeholder="Project Title"
                    className="input"
                    value={form.title}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="description"
                    placeholder="Project Description"
                    className="input h-24"
                    value={form.description}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="requirements"
                    placeholder="Requirements"
                    className="input h-20"
                    value={form.requirements}
                    onChange={handleChange}
                    required
                />
                <input
                    type="date"
                    name="deadline"
                    className="input"
                    value={form.deadline}
                    onChange={handleChange}
                    required
                />
                <button type="submit" className="btn w-full">Submit Project</button>
            </form>
        </div>
    );
}

export default ProjectForm;
