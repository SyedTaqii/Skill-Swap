import axios from 'axios';

// Create an Axios instance for making API requests
const API = axios.create({
    baseURL: 'http://localhost:5000/api', // Replace with your backend API base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the Authorization token (if the user is logged in)
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Get the token from localStorage

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`; // Attach token to every request
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// You can also add response interceptors here if needed (for error handling globally)

export default API;
