// redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  isAuthenticated: false,
  user: null,
  error: null,
  message: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Login Reducers
    loginRequest: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.message = action.payload.message;
    },
    loginFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },

    // Register Reducers
    registerRequest: (state) => {
      state.loading = true;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    registerFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // common for user Request and fail
    userRequest: (state) => {
      state.loading = true;
    },
    userFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //update user profile
    updateUserProfile(state, action) {
      state.loading = false;
      state.user = action.payload.user;
      state.message = action.payload.message;
    },

    //reset Password
    resetPassword(state, action) {
      state.loading = false;
      state.message = action.payload.message;
    },

    // Logout Reducers
    logoutRequest: (state) => {
      state.loading = true;
    },
    logoutSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.message = action.payload;
    },
    logoutFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Load User Reducers
    loadUserRequest: (state) => {
      state.loading = true;
    },
    loadUserSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.message = 'User loaded successfully';
    },
    loadUserFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },

    // Clear Error and Message
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
});

// Export actions
export const {
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
  clearError,
  clearMessage,
  userRequest,
  userFail,
  updateUserProfile,
  resetPassword
} = userSlice.actions;

// Export reducer
export default userSlice.reducer;
