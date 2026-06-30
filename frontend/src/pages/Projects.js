import Card from '../components/Card.js';
import { useContext, useEffect } from 'react';
import ProjectsContext from '../context/projects';

function Projects() {
    const { projects, fetchProjects, loading, error } = useContext(ProjectsContext);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    const renderedProjects = projects.map((project) => (
        <Card key={project.PID} project={project} />
    ));

    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">My Projects</h1>
            {loading && <p className="text-center">Loading projects...</p>}
            {error && <p className="text-center text-danger">{error}</p>}
            {!loading && !error && (
                <div className="row" id="projects-container">
                    {renderedProjects.length > 0 ? renderedProjects : <p className="text-center">No projects found.</p>}
                </div>
            )}
        </div>
    )
}

export default Projects;