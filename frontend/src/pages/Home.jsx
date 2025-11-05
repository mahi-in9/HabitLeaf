import React from 'react';
import HeroSection from '../components/HeroSection';
import { useNavigate } from 'react-router-dom';
import { CheckSquare, Calendar, Trophy } from "lucide-react";

const Home = () => {
  const navigate = useNavigate(); 

  const features = [
    {
      icon: <CheckSquare className="w-8 h-8 text-green-600" />,
      title: "Track Daily Habits",
      description:
        "Choose from eco-friendly habits or create custom ones. Check them off daily and build momentum.",
    },
    {
      icon: <Calendar className="w-8 h-8 text-green-600" />,
      title: "Build Streaks",
      description:
        "Visual calendar shows your progress like GitHub contributions. Don't break the chain!",
    },
    {
      icon: <Trophy className="w-8 h-8 text-green-600" />,
      title: "Earn Achievements",
      description:
        "Unlock badges for milestones and share your eco-achievements with friends on social media.",
    },
  ];

  return (
    <div className="pt-20">
      <HeroSection />

      {/* Intro Section */}
      <div className="p-6 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">How HabitLeaf Works</h2>
        <p className="text-gray-600 text-lg">
          A gamified approach to building sustainable habits that stick.
        </p>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-16 py-12 text-center">
        {features.map((feature, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div className="p-4 bg-green-100 rounded-2xl flex items-center justify-center mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-green-700 py-12 text-center">
        <h1 className="text-5xl font-bold text-white">Join the HabbitLeaf Community</h1>
        <p className="text-gray-200 text-xl mt-4">
          Connect with like-minded individuals, share your progress, and inspire each other to live more sustainably.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-8 mt-10 px-4 md:px-0">
          {/* Card 1 */}
          <div className="bg-green-600 bg-opacity-90 rounded-xl shadow-xl p-8 w-full md:w-1/4 transform transition duration-300 hover:scale-105 active:scale-95 cursor-pointer">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-5 border border-white/20 flex items-center justify-center mb-4 mx-auto w-16 h-16">
              <i className="ri-user-smile-line text-white text-2xl"></i>
            </div>
            <h2 className="text-white font-semibold text-2xl">Sarah M.</h2>
            <div className="text-gray-100 mt-1">Zero Waste Champion</div>
            <div className="text-yellow-300 font-bold mt-3">🔥 45 days</div>
          </div>

          {/* Card 2 */}
          <div className="bg-green-600 bg-opacity-90 rounded-xl shadow-xl p-8 w-full md:w-1/4 transform transition duration-300 hover:scale-105 active:scale-95 cursor-pointer">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-5 border border-white/20 flex items-center justify-center mb-4 mx-auto w-16 h-16">
              <i className="ri-user-star-line text-white text-2xl"></i>
            </div>
            <h2 className="text-white font-semibold text-2xl">Mike R.</h2>
            <div className="text-gray-100 mt-1">Green Transport Hero</div>
            <div className="text-yellow-300 font-bold mt-3">🔥 23 days</div>
          </div>

          {/* Card 3 */}
          <div className="bg-green-600 bg-opacity-90 rounded-xl shadow-xl p-8 w-full md:w-1/4 transform transition duration-300 hover:scale-105 active:scale-95 cursor-pointer">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-5 border border-white/20 flex items-center justify-center mb-4 mx-auto w-16 h-16">
              <i className="ri-user-heart-line text-white text-2xl"></i>
            </div>
            <h2 className="text-white font-semibold text-2xl">Emma L.</h2>
            <div className="text-gray-100 mt-1">Water Conservation Expert</div>
            <div className="text-yellow-300 font-bold mt-3">🔥 67 days</div>
          </div>
        </div>


        <button
          onClick={() => navigate('/community')}
          className="mt-10 px-8 py-3 bg-white text-green-700 text-lg font-semibold rounded-full shadow transform transition duration-300 hover:scale-105 active:scale-95 cursor-pointer hover:bg-green-50"
        >
          Join Community →
        </button>

      </div>
    </div>
  );
};

export default Home;
