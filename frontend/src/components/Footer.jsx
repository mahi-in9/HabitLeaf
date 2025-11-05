import React from 'react';
import { NavLink } from 'react-router-dom';
import leaf from '../assets/leaf1.svg';

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="flex flex-col items-start space-y-4">
          <div className="flex items-center space-x-3">
            <img src={leaf} alt="logo" className="w-10 h-10 text-gray-900 " />
            <NavLink to="/">
              <h1 className="text-white font-bold text-xl">HabbitLeaf</h1>
              <p className="text-green-500 text-sm -mt-1">
                Sustainable Habits Tracker
              </p>
            </NavLink>
          </div>

          <p className="text-gray-400 text-sm">
            Sustainable Habits Tracker helping you build eco-friendly habits and achieve your goals daily.
          </p>
        </div>
        <div>
          <h2 className="text-white font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <NavLink to="/habits" className="hover:text-green-400 transition-colors">Habit Tracking</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard" className="hover:text-green-400 transition-colors">Progress Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/achievements" className="hover:text-green-400 transition-colors">Achievements</NavLink>
            </li>
            <li>
              <NavLink to="/community" className="hover:text-green-400 transition-colors">Community</NavLink>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-white font-semibold mb-4">Support & Legal</h2>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <NavLink to="/help" className="hover:text-green-400 transition-colors">Help Center</NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="hover:text-green-400 transition-colors">Contact Us</NavLink>
            </li>
            <li>
              <NavLink to="/privacy" className="hover:text-green-400 transition-colors">Privacy Policy</NavLink>
            </li>
            <li>
              <NavLink to="/terms" className="hover:text-green-400 transition-colors">Terms of Service</NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-10 pt-4 text-center text-gray-500 text-xs">
        © 2025 HabitLeaf. All rights reserved Developed by Ankit Kumar.
      </div>
    </footer>
  );
};

export default Footer;
