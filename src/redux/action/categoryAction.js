import axios from "axios";

const server = import.meta.env.VITE_BACKEND_URL;

import {
  CategoriesRequest,
  getAllCategoriesSuccess,
  CategoriesFail,
  getCategoryById as getCategoryByIdSuccess,
  getAllDeletedCategories as getAllDeletedCategoriesSuccess,
  addCategory,
  updateCategory as updateCategorySuccess,
  deleteCategorySuccess,
  updateActivity as updateActivitySuccess,
  restoreCategory as restoreCategorySuccess,
} from "../reducer/categotySlice.js";

//Get All Categories
export const getAllCategories = () => async (dispatch) => {
  try {
    dispatch(CategoriesRequest());

    const { data } = await axios.get(`${server}/categories`, {
      withCredentials: true,
    });

    dispatch(getAllCategoriesSuccess(data));
  } catch (error) {
    return async (dispatch) => {
      dispatch(
        CategoriesFail(
          error.response?.data?.message || "Failed to fetch get all categories"
        )
      );
    };
  }
};

//create Category
export const createCategory = (name) => async (dispatch) => {
  try {
    dispatch(CategoriesRequest());

    const { data } = await axios.post(`${server}/category`, name, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    dispatch(addCategory(data));
  } catch (error) {
    return async (dispatch) => {
      dispatch(
        CategoriesFail(
          error.response?.data?.message || "Failed to create category"
        )
      );
    };
  }
};

//Get Category By Id
export const getCategoryById = (id) => async (dispatch) => {
  try {
    dispatch(CategoriesRequest());

    const { data } = await axios.get(`${server}/category/${id}`, {
      withCredentials: true,
    });

    dispatch(getCategoryByIdSuccess(data));
  } catch (error) {
    return async (dispatch) => {
      dispatch(
        CategoriesFail(
          error.response?.data?.message || "Failed to fetch category"
        )
      );
    };
  }
};

//Get All deleted Categories
export const getAllDeletedCategories = () => async (dispatch) => {
  try {
    dispatch(CategoriesRequest());

    const { data } = await axios.get(`${server}/categories/deleted`, {
      withCredentials: true,
    });

    dispatch(getAllDeletedCategoriesSuccess(data));
  } catch (error) {
    return async (dispatch) => {
      dispatch(
        CategoriesFail(
          error.response?.data?.message ||
            "Failed to fetch get all Deletd categories"
        )
      );
    };
  }
};

//update Category
export const updateCategory = (id, name) => async (dispatch) => {
  try {
    dispatch(CategoriesRequest());

    const { data } = await axios.put(`${server}/category/${id}`, name, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    dispatch(updateCategorySuccess(data));
  } catch (error) {
    return async (dispatch) => {
      dispatch(
        CategoriesFail(
          error.response?.data?.message || "Failed to update category"
        )
      );
    };
  }
};

//delete Category
export const deleteCategory = (id) => async (dispatch) => {
  try {
    dispatch(CategoriesRequest());

    const { data } = await axios.delete(`${server}/category/${id}`, {
      withCredentials: true,
    });

    dispatch(deleteCategorySuccess({ data, id }));
  } catch (error) {
    return async (dispatch) => {
      dispatch(
        CategoriesFail(
          error.response?.data?.message || "Failed to delete category"
        )
      );
    };
  }
};

//update Activity
export const updateActivity = (id) => async (dispatch) => {
  try {
    dispatch(CategoriesRequest());

    const { data } = await axios.patch(`${server}/category/activity/${id}`,
      {},
      {
      headers: {
        "Content-Type": "application/json",
      },
    });

    dispatch(updateActivitySuccess({ id, Category: data.category, message: data.message }));
  } catch (error) {
    return async (dispatch) => {
      dispatch(
        CategoriesFail(
          error.response?.data?.message || "Failed to update category"
        )
      );
    };
  }
};

//restore Category
export const restoreCategory = (id) => async (dispatch) => {
  try {
    dispatch(CategoriesRequest());

    const { data } = await axios.put(`${server}/category/restore/${id}`,
      {},
      {
        withCredentials: true,
    });

    dispatch(restoreCategorySuccess(data));
  } catch (error) {
    return async (dispatch) => {
      dispatch(
        CategoriesFail(
          error.response?.data?.message || "Failed to restore category"
        )
      );
    };
  }
};
