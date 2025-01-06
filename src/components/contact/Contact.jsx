import React, { useState } from "react";
import DataTable from "react-data-table-component";
import "./Contact.scss";

const Contact = ({ requests }) => {
  // State to manage replies, submitted replies, and search query
  const [replies, setReplies] = useState({});
  const [submittedReplies, setSubmittedReplies] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  // Function to handle reply input changes
  const handleReplyChange = (id, value) => {
    setReplies((prevReplies) => ({
      ...prevReplies,
      [id]: value,
    }));
  };

  // Function to handle reply submission
  const handleReplySubmit = (id) => {
    const replyMessage = replies[id];
    if (replyMessage) {
      setSubmittedReplies((prevReplies) => ({
        ...prevReplies,
        [id]: replyMessage,
      }));
      alert(`Reply sent for Request ID ${id}: ${replyMessage}`);
      // Clear the reply input after submission
      setReplies((prevReplies) => ({
        ...prevReplies,
        [id]: "",
      }));
    } else {
      alert("Reply message cannot be empty.");
    }
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter the requests based on search query (name)
  const filteredRequests = requests.filter((request) =>
    request.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Define the columns for the DataTable
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Phone No",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: "Message",
      selector: (row) => row.message || "No Message",
      sortable: true,
    },
    {
      name: "Reply",
      cell: (row) => (
        <div>
          {/* Display previous replies */}
          {submittedReplies[row.id] ? (
            <div className="reply-message">
              <strong>Reply:</strong>
              <p>{submittedReplies[row.id]}</p>
            </div>
          ) : (
            <div className="reply-section">
              <textarea
                placeholder="Write a reply..."
                value={replies[row.id] || ""}
                onChange={(e) => handleReplyChange(row.id, e.target.value)}
              />
              <button onClick={() => handleReplySubmit(row.id)}>
                Send Reply
              </button>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="contact-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <DataTable
        columns={columns}
        data={filteredRequests} // Use filtered requests here
        pagination
        highlightOnHover
        pointerOnHover
      />
    </div>
  );
};

export default Contact;
