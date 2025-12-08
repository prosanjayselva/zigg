// Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./nav.css";
import Logo from '../assets/zigga-logo.png'

const Navbar = () => {
  const [open, setOpen] = useState(false);

  // Auto close menu when link is clicked
  const closeMenu = () => setOpen(false);

  return (
    <nav className="nav">
      <div className="nav-logo">
        <img src={Logo} alt="logo" />
        <h1>Zigaa Technology</h1>
      </div>
      
      <ul className={`nav-links ${open ? "active" : ""}`}>
        <li><Link to="/" onClick={closeMenu}>Home</Link></li>
        <li><Link to="/newQuotat" onClick={closeMenu}>NewQuotation</Link></li>
        {/* <li><Link to="/quotation" onClick={closeMenu}>Quotation</Link></li> */}
        {/* <li><Link to="/Liveorder" onClick={closeMenu}>Live Orders</Link></li> */}
        {/* <li><Link to="/Dashboard" onClick={closeMenu}>Dashboard</Link></li> */}
        <li><Link to="/Account" onClick={closeMenu}>Account</Link></li>
      </ul>

      <div className="nav-toggle" onClick={() => setOpen(!open)}>
        <span className={open ? "open" : ""}></span>
        <span className={open ? "open" : ""}></span>
        {/* <span className={open ? "open" : ""}></span> */}
        {/* <span className={open ? "open" : ""}></span>  */}
        <span className={open ? "open" : ""}></span> 
      </div>
    </nav>
  );
};

export default Navbar;
