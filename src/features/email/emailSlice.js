import { createSlice } from "@reduxjs/toolkit";

const emailSlice = createSlice({
  name: "email",
  initialState: {
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    sendEmailRequest: (state) => {
      state.loading = true;
      state.success = null;
    },
    sendEmailSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
    },
    sendEmailFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { sendEmailRequest, sendEmailSuccess, sendEmailFailure } =
  emailSlice.actions;

export default emailSlice.reducer;
