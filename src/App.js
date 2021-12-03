import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home';
import NotesState from './context/notes/NotesState';
import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom'
import About from './Components/About';
function App() {
  return (
    <>
      <NotesState>
        <Router>
          <Navbar />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
            </Routes>
          </div>
        </Router>
      </NotesState>
    </>
  );
}

export default App;
