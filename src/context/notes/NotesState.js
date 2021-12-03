import React from "react";
import NoteContext from "./noteContext";

const NotesState = (props) => {
    console.log(props.children)
    return (
        <NoteContext.Provider value={{}}>
            {props.children}
        </NoteContext.Provider>
    );
}

export default NotesState;