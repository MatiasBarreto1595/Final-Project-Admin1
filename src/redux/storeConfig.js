import { configureStore } from "@reduxjs/toolkit";
import admin from "./adminSlice";
const store = configureStore({
  reducer: {
    admin,
  },
});

export default store;
