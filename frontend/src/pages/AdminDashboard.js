import React, { useState } from 'react';
import AdminUsersTab from '../components/AdminUsersTab';
import AdminProjectsTab from '../components/AdminProjectsTab';
import AdminJobsTab from '../components/AdminJobsTab';
import AdminExperiencesTab from '../components/AdminExperiencesTab';
import AdminJoysTab from '../components/AdminJoysTab';
import AdminEntriesTab from '../components/AdminEntriesTab';
import AdminTagsTab from '../components/AdminTagsTab';
import { useAuth } from '../context/authcontext';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('users');
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="admin-container">
            <div className="admin-header">
                <h1>Admin Dashboard</h1>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>

            <div className="admin-tabs">
                <button 
                    className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
                    onClick={() => setActiveTab('users')}
                >
                    Users
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
                    onClick={() => setActiveTab('projects')}
                >
                    Projects
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'jobs' ? 'active' : ''}`}
                    onClick={() => setActiveTab('jobs')}
                >
                    Jobs
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'experiences' ? 'active' : ''}`}
                    onClick={() => setActiveTab('experiences')}
                >
                    Experiences
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'joys' ? 'active' : ''}`}
                    onClick={() => setActiveTab('joys')}
                >
                    Joys
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'entries' ? 'active' : ''}`}
                    onClick={() => setActiveTab('entries')}
                >
                    Journal
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'tags' ? 'active' : ''}`}
                    onClick={() => setActiveTab('tags')}
                >
                    Tags
                </button>
            </div>

            <div className="admin-content">
                {activeTab === 'users' && <AdminUsersTab />}
                {activeTab === 'projects' && <AdminProjectsTab />}
                {activeTab === 'jobs' && <AdminJobsTab />}
                {activeTab === 'experiences' && <AdminExperiencesTab />}
                {activeTab === 'joys' && <AdminJoysTab />}
                {activeTab === 'entries' && <AdminEntriesTab />}
                {activeTab === 'tags' && <AdminTagsTab />}
            </div>
        </div>
    );
}

export default AdminDashboard;