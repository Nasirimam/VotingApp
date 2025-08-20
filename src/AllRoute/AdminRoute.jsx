import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" />;

  try {
    const payload = JSON.parse(atob(token.split(".")[1])); // decode JWT
    return payload.role === "admin" ? children : <Navigate to="/" />;
  } catch (error) {
    console.error("Invalid token", error);
    return <Navigate to="/login" />;
  }
};

export default AdminRoute;
