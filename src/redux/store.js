// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import  userReducer from './reducer/userSlice.js';
import  adminSlice from './reducer/adminSlice'
import  blogSlice from './reducer/blogSlice.js';
import  roleSlice from './reducer/roleSlice.js';
import  categorySlice from './reducer/categotySlice.js';
import  companySlice from './reducer/companySlice.js';
import  subtitleSlice from './reducer/subtitleSlice.js';

const store = configureStore({
  reducer: {
    user: userReducer,
    admin: adminSlice,
    blog : blogSlice,
    role : roleSlice,
    category: categorySlice,
    company : companySlice,
    subtitle: subtitleSlice,
  },
});

export default store;


// export const server = "http://localhost:5000/api/v1";


// export const server = import.meta.env.VITE_BACKEND_URL;

export const server = import.meta.env.VITE_BACKEND_URL;