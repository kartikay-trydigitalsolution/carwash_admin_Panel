import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userData: [],
    usertokken: "",
    isLogging: false,
    loading: false,
    success: false,
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
    forgetPasswordRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    forgetPasswordSuccess: (state) => {
      state.loading = false;
    },
    forgetPasswordFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    forgetPasswordRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    forgetPasswordSuccess: (state) => {
      state.loading = false;
    },
    forgetPasswordFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    otpVerifyRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    otpVerifySuccess: (state) => {
      state.loading = false;
    },
    otpVerifyFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    newPasswordRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    newPasswordSuccess: (state) => {
      state.loading = false;
    },
    newPasswordFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  forgetPasswordSuccess,
  forgetPasswordRequest,
  forgetPasswordFailure,
  otpVerifyRequest,
  otpVerifySuccess,
  otpVerifyFailure,
  newPasswordRequest,
  newPasswordSuccess,
  newPasswordFailure,
} = authSlice.actions;

export default authSlice.reducer;
