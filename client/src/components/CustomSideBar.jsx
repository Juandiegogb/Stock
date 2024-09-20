import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

export const CustomSideBar = ({ buttons }) => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const location = useLocation();

  useEffect(() => {
    if (user === null) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className=" w-64 py-6 hidden md:block border-r border-gray-500">
      <div className="flex flex-col">
        {buttons.map((button, index) =>
          button.link == location.pathname ? (
            <button
              className="bg-blue-200  text-lg  text-left p-4 font-semibold"
              key={index}
              onClick={() => {
                navigate(button.link);
              }}
            >
              {button.name}
            </button>
          ) : (
            <button
              className=" text-lg text-left p-4"
              key={index}
              onClick={() => {
                navigate(button.link);
              }}
            >
              {button.name}
            </button>
          )
        )}
      </div>
    </div>
  );
};
