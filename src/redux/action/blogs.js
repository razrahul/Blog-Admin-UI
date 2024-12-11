import axios from 'axios';
import { server } from '../store';
import {
  getAllBlogsRequest,
  getAllBlogsSuccess,
  getAllBlogsFail,
} from '../reducer/blogSlice.js';


export const getAllBlogs = () => async (dispatch) => {
  try {
    dispatch(getAllBlogsRequest());

    const { data } = await axios.get(
        `${server}/blogs`,
        {
         withCredentials: true
        }
       
     ); 

    //  console.log(data);
     

    dispatch(getAllBlogsSuccess(data));
  } catch (error) {
    dispatch(
      getAllBlogsFail(error.response?.data?.message || 'Failed to fetch blogs')
    );
  }
};
