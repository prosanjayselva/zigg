// Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./nav.css";
import Logo from '../assets/zigga-logo.png'

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="nav">
      <div className="nav-logo">
        <img src={Logo} alt="" /><h1>Zigaa Technology</h1>
      </div>
      
      <ul className={`nav-links ${open ? "active" : ""}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/quotation">Quotation</Link></li>
        <li><Link to="/Liveorder">Live Orders</Link></li>
       
      </ul>

      <div className="nav-toggle" onClick={() => setOpen(!open)}>
        <span className={open ? "open" : ""}></span>
        <span className={open ? "open" : ""}></span>
        <span className={open ? "open" : ""}></span>
      </div>
    </nav>
  );
};

export default Navbar;
