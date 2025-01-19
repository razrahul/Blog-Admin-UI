import React, { useState } from "react";
import "./ChangePassword.scss";
import { useDispatch } from "react-redux";
import { resetPassword} from "../../redux/action/userAction.js"

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch()

  const handleSubmit = () => {
    if (newpassword !== confirmPassword) {
      setError("New Password and Confirm Password must match!");
      return;
    }

    // Add logic to handle password update (API call)
    dispatch(resetPassword(password, newpassword))
    
    // console.log("Password Data Submitted:", password, newpassword);

     // Clear error after successful submission
    setError("");
    setPassword("");
    setNewPassword("");
  };

  

  return (
    <div className="change-password-container">
      <h2>Change Password</h2>
      <div className="password-form">
        <div className="form-group">
          <label htmlFor="oldPassword">Old Password:</label>
          <input
            type="password"
            id="oldPassword"
            name="oldPassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter old password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">New Password:</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={newpassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="text"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
          />
          {confirmPassword && newpassword !== confirmPassword && (
            <p className="error-text">Confirm Passwords do not match!</p>
          )}
        </div>
        <button 
          onClick={handleSubmit} 
          className="submit-btn"
          disabled={!password || !newpassword || !confirmPassword || newpassword !== confirmPassword}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;
