import "./Home.css";
import me from '../images/menoback2.jpg';
import Now from '../components/Now';

function Home() {
    return (
        <div className="home-page">
            <div className="container-fluid intro-section">
                <div className="row align-items-center">
                    <div className="col-sm-12 col-md-6 col-lg-6 intro-text">
                        <h1>Hello there, my name is Charlese!</h1>
                        <p className="intro-description">This is my personal website where I showcase my work and share my thoughts.</p>
                        <p className="intro-description">Feel free to take a look around!</p>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-6 intro-image">
                        <img className="me" alt="charlese" src={me}></img>
                    </div>
                </div>
            </div>

            <div className="container my-5">
                <Now />
            </div>
        </div>
    )
}

export default Home;