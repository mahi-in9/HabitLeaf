import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center mt-5 bg-green-50 px-4">
      <div className="relative bg-white rounded-3xl shadow-2xl p-10 md:p-16 text-center max-w-xl w-full overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-r from-green-400 to-green-600 rounded-full opacity-30"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-gradient-to-r from-green-300 to-green-500 rounded-full opacity-30"></div>
        <div className="mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto w-32 h-32 text-green-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4l3 3m6 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 className="text-6xl md:text-7xl font-extrabold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-4">Oops! Page Not Found</h2>
        <p className="text-gray-500 mb-8">
          The page you’re looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center space-x-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl shadow-lg transition-all transform hover:-translate-y-1 hover:scale-105"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Go Back Home</span>
        </button>
      </div>
      <p className="mt-8 text-sm text-gray-400">
        © {new Date().getFullYear()} HabitLeaf. All rights reserved.
      </p>
    </div>
  );
}
