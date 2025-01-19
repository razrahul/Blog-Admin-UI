import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import "./Profile.scss";
import { updateUserProfile  } from "../../redux/action/userAction.js";

const Profile = ({user}) => {
  const [userData, setUserData] = useState({
    avatar: user.avatar.url,
    name: user.name ,
    email: user.email ,
    number: user.number,
    role: user.role.name ,
    company: user.company.companyName 
  });

  const[name, setName] = useState(userData.name)
  const[email, setEmail] = useState(userData.email)
  const[number, setNumber] = useState(userData.number)
  const [image, setImage] = useState("");
  
  //Some error to image error , image state change to after error then also show updated image (within again api)

  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData((prevData) => ({ ...prevData, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
    
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to save the updated user data

    const userData = new FormData();
    userData.append("name", name);
    userData.append("email", email);
    userData.append("number", number);
    userData.append("file", image);

    dispatch(updateUserProfile(userData));

   
    setIsEditing(false);

    //after edit then after again edit show user value
    setName(userData.name)
    setEmail(userData.email)
    setNumber(userData.number)
    setImage("")
  };

  const handleChangePasswordClick = () => {
    navigate("/change-password");
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>Profile</h2>
        {!isEditing && <button onClick={(e) => setIsEditing(true)}>Edit</button>}
      </div>
      <form onSubmit={handleSubmit}>
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
              </div>
            )}
          </div>
        </div>
        <div className="user-details">
          <div className="detail-item">
            <label htmlFor="name">Name:</label>
            {isEditing ? (
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            ) : (
              <span>{userData.name}</span>
            )}
          </div>
          <div className="detail-item">
            <label htmlFor="email">Email:</label>
            {isEditing ? (
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            ) : (
              <span>{userData.email}</span>
            )}
          </div>
          <div className="detail-item">
            <label htmlFor="number">Number:</label>
            {isEditing ? (
              <input
                type="text"
                id="number"
                name="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            ) : (
              <span>{userData.number}</span>
            )}
          </div>
          <div className="detail-item">
            <label>Role:</label>
            <span>{userData.role}</span>
          </div>
          <div className="detail-item">
            <label>Company:</label>
            <span>{userData.company}</span>
          </div>
        </div>
      </div>
      {isEditing && (
        <div className="profile-actions">
          <button type="submit" className="save-btn">
            Save
          </button>
          <button onClick={() => setIsEditing(false)} className="cancel-btn">
            Cancel
          </button>
        </div>
      )}
      </form>

      {/* password change */}
      <div className="change-password-section">
        <button onClick={handleChangePasswordClick} className="change-password-btn">
          Change Password
        </button>
      </div>
    </div>
  );
};

export default Profile;
