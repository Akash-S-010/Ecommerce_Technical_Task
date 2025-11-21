import React from "react";

/**
 * Reusable footer links component for terms and conditions
 * Used across different auth pages with varying text
 */
const AuthFooterLinks = ({ includeBusinessTerms = false, className = "" }) => {
  return (
    <p className={`text-sm text-gray-700 ${className}`}>
      By creating an account or logging in, you agree to Amazon's{" "}
      <a
        href="#"
        className="text-blue-600 hover:underline hover:text-orange-600"
      >
        Conditions of Use
      </a>
      {" and "}
      <a
        href="#"
        className="text-blue-600 hover:underline hover:text-orange-600"
      >
        Privacy Notice
      </a>
      {includeBusinessTerms && (
        <>
          {", and the "}
          <a
            href="#"
            className="text-blue-600 hover:underline hover:text-orange-600"
          >
            Amazon Business Terms and Conditions
          </a>
          {
            ". You agree that you are creating this business account on behalf of your organization and have authority to bind your organization"
          }
        </>
      )}
      .
    </p>
  );
};

export default AuthFooterLinks;
