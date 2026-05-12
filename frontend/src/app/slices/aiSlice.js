import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

// ─── Thunks ────────────────────────────────────────────────────────────────

export const fetchHabitRecommendations = createAsyncThunk(
  "ai/recommendHabits",
  async (formData, thunkAPI) => {
    try {
      const res = await api.post("/api/ai/recommend-habits", formData);
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to generate recommendations."
      );
    }
  }
);

export const fetchWeeklySummary = createAsyncThunk(
  "ai/weeklySummary",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/api/ai/weekly-summary");
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to generate weekly summary."
      );
    }
  }
);

// ─── Slice ─────────────────────────────────────────────────────────────────

const aiSlice = createSlice({
  name: "ai",
  initialState: {
    recommendations: [],
    weeklySummary: null,
    loading: false,
    summaryLoading: false,
    error: null,
    summaryError: null,
  },
  reducers: {
    clearRecommendations: (state) => {
      state.recommendations = [];
      state.error = null;
    },
    clearSummaryError: (state) => {
      state.summaryError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Recommendations
      .addCase(fetchHabitRecommendations.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.recommendations = [];
      })
      .addCase(fetchHabitRecommendations.fulfilled, (state, action) => {
        state.loading = false;
        state.recommendations = action.payload;
      })
      .addCase(fetchHabitRecommendations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Weekly Summary
      .addCase(fetchWeeklySummary.pending, (state) => {
        state.summaryLoading = true;
        state.summaryError = null;
      })
      .addCase(fetchWeeklySummary.fulfilled, (state, action) => {
        state.summaryLoading = false;
        state.weeklySummary = action.payload;
      })
      .addCase(fetchWeeklySummary.rejected, (state, action) => {
        state.summaryLoading = false;
        state.summaryError = action.payload;
      });
  },
});

export const { clearRecommendations, clearSummaryError } = aiSlice.actions;
export default aiSlice.reducer;
