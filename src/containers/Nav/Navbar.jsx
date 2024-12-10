import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.scss";
import {
  FaList,
  FaUserPlus,
  FaBell,
  FaUsers,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);

  };
  const navigate = useNavigate();

    const handleLogout = () => {
      localStorage.removeItem("token");
      window.location.reload();
      // navigate("/");
    };

  return (
    <div className="navbar">
      <h2>TechTimes.</h2>
      <button className="menu-toggle" onClick={toggleMenu}>
        <FaBars />
      </button>
      <div className={`nav-links ${isMenuOpen ? "open" : ""}`}>
        <NavLink to="/blog-list" activeClassName="active">
          <FaList /> List of Blog
        </NavLink>
        <NavLink to="/add-blog" activeClassName="active">
          <FaUserPlus /> Add New Blogs
        </NavLink>
        <NavLink to="/contact" activeClassName="active">
          <FaBell /> Contact
        </NavLink>
        <NavLink to="/users" activeClassName="active">
          <FaUsers /> Users
        </NavLink>
        <button className="logout" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
