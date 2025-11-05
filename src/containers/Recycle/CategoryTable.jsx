import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { getAllDeletedCategories, restoreCategory } from "../../redux/action/categoryAction.js";
import Button from "../../components/conformationButtom/Button.jsx";
import "./recycle.scss";
import { getAllUsers } from "../../redux/action/admin.js";
import { FaTrashRestoreAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const CategoryTable = () => {
  const { deletedCategories } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.admin)

  useEffect(() => {
    dispatch(getAllDeletedCategories());
    // console.log("Fetching Deleted Category...");
    if(users && users.length === 0){
      dispatch(getAllUsers());
      // console.log("Fethcing User UseEffect...")
    }
  }, [dispatch]);

  // console.log("deleted Categories..", deletedCategories);

  const superAdmin = users && users.filter((user) => user.role.name === "SuperAdmin");

  // console.log("users",users)
  // console.log("superAdmin",superAdmin)

  
  const userName = (userId) => {
    if (!userId) return "N/A"; // Handle undefined/null IDs
    const user = superAdmin.find((user) => user._id === userId);
    return user ? user.name : "Unknown";
  };

  //restore category
  const handleRestore = (category) => {
    dispatch(restoreCategory(category._id));
    console.log("Restore Category", category._id);
  };

  //pemanetly delete category
  const handleDelete = (category) => {
    // console.log("Delete Category", category._id);
    alert(`Deleting Category name: [its not working] ${category?.name}`);
  };
  

  const columns = [
    { name: "Category", selector: (row) => row.name, sortable: true },
    { name: "CreatedBy", selector: (row) => userName(row.createdBy), sortable: true },
    { name: "DeletedBy", selector: (row) => userName(row.deletedBy), sortable: true },
    {
      name: "Actions",
      cell: (row) => (
        <div className="icon-btn">
          <Button
          className="restore-button"
            onConfirm={() => handleRestore(row)}
            title="Restore Category"
            description={`Are You Sure You want to Restore "${row.name}"`}
            buttonClass="restore-button"
          >
            <FaTrashRestoreAlt />
          </Button>
          <Button
          className="delete-button"
            onConfirm={() => handleDelete(row)}
            title="Permanently Delete Category"
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
      title="Deleted Categories"
      columns={columns}
      data={deletedCategories || []} // Ensure no crash if deletedCategories is undefined
      pagination
    />
  )
};

export default CategoryTable;
