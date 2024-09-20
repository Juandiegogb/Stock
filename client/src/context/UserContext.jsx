import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedInfo = localStorage.getItem("user");
    return savedInfo ? JSON.parse(savedInfo) : null;
  });
  const [buttons, setButtons] = useState(() => {
    const savedInfo = localStorage.getItem("buttons");
    return savedInfo ? JSON.parse(savedInfo) : null;
  });

  const value = { user, setUser, buttons, setButtons };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem("buttons", JSON.stringify(buttons));
  }, [buttons]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export function useUserContext() {
  return useContext(UserContext);
}
