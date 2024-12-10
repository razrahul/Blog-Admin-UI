import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  users: [], // This will hold the list of users
  error: null,
  message: null,
};

const adminSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getAllUsersRequest: (state) => {
      state.loading = true;
    },
    getAllUsersSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload.users;
    },
    getAllUsersFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
});

export const {
  getAllUsersRequest,
  getAllUsersSuccess,
  getAllUsersFail,
  clearError,
  clearMessage,
} = adminSlice.actions;

export default adminSlice.reducer;
