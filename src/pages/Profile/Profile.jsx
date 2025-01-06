import React, { useState } from "react";
import "./Profile.scss";

const Profile = ({ user = {} }) => {
  const [isEditing, setIsEditing] = useState(false);

  // Default userData initialization
  const [userData, setUserData] = useState({
    avatar: user.avatar || "https://via.placeholder.com/150",
    name: user.name || "",
    email: user.email || "",
    number: user.number || "",
    role: user.role || "User",
    password: "",
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData((prevData) => ({ ...prevData, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
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
          <div className="avatar-wrapper">
            <img src={userData.avatar} alt="Avatar" className="avatar" />
            {isEditing && (
              <div className="image-inputs">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="file-input"
                />
                <input
                  type="text"
                  name="avatar"
                  value={userData.avatar}
                  onChange={handleInputChange}
                  placeholder="Avatar URL"
                  className="avatar-url-input"
                />
              </div>
            )}
          </div>
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
                <option value="User">User</option>
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

export default Profile;
