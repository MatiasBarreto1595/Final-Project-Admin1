import { configureStore } from "@reduxjs/toolkit";
import admin from "./adminSlice";
import category from "./categorySlice";
const store = configureStore({
  reducer: {
    admin,
    category,
  },
});

export default store;
