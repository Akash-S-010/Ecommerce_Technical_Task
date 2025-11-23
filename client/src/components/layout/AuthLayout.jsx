import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 sm:px-6">
      <div className="mb-4 sm:mb-6">
        <img src="/logo_dark.png" alt="Amazon" className="h-14 sm:h-18" />
      </div>

      <div className="w-full max-w-md">{children}</div>

      <div className="w-full max-w-4xl border-t border-gray-200 mt-6 sm:mt-8 pt-4 sm:pt-6">
        <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-xs text-blue-600">
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
