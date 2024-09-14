import React from "react";

const Input = ({ label, id, type, value, onChange, autoFocus }) => {
  return (
    <div className="relative w-full">
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        required
        placeholder=" "
        autoFocus={autoFocus}
        autoComplete=""
        className="peer block w-full appearance-none rounded-md border-2 border-gray-300 bg-transparent px-3 pb-2 pt-2.5 text-sm text-gray-900 focus:border-blue-400 focus:bg-blue-50 focus:bg-opacity-30 focus:outline-none focus:ring-0"
      />
      <label
        htmlFor={id}
        className="absolute -top-1 left-3 origin-left -translate-y-3 transform bg-gray-100 text-gray-500 duration-300 peer-placeholder-shown:translate-y-1/2 peer-placeholder-shown:scale-110 peer-focus:-translate-y-3 peer-focus:scale-100"
      >
        {label}
      </label>
      <span
        className={`absolute translate-x-full transform px-1 text-sm text-red-500 transition-all duration-300`}
      ></span>
    </div>
  );
};

export default Input;
