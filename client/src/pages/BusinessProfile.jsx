import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import AuthLayout from "../components/AuthLayout";
import AuthCard from "../components/auth/AuthCard";
import AuthFooterLinks from "../components/auth/AuthFooterLinks";
import useAuthStore from "../store/useAuthStore";

const BusinessProfile = () => {
  const navigate = useNavigate();
  const { updateProfile, isLoading, clearError } = useAuthStore();

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();

    // Validation
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const result = await updateProfile({ name, mobile });

    if (result.success) {
      toast.success("Profile updated successfully!");
      // Navigate to home or dashboard
      navigate("/");
    } else {
      toast.error(result.message || "Profile update failed");
    }
  };

  return (
    <AuthLayout>
      <AuthCard>
        <h1 className="text-2xl font-normal mb-2">Enter your full name</h1>
        <h2 className="text-2xl font-normal mb-4">
          and choose your business password
        </h2>

        <form onSubmit={handleSubmit}>
          <Input
            label="Your name"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="First and last name"
            required
          />

          <Input
            label="Mobile numbers"
            type="tel"
            name="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Mobile number"
            required
          />

          <Input
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
            required
          />

          <p className="text-xs text-gray-600 -mt-3 mb-4">
            <span className="inline-block w-3 h-3 mr-1">ⓘ</span>
            Passwords must be at least 6 characters.
          </p>

          <Input
            label="Password again"
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter password"
            required
          />

          <Button
            type="submit"
            variant="primary"
            className="mb-4"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Next step"}
          </Button>
        </form>

        <AuthFooterLinks includeBusinessTerms className="mt-5" />
      </AuthCard>
    </AuthLayout>
  );
};

export default BusinessProfile;
