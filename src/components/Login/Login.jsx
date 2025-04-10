import React, { useState, useEffect } from 'react';
import './Login.scss';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/action/userAction';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate(); // Add useNavigate for redirection

  const { loading, error, message, isAuthenticated, user } = useSelector(
    (state) => state.user
  );
  // console.log(user, error, message, isAuthenticated)

  // Show/Hide Password Section
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password)); // Dispatch the login action
  };

  // Redirect to /blog-list when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/blog-list'); // Redirect to blog-list page on successful login
    }
  }, [isAuthenticated, navigate]); // Dependency array includes isAuthenticated and navigate

  return (
    <div className="login-container">
      <div className="login-box">
        <h1> Welcome to TechTime.ai </h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email Id"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        {error ? <div className="error-message">{error}</div> : null}
      </div>
    </div>
  );
};

export default LoginPage;