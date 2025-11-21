import React from "react";

const Input = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = false,
  helperText,
  error,
}) => {
  return (
    <div className="mb-3">
      {label && (
        <label
          htmlFor={name}
          className="block text-[13px] font-bold mb-[2px] text-gray-900"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full px-2 py-[6px] text-[13px] border ${
          error
            ? "border-red-500 shadow-[0_0_3px_2px_rgba(220,53,69,0.4)]"
            : "border-gray-300"
        } rounded-[3px] focus:outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)]`}
      />
      {helperText && <p className="mt-1 text-xs text-gray-600">{helperText}</p>}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
};

export default Input;
