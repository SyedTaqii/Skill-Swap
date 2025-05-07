import React from 'react';
import ProjectManagementList from '../components/ProjectManagementList'; // Import Project Management List component

function ProjectManagement() {
    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Manage Projects</h2>
            <ProjectManagementList />  {/* This will display the list of projects and the corresponding actions */}
        </div>
    );
}

export default ProjectManagement;
