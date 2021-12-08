import React, { useState } from "react";
import NoteContext from "./noteContext";

const NotesState = (props) => {
    const host = "http://localhost:5000"
    const notesInitial = [];
    const [notes, setnotes] = useState(notesInitial);

    //get all notes
    const getNotes = async () => {
        //Pending - server side
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFhNTBkY2E5ZmNiNTcxYjlmNjZjZmJhIn0sImlhdCI6MTYzODIwNjkyMn0.Nfoza1os5dQcQUPY3BelkzHfmoJsEiZk1gR01aE7FDk"
            },
        });
        const json = await response.json();
        // console.log(json);
        setnotes(json);
    }

    //Add a note
    const addNote = async (title, description, tag) => {
        //Pending - server side
        const response = await fetch(`${host}/api/notes/addnotes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFhNTBkY2E5ZmNiNTcxYjlmNjZjZmJhIn0sImlhdCI6MTYzODIwNjkyMn0.Nfoza1os5dQcQUPY3BelkzHfmoJsEiZk1gR01aE7FDk"
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json();
        setnotes(notes.concat(note));
    }

    //Delete a note
    const deleteNode = async (id) => {

        //Pending - server side
        const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFhNTBkY2E5ZmNiNTcxYjlmNjZjZmJhIn0sImlhdCI6MTYzODIwNjkyMn0.Nfoza1os5dQcQUPY3BelkzHfmoJsEiZk1gR01aE7FDk"
            },
        });
        const json = response.json();
        console.log(json);
        //deleting logic
        console.log("Deleting note with id ", id);
        const newNotes = notes.filter((note) => { return note._id !== id });
        setnotes(newNotes);
    }

    //Edit a note
    const editNote = async (id, title, description, tag) => {
        //server side 
        const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFhNTBkY2E5ZmNiNTcxYjlmNjZjZmJhIn0sImlhdCI6MTYzODIwNjkyMn0.Nfoza1os5dQcQUPY3BelkzHfmoJsEiZk1gR01aE7FDk"
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = response.json();

        // creating new notes to render immediately 
        let newNotes = JSON.parse(JSON.stringify(notes));

        // editing logic
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;

                break;
            }
        }
        setnotes(newNotes);
    }
    return (
        <NoteContext.Provider value={{ notes, addNote, editNote, deleteNode, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    );
}

export default NotesState;