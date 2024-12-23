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

    // Delete User
    deleteUserRequest: (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      
      const deletedUserId = action.payload.userId;
      state.users = state.users.filter((user) => user._id !== deletedUserId);
    },
    deleteUserFail: (state, action) => {
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
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFail,
  clearError,
  clearMessage,
} = adminSlice.actions;

export default adminSlice.reducer;
