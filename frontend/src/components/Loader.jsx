export const HabitLoader = () => (
  <div className="p-6 grid grid-cols-3 md:grid-cols-3 gap-6 animate-pulse">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="bg-white p-5 rounded-2xl shadow">
        <div className="h-5 w-24 bg-gray-300 mb-2 rounded"></div>
        <div className="h-4 w-full bg-gray-200 mb-2 rounded"></div>
        <div className="h-4 w-16 bg-gray-200 rounded"></div>
      </div>
    ))}
  </div>
);

const PageLoader = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Logo / Identity */}
      <div className="flex items-center gap-2 mb-6">
        <div className="w-10 h-10 bg-green-500 rounded-full animate-bounce"></div>
        <h1 className="text-xl font-semibold text-green-700">HabitLeaf</h1>
      </div>

      {/* Loader */}
      <div className="w-40 h-2 bg-green-200 rounded-full overflow-hidden">
        <div className="h-full bg-green-600 animate-[loading_1.2s_infinite] w-1/2"></div>
      </div>

      <p className="mt-4 text-green-700 text-sm">Growing your habits...</p>
    </div>
  );
};

export default PageLoader;
