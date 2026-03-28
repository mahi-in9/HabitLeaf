import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import MyHabbit from "./pages/MyHabbit";
import Community from "./pages/Community";
import Achievements from "./pages/Achievements";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Footer from "./components/Footer";
import NotFoundPage from "./pages/NotFoundPage";

import { useDispatch } from "react-redux";
import { fetchUser } from "./app/slices/userSlice";
import { getDashboardData } from "./app/slices/dashboardSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(fetchUser());
      dispatch(getDashboardData());
    }
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-1 ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* Protected */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/myhabit" element={<MyHabbit />} />
          <Route path="/community" element={<Community />} />
          <Route path="/achievements" element={<Achievements />} />
          {/* Catch-all */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
