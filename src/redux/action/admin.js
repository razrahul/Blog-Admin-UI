import axios from "axios";
import { server } from "../store";
import{
    getAllUsersRequest,
    getAllUsersSuccess,
    getAllUsersFail
} from '../reducer/adminSlice.js'


export const getAllUsers = () => async (dispatch) => {
    try {
      dispatch(getAllUsersRequest());
  
      const { data } = await axios.get(
          `${server}/admin/allusers`,
          {
           withCredentials: true
          }
         
       );
       
  
      dispatch(getAllUsersSuccess(data));
    } catch (error) {
      dispatch(getAllUsersFail(error.response?.data?.message || 'Something went wrong'))
    }
  };
  
  // Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming the token is in localStorage
  