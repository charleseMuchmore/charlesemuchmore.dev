import { createContext, useState, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from './authcontext';

const JobsContext = createContext();

function JobsProvider({ children }) {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { token } = useAuth();
    const apiUrl = process.env.REACT_APP_API_URL || process.env.REACT_APP_SERVER_URL || '';

    const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

    const fetchJobs = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${apiUrl}/jobs`);
            setJobs(response.data);
            setError(null);
        } catch (err) {
            console.error('Failed to fetch jobs', err);
            setError('Failed to fetch jobs. Please try again later.');
        } finally {
            setLoading(false);
        }
    }, [apiUrl]);

    const deleteJobById = async (id) => {
        await axios.delete(`${apiUrl}/jobs/${id}`, { headers: authHeaders });
        setJobs((prev) => prev.filter((job) => job.id !== id));
    };

    const editJobById = async (id, jobProps) => {
        const response = await axios.put(`${apiUrl}/jobs/${id}`, jobProps, { headers: authHeaders });
        setJobs((prev) => prev.map((job) => job.id === id ? response.data : job));
    };

    const createJob = async (jobProps) => {
        const response = await axios.post(`${apiUrl}/jobs`, jobProps, { headers: authHeaders });
        setJobs((prev) => [response.data, ...prev]);
    };

    const valueToShare = {
        jobs,
        loading,
        error,
        fetchJobs,
        deleteJobById,
        editJobById,
        createJob,
    };

    return <JobsContext.Provider value={valueToShare}>{children}</JobsContext.Provider>;
}

export { JobsProvider };
export default JobsContext;
