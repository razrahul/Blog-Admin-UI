import React, { useState } from "react";
import DataTable from "react-data-table-component";

const MCompanyTable = ({ columns }) => {
  const [companyData, setCompanyData] = useState([
    { id: 1, title: "Company 1", description: "Description of Company 1" },
    { id: 2, title: "Company 2", description: "Description of Company 2" },
  ]);

  return (
    <DataTable
      title="Company Items"
      columns={columns}
      data={companyData}
      pagination
    />
  );
};

export default MCompanyTable;
