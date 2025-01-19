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
    deleteUserRequest,
    deleteUserSuccess,
    deleteUserFail,
    clearError,
    clearMessage,
    userRequest,
    userFail,
    alldeletedusers,
    userById,
    restoreUser as restoreUserSuccess
} from '../reducer/adminSlice.js'

// Get All users
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

  //Delete User

 export const deleteUser = (userId) => async (dispatch) => {
    try {
      dispatch(deleteUserRequest());

      const { data } = await axios.delete(
        `${server}/admin/user/${userId}`,
        {
         withCredentials: true
        }

     );

      dispatch(deleteUserSuccess({ message: data.message, userId }));
    } catch (error) {
      dispatch(deleteUserFail(error.response?.data?.message || 'Something went wrong'));
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

//Get All Deleted Users
export const getAllDeletedUsers = () => async (dispatch) => {
  try {
    dispatch(userRequest());

    const { data } = await axios.get(`${server}/admin/deletedusers`,
      {
        withCredentials: true
      }
    );

    dispatch(alldeletedusers(data));
    
  } catch (error) {
    dispatch(userFail(error.response?.data?.message || 'GEt All Deleted Users Failed'));
    
  }
}

//restore user
export const restoreUser = (userId) => async (dispatch) => {
  try {
    dispatch(userRequest());

    const { data } = await axios.put(`${server}/admin/restore/${userId}`,
      {},
      {
        withCredentials: true
      }
    );

    dispatch(restoreUserSuccess(data));
    
  } catch (error) {
    dispatch(userFail(error.response?.data?.message || 'Restore User Failed'));
    
  }
}

  