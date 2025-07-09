import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedSellerRoute = ({ children }) => {
  const { isAuthenticated, currentUser } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  console.log("currentUser:", currentUser);
  console.log("role:", currentUser?.role);

  const role = currentUser?.role?.toLowerCase();
  if (role !== "seller") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedSellerRoute;
// This component checks if the user is authenticated and has the role of 'SELLER'.
// If not, it redirects them to the login page or home page as appropriate.
