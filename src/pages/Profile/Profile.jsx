import React, { useState } from "react";
import "./Profile.scss";

const Profile = ({ user = {} }) => {
  const [isEditing, setIsEditing] = useState(false);
  
  // Ensure all properties are safely accessed or default to an empty string if undefined
  const [userData, setUserData] = useState({
    avatar: user.avatar || "https://via.placeholder.com/150",
    name: user.name || "",
    email: user.email || "",
    number: user.number || "",
    role: user.role || "User",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleEditClick = () => setIsEditing(true);
  const handleSaveClick = () => {
    console.log("Updated User Data:", userData);
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>Profile</h2>
        {!isEditing && <button onClick={handleEditClick}>Edit</button>}
      </div>
      <div className="profile-content">
        <div className="avatar-section">
          <img src={userData.avatar} alt="Avatar" className="avatar" />
          {isEditing && (
            <input
              type="text"
              name="avatar"
              value={userData.avatar}
              onChange={handleInputChange}
              placeholder="Avatar URL"
            />
          )}
        </div>
        <div className="user-details">
          <div className="detail-item">
            <label>Name:</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
              />
            ) : (
              <span>{userData.name}</span>
            )}
          </div>
          <div className="detail-item">
            <label>Email:</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
              />
            ) : (
              <span>{userData.email}</span>
            )}
          </div>
          <div className="detail-item">
            <label>Number:</label>
            {isEditing ? (
              <input
                type="text"
                name="number"
                value={userData.number}
                onChange={handleInputChange}
              />
            ) : (
              <span>{userData.number}</span>
            )}
          </div>
          <div className="detail-item">
            <label>Role:</label>
            {isEditing ? (
              <select
                name="role"
                value={userData.role}
                onChange={handleInputChange}
              >
                <option value="SuperAdmin">SuperAdmin</option>
                <option value="Admin">Admin</option>
                <option value="Developer">Developer</option>
                <option value="Tester">Tester</option>
              </select>
            ) : (
              <span>{userData.role}</span>
            )}
          </div>
          {isEditing && (
            <div className="detail-item">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={userData.password}
                onChange={handleInputChange}
                placeholder="Enter new password"
              />
            </div>
          )}
        </div>
      </div>
      {isEditing && (
        <div className="profile-actions">
          <button onClick={handleSaveClick} className="save-btn">
            Save
          </button>
          <button onClick={() => setIsEditing(false)} className="cancel-btn">
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

// Main App component
const App = () => {
  // List of users (Array of profile data)
  const users = [
    {
      avatar: "https://via.placeholder.com/150/FF0000",
      name: "Alice",
      email: "alice@example.com",
      number: "123-456-7890",
      role: "Admin",
    },
    {
      avatar: "https://via.placeholder.com/150/00FF00",
      name: "Bob",
      email: "bob@example.com",
      number: "098-765-4321",
      role: "Developer",
    },
    {
      avatar: "https://via.placeholder.com/150/0000FF",
      name: "Charlie",
      email: "charlie@example.com",
      number: "111-222-3333",
      role: "Tester",
    },
    // Example of a user with missing avatar to check if the default works
    {
      name: "Diana",
      email: "diana@example.com",
      number: "333-444-5555",
      role: "User",
    },
  ];

  return (
    <div className="profiles-container">
      {users.map((user, index) => (
        <Profile key={index} user={user} />
      ))}
    </div>
  );
};

export default App;
