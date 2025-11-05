import React from "react";
import { useNavigate } from "react-router-dom";
import forest from "../assets/herosection.jpg";
import TodaysProgress from "./TodaysProgress";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-[600px] rounded-lg shadow-md overflow-hidden">
     
      <img
        src={forest}
        alt="forest"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40"></div>

      
      <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-between px-10 md:px-20">
      
        <div className="text-white max-w-xl text-center md:text-left">
          <span className="inline-block bg-green-600/90  transform transition duration-300 hover:scale-105 active:scale-95 cursor-pointer px-3 py-1 rounded-full text-sm font-medium mb-4">
            Make Sustainability a Daily Habit
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-snug">
            Build <span className="text-green-400">Eco-Friendly</span> Habits That Stick
          </h1>
          <p className="text-lg md:text-xl mb-6 text-gray-200">
            Turn your environmental goals into daily actions. Track habits,
            build streaks, and join a community making a real difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate("/login")}
              className="bg-green-600 hover:bg-green-700 transform transition duration-300 hover:scale-105 active:scale-95 cursor-pointer  text-white font-semibold py-3 px-6 rounded-full shadow-lg transition duration-300"
            >
              Start Your Eco Journey →
            </button>
            <button className="border border-white/70 text-white  transform transition duration-300 hover:scale-105 active:scale-95 cursor-pointer font-semibold py-3 px-6 rounded-full hover:bg-white hover:text-green-700 transition duration-300">
              Watch Demo
            </button>
          </div>
        </div>
        <div className="mt-10 md:mt-0 w-full max-w-sm">
          <TodaysProgress />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
