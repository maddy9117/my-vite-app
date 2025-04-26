// src/features/address/addressSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Address, NewAddress } from "../../types/Address";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const fetchUserAddresses = createAsyncThunk(
  "address/fetchUserAddresses",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${baseUrl}/api/auth/addresses`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue("Failed to fetch addresses");
    }
  }
);

export const addAddress = createAsyncThunk(
  "address/addAddress",
  async (newAddress: NewAddress, thunkAPI) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        `${baseUrl}/api/auth/addresses`,
        newAddress,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Optionally, re-fetch all addresses
      await thunkAPI.dispatch(fetchUserAddresses());
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to add address");
    }
  }
);

export const setDefaultAddress = createAsyncThunk(
  "address/setDefaultAddress",
  async (addressId: string, thunkAPI) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.put(
        `${baseUrl}/api/auth/addresses/${addressId}/default`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to set default address");
    }
  }
);

interface AddressState {
  addresses: Address[];
  loading: boolean;
  error: string | null;
}

const initialState: AddressState = {
  addresses: [],
  loading: false,
  error: null,
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserAddresses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserAddresses.fulfilled, (state, action) => {
        state.addresses = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(setDefaultAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setDefaultAddress.fulfilled, (state, action) => {
        state.loading = false;
        // Update state with new default address
        state.addresses = state.addresses.map((addr) =>
          addr.id === action.payload.id
            ? { ...addr, default: true }
            : { ...addr, default: false }
        );
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.addresses.push(action.payload);
        state.loading = false;
      })

      .addCase(setDefaultAddress.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default addressSlice.reducer;
