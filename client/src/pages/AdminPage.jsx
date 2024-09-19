import React from "react";
import { useUserContext } from "../context/UserContext";
import { useAuthWatcher } from "../hooks/CustomHooks";

export const AdminPage = () => {
  const { user } = useUserContext();
  useAuthWatcher();

  if (!user) {
    return <div>Loading...</div>;
  }

  return <div>Hola {user.name}</div>;
};
