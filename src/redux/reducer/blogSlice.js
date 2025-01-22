import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  blogs: [], // Holds the list of blogs
  deletedBlogs: [], // Holds the list of deleted blogs
  blog: {}, // Holds the blog details
  message: null, // Success message
  error: null, // Error message
};

const blogSlice = createSlice({
  name: "blog",
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

    //add common blogRequest and blogfail
    blogRequest: (state, action) => {
      state.loading = true;
    },
    
    blogFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //get all deletd Blogs
    allDeletedBlogs: (state, action) => {
      state.loading = false;
      state.deletedBlogs = action.payload.blogs;
    },

    //Get blog By Id
    getBlogById: (state, action) => {
      state.loading = false;
      state.blog = action.payload.blog;
    },

    //restore Blogs
    restoreBlog: (state, action) => {
      state.loading = false;

       // Ensure users array exists before pushing
      if (!state.blogs) {
        state.blogs = [];
      }
      state.blogs.push(action.payload.blog);

      state.deletedBlogs = state.deletedBlogs.filter(
        (blog) => blog._id !== action.payload.blog._id
      );
    },

    //update Blog
    updateBlogSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload?.message;
    
      if (Array.isArray(state.blogs) && action.payload?.blog) {
        state.blogs = state.blogs.map((blog) =>
          blog._id === action.payload.blog._id ? action.payload.blog : blog
        );
      }
    },
    
    //add Subtitle(new)
    addSubtitle(state, action) {
      // const { blogId, subtitle } = action.payload;
    
      // state.blogs = state.blogs.map((blog) => {
      //   if (blog._id === blogId) {
      //     if (!blog.Subtitle) {
      //       blog.Subtitle = []; // Initialize if undefined
      //     }
      //     blog.Subtitle.push(subtitle); // Add subtitle
      //   }
      //   return blog; // Return updated blog
      // });

      return {
        ...state,
        blogs: state.blogs.map((blog) =>
          blog._id === action.payload.blogId
            ? { ...blog, Subtitle: [...(blog.Subtitle || []), action.payload.subtitle] }
            : blog
        ),
      };
    },
    
    

    // Add Subtitle
    addSubtitleRequest: (state) => {
      state.loading = true;
    },
    addSubtitleSuccess: (state, action) => {
      state.loading = false;
      const { blogId, subtitle } = action.payload;

      // Find the blog and update the subtitles
      state.blogs = state.blogs.map((blog) =>
        blog._id === blogId
          ? { ...blog, subtitles: [...blog.subtitles, subtitle] }
          : blog
      );

      state.message = "Subtitle added successfully!";
    },

    addSubtitleFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Delete Subtitle
    deleteSubtitleRequest: (state) => {
      state.loading = true;
    },
    deleteSubtitleSuccess: (state, action) => {
      state.loading = false;
      const { blogId, subtitleId, message } = action.payload;
    
      state.blogs = state.blogs.map((blog) =>
        blog._id === blogId
          ? {
              ...blog,
              subtitles: blog.subtitles?.filter(
                (subtitle) => subtitle._id !== subtitleId
              ) || [], // Fallback to an empty array
            }
          : blog
      );
    
      state.message = message; // Use the success message from the action payload
    },
    
    
    deleteSubtitleFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },


    // delete Blog reducer:
    deleteBlogRequest: (state) => {
      state.loading = true;
    },
    deleteBlogSuccess: (state, action) => {
      state.loading = false;
      const {blogId, message} = action.payload;

      const deletdblog = state.blogs.find((blog) => blog._id === blogId);

      // Filter out the blog with the matching ID
      state.blogs = state.blogs.filter((blog) => blog._id !== blogId);

      state.deletedBlogs = state.deletedBlogs.push(deletdblog)

      state.message = message; // Set the success message from the payload
    },
    deleteBlogFail: (state, action) => {
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
  addSubtitleRequest,
  addSubtitleSuccess,
  addSubtitleFail,
  deleteBlogRequest,
  deleteBlogSuccess,
  deleteBlogFail,
  deleteSubtitleRequest,
  deleteSubtitleSuccess,
  deleteSubtitleFail,
  clearError,
  clearMessage,
  blogRequest,
  blogFail,
  allDeletedBlogs,
  getBlogById,
  restoreBlog,
  updateBlogSuccess,
  addSubtitle
} = blogSlice.actions;

export default blogSlice.reducer;
