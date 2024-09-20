import { api } from "./axios.js";

export const createUser = (body) => {
  return api.post("/createUser", body);
};

export const getUsers = () => {
  return api.get("/getUsers");
};
