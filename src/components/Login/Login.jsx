import React, { useState } from 'react';
import './Login.scss';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/action/userAction';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  
  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.user
  );
  // console.log(user)

  //show , Hide Password Section 
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password)); // Dispatch the login action
  };


  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Welcome to TechTimes</h1>
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
        <div className="create-account">
          <span>Don't have an account? </span>
          <a href="#signup">Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
