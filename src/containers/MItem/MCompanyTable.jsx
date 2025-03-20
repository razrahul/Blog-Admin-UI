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
import { FaEdit } from "react-icons/fa";

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
    <div>
      <h3>Company Management</h3>
      <button onClick={() => setIsPopupOpen(true)}>Add Company</button>
      <Table data={companies} columns={columns} />

      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <h4>{isEditing ? "Edit Company" : "Add Company"}</h4>
            <div>
              <label>Company Name:</label>
              <input
                type="text"
                value={newCompany.companyName}
                onChange={(e) =>
                  setNewCompany({ ...newCompany, companyName: e.target.value })
                }
              />
            </div>
            <div>
              <label>Company Id:(optional)</label>
              <input
                type="text"
                value={newCompany.companyId}
                onChange={(e) =>
                  setNewCompany({ ...newCompany, companyId: e.target.value })
                }
              />
            </div>
            <button onClick={handleSaveCompany}>
              {isEditing ? "Save" : "Add"}
            </button>
            {/* <button onClick={() => setIsPopupOpen(false)}>Close</button> */}
            <button onClick={handlePopClose}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MCompanyTable;
