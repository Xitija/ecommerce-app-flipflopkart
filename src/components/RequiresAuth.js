import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

export const RequiresAuth = ({ children }) => {
  const { userAuth } = useAuth();
  const location = useLocation();

  return userAuth.isLoggedIn ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};
