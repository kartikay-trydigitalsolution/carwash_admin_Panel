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
    fetchStaffRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchStaffSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload?.user;
    },
    fetchStaffFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createStaffRequest: (state) => {
      state.loading = true;
      state.success = null;
    },
    createStaffSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.data.push(action.payload.user);
    },
    createStaffFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteStaffRequest: (state) => {
      state.loading = true;
      state.success = null;
    },
    deleteStaffSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.data = state.data.filter((item) => item._id !== action.payload);
    },
    deleteFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateStaffRequest: (state) => {
      state.loading = true;
      state.success = null;
    },
    updateStaffSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      const updatedUser = action.payload.user;
      const index = state.data.findIndex(
        (item) => item._id === updatedUser._id
      );
      if (index !== -1) {
        state.data[index] = updatedUser;
      }
    },
    updateStaffFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetStaffSuccess: (state) => {
      state.success = null;
    },
  },
});

export const {
  fetchStaffRequest,
  fetchStaffSuccess,
  fetchStaffFailure,
  createStaffRequest,
  createStaffSuccess,
  createStaffFailure,
  deleteStaffRequest,
  deleteStaffSuccess,
  deleteStaffFailure,
  updateStaffRequest,
  updateStaffSuccess,
  updateStaffFailure,
  resetStaffSuccess,
} = staffSlice.actions;

export default staffSlice.reducer;
