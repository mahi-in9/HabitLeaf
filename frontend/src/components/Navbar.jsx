import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import leaf from "../assets/leaf.svg";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/myhabit", label: "My Habits" },
    { path: "/community", label: "Community" },
    { path: "/achievements", label: "Achievements" },
  ];

  return (
    <nav className="py-4 px-6 bg-white shadow-sm fixed top-0 left-0 w-full z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center space-x-3">
          <img src={leaf} alt="logo" className="w-10 h-10 text-gray-900 " />
          <NavLink to="/">
            <h1 className="text-gray-900 font-bold text-xl">HabbitLeaf</h1>
            <p className="text-green-500 text-sm -mt-1">
              Sustainable Habits Tracker
            </p>
          </NavLink>
        </div>
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `hover:text-green-600 ${
                  isActive ? "text-green-600 font-semibold" : "text-gray-600"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <button className="bg-green-100 text-green-700 px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-green-200 transition">
            <span>🔥</span>
            <span>7 day streak</span>
          </button>

          {!isAuthenticated ? (
            <NavLink to="/login">
              <button className="bg-green-600 text-white px-6 transform transition duration-300 hover:scale-105 active:scale-95 cursor-pointer  py-2 rounded-full hover:bg-green-700 transition">
                Sign In
              </button>
            </NavLink>
          ) : (
            <button
              onClick={() => setIsAuthenticated(false)}
              className="bg-red-600 text-white px-6 py-2  transform transition duration-300 hover:scale-105 active:scale-95 cursor-pointer rounded-full hover:bg-red-700 transition"
            >
              Logout
            </button>
          )}
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg mt-4 rounded-lg p-4 space-y-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block hover:text-green-600 ${
                  isActive ? "text-green-600 font-semibold" : "text-gray-600"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          <div className="border-t pt-4 flex flex-col space-y-3">
            <button className="bg-green-100 text-green-700 px-4 py-2 rounded-full flex items-center justify-center space-x-2 hover:bg-green-200 transition">
              <span>🔥</span>
              <span>7 day streak</span>
            </button>

            {!isAuthenticated ? (
              <NavLink to="/login" onClick={() => setIsOpen(false)}>
                <button className="w-full bg-green-600 transform transition duration-300 hover:scale-105 active:scale-95 cursor-pointer  text-white px-6 py-2 rounded-full hover:bg-green-700 transition">
                  Sign In
                </button>
              </NavLink>
            ) : (
              <button
                onClick={() => {
                  setIsAuthenticated(false);
                  setIsOpen(false);
                }}
                className="w-full bg-red-600 text-white transform transition duration-300 hover:scale-105 active:scale-95 cursor-pointer px-6 py-2 rounded-full hover:bg-red-700 transition"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
