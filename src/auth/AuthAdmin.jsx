import React, { useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const AuthAdmin = () => {
  const { user, role } = useAuth();
  const location = useLocation();

  const [keyUser, setKeyUser] = useState(
    localStorage.getItem("sb-nwcvdofqkmdjmfouzhvq-auth-token")
  );

  return keyUser ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
};

export default AuthAdmin;
