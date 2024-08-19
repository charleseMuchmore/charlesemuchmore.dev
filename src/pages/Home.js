import "./Home.css";
import me from '../images/menoback2.jpg';


function Home() {
    return (
    <div className="container-fluid">
        <div className="row bg-blue">
            <div className="col-sm-3 col-md-4 col-lg-6 m-auto">
                <h1>Hello there, my name is Charlese!</h1>
                <p>I am a Web Developer, and this is my personal website.</p>
                <p>Feel free to take a look around (though there isn't much right now).</p>
            </div>
            <div className="col-sm-9 col-md-8 col-lg-6 ">
            <img className="me" alt="charlese" src={me}></img>
            </div>
        </div>
        <div className="row bg-light">
                <h1>...</h1>
        </div>
        <div className="row">
            <h1 className="ghost-text">This website is currently under construction, more information coming soon!</h1>
        </div>
    </div>
    )
}

export default Home;