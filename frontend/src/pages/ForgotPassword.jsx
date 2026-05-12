import React, { useState } from "react";
import bg from "../assets/herosection.jpg";
import api from "../api/api";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      const res = await api.post("/api/auth/forgot-password", { email });
      setMessage(res.data.msg || "Reset link sent to your email!");
    } catch (error) {
      setMessage(error?.response?.data?.msg || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center relative" style={{ backgroundImage: `url(${bg})` }}>
      <div className="absolute inset-0 bg-white/70 backdrop-blur-md" />
      <div className="relative z-10 max-w-md w-full bg-white/80 rounded-2xl shadow-xl p-8">
        <div className="text-center mb-6">
          <span className="inline-block bg-green-100 text-green-600 font-semibold px-3 py-1 rounded-full mb-3">HabitLeaf</span>
          <h2 className="text-2xl font-bold text-gray-900">Forgot Password</h2>
          <p className="text-sm text-gray-500 mt-1">Enter your email to receive a reset link 🌱</p>
        </div>
        {loading && <div className="mb-4 text-center text-yellow-600 font-medium text-sm">Sending reset link...</div>}
        {message && <div className={`mb-4 text-center font-medium text-sm ${message.includes("sent") ? "text-green-600" : "text-red-600"}`}>{message}</div>}
        <form onSubmit={handleForgotPassword} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 text-gray-900" />
          </div>
          <button type="submit" disabled={loading}
            className={`w-full py-2.5 rounded-lg bg-green-600 text-white font-semibold shadow-lg transition ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-green-700"}`}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        <div className="mt-6 text-center text-sm">
          <a href="/login" className="text-gray-800 font-medium hover:underline">Back to Login</a>
        </div>
      </div>
    </div>
  );
};
export default ForgotPassword;
