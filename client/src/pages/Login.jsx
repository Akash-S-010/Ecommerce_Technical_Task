import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
            href="#"
            className="text-blue-600 hover:underline hover:text-orange-600"
          >
            Conditions of Use
          </a>{" "}
          and{" "}
          <a
            href="#"
            className="text-blue-600 hover:underline hover:text-orange-600"
          >
            Privacy Notice
          </a>
          .
        </p>

        {/* Need Help Expandable */}
        <div className="mb-4">
          <button
            type="button"
            onClick={() => setShowNeedHelp(!showNeedHelp)}
            className="flex items-center text-sm text-blue-600 hover:underline hover:text-orange-600"
          >
            <ChevronRight
              size={16}
              className={`mr-1 transition-transform ${
                showNeedHelp ? "rotate-90" : ""
              }`}
            />
            Need help?
          </button>
          {showNeedHelp && (
            <div className="mt-2 ml-5 text-sm text-blue-600">
              <a
                href="#"
                className="block hover:underline hover:text-orange-600 mb-1"
              >
                Forgot your password?
              </a>
              <a
                href="#"
                className="block hover:underline hover:text-orange-600"
              >
                Other issues with Sign-In
              </a>
            </div>
          )}
        </div>

        {/* Buying for work */}
        <div className="pt-4 border-t border-gray-300">
          <p className="text-sm font-bold mb-1">Buying for work?</p>
          <a
            href="#"
            className="text-sm text-blue-600 hover:underline hover:text-orange-600"
          >
            Shop on Amazon Business
          </a>
        </div>
      </div>

      {/* Create Account Section */}
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">New to Amazon?</span>
          </div>
        </div>

        <Button
          variant="secondary"
          className="mt-4"
          onClick={() => navigate("/signup")}
        >
          Create your Amazon account
        </Button>
      </div>

      {/* Google Login */}
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">or</span>
          </div>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="mt-4 w-full flex items-center justify-center gap-3 py-2 px-4 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span className="text-sm text-gray-700">Login with Google</span>
        </button>
      </div>
    </AuthLayout>
  );
};

export default Login;
