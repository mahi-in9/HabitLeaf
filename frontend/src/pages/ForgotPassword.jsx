import React, { useState } from "react";
import bg from "../assets/herosection.jpg";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setMessage(""); 
    setLoading(true);

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch(
        `https://habitleaf.onrender.com/auth/forgot-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      console.log(result);

      if (response.ok) {
        setMessage("Reset link sent to your email!");
      } else {
        setMessage(result.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Server error. Please try again later.");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center relative"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/70 backdrop-blur-md"></div>

      <div className="relative z-10 max-w-md w-full bg-white/80 rounded-2xl shadow-xl p-8">
        <div className="text-center mb-6">
          <span className="inline-block bg-green-100 text-green-600 font-semibold px-3 py-1 rounded-full mb-3">
            HabitLeaf
          </span>
          <h2 className="text-2xl font-bold text-gray-900">Forgot Password</h2>
          <p className="text-sm text-gray-500 mt-1">
            Enter your email to receive a reset link 🌱
          </p>
        </div>

        {/* Show message */}
        {loading && (
          <div className="mb-4 text-center text-yellow-600 font-medium">
            Please wait...
          </div>
        )}
        {message && (
          <div className="mb-4 text-center font-medium text-green-600">
            {message}
          </div>
        )}

        <form onSubmit={handleForgotPassword} className="space-y-4">
          {/* Email Input */}
          <div className="relative">
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

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 rounded-lg bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold shadow-lg transition ${
              loading ? "opacity-70 cursor-not-allowed" : "hover:scale-[1.01]"
            }`}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <a
            href="/login"
            className="text-gray-800 font-medium hover:underline"
          >
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
