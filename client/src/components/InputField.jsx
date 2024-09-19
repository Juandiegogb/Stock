import React from "react";

export const InputField = ({ type, label, register, required = false }) => {
  const id = String(label).trim().toLowerCase();
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="font-bold">
        {label}
      </label>
      <input
        type={type}
        id={id}
        className="p-3 rounded-md my-2 border-2 border-gray-400"
        {...register(id, { required: required })}
      />
    </div>
  );
};
