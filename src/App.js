import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import TileList from './components/Tiles/TileList';
import ListCreator from './components/ListCreator';
import About from './components/About';
import RegistrationForm from './components/Forms/RegistrationForm'; 
import ScientificCalculator from './components/calculator/ScientificCalculator';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tiles" element={<TileList />} />
          <Route path="/list" element={<ListCreator />} />
          <Route path="/about" element={<About />} />
          <Route path="/scientific-calculator" element={<ScientificCalculator />} />
          <Route path="/register" element={<RegistrationForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;