import React, { useState } from "react";
import DataTable from "react-data-table-component";

const MRoleTable = ({ columns }) => {
  const [roleData, setRoleData] = useState([
    { id: 1, title: "Role 1", description: "Description of Role 1" },
    { id: 2, title: "Role 2", description: "Description of Role 2" },
  ]);

  return (
    <DataTable
      title="Role Items"
      columns={columns}
      data={roleData}
      pagination
    />
  );
};

export default MRoleTable;
