import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import MyHabit from "./pages/MyHabit";
import Community from "./pages/Community";
import Achievements from "./pages/Achievements";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AIHabitAdvisor from "./pages/AIHabitAdvisor";
import Footer from "./components/Footer";
import NotFoundPage from "./pages/NotFoundPage";
import Protected from "./components/Protected";
import PageLoader from "./components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./app/slices/userSlice";
import { getDashboardData } from "./app/slices/dashboardSlice";

function App() {
  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(fetchUser());
      dispatch(getDashboardData());
    }
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {loading && <PageLoader />}
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Protected */}
        <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
        <Route path="/myhabit" element={<Protected><MyHabit /></Protected>} />
        <Route path="/community" element={<Protected><Community /></Protected>} />
        <Route path="/achievements" element={<Protected><Achievements /></Protected>} />
        <Route path="/ai-advisor" element={<Protected><AIHabitAdvisor /></Protected>} />

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
