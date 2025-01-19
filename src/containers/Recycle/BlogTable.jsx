// components/BlogTable.jsx
import React from "react";
import DataTable from "react-data-table-component";
import { blogData } from "./data";

const BlogTable = ({ handleRestore, handleDelete }) => {
  const columns = [
    { name: "Title", selector: (row) => row.title, sortable: true },
    { name: "Description", selector: (row) => row.description, sortable: true },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <button onClick={() => handleRestore(row)}>Restore</button>
          <button onClick={() => handleDelete(row)}>Delete</button>
        </div>
      ),
    },
  ];

  return <DataTable title="Blog Items" columns={columns} data={blogData} pagination />;
};

export default BlogTable;
