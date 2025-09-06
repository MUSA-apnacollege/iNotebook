import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // agar token nahi hai → login pe bhej do
  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" replace />;
  }

  // agar token hai → page dikhado
  return children;
};

export default ProtectedRoute;
