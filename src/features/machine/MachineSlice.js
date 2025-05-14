import { createSlice } from "@reduxjs/toolkit";

const machineSlice = createSlice({
  name: "machine",
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
      state.data = action.payload?.machines;
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
      state.loading = false;
      state.success = true;
      state.data.push(action.payload.machines);
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
    updateRequest: (state) => {
      state.loading = true;
      state.success = null;
    },
    updateSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      const updatedMachine = action.payload.machines;
      const index = state.data.findIndex(
        (item) => item._id === updatedMachine._id
      );
      if (index !== -1) {
        state.data[index] = updatedMachine;
      }
    },
    updateFailure: (state, action) => {
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
  deleteRequest,
  deleteSuccess,
  deleteFailure,
  updateRequest,
  updateSuccess,
  updateFailure,
  resetSuccess,
} = machineSlice.actions;

export default machineSlice.reducer;
