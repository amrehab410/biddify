import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./style/Navbar.css";
import logo from "./style/Pics/logo.png"

const Navbar = () => {
    const location = useLocation();

    const getButtonClass = (path) => {
      return location.pathname === path ? "nav-button active" : "nav-button";
    };
  
    return (
        <nav className="navbar">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <div className="nav-links">
          <Link to="/dashboard" className={getButtonClass("/dashboard")}>
            Home
          </Link>
          <Link to="/create-auction" className={getButtonClass("/create-auction")}>
            Create Auction
          </Link>
          <Link to="/auctions-page" className={getButtonClass("/auctions-page")}>
            Auctions
          </Link>
          {/* <Link to="/profile" className={getButtonClass("/profile")}>
            Profile
          </Link> */}
        </div>
      </nav>
  );
};

export default Navbar;