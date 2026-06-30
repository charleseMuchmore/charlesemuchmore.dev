import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/authcontext';
import './AdminTab.css';

function AdminUsersTab() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ username: '', password: '' });
    const { token } = useAuth();

    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            setError('');
            const response = await axios.get(`${API_URL}/users`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(response.data);
        } catch (err) {
            setError('Failed to fetch users');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddNew = () => {
        setFormData({ username: '', password: '' });
        setEditingId(null);
        setShowForm(true);
    };

    const handleEdit = (user) => {
        setFormData({ username: user.Username, password: '' });
        setEditingId(user.UID);
        setShowForm(true);
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingId(null);
        setFormData({ username: '', password: '' });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                // Update existing user
                await axios.put(`${API_URL}/users/${editingId}`, formData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else {
                // Create new user
                if (!formData.password) {
                    setError('Password is required for new users');
                    return;
                }
                await axios.post(`${API_URL}/users`, formData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
            fetchUsers();
            handleCancel();
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to save user');
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await axios.delete(`${API_URL}/users/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                fetchUsers();
            } catch (err) {
                setError('Failed to delete user');
                console.error(err);
            }
        }
    };

    if (loading) return <div className="loading">Loading users...</div>;

    return (
        <div className="admin-tab">
            <div className="tab-header">
                <h2>Manage Users</h2>
                <button className="add-btn" onClick={handleAddNew}>+ Add New User</button>
            </div>

            {error && <div className="error-message">{error}</div>}

            {showForm && (
                <form className="admin-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">
                            Password {editingId && <span className="text-muted">(leave blank to keep current)</span>}
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required={!editingId}
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="btn-save">Save</button>
                        <button type="button" className="btn-cancel" onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            )}

            <div className="items-table">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.UID}>
                                <td>{user.UID}</td>
                                <td>{user.Username}</td>
                                <td>
                                    <button className="btn-edit" onClick={() => handleEdit(user)}>Edit</button>
                                    <button className="btn-delete" onClick={() => handleDelete(user.UID)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {users.length === 0 && <p className="no-items">No users found. Create one to get started!</p>}
            </div>
        </div>
    );
}

export default AdminUsersTab;
