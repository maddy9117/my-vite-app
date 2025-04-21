// src/features/products/productsSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../types/Product";

interface ProductsState {
  items: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
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
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
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
      });
  },
});

export default productsSlice.reducer;
