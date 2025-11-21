import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="mb-4">
        <img src="/logo_dark.png" alt="Amazon" className="h-18" />
      </div>

      <div >{children}</div>

      <div className="w-full border-t border-gray-200 mt-8 pt-6">
        <div className="flex justify-center space-x-8 text-xs text-blue-600">
          <a href="#" className="hover:underline hover:text-orange-700">
            Conditions of Use
          </a>
          <a href="#" className="hover:underline hover:text-orange-700">
            Privacy Notice
          </a>
          <a href="#" className="hover:underline hover:text-orange-700">
            Help
          </a>
        </div>
        <div className="text-center text-xs text-gray-600 mt-2">
          © 1996-2024, Amazon.com, Inc. or its affiliates
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
