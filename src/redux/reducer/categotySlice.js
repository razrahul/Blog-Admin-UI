import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    categories: [],
    deletedCategories: [],
    category: {},
    loading: false,
    message: null,
    error: null,
}

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        CategoriesRequest(state) {
            state.loading = true;
            state.error = null;
        },
        getAllCategoriesSuccess(state, action) {
            state.loading = false;
            state.categories = action.payload.categories;
        },
        CategoriesFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        getCategoryByIdSuccess(state, action) {
            state.loading = false;
            state.category = action.payload.category;
        },
        getAllDeletedCategoriesSuccess(state, action) {
            state.loading = false;
            state.deletedCategories = action.payload.categories;
        },
        addCategory(state, action) {
            state.loading = false;
            state.categories.push(action.payload.category);
        },
        updateCategorySuccess(state, action) {
            const index = state.categories.findIndex(category => category.id === action.payload.id); //category
            if (index !== -1) {
                state.categories[index] = action.payload;
            }
        },
        deleteCategorySuccess(state, action) {
            state.loading = false;
            const {id, data} = action.payload;
            state.categories = state.categories.filter(category => category.id !== id);
        },
        updateActivitySuccess(state, action) {
            state.loading = false;
            const {id, Category, message} = action.payload;  //category
            const index = state.categories.findIndex(category => category.id === id);
            if (index !== -1) {
                state.categories[index].isactive = Category.isactive;
            }
            state.message = message;
        },
        clearMessage(state) {
            state.message = null;
        },
        clearError(state) {
            state.error = null;
        }

    },
});

export const {
    CategoriesRequest,
    getAllCategoriesSuccess,
    CategoriesFail,
    getCategoryByIdSuccess,
    getAllDeletedCategoriesSuccess,
    addCategory,
    updateCategorySuccess,
    deleteCategorySuccess,
    updateActivitySuccess,
    clearMessage,
    clearError

} = categorySlice.actions;

export default categorySlice.reducer;