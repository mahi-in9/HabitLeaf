import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { createHabit } from "../app/slices/habbitSlice";

const ModalForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "General",
    frequency: "daily",
    daysOfWeek: [],
    reminderTime: "",
    startDate: "",
    endDate: "",
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { value, name } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      return alert("Title is required");
    }

    try {
      await dispatch(createHabit(formData)).unwrap();
      alert("Habit created");
    } catch (error) {
      console.log(error);
      alert("Failed to create habit");
    }
  };

  const handleDayToggle = (day) => {
    setFormData((prev) => {
      const exists = prev.daysOfWeek.includes(day);

      return {
        ...prev,
        daysOfWeek: exists
          ? prev.daysOfWeek.filter((d) => d !== day)
          : [...prev.daysOfWeek, day],
      };
    });
  };

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <>
      <button
        onClick={() => setShowForm(!showForm)}
        className="mt-14 sm:mt-0 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg active:bg-green-900 active:scale-y-105 shadow-lg hover:bg-green-700 transition-all duration-300"
      >
        + Add Habit
      </button>

      {showForm && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-black/50  p-6 rounded-2xl w-96 relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-2 right-2 text-gray-400"
            >
              ✕
            </button>

            <h2 className="text-white text-2xl font-semibold  mb-4">
              Add New Habit
            </h2>

            <form
              onSubmit={handleSubmit}
              className="bg-white/10 backdrop-blur-md p-6 rounded-xl space-y-4"
            >
              {/* Title */}
              <input
                type="text"
                name="title"
                placeholder="Habit Title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-800 text-white"
              />

              {/* Description */}
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-800 text-white"
              />

              {/* Category */}
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-800 text-white"
              >
                <option value="General">General</option>
                <option value="Water Conservation">Water Conservation</option>
                <option value={"Energy Saving"}>Energy Saving</option>
                <option value={"Waste Reduction"}>Waste Reduction</option>
                <option value={"Sustainable Living"}>Sustainable Living</option>
              </select>

              {/* Frequency */}
              <select
                name="frequency"
                value={formData.frequency}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-800 text-white"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="custom">Custom</option>
              </select>

              {/* Days of Week (only for weekly/custom) */}
              {(formData.frequency === "weekly" ||
                formData.frequency === "custom") && (
                <div className="flex gap-2 flex-wrap">
                  {days.map((day, index) => (
                    <button
                      type="button"
                      key={index}
                      onClick={() => handleDayToggle(index)}
                      className={`px-3 py-1 rounded ${
                        formData.daysOfWeek.includes(index)
                          ? "bg-green-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              )}

              {/* Reminder Time */}
              <input
                type="time"
                name="reminderTime"
                value={formData.reminderTime}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-800 text-white"
              />

              {/* Start Date */}
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-800 text-white"
              />

              {/* End Date */}
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-800 text-white"
              />

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 p-2 rounded"
              >
                Create Habit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
export default ModalForm;
