import React from 'react'
import "./Home.css"
const Home = () => {
    document.title = "Notes - (Home)";
    return (
        <div>
            <div style={{ paddingTop: "70px" }}></div>
            <form className="form-container">
                <div className="title-container">
                    <label htmlFor="title-id">Enter Title</label>
                    <input type="text" id="title-id" placeholder="Made by Rishabh" />
                </div>
                <div className="title-container">
                    <label htmlFor="description-id">Enter Desciption</label>
                    <textarea type="text" id="description-id" placeholder="Designed for you ..." />
                </div>
                <div className="title-container">
                    <label htmlFor="tag-id">Enter Tag</label>
                    <input type="text" id="tag-id" placeholder="Important" />
                </div>
                <input type="submit" value="+" id="submit-id" />
            </form>
            {/* <h1>Home</h1> */}
        </div>
    )
}

export default Home
