import React from 'react'
import AddNote from './AddNote'
const Home = (props) => {
    document.title = "Notes - (Home)";

    return (
        <div>
            <AddNote showAlert={props.showAlert} />
        </div>
    )
}

export default Home
