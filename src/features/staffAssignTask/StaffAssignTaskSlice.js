import { createSlice } from "@reduxjs/toolkit";

const staffAssignTaskSlice = createSlice({
  name: "staffAssignTask",
  initialState: {
    data: [],
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    fetchStaffAssignTaskRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchStaffAssignTaskSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload?.assignTask;
    },
    fetchStaffAssignTaskFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createStaffAssignTaskRequest: (state) => {
      state.loading = true;
      state.success = null;
    },
    createStaffAssignTaskSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.data.push(action.payload.task);
    },
    createStaffAssignTaskFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetStaffAssignTaskSuccess: (state) => {
      state.success = null;
    },
  },
});

export const {
  fetchStaffAssignTaskRequest,
  fetchStaffAssignTaskSuccess,
  fetchStaffAssignTaskFailure,
  createStaffAssignTaskRequest,
  createStaffAssignTaskSuccess,
  createStaffAssignTaskFailure,
  resetStaffAssignTaskSuccess,
} = staffAssignTaskSlice.actions;

export default staffAssignTaskSlice.reducer;
