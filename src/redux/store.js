// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import  userReducer from './reducer/userSlice.js';
import  adminSlice from './reducer/adminSlice'
import  blogSlice from './reducer/blogSlice.js';

const store = configureStore({
  reducer: {
    user: userReducer,
    admin: adminSlice,
    blog : blogSlice,
  },
});

export default store;


export const server = "http://localhost:5000/api/v1";