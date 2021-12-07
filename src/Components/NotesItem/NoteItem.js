import React, { useContext } from 'react'
import "./NoteItem.css"
import deleteimg from "./delete.png"
import noteContext from '../../context/notes/noteContext'
import edit from "./edit.png"
const NoteItem = (props) => {
    const context = useContext(noteContext);
    const { deleteNode } = context;
    const { note, updateNote } = props;
    return (
        <div className="card-body">
            <div style={{ display: 'flex', width: "100%", justifyContent: "space-between" }}>
                <div className="card-title"><b>{note.title}</b></div>
                <div className="button-container">
                    <div className="card-icon1"><img src={deleteimg} alt="deletephotu" onClick={() => deleteNode(note._id)} /></div>
                    <div className="card-icon2"><img src={edit} alt="editphotu" onClick={() => { updateNote(note) }} /></div>
                </div>
            </div>
            <div className="card-description">{note.description}</div>

        </div>
    )
}

export default NoteItem
