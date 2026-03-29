import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

// 🔥 Async thunk
export const getDashboardData = createAsyncThunk(
  "dashboard/analytics",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/api/status/dashboard");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data || { message: "Failed to fetch dashboard" },
      );
    }
  },
);

export const fetchDashboardData = createAsyncThunk(
  "dashboard/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/api/dashboard");
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data || { message: "Failed to fetch dashboard" },
      );
    }
  },
);

// 🔥 Initial state
const initialState = {
  dashboard: null,
  data: null,
  dataLoading: false,
  error: null,
};

// 🔥 Slice
const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDashboardData.pending, (state) => {
        state.dataLoading = true;
        state.error = null;
      })
      .addCase(getDashboardData.fulfilled, (state, action) => {
        state.dataLoading = false;
        state.data = action.payload;
      })
      .addCase(getDashboardData.rejected, (state, action) => {
        state.dataLoading = false;
        state.error = action.payload?.message || "Something went wrong";
      })
      .addCase(fetchDashboardData.pending, (state) => {
        state.dataLoading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.dataLoading = false;
        state.dashboard = action.payload;
        state.error = null;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.dataLoading = false;
        state.error = action.payload?.message || "Something went wrong";
      });
  },
});

export default dashboardSlice.reducer;
