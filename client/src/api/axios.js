import axios from "axios";
let apiUrl;

if (process.env.environment !== "production") {
  apiUrl = "http://localhost:3000";
} else {
  apiUrl = process.env.apiUrl;
}

export const api = axios.create({
  baseURL: apiUrl,
  headers: { withcredentials: true },
});
