import axios from "axios";
import { server } from "../store";
import{
    getAllUsersRequest,
    getAllUsersSuccess,
    getAllUsersFail,
    updateUserVerificationRequest,
    updateUserVerificationSuccess,
    updateUserVerificationFail,
    updateUserBlockRequest,
    updateUserBlockSuccess,
    updateUserBlockFail,
    clearError,
    clearMessage
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
  
 
// update Verifaction

export const updateUserVerification = (userId) => async (dispatch) => {
  try {
    dispatch(updateUserVerificationRequest());

    const { data } = await axios.put(
      `${server}/admin/user/${userId}`,
      {},
      {
       withCredentials: true
      }
     
   );

    dispatch(updateUserVerificationSuccess({ message: data.message, userId }));
  } catch (error) {
    dispatch(updateUserVerificationFail(error.response?.data?.message || 'Something went wrong'));
  }
};

// updare Block action

export const updateUserBlock = (userId) => async (dispatch) => {
  try {
    dispatch(updateUserBlockRequest());

    const { data } = await axios.put(
      `${server}/admin/block/${userId}`,
      {},
      {
        withCredentials: true
      }
    );

    dispatch(updateUserBlockSuccess({ message: data.message, userId }));
  } catch (error) {
    dispatch(updateUserBlockFail(error.response?.data?.message || 'Something went wrong'));
  }
}

  