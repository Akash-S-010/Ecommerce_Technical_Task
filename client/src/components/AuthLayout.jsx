import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Logo */}
      <div className="pt-6 pb-4 text-center">
        <a href="/" className="inline-block">
          <div className="flex items-center justify-center gap-1">
            <span className="text-3xl font-bold text-gray-900">amazon</span>
            <span className="text-xl text-gray-900">.in</span>
          </div>
        </a>
      </div>

      {/* Main Content */}
      <div className="grow flex items-start justify-center px-4 py-8">
        <div className="w-full max-w-md">{children}</div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-300 mt-auto">
        <div className="py-6 px-4">
          <div className="flex justify-center gap-6 text-xs text-blue-600 mb-2">
            <a href="#" className="hover:underline hover:text-orange-600">
              Conditions of Use
            </a>
            <a href="#" className="hover:underline hover:text-orange-600">
              Privacy Notice
            </a>
            <a href="#" className="hover:underline hover:text-orange-600">
              Help
            </a>
          </div>
          <div className="text-center text-xs text-gray-600">
            © 1996-2024, Amazon.com, Inc. or its affiliates
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AuthLayout;
