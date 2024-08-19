import {NavLink} from 'react-router-dom'; 
import "./NavBar.css";

function NavBar() {

    return (
        <div className="navbar mx-s-1 mx-md-3 mx-lg-5 px-sm-1 px-md-3 px-lg-5 py-0">
            <NavLink className="navbar-link house" to="/">
            </NavLink>
            <NavLink className="nav-link border auto-pad link" to="/Projects">Projects</NavLink>
            <NavLink className="nav-link border auto-pad link" to="/Learning">Learning</NavLink>
            <NavLink className="nav-link border auto-pad link" to="/History">History</NavLink>
            <NavLink className="nav-link border auto-pad link" to="/Interests">Interests</NavLink>
            <NavLink className="nav-link border auto-pad link" to="/Contact">Contact</NavLink>
        </div>
    )
}

export default NavBar;