import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const createHabit = createAsyncThunk(
  "habit/create",
  async (habitData, thunkAPI) => {
    try {
      const res = await api.post("/api/habits", habitData);
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  },
);

export const getHabits = createAsyncThunk(
  "habit/getAll",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/api/habits");
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  },
);

export const getHabitById = createAsyncThunk(
  "habit/getById",
  async (id, thunkAPI) => {
    try {
      const res = await api.get(`/api/habits/${id}`);
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  },
);

export const updateHabit = createAsyncThunk(
  "habit/update",
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const res = await api.put(`/api/habits/${id}`, updatedData);
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  },
);

export const deleteHabit = createAsyncThunk(
  "habit/delete",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/api/habits/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  },
);

export const markHabitComplete = createAsyncThunk(
  "habit/complete",
  async (id, thunkAPI) => {
    try {
      const res = await api.patch(`/api/habits/${id}/complete`);
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  },
);

const initialState = {
  habits: [],
  habit: null,
  loading: false,
  error: null,
};

const habitSlice = createSlice({
  name: "habit",
  initialState,
  reducers: {
    clearHabitError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(createHabit.pending, (state) => {
        state.loading = true;
      })
      .addCase(createHabit.fulfilled, (state, action) => {
        state.loading = false;
        state.habits.unshift(action.payload);
      })
      .addCase(createHabit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getHabits.pending, (state) => {
        state.loading = true;
      })
      .addCase(getHabits.fulfilled, (state, action) => {
        state.loading = false;
        state.habits = action.payload;
      })
      .addCase(getHabits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getHabitById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getHabitById.fulfilled, (state, action) => {
        state.loading = false;
        state.habit = action.payload;
      })
      .addCase(getHabitById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateHabit.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.habits.findIndex(
          (h) => h._id === action.payload._id,
        );

        if (index !== -1) {
          state.habits[index] = action.payload;
        }
      })

      .addCase(deleteHabit.fulfilled, (state, action) => {
        state.habits = state.habits.filter((h) => h._id !== action.payload);
      })

      .addCase(markHabitComplete.fulfilled, (state, action) => {
        const index = state.habits.findIndex(
          (h) => h._id === action.payload._id,
        );

        if (index !== -1) {
          state.habits[index] = action.payload;
        }

        if (state.habit?._id === action.payload._id) {
          state.habit = action.payload;
        }
      });
  },
});

export const { clearHabitError } = habitSlice.actions;
export default habitSlice.reducer;
