import { createContext, useState, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from './authcontext';

const JournalContext = createContext();

function JournalProvider({ children }) {
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { token } = useAuth();
    const apiUrl = process.env.REACT_APP_API_URL || process.env.REACT_APP_SERVER_URL || '';

    const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

    const normalizeEntry = useCallback((entry) => ({
        ...entry,
        EntryID: entry.EntryID ?? entry.EID,
        Description: entry.Description ?? entry.Content ?? entry.Body ?? '',
        Body: entry.Body ?? entry.Content ?? entry.Description ?? '',
        Content: entry.Content ?? entry.Body ?? entry.Description ?? '',
        CreatedAt: entry.CreatedAt ?? entry.Date ?? null,
    }), []);

    const fetchEntries = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${apiUrl}/entries`);
            setEntries((response.data || []).map(normalizeEntry));
            setError(null);
        } catch (err) {
            console.error('Failed to fetch journal entries', err);
            setError('Failed to fetch journal entries. Please try again later.');
        } finally {
            setLoading(false);
        }
    }, [apiUrl, normalizeEntry]);

    const deleteEntryById = async (id) => {
        await axios.delete(`${apiUrl}/entries/${id}`, { headers: authHeaders });
        setEntries((prev) => prev.filter((entry) => (entry.EntryID ?? entry.EID) !== id));
    };

    const editEntryById = async (id, entryData) => {
        const response = await axios.put(`${apiUrl}/entries/${id}`, entryData, { headers: authHeaders });
        const updatedEntry = normalizeEntry(response.data);
        setEntries((prev) => prev.map((entry) => (entry.EntryID ?? entry.EID) === id ? updatedEntry : entry));
    };

    const createEntry = async (entryData) => {
        const response = await axios.post(`${apiUrl}/entries`, entryData, { headers: authHeaders });
        setEntries((prev) => [normalizeEntry(response.data), ...prev]);
    };

    const valueToShare = {
        entries,
        loading,
        error,
        fetchEntries,
        deleteEntryById,
        editEntryById,
        createEntry,
    };

    return <JournalContext.Provider value={valueToShare}>{children}</JournalContext.Provider>;
}

export { JournalProvider };
export default JournalContext;
