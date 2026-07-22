import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/authcontext';
import './AdminTab.css';

function AdminTagsTab() {
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });
    const { token } = useAuth();

    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        fetchTags();
    }, []);

    const fetchTags = async () => {
        try {
            setLoading(true);
            setError('');
            const response = await axios.get(`${API_URL}/tags`);
            setTags(response.data);
        } catch (err) {
            setError('Failed to fetch tags');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddNew = () => {
        setFormData({ name: '', description: '' });
        setEditingId(null);
        setShowForm(true);
    };

    const handleEdit = (tag) => {
        setFormData({
            name: tag.Name || '',
            description: tag.Description || ''
        });
        setEditingId(tag.TID);
        setShowForm(true);
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
                await axios.put(`${API_URL}/tags/${editingId}`, formData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else {
                await axios.post(`${API_URL}/tags`, formData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
            fetchTags();
            handleCancel();
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to save tag');
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this tag?')) {
            try {
                await axios.delete(`${API_URL}/tags/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                fetchTags();
            } catch (err) {
                setError('Failed to delete tag');
                console.error(err);
            }
        }
    };

    if (loading) return <div className="loading">Loading tags...</div>;

    return (
        <div className="admin-tab">
            <div className="tab-header">
                <h2>Manage Tags</h2>
                <button className="add-btn" onClick={handleAddNew}>+ Add New Tag</button>
            </div>

            {error && <div className="error-message">{error}</div>}

            {showForm && (
                <form className="admin-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name *</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} rows="4" />
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="btn-save">Save</button>
                        <button type="button" className="btn-cancel" onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            )}

            <div className="items-grid">
                {tags.map((tag) => (
                    <div key={tag.TID} className="item-card">
                        <div className="card-header">
                            <h3>{tag.Name}</h3>
                        </div>
                        <p className="card-description">{tag.Description}</p>
                        <div className="card-actions">
                            <button className="btn-edit" onClick={() => handleEdit(tag)}>Edit</button>
                            <button className="btn-delete" onClick={() => handleDelete(tag.TID)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>

            {tags.length === 0 && !showForm && <p className="no-items">No tags found. Create one to get started!</p>}
        </div>
    );
}

export default AdminTagsTab;
