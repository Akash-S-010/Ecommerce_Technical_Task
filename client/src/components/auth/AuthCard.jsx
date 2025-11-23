import React from "react";

/**
 * Reusable card component for authentication pages
 * Provides consistent border, padding, and styling
 */
const AuthCard = ({ children, className = "" }) => {
  return (
    <div
      className={`border w-full max-w-md border-gray-300 rounded-lg p-4 sm:p-6 ${className}`}
    >
      {children}
    </div>
  );
};

export default AuthCard;
