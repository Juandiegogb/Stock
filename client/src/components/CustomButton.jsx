import React from "react";

const colorClasses = {
  green: "bg-green-600 hover:bg-green-700",
  blue: "bg-blue-600 hover:bg-blue-700",
  red: "bg-red-600 hover:bg-red-700",
};

export const CustomButton = ({
  type = "submit",
  color = "green",
  text,
  onFunction,
}) => {
  return (
    <div>
      <button
        type={type}
        className={`rounded-md my-2 text-white font-extrabold p-3 ${colorClasses[color]}`}
        onClick={onFunction}
      >
        {text}
      </button>
    </div>
  );
};
