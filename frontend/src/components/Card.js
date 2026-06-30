import "./Card.css";

const Card = ({ project }) => {
    const imageUrl = project.ImageURL || 'https://via.placeholder.com/300x200?text=Project';
    
    return (
        <div className="col-md-4 mb-4">
            <div className="card">
                <img src={imageUrl} className="card-img-top" alt={project.Name} />
                <div className="card-body">
                    <h5 className="card-title">{project.Name}</h5>
                    <p className="card-text">{project.ShortDescription}</p>
                    {project.TechStack && (
                        <p className="card-tech">
                            <small><strong>Tech:</strong> {project.TechStack}</small>
                        </p>
                    )}
                    {project.Featured ? (
                        <span className="badge bg-warning text-dark">Featured</span>
                    ) : null}
                    <div className="card-links">
                        {project.GitHubURL && (
                            <a href={project.GitHubURL} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                                View on Github
                            </a>
                        )}
                        {project.LiveURL && (
                            <a href={project.LiveURL} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                                Try It Out
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;