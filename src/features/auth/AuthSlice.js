import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userData: [],
    usertokken: "",
    isLogging: false,
    loading: false,
    otpSuccess: false,
    resetSuccess: false,
    loginSuccess: false,
    otpEmail: "",
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
