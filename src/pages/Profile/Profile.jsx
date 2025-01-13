import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.scss";

const Profile = ({ user = {} }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const [userData, setUserData] = useState({
    avatar: user.avatar || "https://via.placeholder.com/150",
    name: user.name || "",
    email: user.email || "",
    number: user.number || "",
    role: user.role || "User",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

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

  const handleChangePasswordClick = () => {
    navigate("/change-password");
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
            <span>{userData.role}</span>
          </div>
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
      <div className="change-password-section">
        <button onClick={handleChangePasswordClick} className="change-password-btn">
          Change Password
        </button>
      </div>
    </div>
  );
};

export default Profile;
