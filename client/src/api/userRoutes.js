import { api } from "./axios.js";

export const createUser = (body) => {
  return api.post("/createUser", body);
};

export const getUsers = () => {
  return api.get("/getUsers");
};

export const deleteUser = (id) => {
  return api.delete(`/deleteUser/${id}`);
};

export const updateUser = (id, body) => {
  return api.put(`/updateUser/${id}`, body);
};
