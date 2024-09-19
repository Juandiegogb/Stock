import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { useEffect } from "react";

export function useAuthWatcher() {
  const { user } = useUserContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (user === null) {
      navigate("/");
    }
  }, [user, navigate]);
}
