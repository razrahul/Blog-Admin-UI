import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { getAllDeletedCategories } from "../../redux/action/categoryAction.js";
import Button from "../../components/conformationButtom/Button.jsx";
import "./recycle.scss";

const CategoryTable = () => {
  const { deletedCategories } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDeletedCategories());
    // console.log("Fetching Deleted Category...");
  }, [dispatch]);

  // console.log("deleted Categories..", deletedCategories);

  //restore category
  const handleRestore = (category) => {
    console.log("Restore Category", category._id);
  };

  //pemanetly delete category
  const handleDelete = (category) => {
    console.log("Delete Category", category._id);
  };
  

  const columns = [
    { name: "Category", selector: (row) => row.name, sortable: true },
    { name: "CreatedBy", selector: (row) => row.createdBy, sortable: true },
    { name: "DeletedBy", selector: (row) => row.deletedBy, sortable: true },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <Button
            onConfirm={() => handleRestore(row)}
            title="Restore Category"
            description={`Are You Sure You want to Restore "${row.name}"`}
            buttonClass="restore-button"
          >
            Restore
          </Button>
          <Button
            onConfirm={() => handleDelete(row)}
            title="Permanently Delete Category"
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
      title="Deleted Categories"
      columns={columns}
      data={deletedCategories || []} // Ensure no crash if deletedCategories is undefined
      pagination
    />
  )
};

export default CategoryTable;
