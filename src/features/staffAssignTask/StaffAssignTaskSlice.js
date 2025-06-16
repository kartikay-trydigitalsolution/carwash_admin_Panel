import { createSlice } from "@reduxjs/toolkit";

const staffAssignTaskSlice = createSlice({
  name: "staffAssignTask",
  initialState: {
    data: [],
    loading: false,
    error: null,
    success: null,
    pdfSuccess: false,
  },
  reducers: {
    fetchStaffAssignTaskRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.pdfSuccess = false;
    },
    fetchStaffAssignTaskSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload?.staffAssignTask;
      state.pdfSuccess = false;
    },
    fetchStaffAssignTaskFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.pdfSuccess = false;
    },
    createStaffAssignTaskRequest: (state) => {
      state.loading = true;
      state.success = null;
      state.pdfSuccess = false;
    },
    createStaffAssignTaskSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.data.push(action.payload.task);
      state.pdfSuccess = false;
    },
    createStaffAssignTaskFailure: (state, action) => {
      state.loading = false;
      state.pdfSuccess = false;
      state.error = action.payload;
    },
    updateStaffAssignedTaskRequest: (state) => {
      state.pdfSuccess = false;
      state.loading = true;
      state.success = null;
    },
    updateStaffAssignedTaskSuccess: (state, action) => {
      state.pdfSuccess = true;
      const updatedStaffAssignedTask = action.payload.data;
      const index = state.data.findIndex(
        (item) => item._id === updatedStaffAssignedTask._id
      );
      if (index !== -1) {
        state.data[index] = updatedStaffAssignedTask;
      }
    },
    updateStaffAssignedTaskFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.pdfSuccess = false;
    },
    deleteStaffAssignedTaskRequest: (state) => {
      state.loading = true;
      state.success = null;
      state.pdfSuccess = false;
    },
    deleteStaffAssignedTaskSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.data = state.data.filter((item) => item._id !== action.payload);
      state.pdfSuccess = false;
    },
    deleteStaffAssignedTaskFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.pdfSuccess = false;
    },
    resetStaffAssignTaskSuccess: (state) => {
      state.success = null;
      state.pdfSuccess = false;
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
  updateStaffAssignedTaskRequest,
  updateStaffAssignedTaskFailure,
  updateStaffAssignedTaskSuccess,
  deleteStaffAssignedTaskRequest,
  deleteStaffAssignedTaskFailure,
  deleteStaffAssignedTaskSuccess,
} = staffAssignTaskSlice.actions;

export default staffAssignTaskSlice.reducer;
