import Card from '../components/Card.js';
import { useContext } from 'react';
import ProjectsContext from '../context/projects';

function Projects() {
    const { projects } = useContext(ProjectsContext);

    const renderedProjects = projects.map((project) => {
        console.log("rendered Projects was entered!");
        project.link.githubText = "View on Github";
        if (project.link.online !== "#")
        {
            project.link.onlineText = "Try It Out";
        }
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