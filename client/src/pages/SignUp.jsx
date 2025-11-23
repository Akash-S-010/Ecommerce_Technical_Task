import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import AuthLayout from "../components/layout/AuthLayout";
import AuthCard from "../components/auth/AuthCard";
import AuthDivider from "../components/auth/AuthDivider";
import AuthFooterLinks from "../components/auth/AuthFooterLinks";
import useAuthStore from "../store/useAuthStore";
import authApi from "../api/authApi";

const SignUp = () => {
  const navigate = useNavigate();
  const { signup, setUser, isLoading, clearError } = useAuthStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();

    // Basic validation
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    const result = await signup({ name, email, password });

    if (result.success) {
      toast.success("Account created! Please check your email for OTP");
      // Navigate to OTP verification page
      navigate("/verify-otp");
    } else {
      toast.error(result.message || "Signup failed");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const result = await authApi.googleAuth(credentialResponse.credential);

      if (result.user) {
        setUser(result.user);
        toast.success(result.message || "Google signup successful!");
        navigate("/");
      }
    } catch (error) {
      console.error("Google signup error:", error);
      toast.error(error.response?.data?.message || "Google signup failed");
    }
  };

  const handleGoogleError = () => {
    toast.error("Google signup failed. Please try again.");
  };

  return (
    <AuthLayout>
      <AuthCard className="w-lg px-8 py-8 border-gray-400">
        <h1 className="text-3xl font-normal mb-4">Create Account</h1>

        <form onSubmit={handleSubmit}>
          <Input
            label="Your name"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="First and last name"
            required
            className="mb-3"
          />

          <Input
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            required
            className="mb-3"
          />

          <Input
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
            helperText="Passwords must be at least 6 characters."
            required
            className="mb-3"
          />

          <Button
            type="submit"
            variant="primary"
            className="mb-4"
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Verify email"}
          </Button>
        </form>

        {/* Buying for work */}
        <div className="pt-4 border-t border-gray-300 mt-4 mb-4">
          <p className="text-sm font-bold mb-1">Buying for work?</p>
          <a
            href="#"
            className="text-sm text-blue-600 hover:underline hover:text-orange-600"
          >
            Create a free business account
          </a>
        </div>

        {/* Already have account */}
        <div className="text-sm">
          <span className="text-gray-700">Already have an account? </span>
          <a
            href="#"
            className="text-blue-600 hover:underline hover:text-orange-600"
            onClick={(e) => {
              e.preventDefault();
              navigate("/login");
            }}
          >
            Sign in ▸
          </a>
        </div>

        {/* Terms */}
        <AuthFooterLinks className="mt-4" />
      </AuthCard>

      {/* Google Signup */}
      <div className="mt-6">
        <AuthDivider text="or" />
        <div className="mt-4 flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            text="signup_with"
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

export default SignUp;
