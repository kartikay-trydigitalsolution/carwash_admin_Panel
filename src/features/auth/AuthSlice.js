import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";
const initialState = {
  userData: [],
  usertokken: "",
  isLogging: false,
  userRole: "",
  loading: false,
  otpSuccess: false,
  resetSuccess: false,
  loginSuccess: false,
  otpEmail: "",
  error: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      console.log(action.payload.data.user.role);
      state.loading = false;
      state.userData = action.payload?.data?.user;
      state.usertokken = action.payload?.data?.token;
      state.userRole = action.payload?.data?.user?.role;
      state.isLogging = true;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    forgetPasswordRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.otpSuccess = false;
      state.loginSuccess = false;
    },
    forgetPasswordSuccess: (state) => {
      state.loading = false;
      state.loginSuccess = false;
      state.otpSuccess = true;
    },
    forgetPasswordFailure: (state, action) => {
      state.loading = false;
      state.otpSuccess = false;
      state.loginSuccess = false;
      state.error = action.payload;
    },
    otpVerifyRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.otpSuccess = false;
      state.loginSuccess = false;
      state.resetSuccess = false;
    },
    otpVerifySuccess: (state, action) => {
      state.loading = false;
      state.otpSuccess = false;
      state.resetSuccess = true;
      state.loginSuccess = false;
      state.otpEmail = action.payload.data.data;
    },
    otpVerifyFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.loginSuccess = false;
      state.otpSuccess = false;
      state.resetSuccess = false;
    },
    newPasswordRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.loginSuccess = false;
      state.otpSuccess = false;
      state.resetSuccess = false;
    },
    newPasswordSuccess: (state) => {
      state.loading = false;
      state.otpSuccess = false;
      state.resetSuccess = false;
      state.loginSuccess = true;
    },
    newPasswordFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.otpSuccess = false;
      state.loginSuccess = false;
      state.resetSuccess = false;
    },
    logoutRequest: () => initialState,
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
  logoutRequest,
} = authSlice.actions;

export default authSlice.reducer;
