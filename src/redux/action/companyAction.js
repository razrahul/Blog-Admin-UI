import axios from "axios";

const server = import.meta.env.VITE_BACKEND_URL;

import {
  companyRequest,
  getAllCompaniesSuccess,
  companyFail,
  getCompanyById as getCompanyByIdSuccess,
  getAllDeletedComapny as getAllDeletedComapnySuccess,
  addCompany,
  updateCompany as updateCompanySuccess,
  deleteCompany as deleteCompanySuccess,
  updateActivity as updateActivitySuccess,
} from "../reducer/companySlice.js";

//Get All Company
export const getAllCompanies = () => async (dispatch) => {
  try {
    dispatch(companyRequest());

    const { data } = await axios.get(`${server}/companies`, {
      withCredentials: true,
    });

    dispatch(getAllCompaniesSuccess(data));
  } catch (error) {
    return async (dispatch) => {
      dispatch(
        companyFail(
          error.response?.data?.message || "Failed to fetch companies"
        )
      );
    };
  }
};

//Get Company By Id
export const getCompanyById = (id) => async (dispatch) => {
  try {
    dispatch(companyRequest());

    const { data } = await axios.get(`${server}/company/${id}`, {
      withCredentials: true,
    });

    dispatch(getCompanyByIdSuccess(data));
  } catch (error) {
    return async (dispatch) => {
      dispatch(
        companyFail(error.response?.data?.message || "Failed to fetch company")
      );
    };
  }
};

//Get All Deleted Company
export const getAllDeletedCompany = () => async (dispatch) => {
  try {
    dispatch(companyRequest());

    const { data } = await axios.get(`${server}/companies/deletd`, {
      withCredentials: true,
    });

    dispatch(getAllDeletedComapnySuccess(data));
  } catch (error) {
    return async (dispatch) => {
      dispatch(
        companyFail(
          error.response?.data?.message || "Failed to fetch deleted companies"
        )
      );
    };
  }
};

//create Companies
export const createCompany = (companyName, companyId) => async (dispatch) => {
  try {
    dispatch(companyRequest());

    const { data } = await axios.post(
      `${server}/company`,
      { companyName, companyId },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    dispatch(addCompany(data));
  } catch (error) {
    return async (dispatch) => {
      dispatch(
        companyFail(error.response?.data?.message || "Failed to create company")
      );
    };
  }
};

//update Company
export const updateCompany =
  (id, companyName, companyId) => async (dispatch) => {
    try {
      dispatch(companyRequest());

      const { data } = await axios.put(
        `${server}/company/${id}`,
        { companyName, companyId },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      dispatch(updateCompanySuccess(data));
    } catch (error) {
      return async (dispatch) => {
        dispatch(
          companyFail(
            error.response?.data?.message || "Failed to update company"
          )
        );
      };
    }
  };

//delete Company
export const deleteCompany = (id) => async (dispatch) => {
  try {
    dispatch(companyRequest());

    const { data } = await axios.delete(`${server}/company/${id}`, {
      withCredentials: true,
    });

    dispatch(deleteCompanySuccess(id, data));
  } catch (error) {
    return async (dispatch) => {
      dispatch(
        companyFail(error.response?.data?.message || "Failed to delete company")
      );
    };
  }
};

//update Activity
export const updateActivity = (id) => async (dispatch) => {
  try {
    dispatch(companyRequest());

    const { data } = await axios.patch(`${server}/company/activity/${id}`,
      {},
     {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    dispatch(
      updateActivitySuccess({
        id,
        company: data.company,
        message: data.message,
      })
    );
  } catch (error) {
    return async (dispatch) => {
      dispatch(
        companyFail(
          error.response?.data?.message || "Failed to update activity"
        )
      );
    };
  }
};
