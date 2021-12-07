import React from 'react'
import "./Home.css"
const About = () => {
    document.title = "Notes - (About)";

    return (
        <div className="notes-container">
            <div style={{ paddingTop: "70px" }}></div>
            <h1>This is about page</h1>
        </div>
    )
}

export default About
