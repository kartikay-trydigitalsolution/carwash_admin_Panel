import { createSlice } from "@reduxjs/toolkit";

const mixDataSlice = createSlice({
  name: "mixData",
  initialState: {
    data: [],
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    fetchMixDataRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchMixDataSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload?.data?.data;
    },
    fetchMixDataFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchMixDataRequest, fetchMixDataSuccess, fetchMixDataFailure } =
  mixDataSlice.actions;

export default mixDataSlice.reducer;
