import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    companies: [],
    deletedCompanies: [],
    company: {},
    loading: false,
    message: null,
    error: null,
};

const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {
        companyRequest(state) {
            state.loading = true;
            state.error = null;
        },
        getAllCompaniesSuccess(state, action) {
            state.loading = false;
            state.companies = action.payload.companies;
        },
        companyFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        getCompanyById(state, action) {
            state.loading = false;
            state.company = action.payload.company;
        },
        getAllDeletedComapny(state, action) {
            state.loading = false;
            state.deletedCompanies = action.payload.companies;
        },
        addCompany(state, action) {
            state.loading = false;
            state.companies.push(action.payload);
            state.message = action.payload.message;
        },
        updateCompany(state, action) {
            const index = state.companies.findIndex(company => company.id === action.payload.id);
            if (index !== -1) {
                state.companies[index] = action.payload;
            }
        },
        deleteCompany(state, action) {
            state.loading = false;
            const {id, data} = action.payload;
            state.companies = state.companies.filter(company => company.id !== id);
        },
        updateActivity(state, action) {
            state.loading = false;
            const {id, Company, message} = action.payload;
            const index = state.companies.findIndex(company => company.id === id)
            if (index !== -1) {
                state.companies[index].isactive = Company.isactive;
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
    companyRequest,
    getAllCompaniesSuccess,
    companyFail,
    getCompanyById,
    getAllDeletedComapny,
    addCompany,
    updateCompany,
    deleteCompany,
    updateActivity,
    clearMessage,
    clearError
} = companySlice.actions;

export default companySlice.reducer;