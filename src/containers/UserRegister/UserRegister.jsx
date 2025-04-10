import React, { useEffect, useState } from "react";
import "./UserRegister.scss";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/action/userAction";
import { getAllRoles } from "../../redux/action/rolesActions.js";
import { getAllCompanies } from "../../redux/action/companyAction.js";

const UserRegister = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [roleId, setRoleId] = useState("");
  const [image, setImage] = useState(null);
  const [imagePrev, setImagePrev] = useState("");
  const [error, setError] = useState("");
  const [companyId, setCompanyId] = useState("");

  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");

  const dispatch = useDispatch();
  const { loading, roles } = useSelector((state) => state.role);
  const { companies } = useSelector((state) => state.company);

  useEffect(() => {
    if (!roles || roles.length === 0) {
      dispatch(getAllRoles());
    }
    if (!companies || companies.length === 0) {
      dispatch(getAllCompanies());
    }
  }, [dispatch]);

  // Move isPasswordValid function outside handleSubmit
  const isPasswordValid = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePrev(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImagePrev("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("Name, email, and password are required!");
      return;
    }

    let valid = true;

    if (phone.length !== 10) {
      setPhoneError("Phone number must be 10 digits.");
      valid = false;
    } else {
      setPhoneError("");
    }

    if (!isPasswordValid(password)) {
      setPasswordError("Password must be at least 8 characters and include uppercase, lowercase, and a number.");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!valid) return;

    const myForm = new FormData();
    myForm.append("name", name);
    myForm.append("username", username);
    myForm.append("email", email);
    myForm.append("number", phone);
    myForm.append("password", password);
    myForm.append("roleId", roleId);
    myForm.append("companyId", companyId);
    myForm.append("file", image);

    dispatch(register(myForm));
    alert("User Add Successfully!");

    // Reset form fields
    setName("");
    setUsername("");
    setEmail("");
    setPhone("");
    setPassword("");
    setRoleId("");
    setCompanyId("");
    setImage(null);
    setImagePrev("");
  };

  return (
    <div className="user-register-page">
      <h1>Add User</h1>
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
          <label htmlFor="username">UserName</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter UserName"
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
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                setPhone(value);
              }
            }}
            placeholder="Enter your phone number"
            maxLength="10"
            required
          />
          {phoneError && <p className="error-message">{phoneError}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Minimum 8 characters, 1 uppercase, 1 lowercase, 1 number"
            required
          />
          {passwordError && <p className="error-message">{passwordError}</p>}
        </div>

        <div className="form-group">
          <label>Role</label>
          <select
            name="role"
            value={roleId}
            onChange={(e) => setRoleId(e.target.value)}
            className="role-dropdown"
            required
          >
            <option value="">Select Role</option>
            {roles &&
              roles.map((roleItem) => (
                <option key={roleItem._id} value={roleItem._id}>
                  {roleItem.name}
                </option>
              ))}
          </select>
        </div>

        <div className="form-group">
          <label>Company (Website)</label>
          <select
            name="company"
            value={companyId}
            onChange={(e) => setCompanyId(e.target.value)}
            className="role-dropdown"
            required
          >
            <option value="">Select Website</option>
            {companies &&
              companies.map((companyItem) => (
                <option key={companyItem._id} value={companyItem._id}>
                  {companyItem.companyName}
                </option>
              ))}
          </select>
        </div>

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

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default UserRegister;