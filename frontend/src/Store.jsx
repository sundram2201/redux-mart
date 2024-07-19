import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./components/Slices/UserSlice";

export const store = configureStore({
  reducer: userReducer,
});
