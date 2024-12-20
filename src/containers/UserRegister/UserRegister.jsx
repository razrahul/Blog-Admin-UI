import React, { useState } from "react";
import "./UserRegister.scss";
import { useDispatch } from "react-redux";
import { register } from "../../redux/action/userAction";
import { MdMarkEmailUnread } from "react-icons/md";

const UserRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [image, setImage] = useState(null);
   const [imagePrev, setImagePrev] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    // Generate a preview for the uploaded image
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePrev(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImagePrev("");
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (!name || !email || !password ) {
      setError("name, email and password fields are required!");
      return;
    }

    const myForm = new FormData();
    myForm.append("name", name);
    myForm.append("email", email);
    myForm.append("number", phone);
    myForm.append("password", password);
    myForm.append("role", role);
    myForm.append("file", image);


    dispatch(register(myForm));

    console.log("User data: ", name, email, phone, password, role, image);

    alert("User Registered Successfully!");

    //reset all states
    setName(""); 
    setEmail("")
    setPhone("")
    setPassword("")
    setRole(null)
    setImage("")
  };

 

  const roles = [
    "SuperAdmin",
    "Admin",
    "Devloper",
    "Content Writer",
    "Designer",
    "Other",
  ];

  return (
    <>
      <div className="user-register-page">
        <h1>User Registration</h1>

        <form onSubmit={handleSubmit} className="registration-form">
          {error && <p className="error-message">{error}</p>}

          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="form-group">
            <label>Role</label>
            <select
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="role-dropdown"
            >
              <option value="">Select Role</option>
              {roles.map((role, index) => (
                <option key={index} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          {/* Upload Image */}
          <div className="form-group">
            <label htmlFor="image">Upload Image (Optional)</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
            />
            {imagePrev && (
              <div className="image-preview">
                <img src={imagePrev} alt="Preview" width="150" />
              </div>
            )}
          </div>
          <button type="submit" className="submit-button">
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default UserRegister;
