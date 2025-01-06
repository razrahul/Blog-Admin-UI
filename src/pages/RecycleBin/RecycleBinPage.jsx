import React, { useState } from "react";
import "./RecycleBin.scss";

const RecycleBin = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);

  const deletedItems = [
    { id: 1, type: "Blog", title: "How to Learn React", description: "A complete guide to React development." },
    { id: 2, type: "User", name: "John Doe", email: "john.doe@example.com" },
    { id: 3, type: "Profile", avatar: "https://via.placeholder.com/100", name: "Jane Smith", role: "Admin" },
  ];

  const handleDropdownToggle = (id) => {
    setIsDropdownOpen(isDropdownOpen === id ? null : id);
  };

  const handleAction = (action, id) => {
    console.log(`${action} item with id: ${id}`);
    setIsDropdownOpen(null); // Close the dropdown after action
  };

  return (
    <div className="recycle-bin-container">
      <h1>Recycle Bin</h1>
      <div className="recycle-bin-content">
        {deletedItems.map((item) => (
          <div key={item.id} className="recycle-card">
            <div className="card-details">
              {item.type === "Blog" && (
                <>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </>
              )}
              {item.type === "User" && (
                <>
                  <h3>{item.name}</h3>
                  <p>{item.email}</p>
                </>
              )}
              {item.type === "Profile" && (
                <>
                  <img src={item.avatar} alt="Profile Avatar" />
                  <h3>{item.name}</h3>
                  <p>Role: {item.role}</p>
                </>
              )}
            </div>

            {/* Dropdown button */}
            <div className="card-actions">
              <button
                className="dropdown-btn"
                onClick={() => handleDropdownToggle(item.id)}
              >
                •••
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen === item.id && (
                <div className="dropdown-menu">
                  <button
                    onClick={() => handleAction("Restore", item.id)}
                    className="dropdown-item"
                  >
                    Restore
                  </button>
                  <button
                    onClick={() => handleAction("Move to Folder", item.id)}
                    className="dropdown-item"
                  >
                    Move to Folder
                  </button>
                  <button
                    onClick={() => handleAction("Delete Permanently", item.id)}
                    className="dropdown-item"
                  >
                    Delete Permanently
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecycleBin;
