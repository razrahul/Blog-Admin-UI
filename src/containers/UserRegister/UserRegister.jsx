import React, { useState } from "react";
import "./UserRegister.scss";

const UserRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (!name || !email || !phone || !password || !role) {
      setError("All fields are required!");
      return;
    }

    // Process registration
    alert("User Registered Successfully!");

    // Clear form fields after submission
    setName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setRole("");
  };

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
            <div className="role-options">
              <label>
                <input
                  type="radio"
                  name="role"
                  value="SuperAdmin"
                  checked={role === "SuperAdmin"}
                  onChange={(e) => setRole(e.target.value)}
                />
                SuperAdmin
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="Admin"
                  checked={role === "Admin"}
                  onChange={(e) => setRole(e.target.value)}
                />
                Admin
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="Developer"
                  checked={role === "Developer"}
                  onChange={(e) => setRole(e.target.value)}
                />
                Developer
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="Content Writer"
                  checked={role === "Content Writer"}
                  onChange={(e) => setRole(e.target.value)}
                />
                Content Writer
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="Designer"
                  checked={role === "Designer"}
                  onChange={(e) => setRole(e.target.value)}
                />
                Designer
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="Other"
                  checked={role === "Other"}
                  onChange={(e) => setRole(e.target.value)}
                />
                Other
              </label>
            </div>
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
