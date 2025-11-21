import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import AuthLayout from "../components/AuthLayout";
import AuthCard from "../components/auth/AuthCard";
import AuthDivider from "../components/auth/AuthDivider";
import GoogleButton from "../components/auth/GoogleButton";
import AuthFooterLinks from "../components/auth/AuthFooterLinks";

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Handle signup logic
    navigate("/verify-otp");
  };

  const handleGoogleSignup = () => {
    // TODO: Handle Google OAuth
    console.log("Google signup");
  };

  return (
    <AuthLayout>
      <AuthCard className="w-md">
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

          <Button type="submit" variant="primary" className="mb-4">
            Verify email
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
        <div className="mt-4">
          <GoogleButton onClick={handleGoogleSignup} />
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
