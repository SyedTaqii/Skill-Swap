import React from 'react';
import UserManagementList from '../components/UserManagementList'; // Import User Management List component

function UserManagement() {
    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
            <UserManagementList />  {/* This will display the list of users and the corresponding actions */}
        </div>
    );
}

export default UserManagement;
