import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    roles: [],
    deletedRoles: [],
    role: {},
    loading: false,
    error: null,
    message: null,
};

const roleSlice = createSlice({
    name: 'role',
    initialState,
    reducers: {
        RolesRequest(state) {
            state.loading = true;
            state.error = null;
        },
        getAllRolesSuccess(state, action) {
            state.loading = false;
            state.roles = action.payload.roles;
            state.message = action.payload.message;
        },
        RolesFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        getRoleById(state, action) {
            state.loading = false;
            state.role = action.payload.role;
        },
        getAllDeletedRoles(state, action) {
            state.loading = false;
            state.deletedRoles = action.payload.roles;
        },
        addRole(state, action) {
            state.loading = false;
            state.roles.push(action.payload.role);
            state.message = action.payload.message;
        },
        updateRole(state, action) {
            state.loading = false;
            const index = state.roles.findIndex(role => role.id === action.payload.id);
            if (index !== -1) {
                state.roles[index] = action.payload;
            }
        },
        deleteRole(state, action) {
            state.loading = false;
            const {id, data} = action.payload;
            state.roles = state.roles.filter(role => role.id !== id);
        },
        updateActivity(state, action) {
            state.loading = false;
            const {id, Role, message} = action.payload;
            const index = state.roles.findIndex(role => role.id === id);
            if (index !== -1) {
                state.roles[index].isactive = Role.isactive;
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
    RolesRequest,
    getAllRolesSuccess,
    RolesFail,
    getRoleById,
    getAllDeletedRoles,
    addRole,
    updateRole,
    deleteRole,
    updateActivity,
    clearMessage,
    clearError
} = roleSlice.actions;

export default roleSlice.reducer;