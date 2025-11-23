import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import AuthLayout from "../components/layout/AuthLayout";
import AuthCard from "../components/auth/AuthCard";
import AuthDivider from "../components/auth/AuthDivider";
import useAuthStore from "../store/useAuthStore";
import { ChevronRight } from "lucide-react";
import authApi from "../api/authApi";

const Login = () => {
  const navigate = useNavigate();
  const { login, setUser, isLoading, clearError } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showNeedHelp, setShowNeedHelp] = useState(false);

  const handleContinue = async (e) => {
    e.preventDefault();
    clearError();

    const result = await login({ email, password });

    if (result.success) {
      toast.success("Login successful!");
      // Navigate to home page after successful login
      navigate("/");
    } else {
      toast.error(result.message || "Login failed");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const result = await authApi.googleAuth(credentialResponse.credential);

      if (result.user) {
        setUser(result.user);
        toast.success(result.message || "Google login successful!");
        navigate("/");
      }
    } catch (error) {
      console.error("Google login error:", error);
      toast.error(error.response?.data?.message || "Google login failed");
    }
  };

  const handleGoogleError = () => {
    toast.error("Google login failed. Please try again.");
  };

  return (
    <AuthLayout>
      <AuthCard>
        <h1 className="text-3xl font-normal mb-4">Sign in</h1>

        <form onSubmit={handleContinue}>
          <Input
            label="Email"
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button
            type="submit"
            variant="primary"
            className="mb-4"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Continue"}
          </Button>
        </form>

        <p className="text-xs text-gray-700 mb-4">
          By continuing, you agree to Amazon's{" "}
          <a
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
      </AuthCard>

      {/* Create Account Section */}
      <div className="mt-6">
        <AuthDivider text="New to Amazon?" />

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
        <AuthDivider text="or" />
        <div className="mt-4 flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            text="continue_with"
            shape="rectangular"
            theme="outline"
            size="large"
            width="350"
          />
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
