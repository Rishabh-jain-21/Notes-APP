import React, { useState } from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home';
import NotesState from './context/notes/NotesState';
import Notes from './Components/Notes';
import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom'
import About from './Components/About';
import Login from './Components/LoginForm/Login';
import Signup from './Components/Signup form/Signup';
import Alert from './Components/Alert';
function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  return (
    <>
      <NotesState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <div className="container-1">
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert} />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/yournotes" element={<Notes showAlert={showAlert} />} />
              <Route exact path="/login" element={<Login showAlert={showAlert} />} />
              <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
            </Routes>
          </div>
        </Router>
      </NotesState>
    </>
  );
}

export default App;
