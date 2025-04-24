// src/features/auth/authSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { clearCart } from "../cart/cartSlice";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

interface User {
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}
const token = localStorage.getItem("token");
const storedUser = localStorage.getItem("user");

const initialState: AuthState = {
  user:
    storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null,
  token: token || null,
  loading: false,
  error: null,
};

// Async login action
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${baseUrl}/api/auth/login`,
        credentials
      );

      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      thunkAPI.dispatch(clearCart());
      return { token, user };
    } catch (error: any) {
      const errorMessage = error.response
        ? error.response.data.message
        : error.message;
      console.error(errorMessage);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Optional: fetch user profile with token
export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${baseUrl}/api/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue("Failed to fetch profile");
    }
  }
);

// Register User Thunk
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    userData: { name: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${baseUrl}/api/auth/register`,
        userData
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Registration failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.token = null;
      state.user = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Login failed";
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
