import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import { useSelector, useDispatch } from "react-redux";
import { getAllDeletedUsers, getAllUsers, restoreUser } from "../../redux/action/admin.js";
import Button from "../../components/conformationButtom/Button.jsx";
import "./recycle.scss";
import { FaTrashRestoreAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const UsersTable = () => {
  const { deletedUsers } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  const {users} = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAllDeletedUsers());
    // console.log("Fetching deleted users...");
    if(users && users.length === 0){
      dispatch(getAllUsers());
      // console.log("Users: useEffect Called");
    }
  }, [dispatch]);

  //   console.log("Deleted Users:", deletedUsers);

  const superAdmin = users && users.filter((user) => user.role.name === "SuperAdmin");

  // console.log(superAdmin)

  const userName = (userId) => {
    const user = users && users.find((user) => user._id === userId);
    return user ? user.name : "Unknown";
  };

  // Restore user function
  const handleRestore = (user) => {
    // console.log("Restoring User ID:", user._id);
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
      name: "Comapny",
      selector: (row) => (row.company ?row.company.companyName : "N/A" ), // Handle missing company data
      sortable: true,
    },
    {
      name: "DeletedBy",
      selector: (row) => (row.deletedBy ? userName(row.deletedBy) : "N/A"), // Handle missing deletedBy data
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
            <FaTrashRestoreAlt />
          </Button>
          <Button
            onConfirm={() => handleDelete(row)}
            title="Permanently Delete User"
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
      title="Deleted Users"
      columns={columns}
      data={deletedUsers || []} // Ensure no crash if deletedUsers is undefined
      pagination
    />
  );
};

export default UsersTable;
