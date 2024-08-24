import "./Card.css";

const Card = ({ props } ) => {

    return (
        <div className="col-md-4 mb-4">
            <div className="card">
                <img src={props.image} className="card-img-top" alt={props.title} />
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <p className="card-text">{props.description}</p>
                    <a href={props.link.github} className="btn btn-primary">{props.link.githubText}</a>
                    {props.link.online !== "#" ? <a href={props.link.online} className="btn btn-primary">{props.link.onlineText}</a> : ""}
                </div>
            </div>
        </div>
    )
}

export default Card;