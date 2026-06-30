import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/authcontext';
import './AdminTab.css';

function AdminProjectsTab() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        shortDescription: '',
        fullDescription: '',
        techStack: '',
        gitHubURL: '',
        liveURL: '',
        imageURL: '',
        featured: false
    });
    const { token } = useAuth();

    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            setError('');
            const response = await axios.get(`${API_URL}/projects`);
            setProjects(response.data);
        } catch (err) {
            setError('Failed to fetch projects');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddNew = () => {
        setFormData({
            name: '',
            shortDescription: '',
            fullDescription: '',
            techStack: '',
            gitHubURL: '',
            liveURL: '',
            imageURL: '',
            featured: false
        });
        setEditingId(null);
        setShowForm(true);
    };

    const handleEdit = (project) => {
        setFormData({
            name: project.Name,
            shortDescription: project.ShortDescription,
            fullDescription: project.FullDescription || '',
            techStack: project.TechStack || '',
            gitHubURL: project.GitHubURL || '',
            liveURL: project.LiveURL || '',
            imageURL: project.ImageURL || '',
            featured: project.Featured || false
        });
        setEditingId(project.PID);
        setShowForm(true);
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingId(null);
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                // Update existing project
                await axios.put(`${API_URL}/projects/${editingId}`, 
                    {
                        ...formData,
                        gitHubURL: formData.gitHubURL || null,
                        liveURL: formData.liveURL || null,
                        imageURL: formData.imageURL || null
                    },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            } else {
                // Create new project
                await axios.post(`${API_URL}/projects`, 
                    {
                        ...formData,
                        gitHubURL: formData.gitHubURL || null,
                        liveURL: formData.liveURL || null,
                        imageURL: formData.imageURL || null
                    },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            }
            fetchProjects();
            handleCancel();
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to save project');
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await axios.delete(`${API_URL}/projects/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                fetchProjects();
            } catch (err) {
                setError('Failed to delete project');
                console.error(err);
            }
        }
    };

    if (loading) return <div className="loading">Loading projects...</div>;

    return (
        <div className="admin-tab">
            <div className="tab-header">
                <h2>Manage Projects</h2>
                <button className="add-btn" onClick={handleAddNew}>+ Add New Project</button>
            </div>

            {error && <div className="error-message">{error}</div>}

            {showForm && (
                <form className="admin-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="name">Project Name *</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="featured">
                                <input
                                    type="checkbox"
                                    id="featured"
                                    name="featured"
                                    checked={formData.featured}
                                    onChange={handleInputChange}
                                />
                                Featured
                            </label>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="shortDescription">Short Description *</label>
                        <input
                            type="text"
                            id="shortDescription"
                            name="shortDescription"
                            value={formData.shortDescription}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="fullDescription">Full Description</label>
                        <textarea
                            id="fullDescription"
                            name="fullDescription"
                            value={formData.fullDescription}
                            onChange={handleInputChange}
                            rows="4"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="techStack">Tech Stack (comma-separated)</label>
                        <input
                            type="text"
                            id="techStack"
                            name="techStack"
                            value={formData.techStack}
                            onChange={handleInputChange}
                            placeholder="React, Node.js, MongoDB"
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="gitHubURL">GitHub URL</label>
                            <input
                                type="url"
                                id="gitHubURL"
                                name="gitHubURL"
                                value={formData.gitHubURL}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="liveURL">Live URL</label>
                            <input
                                type="url"
                                id="liveURL"
                                name="liveURL"
                                value={formData.liveURL}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="imageURL">Image URL</label>
                        <input
                            type="url"
                            id="imageURL"
                            name="imageURL"
                            value={formData.imageURL}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn-save">Save</button>
                        <button type="button" className="btn-cancel" onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            )}

            <div className="items-grid">
                {projects.map(project => (
                    <div key={project.PID} className="item-card">
                        <div className="card-header">
                            <h3>{project.Name}</h3>
                            {project.Featured ? <span className="badge">Featured</span> : null}
                        </div>
                        <p className="card-description">{project.ShortDescription}</p>
                        {project.TechStack && (
                            <p className="card-tech"><strong>Tech:</strong> {project.TechStack}</p>
                        )}
                        <div className="card-actions">
                            <button className="btn-edit" onClick={() => handleEdit(project)}>Edit</button>
                            <button className="btn-delete" onClick={() => handleDelete(project.PID)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            {projects.length === 0 && !showForm && <p className="no-items">No projects found. Create one to get started!</p>}
        </div>
    );
}

export default AdminProjectsTab;
