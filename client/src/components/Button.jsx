import React from "react";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  fullWidth = true,
  disabled = false,
  className = "",
}) => {
  const baseStyles =
    "py-2 px-4 rounded font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary:
      "bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 focus:ring-yellow-500 border border-[#FCD200]",
    secondary:
      "bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 focus:ring-gray-500",
    link: "bg-transparent hover:underline text-blue-600 focus:ring-blue-500",
  };

  const widthClass = fullWidth ? "w-full" : "";
  const disabledClass = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${disabledClass} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
