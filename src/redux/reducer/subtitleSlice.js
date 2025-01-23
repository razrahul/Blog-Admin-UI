import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  subtitles: [],
  deletedSubtitles: [],
  subtitle: {},
  message: null,
  error: null,
};


const subtitleSlice = createSlice({
    name: "subtitle",
    initialState,
    reducers: {
        //get Common  subtitleRequest and subtitleFail
        subtitleRequest: (state, action) => {
            state.loading = true;
        },
        subtitleFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        //create Subtitle
        createSubtitleSuccess(state, action) {
            state.loading = false;
            state.subtitle = action.payload.subtitle;
            state.message = action.payload?.message;
        },
        //get All Subtitles
        allSubtitles(state, action) {
            state.loading = false;
            state.subtitles = action.payload.subtitles;
            state.message = action.payload?.message;
        },
        //all deleted Subtitle
        allDeltedSubtitles(state, action) {
            state.loading = false;
            state.deletedSubtitles = action.payload.subtitles;
        },
        //subtitle By id
        subtitleById(state, action) {
            state.loading = false;
            state.subtitle = action.payload.subtitle;
            state.message = action.payload?.message;
        },
        deleteSubtitle(state, action) {
            state.loading = false;
            const {subtitleId, message } = action.payload;
            state.subtitles = state.subtitles.filter((subtitle) => subtitle._id !== subtitleId);
            state.message = message;
        },


    },

});

export const {
    subtitleRequest,
    subtitleFail,
    createSubtitleSuccess,
    allSubtitles,
    allDeltedSubtitles,
    subtitleById,
    deleteSubtitle
} = subtitleSlice.actions;

export default subtitleSlice.reducer;