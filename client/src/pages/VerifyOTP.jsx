import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import AuthLayout from "../components/layout/AuthLayout";
import AuthCard from "../components/auth/AuthCard";
import AuthFooterLinks from "../components/auth/AuthFooterLinks";
import useAuthStore from "../store/useAuthStore";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const { verifyOtp, isLoading, clearError, tempEmail } = useAuthStore();

  const [otp, setOtp] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();

    if (!tempEmail) {
      toast.error("Email not found. Please sign up again.");
      navigate("/signup");
      return;
    }

    const result = await verifyOtp({ email: tempEmail, otp });

    if (result.success) {
      toast.success("Email verified successfully!");
      // Navigate to business profile page
      navigate("/business-account");
    } else {
      toast.error(result.message || "OTP verification failed");
    }
  };

  const handleResend = () => {
    // TODO: Handle resend OTP
    toast.success("OTP resent to your email");
    console.log("Resend OTP");
  };

  return (
    <AuthLayout>
      <AuthCard>
        <h1 className="text-3xl font-normal mb-4">Verify email address</h1>

        <p className="text-sm text-gray-700 mb-4">
          To verify your email, we've sent a One Time Password (OTP) to{" "}
          <span className="font-semibold">{tempEmail || "your email"}</span>{" "}
          <a
            href="#"
            className="text-blue-600 hover:underline hover:text-orange-600"
            onClick={(e) => {
              e.preventDefault();
              navigate("/signup");
            }}
          >
            (Change)
          </a>
        </p>

        <form onSubmit={handleSubmit}>
          <Input
            label="Enter OTP"
            type="text"
            name="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            className="mb-3"
            maxLength={6}
          />

          <Button
            type="submit"
            variant="primary"
            className="mb-4"
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : "Create your Amazon account"}
          </Button>
        </form>

        <div className="text-center">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleResend();
            }}
            className="text-sm text-blue-600 hover:underline hover:text-orange-600"
          >
            Resend OTP
          </a>
        </div>

        <AuthFooterLinks includeBusinessTerms className="mt-4" />
      </AuthCard>
    </AuthLayout>
  );
};

export default VerifyOTP;
