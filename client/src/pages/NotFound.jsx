import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/"
            className="px-6 py-3 bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 rounded font-medium transition-colors"
          >
            Go to Home
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 rounded font-medium transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
