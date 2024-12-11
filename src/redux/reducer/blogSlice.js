import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  blogs: [], // This will hold the list of Blogs
  message: null,
  error: null,
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
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
  clearError,
  clearMessage,
} = blogSlice.actions;

export default blogSlice.reducer;
