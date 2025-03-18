import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.scss";
import {
  FaList,
  FaUserPlus,
  FaBell,
  FaUsers,
  FaSignOutAlt,
  FaBars,
  FaTrashAlt,
  FaCog,
  FaUserCircle,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/action/userAction.js";

const Navbar = ({ user }) => {
  const [activeDropdown, setActiveDropdown] = useState(null); // Track active dropdown
  const [showProfileMenu, setShowProfileMenu] = useState(false); // Profile menu visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobile menu visibility

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Toggle dropdown for a specific section
  const toggleDropdown = (section) => {
    setActiveDropdown((prev) => (prev === section ? null : section));
  };

  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <aside className="navbar">
      <nav className="navbar__container">
        {/* Sidebar Header */}
        <div className="navbar__header">
          <h2 className="navbar__title">TechTimes.ai</h2>
          <button
            onClick={toggleMobileMenu}
            className="navbar__toggle-button"
            aria-label="Toggle menu"
          >
            <FaBars />
          </button>
        </div>

        {/* Sidebar Links */}
        <ul className={`navbar__links ${isMobileMenuOpen ? "open" : ""}`}>
          <SidebarItem
            icon={<FaList size={20} />}
            text="List of Blog"
            to="/blog-list"
          />
          <SidebarItem
            icon={<FaUserPlus size={20} />}
            text="Add New Blogs"
            to="/add-blog"
          />
          <SidebarItem
            icon={<FaBell size={20} />}
            text="Contact"
            to="/contact"
          />
          <SidebarItem
            icon={<FaUserCircle size={20} />}
            text="Profile"
            to="/profile"
          />
          {user && user.role?.name === "SuperAdmin" && (
            <SidebarItem
              icon={<FaUsers size={20} />}
              text="Users"
              to="/users"
            />
          )}
          <SidebarItem
            icon={<FaTrashAlt size={20} />}
            text="Recycle Bin"
            to="/recycle-bin"
          />
          <SidebarItem
            icon={<FaCog size={20} />}
            text="More Items"
            section="more"
            toggleDropdown={toggleDropdown}
            isActive={activeDropdown === "more"}
          >
            <SidebarItem
              icon={<FaCog size={18} />}
              text="Category"
              to="/category"
            />
            <SidebarItem icon={<FaCog size={18} />} text="Role" to="/role" />
            <SidebarItem
              icon={<FaCog size={18} />}
              text="Company"
              to="/company"
            />
          </SidebarItem>
        </ul>

        {/* User Profile Section */}
        <div className="navbar__user-profile">
          <div className="navbar__user-info">
            <div className="navbar__user-name">
              {user ? user.name : "Guest"}
            </div>
            <div className="navbar__user-email">
              {user ? user.email : "guest@example.com"}
            </div>
            <button
              onClick={() => setShowProfileMenu((prev) => !prev)}
              className="navbar__profile-toggle"
            >
              <FaCog size={20} />
            </button>
          </div>

          {/* Profile Menu */}
          {showProfileMenu && (
            <div className="navbar__profile-menu">
              <button
                className="navbar__profile-menu-button"
                onClick={handleLogout}
              >
                <FaSignOutAlt size={16} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
};

// SidebarItem Component
const SidebarItem = ({
  icon,
  text,
  section,
  children,
  toggleDropdown,
  isActive,
  to,
}) => {
  const handleClick = () => {
    if (section && toggleDropdown) {
      toggleDropdown(section);
    }
  };

  return (
    <li className="sidebar-item">
      {to ? (
        <Link to={to} className="sidebar-item__link" onClick={handleClick}>
          <div className="sidebar-item__content">
            {icon}
            <span className="sidebar-item__text">{text}</span>
          </div>
        </Link>
      ) : (
        <div className="sidebar-item__content" onClick={handleClick}>
          {icon}
          <span className="sidebar-item__text">{text}</span>
        </div>
      )}

      {/* Show dropdown items if section is active */}
      {isActive && <ul className="sidebar-item__more-dropdown">{children}</ul>}
    </li>
  );
};

export default Navbar;
