import React from 'react'
import AddNote from './AddNote'
const Home = () => {
    document.title = "Notes - (Home)";

    return (
        <div>
            <AddNote />
        </div>
    )
}

export default Home
