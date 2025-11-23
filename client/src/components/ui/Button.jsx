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
    "py-2 sm:py-[7px] px-4 text-sm sm:text-[13px] rounded-[3px] font-normal transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer min-h-[44px] sm:min-h-0 flex items-center justify-center";

  const variants = {
    primary:
      "bg-amazon-orange hover:bg-[#F7CA00] font-semibold text-gray-900 focus:ring-yellow-500 border border-[#FCD200] shadow-sm",
    secondary:
      "bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 focus:ring-gray-500 shadow-sm",
    link: "bg-transparent hover:underline text-blue-600 focus:ring-blue-500 border-none shadow-none",
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
