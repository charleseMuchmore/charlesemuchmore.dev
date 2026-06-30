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

    const fetchEntries = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${apiUrl}/journal`);
            setEntries(response.data);
            setError(null);
        } catch (err) {
            console.error('Failed to fetch journal entries', err);
            setError('Failed to fetch journal entries. Please try again later.');
        } finally {
            setLoading(false);
        }
    }, [apiUrl]);

    const deleteEntryById = async (id) => {
        await axios.delete(`${apiUrl}/journal/${id}`, { headers: authHeaders });
        setEntries((prev) => prev.filter((entry) => entry.EntryID !== id));
    };

    const editEntryById = async (id, entryData) => {
        const response = await axios.put(`${apiUrl}/journal/${id}`, entryData, { headers: authHeaders });
        setEntries((prev) => prev.map((entry) => entry.EntryID === id ? response.data : entry));
    };

    const createEntry = async (entryData) => {
        const response = await axios.post(`${apiUrl}/journal`, entryData, { headers: authHeaders });
        setEntries((prev) => [response.data, ...prev]);
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
