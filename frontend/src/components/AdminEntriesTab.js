import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/authcontext';
import './AdminTab.css';

function AdminEntriesTab() {
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        body: '',
        relatedLinks: ''
    });
    const { token } = useAuth();

    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        fetchEntries();
    }, []);

    const fetchEntries = async () => {
        try {
            setLoading(true);
            setError('');
            const response = await axios.get(`${API_URL}/entries`);
            setEntries(response.data);
        } catch (err) {
            setError('Failed to fetch entries');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddNew = () => {
        setFormData({ title: '', description: '', body: '', relatedLinks: '' });
        setEditingId(null);
        setShowForm(true);
    };

    const handleEdit = (entry) => {
        setFormData({
            title: entry.Title || '',
            description: entry.Description || '',
            body: entry.Body || '',
            relatedLinks: entry.RelatedLinks || ''
        });
        setEditingId(entry.EID);
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
                await axios.put(`${API_URL}/entries/${editingId}`, formData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else {
                await axios.post(`${API_URL}/entries`, formData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
            fetchEntries();
            handleCancel();
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to save entry');
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this journal entry?')) {
            try {
                await axios.delete(`${API_URL}/entries/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                fetchEntries();
            } catch (err) {
                setError('Failed to delete entry');
                console.error(err);
            }
        }
    };

    if (loading) return <div className="loading">Loading entries...</div>;

    return (
        <div className="admin-tab">
            <div className="tab-header">
                <h2>Manage Journal Entries</h2>
                <button className="add-btn" onClick={handleAddNew}>+ Add New Entry</button>
            </div>

            {error && <div className="error-message">{error}</div>}

            {showForm && (
                <form className="admin-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title *</label>
                        <input type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description *</label>
                        <input type="text" id="description" name="description" value={formData.description} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="body">Body</label>
                        <textarea id="body" name="body" value={formData.body} onChange={handleInputChange} rows="6" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="relatedLinks">Related Links</label>
                        <input type="text" id="relatedLinks" name="relatedLinks" value={formData.relatedLinks} onChange={handleInputChange} />
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="btn-save">Save</button>
                        <button type="button" className="btn-cancel" onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            )}

            <div className="items-grid">
                {entries.map((entry) => (
                    <div key={entry.EID} className="item-card">
                        <div className="card-header">
                            <h3>{entry.Title}</h3>
                        </div>
                        <p className="card-description">{entry.Description}</p>
                        <div className="card-actions">
                            <button className="btn-edit" onClick={() => handleEdit(entry)}>Edit</button>
                            <button className="btn-delete" onClick={() => handleDelete(entry.EID)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>

            {entries.length === 0 && !showForm && <p className="no-items">No journal entries found. Create one to get started!</p>}
        </div>
    );
}

export default AdminEntriesTab;
