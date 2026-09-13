import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "https://chatapp-backend-5qti.onrender.com
/api" : "/api",
  withCredentials: true,
});
