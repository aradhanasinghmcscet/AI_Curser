import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/list">My Lists</Link></li>
        <li><Link to="/tiles">Tiles</Link></li>
        <li><Link to="/scientific-calculator">Calculator</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/register">Register</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar; 