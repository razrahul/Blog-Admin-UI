import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { getAllDeletedCompany } from "../../redux/action/companyAction.js";
import Button from "../../components/conformationButtom/Button.jsx";
import "./recycle.scss";

const CompanyTable = () => {
  const { deletedCompanies } = useSelector((state) => state.company);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDeletedCompany());
    // console.log("Fetching Deleted Companies...");
  }, [dispatch]);

  // console.log("deleted Companies..", deletedCompanies);

  //restore category
  const handleRestore = (company) => {
    console.log("Restore Company", company._id);
  };

  //pemanetly delete category
  const handleDelete = (company) => {
    console.log("Delete Company", company._id);
  };
  

  const columns = [
    { name: "Company(Website)", selector: (row) => row.companyName, sortable: true },
    { name: "ComapanyId", selector: (row) => row.companyId || "Null" , sortable: true },
    { name: "CreatedBy", selector: (row) => row.createdBy, sortable: true },
    { name: "DeletedBy", selector: (row) => row.deletedBy, sortable: true },
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
            Restore
          </Button>
          <Button
            onConfirm={() => handleDelete(row)}
            title="Permanently Delete Comapany"
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
      title="Deleted Companies"
      columns={columns}
      data={deletedCompanies || []} // Ensure no crash if deletedCompanies is undefined
      pagination
    />
  );
};

export default CompanyTable;
