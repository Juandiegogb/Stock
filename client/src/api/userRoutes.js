import { api } from "./axios.js";

export const apiLogin = (body) => {
  return api.post("/login", body);
};

export const createUser = (body) => {
  return api.post("/createUser", body);
};
export const createAdmin = (body) => {
  return api.post("/createAdmin", body);
};

export const getUsers = (companyId) => {
  return api.get(`/getUsers/${companyId}`);
};

export const deleteUser = (id) => {
  return api.delete(`/deleteUser/${id}`);
};

export const updateUser = (id, body) => {
  return api.put(`/updateUser/${id}`, body);
};
