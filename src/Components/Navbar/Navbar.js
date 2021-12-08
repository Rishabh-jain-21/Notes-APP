import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import { useLocation } from 'react-router'
const Navbar = () => {
    const location = useLocation();
    const [toggleClass, settoggleClass] = useState(true);

    useEffect(() => {
        // console.log(location.pathname);
    }, [location]);

    return (
        <div>
            <nav className="navbar-1">
                <div className="max-width">
                    <div className="logo-1"><Link to="/">The-<span>Notes.</span></Link></div>
                    <ul className={toggleClass ? "menu" : "menu active"}>
                        <li className="navbar-item-1"><Link to="/" onClick={() => settoggleClass(!toggleClass)}><span className={`navbar-text-item ${location.pathname === "/" ? "current" : ""}`}>Home</span></Link></li>
                        <li className="navbar-item-1"><Link to="/about" onClick={() => settoggleClass(!toggleClass)}><span className={`navbar-text-item ${location.pathname === "/about" ? "current" : ""}`}>About</span></Link></li>
                        <li className="navbar-item-1"><Link to="/yournotes" onClick={() => settoggleClass(!toggleClass)}><span className={`navbar-text-item ${location.pathname === "/yournotes" ? "current" : ""}`}>MyNotes</span></Link></li>
                        <li className="navbar-item-1"><button><Link to="/login">Login</Link></button></li>
                        <li className="navbar-item-1"><button className="signup-btn"><Link to="/signup">SignUp</Link></button></li>
                    </ul>
                    <div className="menu-btn">
                        <i className=" fa fa-bars" onClick={() => settoggleClass(!toggleClass)}></i>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
