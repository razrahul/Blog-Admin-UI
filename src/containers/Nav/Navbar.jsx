import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
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
  FaChevronDown,
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
    setIsSidebarOpen(false);
  };

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeMobileSidebar = () => {
    if (window.innerWidth < 768) setIsSidebarOpen(false);
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
        <button
          className="navbar-user-icon"
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          aria-haspopup="menu"
          aria-expanded={showProfileMenu}
          aria-label="Open profile menu"
        >
          <FaUserCircle size={22} />
        </button>
      </header>

      {/* Sidebar */}
      <aside className={`navbar-sidebar ${isSidebarOpen ? "open" : ""}`} aria-label="Sidebar">
        <div className="navbar-brand-container">
          <h2 className="navbar-brand">TechTimes.ai</h2>
          <button className="navbar-close" onClick={toggleSidebar} aria-label="Close menu">
            <FaTimes />
          </button>
        </div>

        <nav className="navbar-nav">
          <SidebarItem icon={<FaList />} text="Blog List" to="/blog-list" onItemClick={closeMobileSidebar} />
          <SidebarItem icon={<FaPlus />} text="Add Blog" to="/add-blog" onItemClick={closeMobileSidebar} />
          <SidebarItem icon={<FaBell />} text="Contact" to="/contact" onItemClick={closeMobileSidebar} />
          <SidebarItem icon={<FaUser />} text="Profile" to="/profile" onItemClick={closeMobileSidebar} />

          {user && user.role?.name === "SuperAdmin" && (
            <>
            <SidebarItem icon={<FaUsers />} text="Users" to="/users" onItemClick={closeMobileSidebar} />
            <SidebarItem icon={<FaTrashAlt />} text="Recycle Bin" to="/recycle-bin" onItemClick={closeMobileSidebar} />
            </>
          )}
          
          

          <DropdownItem
            icon={<FaCog />}
            text="More"
            items={[
              { icon: <FaList />, text: "Category", to: "/category" },
              { icon: <FaUser />, text: "Role", to: "/role" },
              { icon: <FaUsers />, text: "Company", to: "/company" },
            ]}
            onNavigate={closeMobileSidebar}
          />
        </nav>

        {/* User Panel (name & email above logout) */}
        <div className="navbar-user-section">
          <div className="navbar-user-avatar">
            <FaUserCircle />
          </div>
          <div className="navbar-user-info">
            <span className="navbar-user-name">{user?.name || "Guest User"}</span>
            <span className="navbar-user-email">{user?.email || "guest@example.com"}</span>
          </div>
          <button className="navbar-logout" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      {/* Profile Menu (Mobile/Overlay) */}
      {showProfileMenu && (
        <div className="navbar-profile-menu-overlay" onClick={() => setShowProfileMenu(false)}>
          <div className="navbar-profile-menu" role="menu" onClick={(e) => e.stopPropagation()}>
            <button className="navbar-profile-menu-item" onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      )}

      {/* Main Content Overlay for Mobile */}
      {isSidebarOpen && <div className="navbar-overlay" onClick={toggleSidebar} />}
    </>
  );
};

const SidebarItem = ({ icon, text, to, onItemClick }) => (
  <NavLink
    to={to}
    className={({ isActive }) => `navbar-item ${isActive ? "active" : ""}`}
    onClick={onItemClick}
  >
    <span className="navbar-item-icon">{icon}</span>
    <span className="navbar-item-text">{text}</span>
  </NavLink>
);

const DropdownItem = ({ icon, text, items, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (e) => {
    e.preventDefault();
    setIsOpen((p) => !p);
  };

  return (
    <div className={`navbar-item dropdown ${isOpen ? "open" : ""}`}>
      <button
        className="navbar-item-content"
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-controls="navbar-more-panel"
      >
        <span className="navbar-item-icon">{icon}</span>
        <span className="navbar-item-text">{text}</span>
        <FaChevronDown className={`navbar-dropdown-arrow ${isOpen ? "rotated" : ""}`} />
      </button>

      <div
        id="navbar-more-panel"
        className={`navbar-accordion ${isOpen ? "open" : ""}`}
        role="region"
        aria-hidden={!isOpen}
      >
        {items.map((item, index) => (
          <NavLink
            key={index}
            to={item.to}
            className={({ isActive }) =>
              `navbar-accordion-item ${isActive ? "active" : ""}`
            }
            onClick={onNavigate}
          >
            <span className="navbar-dropdown-icon">{item.icon}</span>
            <span className="navbar-dropdown-text">{item.text}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
