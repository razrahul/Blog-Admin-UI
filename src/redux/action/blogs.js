import axios from "axios";
import { server } from "../store";
import {
  getAllBlogsRequest,
  getAllBlogsSuccess,
  getAllBlogsFail,
  createBlogRequest,
  createBlogSuccess,
  createBlogFail,
  addSubtitleRequest,
  addSubtitleSuccess,
  addSubtitleFail,
  addFAQRequest,
  addFAQSuccess,
  addFAQFail,
  deleteBlogFail,
  deleteBlogRequest,
  deleteBlogSuccess,
  deleteSubtitleRequest,
  deleteSubtitleSuccess,
  deleteSubtitleFail,
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

    const { data } = await axios.post(`${server}/createblog`, blogData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

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

// Action to create a Subtitle

export const addSubtitle = (blogId, subtitleData) => async (dispatch) => {
  try {
    dispatch(addSubtitleRequest());

    const { data } = await axios.post(
      `${server}/blogs/${blogId}`,
      subtitleData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );

    dispatch(
      addSubtitleSuccess({
        blogId,
        subtitle: data.subtitle, // subtitle returned from the API response
      })
    );
  } catch (error) {
    dispatch(
      addSubtitleFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

//delete Subtitle

export const deleteSubtitle = (blogId, subtitleId) => async (dispatch) => {
  try {
    dispatch(deleteSubtitleRequest());

    const { data } = await axios.delete(
      `${server}/deletesubtitle?blogId=${blogId}&subtitleId=${subtitleId}`,
      {
       withCredentials: true
      }
     
   );

    // Send DELETE request to the server
    // const { data } = await axios.delete(
    //   `${server}/deletesubtitle?blogId=${blogId}&subtitleId=${subtitleId}}`,
    //   {
    //     withCredentials: true,
    //   }
    // );

    
    dispatch(
      deleteSubtitleSuccess({
        blogId,
        subtitleId,
        message: data.message, // Ensure backend sends this
      })
    );
    
    
  } catch (error) {
    dispatch(
      deleteSubtitleFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

//Action to create a FAQ
export const addFAQ = (blogId, faqData) => async (dispatch) => {
  try {
    dispatch(addFAQRequest()); // Start loading state

    // API call to backend
    const { data } = await axios.post(`${server}/addfaq/${blogId}`, faqData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    dispatch(addFAQSuccess({ blogId, FAQ: data.FAQ }));
  } catch (error) {
    dispatch(addFAQFail(error.response?.data?.message || "Failed to add FAQ"));
  }
};

// Action to delete a blog

export const deleteBlog = (blogId) => async (dispatch) => {
  try {
    dispatch(deleteBlogRequest()); // Start loading

    // Send DELETE request to the server
    const { data } = await axios.delete(`${server}/blogs/${blogId}`, {
      withCredentials: true,
    });

    // Dispatch success action with blogId and message from the response
    dispatch(deleteBlogSuccess({ blogId, message: data.message }));

    // Optionally fetch all blogs again (if you need to refetch the list after deleting)
    // dispatch(getAllBlogsRequest());
    // const response = await axios.get(`${server}/blogs`);
    // dispatch(getAllBlogsSuccess(response.data));
  } catch (error) {
    dispatch(
      deleteBlogFail(
        error.response?.data?.message || "Failed to delete the blog"
      )
    );
  }
};
