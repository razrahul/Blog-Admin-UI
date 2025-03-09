import React, { useState } from "react";
import Table from "./Table";
import "./MScss/AllMitem.scss"

const MCompanyTable = () => {
  const [mcompanies, setMcompanies] = useState([
    { id: 1, name: "Company A", description: "Tech Company" },
    { id: 2, name: "Company B", description: "Finance Company" },
  ]);
  const [newCompany, setNewCompany] = useState({ name: "", description: "" });
  const [editCompany, setEditCompany] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false); // New state for delete confirmation
  const [companyToDelete, setCompanyToDelete] = useState(null); // Store the company to be deleted

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
    setEditCompany(row);
    setNewCompany({ name: row.name, description: row.description });
    setIsPopupOpen(true);
  };

  const handleDeleteConfirmation = (row) => {
    setCompanyToDelete(row); // Store the company to delete
    setIsDeletePopupOpen(true); // Open the delete confirmation modal
  };

  const handleDelete = () => {
    if (companyToDelete) {
      setMcompanies(mcompanies.filter((item) => item.id !== companyToDelete.id));
    }
    setIsDeletePopupOpen(false); // Close the delete confirmation modal
  };

  const handleCancelDelete = () => {
    setIsDeletePopupOpen(false); // Close the delete confirmation modal
    setCompanyToDelete(null); // Reset the company to delete
  };

  const handleAddCompany = () => {
    const newId = mcompanies.length ? mcompanies[mcompanies.length - 1].id + 1 : 1;
    const newCompanyObject = { ...newCompany, id: newId };
    setMcompanies([...mcompanies, newCompanyObject]);
    setNewCompany({ name: "", description: "" });
  };

  const handleSaveCompany = () => {
    if (isEditing) {
      setMcompanies(mcompanies.map((item) =>
        item.id === editCompany.id ? { ...item, ...newCompany } : item
      ));
      setIsEditing(false);
    } else {
      handleAddCompany();
    }
    setIsPopupOpen(false);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setIsEditing(false);
    setNewCompany({ name: "", description: "" });
  };

  return (
    <div>
      <h3>Company Management</h3>
      <button onClick={() => setIsPopupOpen(true)}>Add Company</button>
      <Table data={mcompanies} columns={columns} />

      {/* Edit/Add Popup */}
      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <h4>{isEditing ? "Edit Company" : "Add Company"}</h4>
            <div>
              <label>Name:</label>
              <input
                type="text"
                value={newCompany.name}
                onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
              />
            </div>
            <div>
              <label>Description:</label>
              <input
                type="text"
                value={newCompany.description}
                onChange={(e) => setNewCompany({ ...newCompany, description: e.target.value })}
              />
            </div>
            <button onClick={handleSaveCompany}>{isEditing ? "Save" : "Add"}</button>
            <button onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Popup */}
      {isDeletePopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <h4>Are you sure you want to delete this company?</h4>
            <p>{companyToDelete ? companyToDelete.name : ""}</p>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={handleCancelDelete}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MCompanyTable;
