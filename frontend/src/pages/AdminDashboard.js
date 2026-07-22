import React, { useState } from 'react';
import AdminUsersTab from '../components/AdminUsersTab';
import AdminProjectsTab from '../components/AdminProjectsTab';
import AdminExperiencesTab from '../components/AdminExperiencesTab';
import AdminJoysTab from '../components/AdminJoysTab';
import AdminEntriesTab from '../components/AdminEntriesTab';
import AdminTagsTab from '../components/AdminTagsTab';
import { useAuth } from '../context/authcontext';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('users');
    const [menuOpen, setMenuOpen] = useState(false);
    const { logout } = useAuth();
    const navigate = useNavigate();

    const tabLabels = {
        users: 'Users',
        projects: 'Projects',
        experiences: 'Experiences',
        joys: 'Joys',
        entries: 'Journal',
        tags: 'Tags'
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        setMenuOpen(false);
    };

    return (
        <div className="admin-container">
            <div className="admin-header">
                <h1>Admin Dashboard</h1>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>

            <div className="admin-tabs-wrapper">
                <button
                    className="mobile-menu-toggle"
                    type="button"
                    onClick={() => setMenuOpen((open) => !open)}
                    aria-expanded={menuOpen}
                    aria-controls="admin-tabs"
                >
                    <span className="mobile-menu-icon">☰</span>
                    {tabLabels[activeTab]}
                </button>

                <div id="admin-tabs" className={`admin-tabs ${menuOpen ? 'open' : ''}`}>
                    <button 
                        className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
                        onClick={() => handleTabClick('users')}
                    >
                        Users
                    </button>
                    <button 
                        className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
                        onClick={() => handleTabClick('projects')}
                    >
                        Projects
                    </button>
                    <button 
                        className={`tab-btn ${activeTab === 'experiences' ? 'active' : ''}`}
                        onClick={() => handleTabClick('experiences')}
                    >
                        Experiences
                    </button>
                    <button 
                        className={`tab-btn ${activeTab === 'joys' ? 'active' : ''}`}
                        onClick={() => handleTabClick('joys')}
                    >
                        Joys
                    </button>
                    <button 
                        className={`tab-btn ${activeTab === 'entries' ? 'active' : ''}`}
                        onClick={() => handleTabClick('entries')}
                    >
                        Journal
                    </button>
                    <button 
                        className={`tab-btn ${activeTab === 'tags' ? 'active' : ''}`}
                        onClick={() => handleTabClick('tags')}
                    >
                        Tags
                    </button>
                </div>
            </div>

            <div className="admin-content">
                {activeTab === 'users' && <AdminUsersTab />}
                {activeTab === 'projects' && <AdminProjectsTab />}
                {activeTab === 'experiences' && <AdminExperiencesTab />}
                {activeTab === 'joys' && <AdminJoysTab />}
                {activeTab === 'entries' && <AdminEntriesTab />}
                {activeTab === 'tags' && <AdminTagsTab />}
            </div>
        </div>
    );
}

export default AdminDashboard;