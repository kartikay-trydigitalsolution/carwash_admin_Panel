import { createSlice } from "@reduxjs/toolkit";

const staffSlice = createSlice({
  name: "staff",
  initialState: {
    data: [],
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    fetchRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createRequest: (state) => {
      state.loading = true;
      state.success = null;
    },
    createSuccess: (state, action) => {
      console.log(action.payload,"action.payload");
      state.loading = false;
      state.success = true;
      state.data.push(action.payload);
    },
    createFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteRequest: (state) => {
      state.loading = true;
      state.success = null;
    },
    deleteSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.data = state.data.filter((item) => item._id !== action.payload);
    },
    deleteFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetSuccess: (state) => {
      state.success = null;
    },
  },
});

export const {
  fetchRequest,
  fetchSuccess,
  fetchFailure,
  createRequest,
  createSuccess,
  createFailure,
  resetSuccess,
  deleteRequest,
  deleteSuccess,
  deleteFailure,
} = staffSlice.actions;

export default staffSlice.reducer;
