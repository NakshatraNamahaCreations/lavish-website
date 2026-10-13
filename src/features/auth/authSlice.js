import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    isError: false,
    message: '',
    accessToken: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { user, accessToken } = action.payload;
            state.user = user;
            state.isAuthenticated = true;
            state.accessToken = accessToken;
        },
        logout: (state) => {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");
            state.user = null;
            state.isAuthenticated = false;
            state.accessToken = null;
        },
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.message = '';
        }
    }
});

export const { setCredentials, logout, reset } = authSlice.actions;
export default authSlice.reducer;