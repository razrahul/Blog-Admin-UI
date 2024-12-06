import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.scss';
import { FaList, FaUserPlus, FaBell, FaUsers, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  return (
    <div className="navbar">
      <h2>TechTimes.</h2>
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
      <button className="logout">
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
};

export default Navbar;
