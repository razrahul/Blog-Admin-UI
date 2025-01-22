import React, { useState } from "react";
import DataTable from "react-data-table-component";

const MCategoryTable = ({ columns }) => {
  const [categoryData, setCategoryData] = useState([
    { id: 1, title: "Category 1", description: "Description of Category 1" },
    { id: 2, title: "Category 2", description: "Description of Category 2" },
  ]);

  return (
    <DataTable
      title="Category Items"
      columns={columns}
      data={categoryData}
      pagination
    />
  );
};

export default MCategoryTable;
