import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import AuthLayout from "../components/AuthLayout";
import AuthCard from "../components/auth/AuthCard";
import AuthDivider from "../components/auth/AuthDivider";
import GoogleButton from "../components/auth/GoogleButton";
import { ChevronRight } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showNeedHelp, setShowNeedHelp] = useState(false);

  const handleContinue = (e) => {
    e.preventDefault();
    // TODO: Handle login logic
    navigate("/verify-otp");
  };

  const handleGoogleLogin = () => {
    // TODO: Handle Google OAuth
    console.log("Google login");
  };

  return (
    <AuthLayout>
      <AuthCard>
        <h1 className="text-3xl font-normal mb-4">Sign in</h1>

        <form onSubmit={handleContinue}>
          <Input
            label="Email or mobile phone number"
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

          <Button type="submit" variant="primary" className="mb-4">
            Continue
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
        <div className="mt-4">
          <GoogleButton onClick={handleGoogleLogin} />
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
