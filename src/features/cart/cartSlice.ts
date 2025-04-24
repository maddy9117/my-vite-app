// src/features/cart/cartSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
//import { RootState } from "../../store";

// Define the initial state of the cart
interface CartState {
  items: { [id: string]: number }; // stores product id and quantity
}

const initialState: CartState = {
  items: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Action to add a product to the cart
    addToCart: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.items[id] = (state.items[id] || 0) + 1;
    },

    // Action to decrement a product from the cart
    decrementProduct: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const currentQty = state.items[id] || 0;
      if (currentQty > 1) {
        state.items[id] = currentQty - 1;
      } else {
        delete state.items[id]; // auto-remove if quantity goes to 0 or less
      }
    },

    // Action to remove a product from the cart
    removeFromCart: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      delete state.items[id];
    },

    // Action to update the quantity of a product in the cart
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      console.log(quantity);
      if (quantity <= 0) {
        delete state.items[id];
      } else {
        state.items[id] = quantity;
      }
    },

    // Action to clear the entire cart
    clearCart: (state) => {
      state.items = {};
    },
  },
});

// Selector to calculate the total quantity of items in the cart
export const selectCartTotalQty = (state: { cart: CartState }) => {
  return Object.values(state.cart.items).reduce(
    (total, quantity) => total + quantity,
    0
  );
};

// Export actions for use in components
export const {
  addToCart,
  decrementProduct,
  removeFromCart,
  updateQuantity,
  clearCart,
} = cartSlice.actions;

// Export reducer to be used in store
export default cartSlice.reducer;
