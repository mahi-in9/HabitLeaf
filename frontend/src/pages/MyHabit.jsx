import React, { useEffect, useState } from "react";
import { CheckCircle, Trash2, Edit3, Flame, Calendar, X } from "lucide-react";
import leaf from "../assets/leaf.svg";
import share from "../assets/share1.svg";
import { useSelector, useDispatch } from "react-redux";
import {
  clearHabitError,
  deleteHabit,
  getHabitById,
  getHabits,
  markHabitComplete,
} from "../app/slices/habbitSlice";
import ModalForm from "../components/ModalForm";
import { HabitLoader } from "../components/Loader";

const MyHabit = () => {
  const { habits, loading, error } = useSelector((state) => state.habit);
  const { user } = useSelector((state) => state.user);
  const { data, dataLoading } = useSelector((state) => state.data);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHabits());
  }, [dispatch]);

  const toggleComplete = (e) => {
    dispatch(markHabitComplete(e));
  };

  if (loading) return <HabitLoader />;

  if (error) return <p>{error}</p>;
  console.log(data);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-50 to-emerald-100 p-6">
      <div className="  mt-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10">
          <div className="text-center sm:text-left">
            <div className="flex items-center gap-3">
              <img src={leaf} alt="logo" className="w-12 h-13" />
              <div className="rounded shadow-2xs mt-3">
                <h1 className="text-2xl font-semibold mb-1">My Eco Habits</h1>
                <p className="text-gray-600 mt-1">
                  Track your daily sustainable actions
                </p>
              </div>
            </div>
          </div>
          <ModalForm />
        </div>

        {/* Add Habit */}

        {/* Progress Section */}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <p className="text-3xl font-bold text-green-600">
              {dataLoading && <img src="loader.svg" alt="loader" />}
              {data?.totalToday}
            </p>
            <p className="text-gray-500 mt-1">Today's Progress</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center flex flex-col items-center">
            <Flame className="text-orange-500 mb-2 w-6 h-6" />
            <p className="text-gray-500">
              {dataLoading && <img src="loader.svg" alt="loader" />}
              {data?.bestStreak} Best Streak
            </p>
            <p className="font-semibold"> days in a row</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center flex flex-col items-center">
            <Calendar className="text-blue-500 mb-2 w-6 h-6" />
            <p className="text-gray-500">This Week</p>
            <p className="font-semibold">
              {dataLoading && <img src="loader.svg" alt="loader" />}2
              {data?.weeklyCompleted} habits completed
            </p>
          </div>
        </div>

        {/* Habit List */}
        <div className="flex flex-row gap-4 flex-wrap">
          {habits &&
            habits.map((habit) => {
              const isSameDay = (d1, d2) =>
                new Date(d1).toDateString() === new Date(d2).toDateString();

              const isScheduledToday = () => {
                const today = new Date().getDay();
                if (habit.frequency === "daily") return true;
                return habit.daysOfWeek?.includes(today);
              };

              const alreadyCompleted = habit.completions?.some((c) =>
                isSameDay(c.date, new Date()),
              );

              return (
                <div
                  key={habit._id}
                  className=" bg-linear-to-br from-green-100 to-white rounded py-3 px-4 shadow-2xs hover:shadow-2xl hover:scale-105 duration-300"
                >
                  {isScheduledToday() ? (
                    <button
                      onClick={() => toggleComplete(habit._id)}
                      disabled={alreadyCompleted}
                      className={`mt-3 px-4 py-2 rounded-lg text-end text-sm font-medium ${
                        alreadyCompleted
                          ? "bg-green-600 text-white cursor-not-allowed"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                    >
                      {alreadyCompleted
                        ? "Completed Today ✅"
                        : "Mark Today Complete"}
                    </button>
                  ) : (
                    <p className="text-xs text-gray-500 mt-2">
                      Not scheduled today - on {habit.startDate.split("T")[0]}
                    </p>
                  )}
                  <div className="p-5">
                    <h2 className="font-semibold text-2xl my-2 text-green-600">
                      {habit.title}
                    </h2>
                    <p className="bg-green-300 rounded-2xl px-2 text-xs w-fit text-green-600">
                      {habit.category}
                    </p>
                    <p className="m-2 text-s opacity-75 flex">
                      🔥 {habit.streak} day streak
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Modal */}

      {/* Keep it up Section */}
      <div className="mt-8 rounded-2xl shadow-md p-8 bg-linear-to-r from-green-500 to-green-800 flex flex-col md:flex-row items-center justify-between text-white">
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl font-bold mb-1">Keep it up! 🌱</h2>
          <p className="text-green-100">
            You're doing great with your eco habits. Every small action makes a
            big difference!
          </p>
        </div>
        <button className="px-5 py-2 bg-white text-green-700 font-semibold rounded-lg shadow hover:bg-gray-100 flex items-center space-x-2">
          {/* <img src={share} alt="" className="w-7 h-7" /> */}
          <span>Share Progress</span>
        </button>
      </div>
    </div>
  );
};

export default MyHabit;
