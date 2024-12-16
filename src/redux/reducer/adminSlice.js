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


    // Update User Verification
    updateUserVerificationRequest: (state) => {
      state.loading = true;
    },
    updateUserVerificationSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;

      const updatedUserId = action.payload.userId;
      state.users = state.users.map((user) =>
        user._id === updatedUserId
          ? { ...user, isVerified: !user.isVerified } 
          : user
      );
    },
    updateUserVerificationFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //update  user block status
    updateUserBlockRequest: (state) => {
      state.loading = true;
    },
    updateUserBlockSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;

      const updatedUserId = action.payload.userId;
      state.users = state.users.map((user) =>
        user._id === updatedUserId
          ? { ...user, isblocked: !user.isblocked }
          : user
      );
    },
    updateUserBlockFail: (state, action) => {
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
  updateUserVerificationRequest,
  updateUserVerificationSuccess,
  updateUserVerificationFail,
  updateUserBlockRequest,
  updateUserBlockSuccess,
  updateUserBlockFail,
  clearError,
  clearMessage,
} = adminSlice.actions;

export default adminSlice.reducer;
