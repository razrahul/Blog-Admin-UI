// components/ContactTable.jsx
import React from "react";
import DataTable from "react-data-table-component";
import { contactData } from "./data";
import "./recycle.scss";
import { FaTrashRestoreAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const ContactTable = ({ handleRestore, handleDelete }) => {
  const columns = [
    { name: "Title", selector: (row) => row.title, sortable: true },
    { name: "Description", selector: (row) => row.description, sortable: true },
    {
      name: "Actions",
      cell: (row) => (
        <div className="icon-btn">
          <button className="restore-button" onClick={() => handleRestore(row)}><FaTrashRestoreAlt /></button>
          <button className="delete-button" onClick={() => handleDelete(row)}><MdDelete /></button>
        </div>
      ),
    },
  ];

  return <DataTable title="Contact Items" columns={columns} data={contactData} pagination />;
};

export default ContactTable;
