import {NavLink} from 'react-router-dom'; 
import "./NavBar.css";

const NavBar = () => {

    return (
        <div className="navbar sticky mx-s-1 mx-md-3 mx-lg-5 px-sm-1 px-md-3 px-lg-5 py-0">
            <NavLink className="navbar-link house" to="/">
            </NavLink>
            <NavLink className="nav-link border auto-pad link" to="/Journal">Journal</NavLink>
            <NavLink className="nav-link border auto-pad link" to="/Projects">Projects</NavLink>
            {/* <NavLink className="nav-link border auto-pad link" to="/Learning">Learning</NavLink> */}
            <NavLink className="nav-link border auto-pad link" to="/Experience">Experience</NavLink>
            <NavLink className="nav-link border auto-pad link" to="/Joy">Joy</NavLink>
            {/* <NavLink className="nav-link border auto-pad link" to="/Interests">Interests</NavLink> */}
            <NavLink className="nav-link border auto-pad link" to="/Contact">Contact</NavLink>
            <NavLink className="nav-link border auto-pad link" to="/Apps">Apps</NavLink>
        </div>
    )
}

export default NavBar;