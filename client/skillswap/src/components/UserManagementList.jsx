import React, { useState, useEffect } from 'react';
import API from '../services/api'; // Assuming API.js is set up for making requests

function UserManagementList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await API.get('/admin/users');
                setUsers(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching users.');
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const handleStatusChange = async (userId, status) => {
        try {
            await API.put(`/admin/users/${userId}/status`, { status });
            setUsers(users.map((user) =>
                user._id === userId ? { ...user, status } : user
            ));
            alert(`User ${status === 'active' ? 'activated' : 'deactivated'} successfully!`);
        } catch (error) {
            setError('Error updating user status.');
        }
    };

    const handleRoleChange = async (userId, newRole) => {
        try {
            await API.put(`/admin/users/${userId}/role`, { role: newRole });
            setUsers(users.map((user) =>
                user._id === userId ? { ...user, role: newRole } : user
            ));
            alert(`User role updated to ${newRole}!`);
        } catch (error) {
            setError('Error changing user role.');
        }
    };

    if (loading) return <p>Loading users...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-semibold">User Management</h3>
            <table className="table-auto w-full border">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border">Name</th>
                        <th className="px-4 py-2 border">Email</th>
                        <th className="px-4 py-2 border">Role</th>
                        <th className="px-4 py-2 border">Status</th>
                        <th className="px-4 py-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td className="px-4 py-2 border">{user.name}</td>
                            <td className="px-4 py-2 border">{user.email}</td>
                            <td className="px-4 py-2 border">
                                <select
                                    value={user.role}
                                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                    className="p-2 border"
                                >
                                    <option value="admin">Admin</option>
                                    <option value="client">Client</option>
                                    <option value="freelancer">Freelancer</option>
                                </select>
                            </td>
                            <td className="px-4 py-2 border">{user.status}</td>
                            <td className="px-4 py-2 border">
                                <button
                                    onClick={() => handleStatusChange(user._id, user.status === 'active' ? 'inactive' : 'active')}
                                    className="btn bg-blue-600 text-white"
                                >
                                    {user.status === 'active' ? 'Deactivate' : 'Activate'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserManagementList;
