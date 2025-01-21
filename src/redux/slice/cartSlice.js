import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: { 
    update_cart: (state, action) =>{
        state.cart = action.payload;
    },
    delete_cart: (state, action) =>{
        state.cart = [];
    },
    delete_item: (state, action) => {
        const itemId = action.payload; // Payload berisi ID item yang akan dihapus
        state.cart = state.cart.filter(item => item.id !== itemId);
    },
    update_quantity: (state, action) => {
        const { id, quantity } = action.payload; // Payload contains id and new quantity
        const product = state.cart.find(item => item.id === id);
        if (product) {
          product.quantity = quantity; // Update the quantity of the matching product
        }
    },
  },
});

export const { update_cart, delete_cart, delete_item, update_quantity } = cartSlice.actions;
export default cartSlice.reducer;
