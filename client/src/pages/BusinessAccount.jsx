import React, { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import Input from "../components/Input";
import Button from "../components/Button";

const BusinessAccount = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (formData.password.length < 6) {
      newErrors.password = "Passwords must be at least 6 characters.";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // TODO: Handle business account creation
      console.log("Create business account:", formData);
    }
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
        <h1 className="text-2xl font-normal mb-2">
          Enter your full name and choose your business password
        </h1>

        <form onSubmit={handleSubmit}>
          <Input
            label="Your name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="First and last name"
            required
          />

          <Input
            label="Mobile numbers"
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Mobile number"
            required
          />

          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="At least 6 characters"
            error={errors.password}
            required
          />

          {formData.password && formData.password.length < 6 && (
            <p className="text-xs text-gray-600 -mt-3 mb-4 flex items-start">
              <span className="mr-1">ⓘ</span>
              Passwords must be at least 6 characters.
            </p>
          )}

          <Input
            label="Password again"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Re-enter password"
            error={errors.confirmPassword}
            required
          />

          <Button type="submit" variant="primary" className="mb-4">
            Next step
          </Button>
        </form>

        {/* Terms */}
        <p className="text-xs text-gray-700">
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
      </div>
    </AuthLayout>
  );
};

export default BusinessAccount;
