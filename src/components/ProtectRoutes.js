import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// Helper function to check if user is authenticated
const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  // Additional checks can be done here, like verifying token validity
  return !!token; // Return true if token exists, false otherwise
};

const ProtectRoutes = () => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default ProtectRoutes;
