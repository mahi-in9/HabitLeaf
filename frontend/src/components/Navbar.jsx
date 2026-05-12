import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Sparkles } from "lucide-react";
import leaf from "../assets/leaf.svg";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../app/slices/userSlice";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navLinks = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/myhabit", label: "My Habits" },
    { path: "/ai-advisor", label: "AI Advisor", isNew: true },
    { path: "/achievements", label: "Achievements" },
    { path: "/community", label: "Community" },
  ];

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
    setIsOpen(false);
    navigate("/login");
  };

  return (
    <nav className="py-3 px-6 bg-white shadow-sm fixed top-0 left-0 w-full z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <img src={leaf} alt="logo" className="w-9 h-9" />
          <Link to="/" className="hover:opacity-90 transition-opacity">
            <h1 className="text-gray-900 font-bold text-lg leading-tight">HabitLeaf</h1>
            <p className="text-green-500 text-xs -mt-0.5">Sustainable Habits Tracker</p>
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-sm flex items-center gap-1 transition-colors ${
                  isActive ? "text-green-600 font-semibold" : "text-gray-600 hover:text-green-600"
                }`
              }
            >
              {link.isNew && <Sparkles className="w-3.5 h-3.5 text-green-500" />}
              {link.label}
              {link.isNew && (
                <span className="ml-1 text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-medium">
                  AI
                </span>
              )}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:flex items-center space-x-3">
          {!user ? (
            <Link to="/login">
              <button className="bg-green-600 text-white px-5 py-2 text-sm rounded-full hover:bg-green-700 transition-colors">
                Sign In
              </button>
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-50 text-red-600 border border-red-200 px-5 py-2 text-sm rounded-full hover:bg-red-100 transition-colors"
            >
              Logout
            </button>
          )}
        </div>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 mt-3 py-4 px-4 space-y-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 py-2 px-3 rounded-lg text-sm ${
                  isActive ? "bg-green-50 text-green-600 font-semibold" : "text-gray-600 hover:bg-gray-50"
                }`
              }
            >
              {link.isNew && <Sparkles className="w-3.5 h-3.5 text-green-500" />}
              {link.label}
              {link.isNew && (
                <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-medium">AI</span>
              )}
            </NavLink>
          ))}
          <div className="border-t border-gray-100 pt-3 mt-2">
            {!user ? (
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <button className="w-full bg-green-600 text-white py-2.5 rounded-full text-sm font-medium hover:bg-green-700 transition-colors">
                  Sign In
                </button>
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="w-full bg-red-50 text-red-600 border border-red-200 py-2.5 rounded-full text-sm font-medium hover:bg-red-100 transition-colors"
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
