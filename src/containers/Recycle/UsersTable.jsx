import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import { useSelector, useDispatch } from "react-redux";
import { getAllDeletedUsers, restoreUser } from "../../redux/action/admin.js";
import Button from "../../components/conformationButtom/Button.jsx";
import "./recycle.scss";

const UsersTable = () => {
  const { deletedUsers } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDeletedUsers());
    // console.log("Fetching deleted users...");
  }, [dispatch]);

  //   console.log("Deleted Users:", deletedUsers);

  // Restore user function
  const handleRestore = (user) => {
    console.log("Restoring User ID:", user._id);
    dispatch(restoreUser(user._id));
  };

  // Permanently delete user function
  const handleDelete = (user) => {
    console.log("Deleting User ID:", user._id);
  };

  const columns = [
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Email", selector: (row) => row.email, sortable: true },
    { name: "Number", selector: (row) => row.number, sortable: true },
    {
      name: "Role",
      selector: (row) => (row.role ? row.role.name : "N/A"), // Handle missing role data
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <Button
            onConfirm={() => handleRestore(row)}
            title="Restore User"
            description={`Are You Sure You want to Restore "${row.name}"`}
            buttonClass="restore-button"
          >
            Restore
          </Button>
          <Button
            onConfirm={() => handleDelete(row)}
            title="Permanently Delete User"
            description={`Are You Sure You want to Permanently Delete "${row.name}"`}
            buttonClass="delete-button"
          >
            Delete
          </Button>
          {/* <button onClick={() => handleRestore(row)}>Restore</button> */}
          {/* <button onClick={() => handleDelete(row)}>Delete</button> */}
        </div>
      ),
    },
  ];

  return (
    <DataTable
      title="Deleted Users"
      columns={columns}
      data={deletedUsers || []} // Ensure no crash if deletedUsers is undefined
      pagination
    />
  );
};

export default UsersTable;
