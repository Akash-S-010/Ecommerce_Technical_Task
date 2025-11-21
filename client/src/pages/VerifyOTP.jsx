import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import AuthLayout from "../components/AuthLayout";
import AuthCard from "../components/auth/AuthCard";
import AuthFooterLinks from "../components/auth/AuthFooterLinks";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Handle OTP verification
    navigate("/business-account");
  };

  const handleResend = () => {
    // TODO: Handle resend OTP
    console.log("Resend OTP");
  };

  return (
    <AuthLayout>
      <AuthCard>
        <h1 className="text-3xl font-normal mb-4">Verify email address</h1>

        <p className="text-sm text-gray-700 mb-4">
          To verify your email, we've sent a One Time Password (OTP) to{" "}
          <span className="font-semibold">jagdishmandhalkar1308@gmail.com</span>{" "}
          <a
            href="#"
            className="text-blue-600 hover:underline hover:text-orange-600"
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
          />

          <Button type="submit" variant="primary" className="mb-4">
            Create your Amazon account
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
