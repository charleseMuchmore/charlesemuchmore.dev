import { createContext, useState, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from './authcontext';

const ProjectsContext = createContext();

function PProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();
  const apiUrl = process.env.REACT_APP_API_URL || process.env.REACT_APP_SERVER_URL || '';

  const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${apiUrl}/projects`);
      setProjects(res.data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch projects', err);
      setError('Failed to fetch projects. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  const deleteProjectById = async (id) => {
    await axios.delete(`${apiUrl}/projects/${id}`, { headers: authHeaders });
    setProjects((prev) => prev.filter((project) => project.PID !== id));
  };

  const editProjectById = async (id, projectData) => {
    const response = await axios.put(
      `${apiUrl}/projects/${id}`,
      projectData,
      { headers: authHeaders }
    );
    setProjects((prev) =>
      prev.map((project) =>
        project.PID === id ? response.data : project
      )
    );
  };

  const createProject = async (projectData) => {
    const response = await axios.post(
      `${apiUrl}/projects`,
      projectData,
      { headers: authHeaders }
    );
    setProjects((prev) => [response.data, ...prev]);
  };

  const valueToShare = {
    projects,
    fetchProjects,
    loading,
    error,
    deleteProjectById,
    editProjectById,
    createProject,
  };

  return <ProjectsContext.Provider value={valueToShare}>{children}</ProjectsContext.Provider>;
}

export { PProvider };
export default ProjectsContext;
