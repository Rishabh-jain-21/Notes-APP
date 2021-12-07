import React, { useContext, useState } from 'react'
import "./Home.css"
import Notes from './Notes';
import noteContext from '../context/notes/noteContext';

const AddNote = () => {

    const context = useContext(noteContext);
    const { addNote } = context;
    const [notecontent, setnotecontent] = useState({ title: "", description: "", tag: "personal" });

    //handle click
    const handleClick = (e) => {
        //preventing default load
        e.preventDefault();
        addNote(notecontent.title, notecontent.description, notecontent.tag);
    };

    //onchange
    const onchange = (e) => {
        //spread operator
        setnotecontent({ ...notecontent, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <div style={{ paddingTop: "70px" }}></div>
            <form className="form-container">
                <div className="title-container">
                    <label htmlFor="title">Enter Title</label>
                    <input type="text" name="title" id="title" className="title-id" placeholder="Made by Rishabh" onChange={onchange} maxLength={15} required />
                </div>
                <div className="title-container">
                    <label htmlFor="description">Enter Desciption</label>
                    <textarea type="text" name="description" id="description" className="description-id" placeholder="Description length must be greater than 5 character ..." onChange={onchange} minLength={5} required />
                </div>
                <div className="title-container">
                    <label htmlFor="tag">Enter Tag</label>
                    <input type="text" name="tag" id="tag" className="tag-id" placeholder="Important" onChange={onchange} />
                </div>
                <input type="submit" value="+" id="submit-id" onClick={handleClick} />
            </form>
            <Notes />
        </div>
    )
}

export default AddNote
