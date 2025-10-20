import React from "react";

const Input = ({
  label,
  name,
  type = "text",
  placeholder = "",
  value,
  onChange,
  required = false,
  className = "",
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-1`}>
      {label && (
        <label htmlFor={name} className="text-lg font-medium">
          {label} {<span className="text-red-500">*</span>}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
         className={`px-4 py-3 outline-none rounded-md border ${className}`}
        {...props}
      />
    </div>
  );
};

export default Input;
