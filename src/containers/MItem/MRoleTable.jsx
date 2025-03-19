import React, { useState, useEffect } from "react";
import Table from "./Table";
import { useDispatch, useSelector } from "react-redux";
import { getAllRoles, updateRole, createRole, deleteRole } from "../../redux/action/rolesActions";
import { getAllUsers } from "../../redux/action/admin";
import Button from "../../components/conformationButtom/Button.jsx";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import "./MScss/AllMitem.scss"

const MRoleTable = () => {
  const [newRole, setNewRole] = useState({ name: "" });
  const [editRole, setEditRole] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const { roles: data } = useSelector((state) => state.role);
  const { users } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRoles());
    if (!users || users.length === 0) {
      dispatch(getAllUsers());
    }
  }, [dispatch]);

  // find username for createBy
  const superAdmin = users && users.filter((user) => user.role.name === "SuperAdmin");

  const userName = (userId) => {
    if (!userId) return "N/A"; // Handle undefined/null IDs
    const user = superAdmin.find((user) => user._id === userId);
    return user ? user.name : "Unknown";
  };

  const handleEdit = (role) => {
    setEditRole(role);
    setNewRole({ name: role.name });
    setIsPopupOpen(true);
  };

  const handleSaveRole = () => {
    if (editRole) {
      dispatch(updateRole(editRole._id, newRole)).then(() => {
          dispatch(getAllRoles());
        });
      // console.log(editRole._id, newRole);
    } else {
      dispatch(createRole(newRole))
      // console.log(newRole);
    }
    setIsPopupOpen(false);
    setEditRole(null);
    setNewRole({ name: "" });
  };

  const handleDeleteRole = (roleId) => {
    dispatch(deleteRole(roleId)).then(() => {
      dispatch(getAllRoles());
    });
    // console.log(roleId)
  };

  const columns = [
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "CreatedBy", selector: (row) => userName(row.createdBy) || "Unknown", sortable: true },
    { name: "Active", selector: (row) => (row.isactive ? "Active" : "Inactive"), sortable: true },
    {
      name: "Actions",
      cell: (row) => (
        <div className="action-buttons">
          <button onClick={() => handleEdit(row)} className="edit-button">
            <FaEdit className="edit-icon" />
          </button>
          <Button
            onConfirm={() => handleDeleteRole(row._id)}
            title="Permanently Delete Role"
            description={`Are you sure you want to delete "${row.name}"?`}
            buttonClass="delete-button"
          >
            <MdDelete className="delete-icon" />
          </Button>
        </div>
      ),
    }
  ];

  return (
    <div>
      <h3>Role Management</h3>
      <button onClick={() => setIsPopupOpen(true)}>Add Role</button>
      <Table data={data} columns={columns} />

      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <h4>{editRole ? "Edit Role" : "Add Role"}</h4>
            <label>Name:</label>
            <input
              type="text"
              value={newRole.name}
              onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
            />
            <button onClick={handleSaveRole}>{editRole ? "Save" : "Add"}</button>
            <button onClick={() => setIsPopupOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MRoleTable;
