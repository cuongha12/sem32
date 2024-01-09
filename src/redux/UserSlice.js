import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        loginUser: {
            currentUser: null,
            isFetching: false,
            error: false
        },
        logoutUser: {
            isFetching: false,
            error: false
        },
    },
    reducers: {
        loginUserStart: (state) => {
            state.loginUser.isFetching = true;
        },
        loginUserSuccess: (state, action) => {
            state.loginUser.isFetching = false;
            state.loginUser.currentUser = action.payload;
            state.loginUser.error = false
        },
        loginUserFailed: (state) => {
            state.loginUser.isFetching = false;
            state.loginUser.error = true;
        },
        logoutUserStart: (state) => {
            state.loginUser.isFetching = true;
        },
        logoutUserSuccess: (state, action) => {
            state.loginUser.isFetching = false;
            state.loginUser.currentUser = null;
            state.loginUser.error = false
        },
        logoutUserFailed: (state) => {
            state.loginUser.isFetching = false;
            state.loginUser.error = true;
        },
    }
})

export const {
    loginUserStart, loginUserFailed, loginUserSuccess, logoutUserStart, logoutUserSuccess, logoutUserFailed,
} = userSlice.actions

export default userSlice.reducer;