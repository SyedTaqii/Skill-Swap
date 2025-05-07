import { useEffect, useState } from 'react';
import API from '../services/api';
import FreelancerCard from '../components/FreelancerCard';

function FreelancerSearch() {
    const [filters, setFilters] = useState({
        skills: '',
        level: '',
        sort: 'newest',
        name: ''
    });
    const [freelancers, setFreelancers] = useState([]);

    const fetchFreelancers = async () => {
        try {
            const query = new URLSearchParams(filters).toString();
            const res = await API.get(`/freelancers/search?${query}`);
            setFreelancers(res.data);
        } catch (err) {
            console.error('Search error', err);
        }
    };

    useEffect(() => {
        fetchFreelancers();
    }, []);

    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchFreelancers();
    };

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Find Freelancers</h2>

            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <input name="name" placeholder="Search by name" className="input" onChange={handleChange} />
                <input name="skills" placeholder="Skills (comma-separated)" className="input" onChange={handleChange} />
                <select name="level" className="input" onChange={handleChange}>
                    <option value="">All Levels</option>
                    <option value="Basic">Basic</option>
                    <option value="Verified">Verified</option>
                    <option value="Premium">Premium</option>
                </select>
                <select name="sort" className="input" onChange={handleChange}>
                    <option value="newest">Newest</option>
                    <option value="name">Name A-Z</option>
                    <option value="rating">Top Rated</option>
                </select>
                <button type="submit" className="btn col-span-1 md:col-span-4">Search</button>
            </form>

            <div className="grid gap-4">
                {freelancers.map(f => (
                    <FreelancerCard key={f._id} freelancer={f} />
                ))}
            </div>
        </div>
    );
}

export default FreelancerSearch;
