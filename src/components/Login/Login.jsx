import React, { useState } from 'react';
import './Login.scss';

const LoginPage = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Authentication logic
    if (username === 'admin' && password === 'password') {
      alert('Login successful');
      onLogin(); // Notify App of successful login
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Welcome to TechTimes</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="checkbox-container">
            <input
              type="checkbox"
              id="show-password"
              checked={showPassword}
              onChange={togglePasswordVisibility}
            />
            <label htmlFor="show-password">Show password</label>
          </div>
          <button type="submit">Submit</button>
        </form>
        <div className="create-account">
          <span>Don't have an account? </span>
          <a href="#signup">Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
