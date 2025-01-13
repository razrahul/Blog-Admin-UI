import React, { useState } from "react";
import "./ChangePassword.scss";

const ChangePassword = () => {
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handleSubmit = () => {
    console.log("Password Data Submitted:", passwordData);
    // Add logic to handle password update (API call)
  };

  return (
    <div className="change-password-container">
      <h2>Change Password</h2>
      <div className="password-form">
        <div className="form-group">
          <label>Old Password:</label>
          <input
            type="password"
            name="oldPassword"
            value={passwordData.oldPassword}
            onChange={handleInputChange}
            placeholder="Enter old password"
          />
        </div>
        <div className="form-group">
          <label>New Password:</label>
          <input
            type="password"
            name="newPassword"
            value={passwordData.newPassword}
            onChange={handleInputChange}
            placeholder="Enter new password"
          />
        </div>
        <button onClick={handleSubmit} className="submit-btn">
          Submit
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;
