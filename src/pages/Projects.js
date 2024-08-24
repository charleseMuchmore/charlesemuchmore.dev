import Card from '../components/Card.js';
import { useContext } from 'react';
import ProjectsContext from '../context/projects';

function Projects() {
    const { projects } = useContext(ProjectsContext);

    const renderedProjects = projects.map((project) => {
        console.log("rendered Projects was entered!");
        project.link.text = "View Project";
        return <Card key={project.id} props={project}/>
    })


    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">My Projects</h1>
            <div className="row" id="projects-container">
                {renderedProjects ? renderedProjects : "bruh"}
            </div>
        </div>
    )
}

export default Projects;