import React from "react";

const AnimatedCheckmark = () => {
  return (
    <div className="w-20 h-20 mx-auto mb-6 relative">
      <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-75"></div>
      <div className="relative bg-white rounded-full p-2 shadow-sm">
        <svg
          className="w-full h-full text-green-500"
          viewBox="0 0 52 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="checkmark-circle"
            cx="26"
            cy="26"
            r="25"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            className="checkmark-check"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            d="M14.1 27.2l7.1 7.2 16.7-16.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default AnimatedCheckmark;
