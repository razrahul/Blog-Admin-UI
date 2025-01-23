import axios from "axios";

const server = import.meta.env.VITE_BACKEND_URL;

import {
  subtitleRequest,
  subtitleFail,
  createSubtitleSuccess,
  allSubtitles,
  allDeltedSubtitles,
  subtitleById,
  deleteSubtitle as deleteSubtitleSuccess
} from "../reducer/subtitleSlice.js";

import{
    addSubtitle,
    deleteSubtitleInBlogSlice
} from "../reducer/blogSlice.js"

//create Subtitle
export const createSubtitle = (blogId, mySubtitle ) => async (dispatch) => {
  try {
    dispatch(subtitleRequest());

    const { data } = await axios.post(`${server}/subtitles/${blogId}`,
      mySubtitle,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );

    dispatch(createSubtitleSuccess(data));
    dispatch(addSubtitle(data));
  } catch (error) {
    return async (dispatch) => {
      dispatch(
        subtitleFail(
          error.response?.data?.message || "Failed to create subtitle"
        )
      );
    };
  }
};

//delete Subtitle
export const deleteSubtitle = (id, blogId) => async (dispatch) => {
  try {
    dispatch(subtitleRequest());

    const { data } = await axios.delete(`${server}/subtitles/${id}`, {
      withCredentials: true,
    });

    dispatch(deleteSubtitleSuccess({subtitleId:id, message: data.message}));
    dispatch(deleteSubtitleInBlogSlice({blogId, subtitleId:id, message: data.message}));
  } catch (error) {
    return async (dispatch) => {
      dispatch(
        subtitleFail(
          error.response?.data?.message || "Failed to delete subtitle"
        )
      );
    };
  }
};