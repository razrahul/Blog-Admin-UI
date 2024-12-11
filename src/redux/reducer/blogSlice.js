import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  blogs: [], // Holds the list of blogs
  message: null, // Success message
  error: null,   // Error message
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    // Get All Blogs
    getAllBlogsRequest: (state) => {
      state.loading = true;
    },
    getAllBlogsSuccess: (state, action) => {
      state.loading = false;
      state.blogs = action.payload.blogs;
      state.message = action.payload?.message;
    },
    getAllBlogsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Create Blog
    createBlogRequest: (state) => {
      state.loading = true;
    },
    createBlogSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload?.message;
      state.blogs = [...state.blogs, action.payload.blog]; // Add new blog
    },
    createBlogFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Clear Errors and Messages
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
});

export const {
  getAllBlogsRequest,
  getAllBlogsSuccess,
  getAllBlogsFail,
  createBlogRequest,
  createBlogSuccess,
  createBlogFail,
  clearError,
  clearMessage,
} = blogSlice.actions;

export default blogSlice.reducer;
