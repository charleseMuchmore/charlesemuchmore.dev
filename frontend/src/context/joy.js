import { createContext, useState, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from './authcontext';

const JoyContext = createContext();

function JoyProvider({ children }) {
    const [joys, setJoys] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { token } = useAuth();
    const apiUrl = process.env.REACT_APP_API_URL || process.env.REACT_APP_SERVER_URL || '';

    const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

    const fetchJoys = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${apiUrl}/joys`);
            setJoys(response.data);
            setError(null);
        } catch (err) {
            console.error('Failed to fetch joys', err);
            setError('Failed to fetch joys. Please try again later.');
        } finally {
            setLoading(false);
        }
    }, [apiUrl]);

    const deleteJoyById = async (id) => {
        await axios.delete(`${apiUrl}/joys/${id}`, { headers: authHeaders });
        setJoys((prev) => prev.filter((joy) => joy.JoyID !== id));
    };

    const editJoyById = async (id, joyData) => {
        const response = await axios.put(`${apiUrl}/joys/${id}`, joyData, { headers: authHeaders });
        setJoys((prev) => prev.map((joy) => joy.JoyID === id ? response.data : joy));
    };

    const createJoy = async (joyData) => {
        const response = await axios.post(`${apiUrl}/joys`, joyData, { headers: authHeaders });
        setJoys((prev) => [response.data, ...prev]);
    };

    const valueToShare = {
        joys,
        loading,
        error,
        fetchJoys,
        deleteJoyById,
        editJoyById,
        createJoy,
    };

    return <JoyContext.Provider value={valueToShare}>{children}</JoyContext.Provider>;
}

export { JoyProvider };
export default JoyContext;
