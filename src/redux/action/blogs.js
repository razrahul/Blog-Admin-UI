import axios from "axios";
import { server } from "../store";
import {
  getAllBlogsRequest,
  getAllBlogsSuccess,
  getAllBlogsFail,
  createBlogRequest,
  createBlogSuccess,
  createBlogFail,
  clearError,
  clearMessage,
} from "../reducer/blogSlice.js";

export const getAllBlogs = () => async (dispatch) => {
  try {
    dispatch(getAllBlogsRequest());

    const { data } = await axios.get(`${server}/blogs`, {
      withCredentials: true,
    });

    //  console.log(data);

    dispatch(getAllBlogsSuccess(data));
  } catch (error) {
    dispatch(
      getAllBlogsFail(error.response?.data?.message || "Failed to fetch blogs")
    );
  }
};

// Action to create a blog
export const createBlog = (blogData) => async (dispatch) => {
  try {
    dispatch(createBlogRequest());

    const { data } = await axios.post(
      `${server}/createblog`,
      blogData,
      {
       headers: { 
           'Content-Type': 'multipart/form-data',
        },
       withCredentials: true
      }
     
   );


    dispatch(createBlogSuccess(data));
  } catch (error) {
    dispatch(
      createBlogFail(
        error.response?.data?.message ||
          "Failed to create the blog. Please try again."
      )
    );
  }
};
