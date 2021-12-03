import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
const Navbar = () => {

    const [toggleClass, settoggleClass] = useState(true);

    return (
        <div>
            <nav class="navbar">
                <div class="max-width">
                    <div class="logo"><a href="#">The-<span>Notes.</span></a></div>
                    <ul className={toggleClass ? "menu" : "menu active"}>
                        <li className="navbar-item"><Link to="/" onClick={() => settoggleClass(!toggleClass)}>Home</Link></li>
                        <li className="navbar-item"><Link to="/about" onClick={() => settoggleClass(!toggleClass)}>About</Link></li>
                        <li className="navbar-item"><input type="text" placeholder="Search" /></li>
                    </ul>
                    <div class="menu-btn">
                        <i class=" fa fa-bars" onClick={() => settoggleClass(!toggleClass)}></i>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
