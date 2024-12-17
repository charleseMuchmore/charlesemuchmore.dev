import "./Home.css";
import me from '../images/menoback2.jpg';


function Home() {
    return (
    <div className="container-fluid">
        <div className="row bg-blue">
            <div className="col-sm-3 col-md-4 col-lg-6 m-auto">
                <h1>Hello there, my name is Charlese!</h1>
                <p>I am a Web Developer, and this is my personal website.</p>
                <p>Feel free to take a look around!</p>
            </div>
            <div className="col-sm-9 col-md-8 col-lg-6 ">
            <img className="me" alt="charlese" src={me}></img>
            </div>
        </div>
    </div>
    )
}

export default Home;