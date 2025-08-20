import AdminDashboard from "../admin/AdminDashboard";
import { Login } from "@/comps/Login";
import Profile from "@/comps/Profile";
import { Signin } from "@/comps/Signin";
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
import About from "@/comps/About";
import Gallery from "@/comps/Gallery";
import Election from "@/comps/Election";
import Home from "@/comps/Home";
import Voting from "@/comps/Voting";
import Result from "@/comps/Result";

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signin />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<About />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route
        path="/election"
        element={
          <PrivateRoute>
            <Election />
          </PrivateRoute>
        }
      />

      {/* Private Route for logged-in users */}
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />

      {/* Admin only route */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />

      <Route
        path="/voteing/:id"
        element={
          <PrivateRoute>
            <Voting />
          </PrivateRoute>
        }
      />

      <Route
        path="/results/:id"
        element={
          <PrivateRoute>
            <Result />
          </PrivateRoute>
        }
      />

      {/* 404 Page */}
      <Route path="*" element={<h1>404 Page Not Found</h1>} />
    </Routes>
  );
}

export default AllRoutes;
