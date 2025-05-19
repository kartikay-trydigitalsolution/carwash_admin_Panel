import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userData: [],
    usertokken: "",
    isLogging: false,
    loading: false,
    error: null,
  },
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.userData = action.payload?.data?.user;
      state.usertokken = action.payload?.data?.token;
      state.isLogging = true;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    otpMailRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    otpMailSucess: (state) => {
      state.loading = false;
    },
    otpMailFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, otpMailRequest } =
  authSlice.actions;

export default authSlice.reducer;
