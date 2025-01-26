import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { getAllDeletedRoles, restoreRole } from "../../redux/action/rolesActions.js";
import Button from "../../components/conformationButtom/Button.jsx";
import "./recycle.scss";
import { getAllUsers } from "../../redux/action/admin.js";
import { FaTrashRestoreAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function RolesTable() {
  const { deletedRoles } = useSelector((state) => state.role);

  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAllDeletedRoles());
    //   console.log("Fetching deleted roles...");
    if (users && users.length === 0) {
      dispatch(getAllUsers());
      // console.log("UseEffect called for users....");
    }
  }, [dispatch]);

  // console.log("deleted Roles",deletedRoles)

  const superAdmin = users && users.filter((user) => user.role.name === "SuperAdmin");

  const userName = (userId) => {
    const user = superAdmin && superAdmin.find((user) => user._id === userId);
    return user ? user.name : "Unknown";
  };

  //restore role function
  const handleRestore =  (role) => {
     dispatch(restoreRole(role._id));
    console.log("Restoring Role ID:", role._id);
    // dispatch(restoreRole(role._id));
  };

  //permanent delete role function
  const handleDelete = (role) => {
    console.log("Deleting Role ID:", role._id);
  };

  const columns = [
    { name: "Role", selector: (row) => row.name, sortable: true },
    { name: "CreatedBy", selector: (row) => userName(row.createdBy) || "Null", sortable: true },
    { name: "DeletedBy", selector: (row) => userName(row.deletedBy) || "Null", sortable: true },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <Button
            onConfirm={() => handleRestore(row)}
            title="Restore Role"
            description={`Are You Sure You want to Restore "${row.name}"`}
            buttonClass="restore-button"
          >
            <FaTrashRestoreAlt />
          </Button>
          <Button
            onConfirm={() => handleDelete(row)}
            title="Permanently Delete Role"
            description={`Are You Sure You want to Permanently Delete "${row.name}"`}
            buttonClass="delete-button"
          >
            <MdDelete />
          </Button>
          {/* <button onClick={() => handleRestore(row)}>Restore</button> */}
          {/* <button onClick={() => handleDelete(row)}>Delete</button> */}
        </div>
      ),
    },
  ];

  return (
    <DataTable
      title="Deleted Roles"
      columns={columns}
      data={deletedRoles || []} // Ensure no crash if deletedRoles is undefined
      pagination
    />
  );
}

export default RolesTable;
