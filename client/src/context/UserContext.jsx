import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const value = { user, setUser };

  useEffect(() => {
    if (user === null) ;
  });

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export function useUserContext() {
  return useContext(UserContext);
}
