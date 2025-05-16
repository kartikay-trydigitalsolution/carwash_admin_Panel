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
    fetchMachineRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchMachineSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload?.machines;
    },
    fetchMachineFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createMachineRequest: (state) => {
      state.loading = true;
      state.success = null;
    },
    createMachineSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.data.push(action.payload.machines);
    },
    createMachineFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteMachineRequest: (state) => {
      state.loading = true;
      state.success = null;
    },
    deleteMachineSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.data = state.data.filter((item) => item._id !== action.payload);
    },
    deleteMachineFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateMachineRequest: (state) => {
      state.loading = true;
      state.success = null;
    },
    updateMachineSuccess: (state, action) => {
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
    updateMachineFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetMachineSuccess: (state) => {
      state.success = null;
    },
  },
});

export const {
  fetchMachineRequest,
  fetchMachineSuccess,
  fetchMachineFailure,
  createMachineRequest,
  createMachineSuccess,
  createMachineFailure,
  deleteMachineRequest,
  deleteMachineSuccess,
  deleteMachineFailure,
  updateMachineRequest,
  updateMachineSuccess,
  updateMachineFailure,
  resetMachineSuccess,
} = machineSlice.actions;

export default machineSlice.reducer;
