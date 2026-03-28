import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../assets/herosection.jpg";
import showEyes from "../assets/eye-show.svg";
import hideEyes from "../assets/eye-hide.svg";
import { useDispatch } from "react-redux";
import { loginUser } from "../app/slices/userSlice";
import { Link } from "react-router-dom";

export default function Login() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await dispatch(loginUser(userData)).unwrap();

      setUserData({
        email: "",
        password: "",
      });

      setMessage(res.message || "Login in");
      setTimeout(() => {
        navigate("/");
      }, 300);
    } catch (error) {
      console.log(error);
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
          <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-sm text-gray-500 mt-1">
            Get motivated — small green steps every day 🌱
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

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
            />
          </div>

          {/* Password field with toggle icon */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              value={userData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 pr-10 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900"
            />
            <img
              src={showPassword ? showEyes : hideEyes}
              alt="toggle password"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 mt-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-2.5 rounded-lg bg-linear-to-r from-green-600 to-green-500 text-white font-semibold shadow-lg hover:scale-[1.01] transition"
          >
            Log in
          </button>
        </form>

        {/* Extra links */}
        <div className="mt-6 text-center text-sm">
          <Link
            to="/signup"
            className="text-gray-800 font-medium hover:underline"
          >
            Don't have an account? Sign up
          </Link>
          <div className="flex justify-center gap-4 mt-3">
            <Link
              to="/forgot-password"
              className="text-gray-500 hover:text-green-600"
            >
              Forgot password
            </Link>
            <a href="/help" className="text-gray-500 hover:text-green-600">
              Need help?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
