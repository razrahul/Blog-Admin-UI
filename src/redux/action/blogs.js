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
  deleteBlogFail,
  deleteBlogRequest,
  deleteBlogSuccess,
  deleteSubtitleRequest,
  deleteSubtitleSuccess,
  deleteSubtitleFail,
  clearError,
  clearMessage,
  blogRequest,
  blogFail,
  allDeletedBlogs,
  getBlogById,
  restoreBlog as restoreBlogSuccess,
  updateBlogSuccess,
  updatevisiblity,
} from "../reducer/blogSlice.js";

export const getAllBlogs = () => async (dispatch) => {
  try {
    dispatch(getAllBlogsRequest());
    const { data } = await axios.get(`${server}/blogs`, {
      withCredentials: true,
    });
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

//update blog
export const updateBlog = (blogId, blogData) => async (dispatch) => {
  try {
    dispatch(blogRequest());
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    };
    const { data } = await axios.put(
      `${server}/blogs/${blogId}`,
      blogData,
      config
    );
    dispatch(updateBlogSuccess(data));
  } catch (error) {
    dispatch(
      blogFail(
        error.response?.data?.message ||
          "Failed to update the blog. Please try again."
      )
    );
  }
};

//change visibility
export const changeVisibility = (blogId) => async (dispatch) => {
  try {
    dispatch(blogRequest());
    const { data } = await axios.put(`${server}/admin/public/${blogId}`,
    {}, 
    {
      withCredentials: true,
    }
  );

    dispatch(updatevisiblity(data));
  } catch (error) {
    dispatch(
      blogFail(
        error.response?.data?.message ||
          "Failed to update the blog. Please try again."
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
        withCredentials: true,
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
      deleteSubtitleSuccess({ blogId, subtitleId, message: data.message })
    );
  } catch (error) {
    dispatch(
      deleteSubtitleFail(error.response?.data?.message || error.message)
    );
  }
};

// Action to delete a blog
export const deleteBlog = (blogId) => async (dispatch) => {
  try {
    dispatch(deleteBlogRequest());

    // Send DELETE request to the server
    const { data } = await axios.delete(`${server}/blogs/${blogId}`, {
      withCredentials: true,
    });

    dispatch(deleteBlogSuccess({ blogId, message: data.message }));
  } catch (error) {
    dispatch(
      deleteBlogFail(
        error.response?.data?.message || "Failed to delete the blog"
      )
    );
  }
};

//All Delted Blogs
export const getAllDeltedBlogs = () => async (dispatch) => {
  try {
    dispatch(blogRequest());
    const { data } = await axios.get(`${server}/deletedblogs`, {
      withCredentials: true,
    });
    dispatch(allDeletedBlogs(data));
  } catch (error) {
    dispatch(
      blogFail(error.response?.data?.message || "Failed to fetch Delted blogs")
    );
  }
};

//get blog ny id
export const getBlogsById = (blogId) => async (dispatch) => {
  try {
    dispatch(blogRequest());

    const { data } = await axios.get(`${server}/blogs/${blogId}`, {
      withCredentials: true,
    });

    dispatch(getBlogById(data));
  } catch (error) {
    dispatch(blogFail(error.response?.data?.message || "Failed to fetch blog"));
  }
};

//restore Blog
export const restoreBlog = (id) => async (dispatch) => {
  try {
    dispatch(blogRequest());

    const { data } = await axios.put(
      `${server}/blog/restore/${id}`,
      {},
      {
        withCredentials: true,
      }
    );

    dispatch(restoreBlogSuccess(data));
  } catch (error) {
    dispatch(
      blogFail(error.response?.data?.message || "Failed to restore blog")
    );
  }
};
