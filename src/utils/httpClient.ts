import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/api"
      : "/api",
  timeout: 3000,
  headers: {
    "Cache-Control": "no-cache",
  },
});

export default axiosInstance;
