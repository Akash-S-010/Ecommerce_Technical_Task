import React, { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import Input from "../components/Input";
import Button from "../components/Button";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [email] = useState("youemail@gmail.com"); // This would come from previous step

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Handle OTP verification
    console.log("Verify OTP:", otp);
  };

  const handleResendOTP = () => {
    // TODO: Resend OTP logic
    console.log("Resend OTP");
  };

  return (
    <AuthLayout>
      {/* Progress Indicator */}
      <div className="mb-6 bg-[#131921] text-white py-3 px-6 -mx-4 -mt-8 rounded-t-lg">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-white text-[#131921] flex items-center justify-center font-bold text-sm">
              1
            </div>
            <span className="ml-2 text-sm font-medium">ACCOUNT CREATION</span>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-600 text-white flex items-center justify-center font-bold text-sm">
              2
            </div>
            <span className="ml-2 text-sm font-medium">BUSINESS DETAILS</span>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-600 text-white flex items-center justify-center font-bold text-sm">
              3
            </div>
            <span className="ml-2 text-sm font-medium">FINISH</span>
          </div>
        </div>
      </div>

      <div className="border border-gray-300 rounded-lg p-6 mt-8">
        <h1 className="text-3xl font-normal mb-4">Verify email address</h1>

        <p className="text-sm text-gray-700 mb-4">
          To verify your email , we've sent a One Time Password (OTP) to{" "}
          <span className="font-semibold">{email}</span>{" "}
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
            placeholder="Enter OTP"
            required
          />

          <Button type="submit" variant="primary" className="mb-4">
            Create your Amazon account
          </Button>
        </form>

        {/* Terms */}
        <p className="text-xs text-gray-700 mb-4">
          By creating an account or logging in , you agree to Amazon's{" "}
          <a
            href="#"
            className="text-blue-600 hover:underline hover:text-orange-600"
          >
            Conditions of Use
          </a>
          ,{" "}
          <a
            href="#"
            className="text-blue-600 hover:underline hover:text-orange-600"
          >
            Privacy Notice
          </a>
          , and the{" "}
          <a
            href="#"
            className="text-blue-600 hover:underline hover:text-orange-600"
          >
            Amazon Business Terms and Conditions
          </a>
          . You agree that you are creating this business account on behalf of
          your organization and have authority to bind your organization.
        </p>

        {/* Resend OTP */}
        <div className="text-center">
          <button
            type="button"
            onClick={handleResendOTP}
            className="text-sm text-blue-600 hover:underline hover:text-orange-600"
          >
            Resend OTP
          </button>
        </div>
      </div>
    </AuthLayout>
  );
};

export default VerifyOTP;
