import React from "react";
import ReactDOM from "react-dom";

import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
// import "./assets/styles";
import "./assets/styles/tailwind.css";

// layouts

import Admin from "./layouts/Admin.js";

// views without layouts

import Landing from "./views/Landing.js";
import Profile from "./views/Profile.js";

// import { createRoot } from "react-dom";
import Login from "./views/auth/Login.js";
import Register from "./views/auth/Register.js";
import Dashboard from "./views/admin/Dashboard.js";
import Maps from "./views/admin/Maps.js";
import Settings from "./views/admin/Settings.js";
import Tables from "./views/admin/Tables.js";
import ForgotPassword from "./views/auth/ForgotPassword.js";
import ResetPassword from "./views/auth/ResetPassword.js";

// Define your components such as Admin, Auth, Landing, Profile, Index

const App = () => {
  const routes = [
    { path: "/admin", element: <Admin /> },
    { path: "/", element: <Landing /> },
    { path: "/profile", element: <Profile /> },
    { path: "/login", element: <Login /> },
    { path: "/forgotPassword", element: <ForgotPassword /> },
    { path: "/resetPassword", element: <ResetPassword /> },
    { path: "/auth/register", element: <Register /> },
    { path: "/admin/dashboard", element: <Dashboard /> },
    { path: "/admin/maps", element: <Maps /> },
    { path: "/admin/settings", element: <Settings /> },
    { path: "/admin/tables", element: <Tables /> },
  ];
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};
