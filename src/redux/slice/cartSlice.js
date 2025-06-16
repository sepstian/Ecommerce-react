import { createSlice } from "@reduxjs/toolkit";

// Ambil cart dari localStorage saat app pertama kali dibuka
const initialCart = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: initialCart, // <= cart langsung ambil dari localStorage
  },
  reducers: { 
    update_cart: (state, action) => {
      state.cart = action.payload;
    },
    delete_cart: (state) => {
      state.cart = [];
    },
    delete_item: (state, action) => {
      const itemId = action.payload; 
      state.cart = state.cart.filter(item => item.id !== itemId);
    },
    update_quantity: (state, action) => {
      const { id, quantity } = action.payload;
      const product = state.cart.find(item => item.id === id);
      if (product) {
        product.quantity = quantity;
      }
    },
  },
});

export const { update_cart, delete_cart, delete_item, update_quantity } = cartSlice.actions;
export default cartSlice.reducer;
