import axios from "axios";
import { toast } from "react-toastify";

const instance = axios.create({
  baseURL: "http://localhost:5000", // example public API
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
  (response) => {
    if (response?.data?.success == true) {
      toast.success(response.data.message); // Show toast on every success
      return response;
    } else {
      toast.error(response.data.message);
    }
  },
  (error) => {
    if (error.response?.status === 500) {
      toast.error(error.response.data.message);
      // e.g., redirect to login
    }
    if (error.response?.status === 400) {
      toast.error(error.response.data.message);
    }
    if (error.response?.status === 404) {
      toast.error(error.response.data.message);
    }
    // return Promise.reject(error);
  }
);

export default instance;
