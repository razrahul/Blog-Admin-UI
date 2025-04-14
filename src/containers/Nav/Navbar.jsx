import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.scss";
import {
  FaList,
  FaPlus,
  FaBell,
  FaUser,
  FaUsers,
  FaTrashAlt,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaUserCircle,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/action/userAction.js";

const Navbar = ({ user }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/blog-list");
    setShowProfileMenu(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      {/* Mobile Header */}
      <header className="navbar-mobile-header">
        <button
          className="navbar-toggle"
          onClick={toggleSidebar}
          aria-label="Toggle menu"
          aria-expanded={isSidebarOpen}
        >
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
        <h2 className="navbar-brand">TechTimes.ai</h2>
        <div className="navbar-user-icon" onClick={() => setShowProfileMenu(!showProfileMenu)}>
          <FaUserCircle size={24} />
        </div>
      </header>

      {/* Sidebar */}
      <aside className={`navbar-sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="navbar-brand-container">
          <h2 className="navbar-brand">TechTimes.ai</h2>
          <button className="navbar-close" onClick={toggleSidebar} aria-label="Close menu">
            <FaTimes />
          </button>
        </div>

        <nav className="navbar-nav">
          <SidebarItem icon={<FaList />} text="Blog List" to="/blog-list" />
          <SidebarItem icon={<FaPlus />} text="Add Blog" to="/add-blog" />
          <SidebarItem icon={<FaBell />} text="Contact" to="/contact" />
          <SidebarItem icon={<FaUser />} text="Profile" to="/profile" />
          {user && user.role?.name === "SuperAdmin" && (
            <SidebarItem icon={<FaUsers />} text="Users" to="/users" />
          )}
          <SidebarItem icon={<FaTrashAlt />} text="Recycle Bin" to="/recycle-bin" />
          <DropdownItem
            icon={<FaCog />}
            text="More"
            items={[
              { icon: <FaList />, text: "Category", to: "/category" },
              { icon: <FaUser />, text: "Role", to: "/role" },
              { icon: <FaUsers />, text: "Company", to: "/company" },
            ]}
          />
        </nav>

        <div className="navbar-user-section">
          <div className="navbar-user-info">
            <span className="navbar-user-name">{user?.name || "Guest"}</span>
            <span className="navbar-user-email">{user?.email || "guest@example.com"}</span>
          </div>
          <button className="navbar-logout" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      {/* Profile Menu (Mobile/Overlay) */}
      {showProfileMenu && (
        <div className="navbar-profile-menu-overlay">
          <div className="navbar-profile-menu">
            <button className="navbar-profile-menu-item" onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      )}

      {/* Main Content Overlay for Mobile */}
      {isSidebarOpen && <div className="navbar-overlay" onClick={toggleSidebar}></div>}
    </>
  );
};

const SidebarItem = ({ icon, text, to }) => (
  <Link to={to} className="navbar-item" onClick={() => window.innerWidth < 768 && setIsSidebarOpen(false)}>
    <span className="navbar-item-icon">{icon}</span>
    <span className="navbar-item-text">{text}</span>
  </Link>
);

const DropdownItem = ({ icon, text, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (e) => {
    e.preventDefault(); // Prevent default link behavior if any
    console.log("Toggling dropdown, isOpen:", !isOpen); // Debug log
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="navbar-item dropdown">
      <div className="navbar-item-content" onClick={handleToggle}>
        <span className="navbar-item-icon">{icon}</span>
        <span className="navbar-item-text">{text}</span>
        <span className="navbar-dropdown-arrow">{isOpen ? "▲" : "▼"}</span>
      </div>
      {isOpen && (
        <div className={`navbar-dropdown ${isOpen ? "open" : ""}`}>
          {items.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className="navbar-dropdown-item"
              onClick={() => {
                window.innerWidth < 768 && setIsSidebarOpen(false); // Close sidebar on mobile
                setIsOpen(false); // Close dropdown after selection
              }}
            >
              <span className="navbar-dropdown-icon">{item.icon}</span>
              <span className="navbar-dropdown-text">{item.text}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;