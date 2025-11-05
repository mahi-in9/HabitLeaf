import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../assets/herosection.jpg";
import showEyes from "../assets/eye-show.svg";
import hideEyes from "../assets/eye-hide.svg";

const Signup = () => {
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch(`https://habitleaf.onrender.com/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log(result);

      if (response.ok) {
        setMessage("🎉 Account created successfully! Redirecting to login...");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setMessage(result.message || "❌ Signup failed. Try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("⚠️ Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center relative"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="absolute inset-0 bg-white/70 backdrop-blur-m"></div>

      <div className="relative z-10 max-w-md w-full bg-white/80 rounded-2xl shadow-xl p-8">
        <div className="text-center mb-6">
          <span className="inline-block bg-green-100 text-green-600 font-semibold px-3 py-1 rounded-full mb-3">
            HabitLeaf
          </span>
          <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
          <p className="text-sm text-gray-500 mt-1">
            Start your eco-friendly journey today 🌱
          </p>
        </div>

        {message && (
          <div
            className={`mb-4 text-center font-medium ${
              message.includes("🎉")
                ? "text-green-600"
                : message.includes("❌")
                ? "text-red-600"
                : "text-yellow-600"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
            />
          </div>

          {/* Password with show/hide */}
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
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

          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-2.5 rounded-lg bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold shadow-lg hover:scale-[1.01] transition"
          >
            Sign Up
          </button>
        </form>

        {/* Already have an account */}
        <div className="mt-6 text-center text-sm">
          <a href="/login" className="text-gray-800 font-medium hover:underline">
            Already have an account? Log in
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
