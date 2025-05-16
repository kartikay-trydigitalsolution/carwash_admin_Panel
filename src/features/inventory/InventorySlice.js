import { createSlice } from "@reduxjs/toolkit";

const inventorySlice = createSlice({
  name: "inventory",
  initialState: {
    data: [],
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    fetchInventoryRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchInventorySuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload?.inventory;
    },
    fetchInventoryFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createInventoryRequest: (state) => {
      state.loading = true;
      state.success = null;
    },
    createInventorySuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.data.push(action.payload.inventory);
    },
    createInventoryFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteInventoryRequest: (state) => {
      state.loading = true;
      state.success = null;
    },
    deleteInventorySuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.data = state.data.filter((item) => item._id !== action.payload);
    },
    deleteInventoryFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateInventoryRequest: (state) => {
      state.loading = true;
      state.success = null;
    },
    updateInventorySuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      const updatedInventory = action.payload.inventory;
      const index = state.data.findIndex(
        (item) => item._id === updatedInventory._id
      );
      if (index !== -1) {
        state.data[index] = updatedInventory;
      }
    },
    updateInventoryFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetInventorySuccess: (state) => {
      state.success = null;
    },
  },
});

export const {
  fetchInventoryRequest,
  fetchInventorySuccess,
  fetchInventoryFailure,
  createInventoryRequest,
  createInventorySuccess,
  createInventoryFailure,
  deleteInventoryRequest,
  deleteInventorySuccess,
  deleteInventoryFailure,
  updateInventoryRequest,
  updateInventorySuccess,
  updateInventoryFailure,
  resetInventorySuccess,
} = inventorySlice.actions;

export default inventorySlice.reducer;
