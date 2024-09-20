import React, { useEffect } from "react";
import { useUserContext } from "../context/UserContext";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const CustomNavbar = () => {
  const navigate = useNavigate();
  const { user, setUser, setButtons } = useUserContext();

  const logout = () => {
    setUser(null);
    setButtons(null);
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="w-screen h-14 border-b border-gray-500 justify-between items-center px-5 flex">
      <div className="flex h-full">
        <img src="data.svg" alt="" />
        <h1 className=" my-auto font-extrabold text-2xl ">Stock Tracker</h1>
      </div>
      <div>{user ? <p>Bienvenido {user.name}</p> : <p>Hola</p>}</div>
      <div>
        <button
          className="flex items-center justify-center font-extrabold text-xl"
          onClick={logout}
        >
          Logout <FaSignOutAlt className="mx-3" />
        </button>
      </div>
    </nav>
  );
};
