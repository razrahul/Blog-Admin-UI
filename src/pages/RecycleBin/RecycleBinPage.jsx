import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import './RecycleBin.scss';

const RecycleBinPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Toggle dropdown open/close
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // Data for each category (Blog, Users, Contact)
  const blogData = [
    { id: 1, title: 'Blog Post 1', description: 'Description of Blog Post 1' },
    { id: 2, title: 'Blog Post 2', description: 'Description of Blog Post 2' },
  ];

  const usersData = [
    { id: 1, title: 'User 1', description: 'Description of User 1' },
    { id: 2, title: 'User 2', description: 'Description of User 2' },
  ];

  const contactData = [
    { id: 1, title: 'Contact 1', description: 'Description of Contact 1' },
    { id: 2, title: 'Contact 2', description: 'Description of Contact 2' },
  ];

  // Columns for the DataTable
  const columns = [
    {
      name: 'Title',
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: 'Description',
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div>
          <button onClick={() => handleRestore(row)}>Restore</button>
          <button onClick={() => handleDelete(row)}>Delete</button>
        </div>
      ),
    },
  ];

  // Handle the restore action
  const handleRestore = (row) => {
    console.log(`Restoring: ${row.title}`);
  };

  // Handle the delete action
  const handleDelete = (row) => {
    console.log(`Deleting: ${row.title}`);
  };

  // Handle dropdown item click
  const handleDropdownItemClick = (item) => {
    setSelectedItem(item); // Update selected item
    setIsOpen(false); // Close dropdown
  };

  return (
    <div>
      {/* Dropdown toggle button */}
      <button onClick={toggleDropdown} className="dropdown-toggle">
        {selectedItem ? `Selected: ${selectedItem}` : 'Recycle Bin'}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <ul className="dropdown-menu">
          <li
            className="dropdown-item"
            onClick={() => handleDropdownItemClick('Blog')}
          >
            Blog
          </li>
          <li
            className="dropdown-item"
            onClick={() => handleDropdownItemClick('Users')}
          >
            Users
          </li>
          <li
            className="dropdown-item"
            onClick={() => handleDropdownItemClick('Contact')}
          >
            Contact
          </li>
        </ul>
      )}

      {/* Display DataTable based on selected item */}
      {selectedItem === 'Blog' && (
        <DataTable
          title="Blog Items"
          columns={columns}
          data={blogData}
          pagination
        />
      )}
      {selectedItem === 'Users' && (
        <DataTable
          title="Users"
          columns={columns}
          data={usersData}
          pagination
        />
      )}
      {selectedItem === 'Contact' && (
        <DataTable
          title="Contact Items"
          columns={columns}
          data={contactData}
          pagination
        />
      )}
    </div>
  );
};

export default RecycleBinPage;
