import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../assets/herosection.jpg";
import showEyes from "../assets/eye-show.svg";
import hideEyes from "../assets/eye-hide.svg";
import { useDispatch } from "react-redux";
import { registerUser } from "../app/slices/userSlice";

const Signup = () => {
  const [userData, setUserData] = useState({
    title: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { value, name } = e.target;

    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await dispatch(registerUser(userData)).unwrap();

      setUserData({
        title: "",
        email: "",
        password: "",
      });
      setMessage(res.message || "Signing up");
      setTimeout(() => {
        navigate("/");
      }, 300);
    } catch (error) {
      console.log(error);
      setMessage(error?.message || "Signup failed");
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

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              name="title"
              value={userData.title}
              onChange={handleChange}
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
              value={userData.email}
              onChange={handleChange}
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
              value={userData.password}
              onChange={handleChange}
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
            className="w-full py-2.5 rounded-lg bg-gradient-to-r from-green-600 to-green-500 text-white active:bg-cyan-700 font-semibold shadow-lg hover:scale-[1.01] transition "
          >
            Sign Up
          </button>
        </form>

        {/* Already have an account */}
        <div className="mt-6 text-center text-sm">
          <a
            href="/login"
            className="text-gray-800 font-medium hover:underline"
          >
            Already have an account? Log in
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
