import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { getAllDeletedCompany, restoreCompany } from "../../redux/action/companyAction.js";
import Button from "../../components/conformationButtom/Button.jsx";
import "./recycle.scss";
import { getAllUsers } from "../../redux/action/admin.js";
import { FaTrashRestoreAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const CompanyTable = () => {
  const { deletedCompanies } = useSelector((state) => state.company);
  const dispatch = useDispatch();

  const {users} = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAllDeletedCompany());
    // console.log("Fetching Deleted Companies...");
    if(users && users.length ===0){
      dispatch(getAllUsers());
      console.log("UseEffect called for users....")
    }
  }, [dispatch]);

  // console.log("deleted Companies..", deletedCompanies);

  const superAdmin = users && users.filter((user) => user.role.name === "SuperAdmin");
  // console.log(superAdmin)

  const userName = (userId) => {
    const user = superAdmin && superAdmin.find((user) => user._id === userId);
    return user ? user.name : "Unknown";
  };

  //restore category
  const handleRestore = (company) => {
    dispatch(restoreCompany(company._id));
    console.log("Restore Company", company._id);
  };

  //pemanetly delete category
  const handleDelete = (company) => {
    console.log("Delete Company", company._id);
  };
  

  const columns = [
    { name: "Company(Website)", selector: (row) => row.companyName, sortable: true },
    { name: "ComapanyId", selector: (row) => row.companyId || "Null" , sortable: true },
    { name: "CreatedBy", selector: (row) => userName(row?.createdBy) || "Null", sortable: true },
    { name: "DeletedBy", selector: (row) => userName(row.deletedBy) || "Null", sortable: true },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <Button
            onConfirm={() => handleRestore(row)}
            title="Restore Comapany"
            description={`Are You Sure You want to Restore "${row.name}"`}
            buttonClass="restore-button"
          >
            <FaTrashRestoreAlt />
          </Button>
          <Button
            onConfirm={() => handleDelete(row)}
            title="Permanently Delete Comapany"
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
      title="Deleted Companies"
      columns={columns}
      data={deletedCompanies || []} // Ensure no crash if deletedCompanies is undefined
      pagination
    />
  );
};

export default CompanyTable;
