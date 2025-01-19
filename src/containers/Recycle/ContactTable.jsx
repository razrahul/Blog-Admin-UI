// components/ContactTable.jsx
import React from "react";
import DataTable from "react-data-table-component";
import { contactData } from "./data";

const ContactTable = ({ handleRestore, handleDelete }) => {
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

  return <DataTable title="Contact Items" columns={columns} data={contactData} pagination />;
};

export default ContactTable;
