import axios from "axios";

const server = import.meta.env.VITE_BACKEND_URL;

import {
  RolesRequest,
  getAllRolesSuccess,
  RolesFail,
  getAllDeletedRoles as getAllDeletedRolesSuccess,
  getRoleById as getRoleByIdSuccess,
  addRole,
  updateRole as updateRoleSuccess,
  deleteRole as deleteRoleSuccess,
  updateActivity as updateActivitySuccess,
} from "../reducer/roleSlice.js";

// Get All Roles
export const getAllRoles = () => async (dispatch) => {
  try {
    dispatch(RolesRequest());

    const { data } = await axios.get(`${server}/roles`, {
      withCredentials: true,
    });

    dispatch(getAllRolesSuccess(data));
  } catch (error) {
    return async (dispatch) => {
      dispatch(
        RolesFail(
          error.response?.data?.message || "Failed to fetch get all roles"
        )
      );
    };
  }
};

// Create Role
export const createRole = (name) => async (dispatch) => {
  try {
    dispatch(RolesRequest());

    const { data } = await axios.post(`${server}/role`, name, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    dispatch(addRole(data));
  } catch (error) {
    return async (dispatch) => {
      dispatch(
        RolesFail(error.response?.data?.message || "Failed to create role")
      );
    };
  }
};

//Get Role By Id
export const getRoleById = (id) => async (dispatch) => {
  try {
    dispatch(RolesRequest());

    const { data } = await axios.get(`${server}/role/${id}`, {
      withCredentials: true,
    });

    dispatch(getRoleByIdSuccess(data));
  } catch (error) {
    return async (dispatch) => {
      dispatch(
        RolesFail(error.response?.data?.message || "Failed to fetch role")
      );
    };
  }
};

//update Role
export const updateRole = (id, name) => async (dispatch) => {
  try {
    dispatch(RolesRequest());

    const { data } = await axios.put(`${server}/role/${id}`, name, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    dispatch(updateRoleSuccess(data));
  } catch (error) {
    return async (dispatch) => {
      dispatch(
        RolesFail(error.response?.data?.message || "Failed to update role")
      );
    };
  }
};

// Delete Role
export const deleteRole = (id) => async (dispatch) => {
  try {
    dispatch(RolesRequest());

    const { data } = await axios.delete(`${server}/role/${id}`, {
      withCredentials: true,
    });

    dispatch(deleteRoleSuccess({ id, data }));
  } catch (error) {
    return async (dispatch) => {
      dispatch(
        RolesFail(error.response?.data?.message || "Failed to delete role")
      );
    };
  }
};

//Get All Deleted Roles
export const getAllDeletedRoles = () => async (dispatch) => {
  try {
    dispatch(RolesRequest());

    const { data } = await axios.get(`${server}/roles/deleted`, {
      withCredentials: true,
    });

    dispatch(getAllDeletedRolesSuccess(data));
  } catch (error) {
    return async (dispatch) => {
      dispatch(
        RolesFail(
          error.response?.data?.message ||
            "Failed to fetch get all Deletd roles"
        )
      );
    };
  }
};

//update Activity
export const updateActivity = (id) => async (dispatch) => {
  try {
    dispatch(RolesRequest());

    const { data } = await axios.patch(`${server}/role/activity/${id}`,
      {},
      {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    dispatch(updateActivitySuccess({ id, Role: data.role, message: data.message }));
  } catch (error) {
    return async (dispatch) => {
      dispatch(
        RolesFail(error.response?.data?.message || "Failed to update role")
      );
    };
  }
};
