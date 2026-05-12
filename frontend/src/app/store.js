import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import habitReducer from "./slices/habbitSlice";
import dashboardReducer from "./slices/dashboardSlice";
import achievementReducer from "./slices/achievementSlice";
import aiReducer from "./slices/aiSlice"; // NEW

export const store = configureStore({
  reducer: {
    user: userReducer,
    habit: habitReducer,
    data: dashboardReducer,
    achievement: achievementReducer,
    ai: aiReducer, // NEW
  },
});
