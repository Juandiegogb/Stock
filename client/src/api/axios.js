import axios from "axios";
let apiUrl;

if (import.meta.env.VITE_ENVIRONMENT !== "production") {
  apiUrl = "http://localhost:3000";
} else {
  apiUrl = import.meta.env.VITE_API_URL;
}

export const api = axios.create({
  baseURL: apiUrl,
  headers: { withcredentials: true },
});
