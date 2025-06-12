import { createSlice } from "@reduxjs/toolkit";

const toolkitAssignTaskSlice = createSlice({
  name: "toolkitAssignTask",
  initialState: {
    data: [],
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    fetchToolKitAssignTaskRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchToolKitAssignTaskSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload?.task;
    },
    fetchToolKitAssignTaskFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createToolKitAssignTaskRequest: (state) => {
      state.loading = true;
      state.success = null;
    },
    createToolKitAssignTaskSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.data.push(action.payload);
    },
    createToolKitAssignTaskFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchToolKitAssignTaskRequest,
  fetchToolKitAssignTaskSuccess,
  fetchToolKitAssignTaskFailure,
  createToolKitAssignTaskRequest,
  createToolKitAssignTaskSuccess,
  createToolKitAssignTaskFailure,
} = toolkitAssignTaskSlice.actions;

export default toolkitAssignTaskSlice.reducer;
