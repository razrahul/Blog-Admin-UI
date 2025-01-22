import React, { useState } from "react";
import MCategoryTable from "../../containers/MItem/MCategoryTable";
import MRoleTable from "../../containers/MItem/MRoleTable";
import MCompanyTable from "../../containers/MItem/MCompanyTable";
import './More.scss'

const MoreItemPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [editItem, setEditItem] = useState(null); // Track the item being edited
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // Show delete confirmation
  const [itemToDelete, setItemToDelete] = useState(null); // Track the item to delete

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // Handle selection from dropdown
  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsOpen(false); // Close the dropdown after selection
  };

  // Columns for all tables
  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="action-buttons">
          <button className="edit-button" onClick={() => handleEdit(row)}>
            Edit
          </button>
          <button className="delete-button" onClick={() => handleDelete(row)}>
            Delete
          </button>
        </div>
      ),
    },
  ];

  // Handle the edit action
  const handleEdit = (row) => {
    setEditItem(row); // Set the item being edited
    setNewTitle(row.title); // Populate the title field
    setNewDescription(row.description); // Populate the description field
  };

  // Save edited item
  const handleSave = () => {
    // Close the edit modal and reset fields
    setEditItem(null);
    setNewTitle("");
    setNewDescription("");
  };

  // Handle the delete action
  const handleDelete = (item) => {
    setItemToDelete(item); // Track the item to delete
    setShowDeleteConfirm(true); // Show delete confirmation dialog
  };

  // Confirm delete
  const confirmDelete = () => {
    // Close the delete modal and reset
    setShowDeleteConfirm(false);
    setItemToDelete(null);
  };

  // Cancel delete action
  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setItemToDelete(null);
  };

  return (
    <div>
      <div className="more-item-container">
        <button onClick={toggleDropdown} className="more-button">
          {selectedItem ? `Selected: ${selectedItem}` : "More Item"}
        </button>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <ul className="drop-down-menu">
          <li
            className="drop-down-item"
            onClick={() => handleItemClick("category")}
          >
            Category
          </li>
          <li className="drop-down-item" onClick={() => handleItemClick("role")}>
            Role
          </li>
          <li
            className="drop-down-item"
            onClick={() => handleItemClick("company")}
          >
            Company
          </li>
        </ul>
      )}

      {/* Display Add Item Form */}
      {selectedItem && (
        <div className="add-form">
          <h3>
            Add {selectedItem.charAt(0).toUpperCase() + selectedItem.slice(1)}
          </h3>
          <input
            type="text"
            placeholder="Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <textarea
            placeholder="Description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
          <button onClick={() => {}}>Add</button>
        </div>
      )}

      {/* Display Table Based on Selection */}
      {selectedItem === "category" && <MCategoryTable columns={columns} />}
      {selectedItem === "role" && <MRoleTable columns={columns} />}
      {selectedItem === "company" && <MCompanyTable columns={columns} />}

      {/* Edit Modal */}
      {editItem && (
        <div className="item-modal">
          <div className="item-modal-content">
            <h3>Edit {selectedItem}</h3>
            <input
              type="text"
              placeholder="Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <textarea
              placeholder="Description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setEditItem(null)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="item-modal">
          <div className="item-modal-content">
            <p>Are you sure you want to delete this item?</p>
            <button onClick={confirmDelete}>Yes, Delete</button>
            <button onClick={cancelDelete}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoreItemPage;
