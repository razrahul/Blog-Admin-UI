// components/RecycleBinPage.jsx
import React, { useState } from "react";
import BlogTable from "../../containers/Recycle/BlogTable";
import UsersTable from "../../containers/Recycle/UsersTable";
import ContactTable from "../../containers/Recycle/ContactTable";
import "./RecycleBin.scss";
import RolesTable from "../../containers/Recycle/RolesTable";
import CategoryTable from "../../containers/Recycle/CategoryTable";
import CompanyTable from "../../containers/Recycle/CompanyTable";


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
          <li className="dropdown-item" onClick={() => handleDropdownItemClick("Roles")}>Roles</li>
          <li className="dropdown-item" onClick={() => handleDropdownItemClick("Category")}>Category</li>
          <li className="dropdown-item" onClick={() => handleDropdownItemClick("Company")}>Company</li>
        </ul>
      )}

      {/* Display Tables Based on Selection */}
      {selectedItem === "Blog" && <BlogTable handleRestore={handleRestore} handleDelete={handleDelete} />}
      {selectedItem === "Users" && <UsersTable />}
      {selectedItem === "Contact" && <ContactTable handleRestore={handleRestore} handleDelete={handleDelete} />}
      {selectedItem === "Roles" && <RolesTable />}
      {selectedItem === "Category" && <CategoryTable />}
      {selectedItem === "Company" && <CompanyTable />}
    </div>
  );
};

export default RecycleBinPage;
