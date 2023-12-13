import { configureStore } from "@reduxjs/toolkit";
import admin from "./adminSlice";
import category from "./categorySlice";
import refresh from "./refresSlice";
const store = configureStore({
  reducer: {
    admin,
    category,
    refresh,
  },
});

export default store;
