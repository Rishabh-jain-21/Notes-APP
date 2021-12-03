import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home';
import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom'
import About from './Components/About';
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />

          <Route exact path="/about" element={<About />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
