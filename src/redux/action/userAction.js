// redux/userActions.js
import axios from 'axios';
import { server } from '../store.js';
import {
  loginRequest,
  loginSuccess,
  loginFail,
  registerRequest,
  registerSuccess,
  registerFail,
  logoutRequest,
  logoutSuccess,
  logoutFail,
  loadUserRequest,
  loadUserSuccess,
  loadUserFail,
} from '../reducer/userSlice.js';


// Login Action
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(loginRequest());

    const { data } = await axios.post(
      `${server}/login`,
      { email, password },
      { headers: { 'Content-Type': 'application/json' }, 
      withCredentials: true }
    );
    

    dispatch(loginSuccess(data));
  } catch (error) {
    
    dispatch(loginFail(error.response?.data?.message  || 'Login Failed'));
  }
};

// dispatch(loginFail(error.response?.data?.message || 'Login Failed'));

// Register Action
export const register = (formData) => async (dispatch) => {
  try {
    dispatch(registerRequest());

    const { data } = await axios.post(
      `${server}/register`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true }
    );

    dispatch(registerSuccess(data));
  } catch (error) {
    dispatch(registerFail(error.response?.data?.message || 'Registration Failed'));
  }
};

// Load User Action
export const loadUser = () => async (dispatch) => {
  try {
    dispatch(loadUserRequest());

    const { data } = await axios.get(`${server}/me`, { withCredentials: true });

    dispatch(loadUserSuccess(data.user));
  } catch (error) {
    dispatch(loadUserFail(error.response?.data?.message || 'Failed to load user'));
  }
};

// Logout Action
export const logout = () => async (dispatch) => {
  try {
    dispatch(logoutRequest());

    const { data } = await axios.get(`${server}/logout`, { withCredentials: true });

    dispatch(logoutSuccess(data.message));
  } catch (error) {
    dispatch(logoutFail(error.response?.data?.message || 'Logout Failed'));
  }
};





