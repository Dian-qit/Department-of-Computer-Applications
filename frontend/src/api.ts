import axios from "axios";

const apiBaseURL = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "");

const baseURL =
  apiBaseURL
    ? apiBaseURL.endsWith("/api")
      ? apiBaseURL
      : `${apiBaseURL}/api`
    : import.meta.env.MODE === "production"
      ? "/api"
      : "http://127.0.0.1:8000/api";

export const api = axios.create({ baseURL });

export const getDepartmentInfo = () => api.get("/department/");
