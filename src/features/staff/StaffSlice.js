import { createSlice } from "@reduxjs/toolkit";

const staffSlice = createSlice({
  name: "staff",
  initialState: {
    data: [],
    loading: false,
    error: null,
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
    createRequest: (state, action) => {
      state.loading = true;
    },
    createSuccess: (state, action) => {
      state.loading = false;
      state.data.push(action.payload);
    },
    createFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
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
} = staffSlice.actions;

export default staffSlice.reducer;
