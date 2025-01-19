// components/RecycleBinPage.jsx
import React, { useState } from "react";
import BlogTable from "../../containers/Recycle/BlogTable";
import UsersTable from "../../containers/Recycle/UsersTable";
import ContactTable from "../../containers/Recycle/ContactTable";
import "./RecycleBin.scss";

const RecycleBinPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Toggle dropdown open/close
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // Handle dropdown item click
  const handleDropdownItemClick = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  // Handle Restore
  const handleRestore = (row) => console.log(`Restoring: ${row.title}`);

  // Handle Delete
  const handleDelete = (row) => console.log(`Deleting: ${row.title}`);

  return (
    <div className="recycle-bin-container">
      {/* Recycle Bin Button */}
      <button onClick={toggleDropdown} className="recycle-bin-button">
        {selectedItem ? `Selected: ${selectedItem}` : "Recycle Bin"}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <ul className="dropdown-menu">
          <li className="dropdown-item" onClick={() => handleDropdownItemClick("Blog")}>Blog</li>
          <li className="dropdown-item" onClick={() => handleDropdownItemClick("Users")}>Users</li>
          <li className="dropdown-item" onClick={() => handleDropdownItemClick("Contact")}>Contact</li>
        </ul>
      )}

      {/* Display Tables Based on Selection */}
      {selectedItem === "Blog" && <BlogTable handleRestore={handleRestore} handleDelete={handleDelete} />}
      {selectedItem === "Users" && <UsersTable />}
      {selectedItem === "Contact" && <ContactTable handleRestore={handleRestore} handleDelete={handleDelete} />}
    </div>
  );
};

export default RecycleBinPage;
