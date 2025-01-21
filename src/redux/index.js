import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slice/cartSlice";

export const globalState = configureStore({
    reducer: {
        cartSlice
    },
  });