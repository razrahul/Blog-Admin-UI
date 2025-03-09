import React, { useState } from "react";
import Table from "./Table";


const MRoleTable = () => {
  const [roles, setRoles] = useState([
    { id: 1, name: "Admin", description: "Administrator Role" },
    { id: 2, name: "User", description: "Standard User Role" },
  ]);
  const [newRole, setNewRole] = useState({ name: "", description: "" });
  const [editRole, setEditRole] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false); // New state for delete confirmation
  const [roleToDelete, setRoleToDelete] = useState(null); // Store the role to be deleted

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
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
        <div>
          <button onClick={() => handleEdit(row)}>Edit</button>
          <button onClick={() => handleDeleteConfirmation(row)}>Delete</button>
        </div>
      ),
    },
  ];

  const handleEdit = (row) => {
    setIsEditing(true);
    setEditRole(row);
    setNewRole({ name: row.name, description: row.description });
    setIsPopupOpen(true);
  };

  const handleDeleteConfirmation = (row) => {
    setRoleToDelete(row); // Store the role to delete
    setIsDeletePopupOpen(true); // Open the delete confirmation modal
  };

  const handleDelete = () => {
    if (roleToDelete) {
      setRoles(roles.filter((item) => item.id !== roleToDelete.id));
    }
    setIsDeletePopupOpen(false); // Close the delete confirmation modal
  };

  const handleCancelDelete = () => {
    setIsDeletePopupOpen(false); // Close the delete confirmation modal
    setRoleToDelete(null); // Reset the role to delete
  };

  const handleAddRole = () => {
    const newId = roles.length ? roles[roles.length - 1].id + 1 : 1;
    const newRoleObject = { ...newRole, id: newId };
    setRoles([...roles, newRoleObject]);
    setNewRole({ name: "", description: "" });
  };

  const handleSaveRole = () => {
    if (isEditing) {
      setRoles(roles.map((item) =>
        item.id === editRole.id ? { ...item, ...newRole } : item
      ));
      setIsEditing(false);
    } else {
      handleAddRole();
    }
    setIsPopupOpen(false);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setIsEditing(false);
    setNewRole({ name: "", description: "" });
  };

  return (
    <div>
      <h3>Role Management</h3>
      <button onClick={() => setIsPopupOpen(true)}>Add Role</button>
      <Table data={roles} columns={columns} />

      {/* Edit/Add Popup */}
      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <h4>{isEditing ? "Edit Role" : "Add Role"}</h4>
            <div>
              <label>Name:</label>
              <input
                type="text"
                value={newRole.name}
                onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
              />
            </div>
            <div>
              <label>Description:</label>
              <input
                type="text"
                value={newRole.description}
                onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
              />
            </div>
            <button onClick={handleSaveRole}>{isEditing ? "Save" : "Add"}</button>
            <button onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Popup */}
      {isDeletePopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <h4>Are you sure you want to delete this role?</h4>
            <p>{roleToDelete ? roleToDelete.name : ""}</p>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={handleCancelDelete}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MRoleTable;
