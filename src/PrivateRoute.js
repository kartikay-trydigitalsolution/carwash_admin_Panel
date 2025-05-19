// src/components/PrivateRoute.js
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const isLogging = useSelector((state) => state.auth.isLogging);
  return isLogging ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
