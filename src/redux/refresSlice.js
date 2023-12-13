import { createSlice } from "@reduxjs/toolkit";

const refreshSlice = createSlice({
  name: "refresh",
  initialState: false,
  reducers: {
    setRefresh(state, action) {
      return !state;
    },
  },
});

const { reducer, actions } = refreshSlice;
export const { setRefresh } = actions;
export default reducer;
