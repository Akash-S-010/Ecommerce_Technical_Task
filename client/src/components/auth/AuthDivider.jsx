import React from "react";

/**
 * Reusable divider component with centered text
 * Used to separate sections like "or" between login methods
 */
const AuthDivider = ({ text }) => {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-300"></div>
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="px-4 bg-white text-gray-500">{text}</span>
      </div>
    </div>
  );
};

export default AuthDivider;
