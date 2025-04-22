// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import authReducer from "../features/auth/authSlice";
import productsReducer from "../features/products/productsSlice";

// Load cart from localStorage
const loadCartState = () => {
  try {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : undefined;
  } catch {
    return undefined;
  }
};

// Save cart to localStorage
const saveCartState = (state: any) => {
  try {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  } catch (err) {
    console.error("Could not save cart to localStorage", err);
  }
};

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    products: productsReducer,
  },
  preloadedState: {
    cart: loadCartState(), // inject saved cart here
  },
});

// Subscribe to changes
store.subscribe(() => {
  saveCartState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
