import React, { useState } from "react";
import DataTable from "react-data-table-component";
import "./MoreItemPage.scss";

const MoreItemPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [editItem, setEditItem] = useState(null); // Track the item being edited
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // Show delete confirmation
  const [itemToDelete, setItemToDelete] = useState(null); // Track the item to delete

  // Data for each category (Category, Role, Company)
  const [categoryData, setCategoryData] = useState([
    { id: 1, title: "Category 1", description: "Description of Category 1" },
    { id: 2, title: "Category 2", description: "Description of Category 2" },
  ]);

  const [roleData, setRoleData] = useState([
    { id: 1, title: "Role 1", description: "Description of Role 1" },
    { id: 2, title: "Role 2", description: "Description of Role 2" },
  ]);

  const [companyData, setCompanyData] = useState([
    { id: 1, title: "Company 1", description: "Description of Company 1" },
    { id: 2, title: "Company 2", description: "Description of Company 2" },
  ]);

  // Columns for the DataTable
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

  // Handle the save action after editing
  const handleSave = () => {
    const updatedItem = {
      ...editItem,
      title: newTitle,
      description: newDescription,
    };

    if (selectedItem === "category") {
      setCategoryData(
        categoryData.map((item) =>
          item.id === editItem.id ? updatedItem : item
        )
      );
    } else if (selectedItem === "company") {
      setCompanyData(
        companyData.map((item) =>
          item.id === editItem.id ? updatedItem : item
        )
      );
    } else if (selectedItem === "role") {
      setRoleData(
        roleData.map((item) => (item.id === editItem.id ? updatedItem : item))
      );
    }

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

  // Confirm delete action
  const confirmDelete = () => {
    if (selectedItem === "category") {
      setCategoryData(
        categoryData.filter((item) => item.id !== itemToDelete.id)
      );
    } else if (selectedItem === "company") {
      setCompanyData(companyData.filter((item) => item.id !== itemToDelete.id));
    } else if (selectedItem === "role") {
      setRoleData(roleData.filter((item) => item.id !== itemToDelete.id));
    }

    // Close the delete modal and reset
    setShowDeleteConfirm(false);
    setItemToDelete(null);
  };

  // Cancel delete action
  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setItemToDelete(null);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsOpen(false); // Close the dropdown after selection
  };

  const handleAdd = () => {
    const newItem = {
      id:
        Math.max(
          ...[...categoryData, ...roleData, ...companyData].map(
            (item) => item.id
          )
        ) + 1,
      title: newTitle,
      description: newDescription,
    };

    if (selectedItem === "category") {
      setCategoryData([...categoryData, newItem]);
    } else if (selectedItem === "company") {
      setCompanyData([...companyData, newItem]);
    } else if (selectedItem === "role") {
      setRoleData([...roleData, newItem]);
    }

    setNewTitle("");
    setNewDescription("");
  };

  return (
    <div>
      <div className="dropdown-container">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="dropdown-toggle"
          aria-expanded={isOpen}
        >
          {selectedItem ? `Selected: ${selectedItem}` : "More Items"}
        </button>
      </div>

      {isOpen && (
        <ul className="dropdown-menu">
          <li
            className="dropdown-item"
            onClick={() => handleItemClick("category")}
          >
            Category
          </li>
          <li className="dropdown-item" onClick={() => handleItemClick("role")}>
            Role
          </li>
          <li
            className="dropdown-item"
            onClick={() => handleItemClick("company")}
          >
            Company
          </li>
        </ul>
      )}

      {selectedItem && (
        <div className="add-item-form">
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
          <button onClick={handleAdd}>Add</button>
        </div>
      )}

      {/* Edit Modal */}
      {editItem && (
        <div className="modal">
          <div className="modal-content">
            <h3>
              Edit{" "}
              {selectedItem.charAt(0).toUpperCase() + selectedItem.slice(1)}
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
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setEditItem(null)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to delete this item?</p>
            <button onClick={confirmDelete}>Yes, Delete</button>
            <button onClick={cancelDelete}>Cancel</button>
          </div>
        </div>
      )}

      {selectedItem === "category" && (
        <DataTable
          title="Category Items"
          columns={columns}
          data={categoryData}
          pagination
        />
      )}
      {selectedItem === "role" && (
        <DataTable
          title="Role Items"
          columns={columns}
          data={roleData}
          pagination
        />
      )}
      {selectedItem === "company" && (
        <DataTable
          title="Company Items"
          columns={columns}
          data={companyData}
          pagination
        />
      )}
    </div>
  );
};

export default MoreItemPage;
