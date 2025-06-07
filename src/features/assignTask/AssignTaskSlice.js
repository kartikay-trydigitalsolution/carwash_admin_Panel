import { createSlice } from "@reduxjs/toolkit";

const assignTaskSlice = createSlice({
  name: "assignTask",
  initialState: {
    data: [],
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    fetchAssignTaskRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchAssignTaskSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload?.assignTask;
    },
    fetchAssignTaskFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createAssignTaskRequest: (state) => {
      state.loading = true;
      state.success = null;
    },
    createAssignTaskSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.data.push(action.payload.task);
    },
    createAssignTaskFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteAssignTaskRequest: (state) => {
      state.loading = true;
      state.success = null;
    },
    deleteAssignTaskSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.data = state.data.filter((item) => item._id !== action.payload);
    },
    deleteAssignTaskFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateAssignTaskRequest: (state) => {
      state.loading = true;
      state.success = null;
    },
    updateAssignTaskSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      const updatedAssignTask = action.payload.AssignTask;
      const index = state.data.findIndex(
        (item) => item._id === updatedAssignTask._id
      );
      if (index !== -1) {
        state.data[index] = updatedAssignTask;
      }
    },
    updateAssignTaskFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetAssignTaskSuccess: (state) => {
      state.success = null;
    },
  },
});

export const {
  fetchAssignTaskRequest,
  fetchAssignTaskSuccess,
  fetchAssignTaskFailure,
  createAssignTaskRequest,
  createAssignTaskSuccess,
  createAssignTaskFailure,
  deleteAssignTaskRequest,
  deleteAssignTaskSuccess,
  deleteAssignTaskFailure,
  updateAssignTaskRequest,
  updateAssignTaskSuccess,
  updateAssignTaskFailure,
  resetAssignTaskSuccess,
} = assignTaskSlice.actions;

export default assignTaskSlice.reducer;
