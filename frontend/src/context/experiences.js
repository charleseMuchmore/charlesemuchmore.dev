import { createContext, useState, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from './authcontext';

const ExperiencesContext = createContext();

function ExperiencesProvider({ children }) {
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { token } = useAuth();
    const apiUrl = process.env.REACT_APP_API_URL || process.env.REACT_APP_SERVER_URL || '';

    const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

    const fetchExperiences = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${apiUrl}/experiences`);
            setExperiences(response.data);
            setError(null);
        } catch (err) {
            console.error('Failed to fetch experiences', err);
            setError('Failed to fetch experiences. Please try again later.');
        } finally {
            setLoading(false);
        }
    }, [apiUrl]);

    const deleteExperienceById = async (id) => {
        await axios.delete(`${apiUrl}/experiences/${id}`, { headers: authHeaders });
        setExperiences((prev) => prev.filter((experience) => experience.XID !== id));
    };

    const editExperienceById = async (id, experienceProps) => {
        const response = await axios.put(`${apiUrl}/experiences/${id}`, experienceProps, { headers: authHeaders });
        setExperiences((prev) => prev.map((experience) => experience.XID === id ? response.data : experience));
    };

    const createExperience = async (experienceProps) => {
        const response = await axios.post(`${apiUrl}/experiences`, experienceProps, { headers: authHeaders });
        setExperiences((prev) => [response.data, ...prev]);
    };

    const valueToShare = {
        experiences,
        loading,
        error,
        fetchExperiences,
        deleteExperienceById,
        editExperienceById,
        createExperience,
    };

    return <ExperiencesContext.Provider value={valueToShare}>{children}</ExperiencesContext.Provider>;
}

export { ExperiencesProvider };
export default ExperiencesContext;

        setExperiences((prev) => prev.filter((experience) => experience.XID !== id));

    const editExperienceById = async (id, experienceProps) => {
        const response = await axios.put(`${apiUrl}/experiences/${id}`, experienceProps, { headers: authHeaders });
        setExperiences((prev) => prev.map((experience) => experience.XID === id ? response.data : experience));
    };

    const createExperience = async (experienceProps) => {
        const response = await axios.post(`${apiUrl}/experiences`, experienceProps, { headers: authHeaders });
        setExperiences((prev) => [response.data, ...prev]);
    };

    const valueToShare = {
        experiences,
        loading,
        error,
        fetchExperiences,
        deleteExperienceById,
        editExperienceById,
        createExperience,
    };

    return <ExperiencesContext.Provider value={valueToShare}>{children}</ExperiencesContext.Provider>;

export { ExperiencesProvider };
export default ExperiencesContext;
