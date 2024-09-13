import React from "react";

const Input = ({ label, id, type, value, onChange }) => {
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
        className="peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
      />
      <label
        htmlFor={id}
        className="absolute left-2 top-2 z-10 origin-[0] -translate-y-6 scale-75 transform bg-white px-2 text-base text-gray-500 duration-300 peer-placeholder-shown:translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75"
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
