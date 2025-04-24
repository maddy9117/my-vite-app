// src/features/products/productsSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types/Product";
import { RootState } from "../../store";

interface ProductsState {
  items: Product[]; // All products
  cartProducts: Product[]; // Products in the cart
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  cartProducts: [],
  status: "idle",
  error: null,
};

export const fetchProducts = createAsyncThunk<Product[], string>(
  "products/fetchProducts",
  async (query) => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const url = query
      ? `${baseUrl}/products/search?query=${query}`
      : `${baseUrl}/products`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
);
export const fetchCartProducts = createAsyncThunk<Product[], string[]>(
  "products/fetchCartProducts",
  async (ids) => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const response = await fetch(`${baseUrl}/products/bulk?ids=${ids}`);
    const data = await response.json();
    return data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload; // for catalog listing
    },
    setCartProducts: (state, action: PayloadAction<Product[]>) => {
      state.cartProducts = action.payload; // for cart-related pages
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(fetchCartProducts.fulfilled, (state, action) => {
        state.cartProducts = action.payload;
      });
  },
});

export const selectCartTotalPrice = (state: RootState) => {
  const items = state.cart.items;
  const products = state.products.cartProducts;

  return Object.entries(items).reduce((total, [id, qty]) => {
    const product = products.find((p) => p.id === id);
    return product ? total + product.price * qty : total;
  }, 0);
};

export const { setProducts, setCartProducts } = productsSlice.actions;

export default productsSlice.reducer;
