import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/authcontext';
import './AdminTab.css';

function AdminJoysTab() {
    const [joys, setJoys] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        joyDate: '',
        shortDescription: '',
        fullDescription: '',
        imageURL: ''
    });
    const { token } = useAuth();

    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        fetchJoys();
    }, []);

    const fetchJoys = async () => {
        try {
            setLoading(true);
            setError('');
            const response = await axios.get(`${API_URL}/joys`);
            setJoys(response.data);
        } catch (err) {
            setError('Failed to fetch joys');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddNew = () => {
        setFormData({
            title: '',
            joyDate: '',
            shortDescription: '',
            fullDescription: '',
            imageURL: ''
        });
        setEditingId(null);
        setShowForm(true);
    };

    const handleEdit = (joy) => {
        setFormData({
            title: joy.Title || '',
            joyDate: joy.JoyDate ? formatDateForInput(joy.JoyDate) : '',
            shortDescription: joy.ShortDescription || '',
            fullDescription: joy.FullDescription || '',
            imageURL: joy.ImageURL || ''
        });
        setEditingId(joy.JID);
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
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await axios.put(`${API_URL}/joys/${editingId}`, formData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else {
                await axios.post(`${API_URL}/joys`, formData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
            fetchJoys();
            handleCancel();
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to save joy');
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this joy?')) {
            try {
                await axios.delete(`${API_URL}/joys/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                fetchJoys();
            } catch (err) {
                setError('Failed to delete joy');
                console.error(err);
            }
        }
    };

    if (loading) return <div className="loading">Loading joys...</div>;

    return (
        <div className="admin-tab">
            <div className="tab-header">
                <h2>Manage Joys</h2>
                <button className="add-btn" onClick={handleAddNew}>+ Add New Joy</button>
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
                            <label htmlFor="joyDate">Joy Date</label>
                            <input type="date" id="joyDate" name="joyDate" value={formData.joyDate} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="shortDescription">Short Description</label>
                        <input type="text" id="shortDescription" name="shortDescription" value={formData.shortDescription} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="fullDescription">Full Description</label>
                        <textarea id="fullDescription" name="fullDescription" value={formData.fullDescription} onChange={handleInputChange} rows="4" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="imageURL">Image URL</label>
                        <input type="url" id="imageURL" name="imageURL" value={formData.imageURL} onChange={handleInputChange} />
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="btn-save">Save</button>
                        <button type="button" className="btn-cancel" onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            )}

            <div className="items-grid">
                {joys.map((joy) => (
                    <div key={joy.JID} className="item-card">
                        <div className="card-header">
                            <h3>{joy.Title}</h3>
                        </div>
                        <p className="card-description">{joy.ShortDescription || joy.FullDescription}</p>
                        <div className="card-actions">
                            <button className="btn-edit" onClick={() => handleEdit(joy)}>Edit</button>
                            <button className="btn-delete" onClick={() => handleDelete(joy.JID)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>

            {joys.length === 0 && !showForm && <p className="no-items">No joys found. Create one to get started!</p>}
        </div>
    );
}

export default AdminJoysTab;
