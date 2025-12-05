import React, { useState } from "react";

const Input = ({
  label,
  name,
  type = "text",
  placeholder = "",
  value,
  onChange,
  required = false,
  className = "",
  enablePasswordToggle = false,
  ...props
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPasswordField = type === "password" && enablePasswordToggle;
  const resolvedType = isPasswordField && isPasswordVisible ? "text" : type;

  return (
    <div className={`flex flex-col gap-1`}>
      {label && (
        <label htmlFor={name} className="text-lg font-medium">
          {label} {<span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          id={name}
          name={name}
          type={resolvedType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={`px-4 py-3 outline-none rounded-md border ${
            isPasswordField ? "pr-12" : ""
          } ${className}`}
          {...props}
        />
        {isPasswordField && (
          <button
            type="button"
            aria-label={isPasswordVisible ? "Hide password" : "Show password"}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            onClick={() => setIsPasswordVisible((prev) => !prev)}
          >
            {isPasswordVisible ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 14.91 6.244 18.75 12 18.75c.993 0 1.937-.126 2.822-.36M6.228 6.228A10.45 10.45 0 0112 5.25c5.756 0 8.773 3.84 10.066 6.75a10.523 10.523 0 01-4.293 4.557M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a2.625 2.625 0 10-3.713-3.713m3.713 3.713L9.88 9.88"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
