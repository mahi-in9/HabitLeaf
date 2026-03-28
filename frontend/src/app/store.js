import { configureStore } from "@reduxjs/toolkit";
import habitReducer from "./slices/habbitSlice";
import userReducer from "./slices/userSlice";
import dashboardReducer from "./slices/dashboardSlice";
import achievementReducer from "./slices/achievementSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    habit: habitReducer,
    data: dashboardReducer,
    achievement: achievementReducer,
  },
});
