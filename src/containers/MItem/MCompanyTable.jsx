import React, { useEffect, useState } from "react";
import Table from "./Table";
import "./MScss/AllMitem.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCompanies,
  createCompany,
  updateCompany,
  deleteCompany,
} from "../../redux/action/companyAction";
import Button from "../../components/conformationButtom/Button.jsx";
import { MdDelete } from "react-icons/md";
import { FaEdit,FaPlus } from "react-icons/fa";

const MCompanyTable = () => {
  const [newCompany, setNewCompany] = useState({
    companyName: "",
    companyId: "",
  });
  const [editCompany, setEditCompany] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const { companies } = useSelector((state) => state.company);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCompanies());
  }, [dispatch]);

  const columns = [
    {
      name: "Company Name",
      selector: (row) => row.companyName,
      sortable: true,
    },
    { name: "Company Id", selector: (row) => row.companyId, sortable: true },
    {
      name: "Active",
      selector: (row) => (row.isactive ? "Active" : "Inactive"),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="action-buttons">
          <button onClick={() => handleEdit(row)} className="edit-button">
            <FaEdit className="edit-icon" />
          </button>
          <Button
            onConfirm={() => handleDeleteCompany(row._id)}
            title="Permanently Delete Company"
            description={`Are you sure you want to delete \"${row.companyName}\"?`}
            buttonClass="delete-button"
          >
            <MdDelete className="delete-icon" />
          </Button>
        </div>
      ),
    },
  ];

  const handleEdit = (row) => {
    setIsEditing(true);
    setEditCompany(row);
    setNewCompany({
      companyName: row.companyName || "", 
      companyId: row.companyId || ""
    });
    setIsPopupOpen(true);
  };

  const handleDeleteCompany = (companyId) => {
    dispatch(deleteCompany(companyId));
  };

  const handleSaveCompany = () => {
    if (isEditing) {
      dispatch(updateCompany(editCompany._id, newCompany));
    } else {
      dispatch(createCompany(newCompany));
    }
    setIsPopupOpen(false);
    setIsEditing(false);
    setNewCompany({ companyName: "", companyId: "" });
  };

  const handlePopClose = () =>{
    setIsPopupOpen(false);
    setNewCompany({ companyName: "", companyId: "" });
  };

  return (
    <div className="table-wrap">
      <div className="header">
  <h3>Company Management</h3>
  <div className="actions">
    <button className="btn primary" onClick={() => { setIsEditing(false); setEditCompany(null); setNewCompany({ companyName:"", companyId:"" }); setIsPopupOpen(true); }}>
      <FaPlus /> <span>Add Company</span>
    </button>
  </div>
</div>
      <Table data={companies} columns={columns} />

    {isPopupOpen && (
  <div className="popup" role="dialog" aria-modal="true" aria-labelledby="company-popup-title">
    <div className="popup-content">
      <h4 id="company-popup-title">{isEditing ? "Edit Company" : "Add Company"}</h4>

      <div className="form-row">
        <label htmlFor="company-name">Company Name:</label>
        <input
          id="company-name"
          type="text"
          value={newCompany.companyName}
          onChange={(e) => setNewCompany({ ...newCompany, companyName: e.target.value })}
          placeholder="Enter company name"
        />
      </div>

      <div className="form-row">
        <label htmlFor="company-id">Company Id (optional):</label>
        <input
          id="company-id"
          type="text"
          value={newCompany.companyId}
          onChange={(e) => setNewCompany({ ...newCompany, companyId: e.target.value })}
          placeholder="e.g. CMP-001"
        />
      </div>

      <div className="popup-actions">
        <button className="btn primary" onClick={handleSaveCompany}>
          {isEditing ? "Save" : "Add"}
        </button>
        <button className="btn" onClick={handlePopClose}>Close</button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default MCompanyTable;
