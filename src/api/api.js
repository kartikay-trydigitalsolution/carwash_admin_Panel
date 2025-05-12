import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000", // example public API
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized. Redirecting...");
      // e.g., redirect to login
    }
    return Promise.reject(error);
  }
);

export default instance;
