import React, { useState, useEffect } from 'react';
import API from '../services/api'; // Assuming API.js is set up for making requests
import { Link } from 'react-router-dom';

function FreelancerSearch() {
    const [searchTerm, setSearchTerm] = useState('');
    const [budgetMin, setBudgetMin] = useState('');
    const [budgetMax, setBudgetMax] = useState('');
    const [deadline, setDeadline] = useState('');
    const [skills, setSkills] = useState('');
    const [projectType, setProjectType] = useState('');
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch initial projects or apply filters if needed
        const fetchProjects = async () => {
            try {
                const response = await API.get('/projects', {
                    params: {
                        search: searchTerm,
                        budgetMin,
                        budgetMax,
                        deadline,
                        skills,
                        projectType,
                    },
                });
                setProjects(response.data);
            } catch (error) {
                setError('Error fetching projects. Please try again.');
            }
        };

        fetchProjects();
    }, [searchTerm, budgetMin, budgetMax, deadline, skills, projectType]); // Refetch when any of the filter values change

    const handleSearch = async () => {
        try {
            const response = await API.get('/projects', {
                params: {
                    search: searchTerm,
                    budgetMin,
                    budgetMax,
                    deadline,
                    skills,
                    projectType,
                },
            });
            setProjects(response.data);
        } catch (error) {
            setError('Error fetching projects. Please try again.');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-md">
            <h2 className="text-2xl font-bold text-center mb-4">Search for Projects</h2>

            {error && <p className="text-red-600 mb-2">{error}</p>} {/* Display error message */}

            {/* Search Filters */}
            <div className="space-y-4 mb-6">
                <div>
                    <label className="block">Search Projects:</label>
                    <input
                        type="text"
                        className="input w-full"
                        placeholder="Search by title or description"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block">Budget Range:</label>
                    <div className="flex space-x-4">
                        <input
                            type="number"
                            className="input w-1/2"
                            placeholder="Min"
                            value={budgetMin}
                            onChange={(e) => setBudgetMin(e.target.value)}
                        />
                        <input
                            type="number"
                            className="input w-1/2"
                            placeholder="Max"
                            value={budgetMax}
                            onChange={(e) => setBudgetMax(e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <label className="block">Deadline:</label>
                    <input
                        type="date"
                        className="input w-full"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block">Skills Required (comma separated):</label>
                    <input
                        type="text"
                        className="input w-full"
                        placeholder="e.g., JavaScript, Node.js"
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block">Project Type:</label>
                    <select
                        className="input w-full"
                        value={projectType}
                        onChange={(e) => setProjectType(e.target.value)}
                    >
                        <option value="">All</option>
                        <option value="fixed">Fixed Price</option>
                        <option value="hourly">Hourly</option>
                    </select>
                </div>

                <button
                    onClick={handleSearch}
                    className="btn bg-blue-600 text-white w-full"
                >
                    Search
                </button>
            </div>

            {/* Display Projects */}
            <div>
                {projects.length === 0 ? (
                    <p>No projects found based on your search criteria.</p>
                ) : (
                    <ul className="space-y-4">
                        {projects.map((project) => (
                            <li key={project._id} className="border p-4 rounded">
                                <h3 className="text-xl font-semibold">{project.title}</h3>
                                <p><strong>Budget:</strong> ${project.budget}</p>
                                <p><strong>Project Type:</strong> {project.projectType}</p>
                                <p><strong>Deadline:</strong> {project.deadline}</p>
                                <p><strong>Skills:</strong> {project.skills.join(', ')}</p>

                                {/* Link to project details and bid */}
                                <Link to={`/projects/${project._id}`} className="text-blue-600 underline">
                                    View Details and Place a Bid
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default FreelancerSearch;
