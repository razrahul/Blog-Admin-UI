// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import  userReducer from './reducer/userSlice.js';
import  adminSlice from './reducer/adminSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    admin: adminSlice,
  },
});

export default store;


export const server = "http://localhost:5000/api/v1";