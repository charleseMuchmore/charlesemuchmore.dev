import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/authcontext';
import './AdminTab.css';

function AdminJobsTab() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        currentJob: false,
        description: ''
    });
    const { token } = useAuth();

    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            setLoading(true);
            setError('');
            const response = await axios.get(`${API_URL}/jobs`);
            setJobs(response.data);
        } catch (err) {
            setError('Failed to fetch jobs');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddNew = () => {
        setFormData({
            title: '',
            company: '',
            location: '',
            startDate: '',
            endDate: '',
            currentJob: false,
            description: ''
        });
        setEditingId(null);
        setShowForm(true);
    };

    const handleEdit = (job) => {
        setFormData({
            title: job.Title,
            company: job.Company,
            location: job.Location,
            startDate: job.StartDate ? formatDateForInput(job.StartDate) : '',
            endDate: job.EndDate ? formatDateForInput(job.EndDate) : '',
            currentJob: job.CurrentJob || false,
            description: job.Description || ''
        });
        setEditingId(job.JID);
        setShowForm(true);
    };

    const formatDateForInput = (dateString) => {
        if (!dateString) return '';
        // Convert date string to YYYY-MM-DD format if needed
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
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
                // Update existing job
                await axios.put(`${API_URL}/jobs/${editingId}`, formData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else {
                // Create new job
                await axios.post(`${API_URL}/jobs`, formData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
            fetchJobs();
            handleCancel();
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to save job');
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this job?')) {
            try {
                await axios.delete(`${API_URL}/jobs/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                fetchJobs();
            } catch (err) {
                setError('Failed to delete job');
                console.error(err);
            }
        }
    };

    if (loading) return <div className="loading">Loading jobs...</div>;

    return (
        <div className="admin-tab">
            <div className="tab-header">
                <h2>Manage Jobs</h2>
                <button className="add-btn" onClick={handleAddNew}>+ Add New Job</button>
            </div>

            {error && <div className="error-message">{error}</div>}

            {showForm && (
                <form className="admin-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="title">Job Title *</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="company">Company *</label>
                            <input
                                type="text"
                                id="company"
                                name="company"
                                value={formData.company}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="location">Location *</label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="currentJob">
                                <input
                                    type="checkbox"
                                    id="currentJob"
                                    name="currentJob"
                                    checked={formData.currentJob}
                                    onChange={handleInputChange}
                                />
                                Current Job
                            </label>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="startDate">Start Date *</label>
                            <input
                                type="date"
                                id="startDate"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="endDate">End Date {formData.currentJob && <span className="text-muted">(optional for current job)</span>}</label>
                            <input
                                type="date"
                                id="endDate"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description *</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows="4"
                            required
                        />
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn-save">Save</button>
                        <button type="button" className="btn-cancel" onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            )}

            <div className="items-grid">
                {jobs.map(job => (
                    <div key={job.JID} className="item-card">
                        <div className="card-header">
                            <h3>{job.Title}</h3>
                            {job.CurrentJob ? <span className="badge badge-current">Current</span> : null}
                        </div>
                        <p className="card-company"><strong>{job.Company}</strong> - {job.Location}</p>
                        <p className="card-description">{job.Description}</p>
                        <p className="card-dates">
                            {new Date(job.StartDate).toLocaleDateString()} - {job.EndDate ? new Date(job.EndDate).toLocaleDateString() : 'Present'}
                        </p>
                        <div className="card-actions">
                            <button className="btn-edit" onClick={() => handleEdit(job)}>Edit</button>
                            <button className="btn-delete" onClick={() => handleDelete(job.JID)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            {jobs.length === 0 && !showForm && <p className="no-items">No jobs found. Create one to get started!</p>}
        </div>
    );
}

export default AdminJobsTab;
