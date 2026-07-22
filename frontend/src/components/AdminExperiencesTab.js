import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/authcontext';
import './AdminTab.css';

function AdminExperiencesTab() {
    const [experiences, setExperiences] = useState([]);
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
        fetchExperiences();
    }, []);

    const fetchExperiences = async () => {
        try {
            setLoading(true);
            setError('');
            const response = await axios.get(`${API_URL}/experiences`);
            setExperiences(response.data);
        } catch (err) {
            setError('Failed to fetch experiences');
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

    const handleEdit = (experience) => {
        setFormData({
            title: experience.Title || '',
            company: experience.Company || '',
            location: experience.Location || '',
            startDate: experience.StartDate ? formatDateForInput(experience.StartDate) : '',
            endDate: experience.EndDate ? formatDateForInput(experience.EndDate) : '',
            currentJob: Boolean(experience.CurrentJob),
            description: experience.Description || ''
        });
        setEditingId(experience.XID);
        setShowForm(true);
    };

    const formatDateForInput = (dateString) => {
        if (!dateString) return '';
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
                await axios.put(`${API_URL}/experiences/${editingId}`, formData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else {
                await axios.post(`${API_URL}/experiences`, formData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
            fetchExperiences();
            handleCancel();
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to save experience');
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this experience?')) {
            try {
                await axios.delete(`${API_URL}/experiences/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                fetchExperiences();
            } catch (err) {
                setError('Failed to delete experience');
                console.error(err);
            }
        }
    };

    if (loading) return <div className="loading">Loading experiences...</div>;

    return (
        <div className="admin-tab">
            <div className="tab-header">
                <h2>Manage Experiences</h2>
                <button className="add-btn" onClick={handleAddNew}>+ Add New Experience</button>
            </div>

            {error && <div className="error-message">{error}</div>}

            {showForm && (
                <form className="admin-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="title">Title *</label>
                            <input type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="company">Company *</label>
                            <input type="text" id="company" name="company" value={formData.company} onChange={handleInputChange} required />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="location">Location *</label>
                            <input type="text" id="location" name="location" value={formData.location} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="currentJob">
                                <input type="checkbox" id="currentJob" name="currentJob" checked={formData.currentJob} onChange={handleInputChange} />
                                Current Job
                            </label>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="startDate">Start Date *</label>
                            <input type="date" id="startDate" name="startDate" value={formData.startDate} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="endDate">End Date</label>
                            <input type="date" id="endDate" name="endDate" value={formData.endDate} onChange={handleInputChange} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description *</label>
                        <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} rows="4" required />
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn-save">Save</button>
                        <button type="button" className="btn-cancel" onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            )}

            <div className="items-grid">
                {experiences.map((experience) => (
                    <div key={experience.XID} className="item-card">
                        <div className="card-header">
                            <h3>{experience.Title}</h3>
                            {experience.CurrentJob ? <span className="badge badge-current">Current</span> : null}
                        </div>
                        <p className="card-company"><strong>{experience.Company}</strong> - {experience.Location}</p>
                        <p className="card-description">{experience.Description}</p>
                        <p className="card-dates">
                            {experience.StartDate ? new Date(experience.StartDate).toLocaleDateString() : '—'}
                            {' — '}
                            {experience.CurrentJob ? 'Present' : (experience.EndDate ? new Date(experience.EndDate).toLocaleDateString() : '—')}
                        </p>
                        <div className="card-actions">
                            <button className="btn-edit" onClick={() => handleEdit(experience)}>Edit</button>
                            <button className="btn-delete" onClick={() => handleDelete(experience.XID)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>

            {experiences.length === 0 && !showForm && <p className="no-items">No experiences found. Create one to get started!</p>}
        </div>
    );
}

export default AdminExperiencesTab;
