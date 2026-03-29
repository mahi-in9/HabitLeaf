import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

// ============================
// THUNKS
// ============================

// Get all achievements
export const fetchAchievements = createAsyncThunk(
  "achievement/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/api/achievements");
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  },
);

// Evaluate achievements
export const evaluateAchievements = createAsyncThunk(
  "achievement/evaluate",
  async (_, thunkAPI) => {
    try {
      const res = await api.post("/api/achievements/evaluate");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  },
);

// Get unlocked achievements
export const fetchUnlockedAchievements = createAsyncThunk(
  "achievement/fetchUnlocked",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/api/achievements/unlocked");
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  },
);

// Get stats
export const fetchAchievementStats = createAsyncThunk(
  "achievement/fetchStats",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/api/achievements/stats");
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  },
);

const achievementSlice = createSlice({
  name: "achievement",
  initialState: {
    achievements: [],
    stats: null,
    loading: false,
    error: null,
    unlockedRecently: [], // for UI notifications
  },
  reducers: {
    clearAchievementError: (state) => {
      state.error = null;
    },
    clearUnlockedRecently: (state) => {
      state.unlockedRecently = [];
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchAchievements.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAchievements.fulfilled, (state, action) => {
        state.loading = false;
        state.achievements = action.payload;
      })
      .addCase(fetchAchievements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(evaluateAchievements.pending, (state) => {
        state.loading = true;
      })
      .addCase(evaluateAchievements.fulfilled, (state, action) => {
        state.loading = false;

        state.unlockedRecently = action.payload?.unlocked || [];
      })
      .addCase(evaluateAchievements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchUnlockedAchievements.fulfilled, (state, action) => {
        state.unlockedRecently = action.payload;
      })

      .addCase(fetchAchievementStats.fulfilled, (state, action) => {
        state.stats = action.payload;
      });
  },
});

export const { clearAchievementError, clearUnlockedRecently } =
  achievementSlice.actions;

export default achievementSlice.reducer;
