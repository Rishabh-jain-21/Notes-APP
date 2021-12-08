import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import NoteItem from './NotesItem/NoteItem';
import { useNavigate } from 'react-router';
const Notes = (props) => {
    document.title = "Notes-(MyNotes)"
    const context = useContext(noteContext);
    const navigate = useNavigate();
    const [notecontent, setnotecontent] = useState({ id: "", etitle: "", edescription: "", etag: "personal" });
    //destructuring
    const { notes, getNotes, editNote } = context;
    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            getNotes();
        }
        else {
            navigate("/login");
        }
    }, []);

    const ref = useRef(null);
    const refClose = useRef(null);

    //edit note function
    const updateNote = (current_note) => {
        // console.log(ref.current.focus());
        ref.current.click();
        setnotecontent({ id: current_note._id, etitle: current_note.title, edescription: current_note.description, etag: current_note.tag });
    };

    //handle click
    const handleClick = (e) => {
        editNote(notecontent.id, notecontent.etitle, notecontent.edescription, notecontent.etag);
        refClose.current.click();
        props.showAlert("note Update SuccessFully", "success");
    };

    //onchange
    const onchange = (e) => {
        //spread operator
        setnotecontent({ ...notecontent, [e.target.name]: e.target.value })
    }

    return (
        <>

            <button ref={ref} style={{ display: "none" }} type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" style={{ border: "none", background: "transparent", fontSize: "30px" }} className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <label style={{ margin: "2px" }} htmlFor="etitle" >Edit title</label><br />
                            <input style={{ width: "100%", fontSize: "1.1em", padding: "0px 10px" }} type="text" id="etitle" name="etitle" value={notecontent.etitle} onChange={onchange} />
                            <label style={{ margin: "5px 2px" }} htmlFor="edescription" >Edit description</label><br />
                            <textarea style={{ height: "100px", resize: 'none', width: "100%", padding: "0px 10px" }} name="edescription" id="edescription" value={notecontent.edescription} onChange={onchange} cols="30" rows="10"></textarea>
                            <label style={{ margin: "2px" }} htmlFor="etag" >Edit tag</label><br />
                            <input style={{ width: "100%", fontSize: "1.1em", padding: "0px 10px" }} type="text" value={notecontent.etag} id="etag" onChange={onchange} name="etag" />
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" disabled={notecontent.etitle.length < 5 || notecontent.edescription.length < 5} className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="notes-container">
                <h1 style={{ marginTop: 10 }}>Your Notes</h1>
                <div className="display-notes-container">
                    {notes.length === 0 && 'No notes to display'}
                    {notes.map((elm) => {
                        return <NoteItem note={elm} key={elm._id} updateNote={updateNote} showAlert={props.showAlert} />
                    })}
                </div>
            </div >
        </>
    )
}

export default Notes
