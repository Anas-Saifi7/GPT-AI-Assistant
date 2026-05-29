import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  const urlToken = new URLSearchParams(
    location.search
  ).get("token");

  if (!token && !urlToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;