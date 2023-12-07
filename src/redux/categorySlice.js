import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: [],
  reducers: {
    addCategories(state, action) {
      return action.payload;
    },
  },
});

const { reducer, actions } = categorySlice;
export const { addCategories } = actions;
export default reducer;
