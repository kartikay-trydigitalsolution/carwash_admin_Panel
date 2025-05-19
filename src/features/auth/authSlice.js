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
    fetchLoginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchLoginSuccess: (state, action) => {
      state.loading = false;
      state.userData = action.payload?.data?.user;
      state.usertokken = action.payload?.data?.token;
      state.isLogging = true;
    },
    fetchLoginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchLoginRequest, fetchLoginSuccess, fetchLoginFailure } =
  authSlice.actions;

export default authSlice.reducer;
