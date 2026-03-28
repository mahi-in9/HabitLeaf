import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import bg from "../assets/herosection.jpg";
import showEyes from "../assets/eye-show.svg";
import hideEyes from "../assets/eye-hide.svg";

const ResetPassword = () => {
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    if (data.password !== data.confirmPassword) {
      setMessage("❌ Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        `https://habitleaf.onrender.com/auth/reset-password/${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password: data.password }),
        }
      );

      const result = await response.json();
      if (response.ok) {
        setMessage("Password reset successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage(result.message || "Error resetting password");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Something went wrong. Try again later.");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center relative"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/70 backdrop-blur-m"></div>

      {/* Card */}
      <div className="relative z-10 max-w-md w-full bg-white/80 rounded-2xl shadow-xl p-8">
        <div className="text-center mb-6">
          <span className="inline-block bg-green-100 text-green-600 font-semibold px-3 py-1 rounded-full mb-3">
            HabitLeaf
          </span>
          <h2 className="text-2xl font-bold text-gray-900">Reset Password</h2>
          <p className="text-sm text-gray-500 mt-1">
            Enter your new password below
          </p>
        </div>

        <form onSubmit={handleResetPassword} className="space-y-4">
          {/* New Password */}
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              required
              className="mt-1 block w-full px-4 py-2 pr-10 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
            />
            <img
              src={showPassword ? showEyes : hideEyes}
              alt="toggle password"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 mt-3 w-5 h-5 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              required
              className="mt-1 block w-full px-4 py-2 pr-10 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
            />
            <img
              src={showConfirmPassword ? showEyes : hideEyes}
              alt="toggle confirm password"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 mt-3 w-5 h-5 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2.5 rounded-lg bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold shadow-lg hover:scale-[1.01] transition"
          >
            Reset Password
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
        )}

        <div className="mt-6 text-center text-sm">
          <a href="/login" className="text-gray-800 font-medium hover:underline">
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
