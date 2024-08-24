import { createContext, useState, useCallback } from 'react';
import axios from 'axios';

const ProjectsContext = createContext();

function PProvider({ children }) {
    const [projects, setProjects] = useState([]);

    //projects
    const fetchProjects = useCallback(async () => {
        //const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/projects`);
        const response = { data: [
            {
                id: 1,
                title: 'Project One',
                description: 'A brief description of project one. This project is about...',
                link: {
                    value: '#'
                },
                image: 'https://via.placeholder.com/300x200'
            },
            {
                id: 2,
                title: 'Project Two',
                description: 'A brief description of project two. This project is about...',
                link: {
                    value: '#'
                },
                image: 'https://via.placeholder.com/300x200'
            },
            {
                id: 3,
                title: 'Project Three',
                description: 'A brief description of project three. This project is about...',
                link: {
                    value: '#'
                },
                image: 'https://via.placeholder.com/300x200'
            }
        ]}
        setProjects(response.data);
    }, []);

    const deleteProjectById = async (id) => { 
        await axios.delete(`${process.env.REACT_APP_SERVER_URL}/projects/${id}`); 
        const updatedProjects = projects.filter((project) => { 
            return project.id !== id; }); 
            setProjects(updatedProjects); 
        };

    const editProjectById = async (id, props) => {
        const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/projects/${id}`, {
            title: props.title,
            userId: props.id, 
            description: props.description, 
            image: props.image, 
            link: props.link
        });

        const updatedProjects = [
            ...projects,
            response.data
        ];
        setProjects(updatedProjects);
    };

    const createProject = async (projectProps) => {
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/projects?`, projectProps);
        
        const updatedProjects = [
            ...projects,
            response.data
        ];
        setProjects(updatedProjects);
    };

    const valueToShare = {
        projects,
        fetchProjects,
        deleteProjectById,
        editProjectById,
        createProject
    };

   
    return <ProjectsContext.Provider value={valueToShare}>
        {children}
    </ProjectsContext.Provider>
}

export { PProvider };
export default ProjectsContext;