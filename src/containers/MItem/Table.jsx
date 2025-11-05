import React from "react";
import DataTable from "react-data-table-component";
// import "./MScss/AllMitem.scss";

const Table = ({ data, columns }) => {
  return (
    <div className="table-container">
      <DataTable
        columns={columns}
        data={data}
        pagination
        highlightOnHover
        striped
        responsive
      />
    </div>
  );
};

export default Table;
