import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logout } from "../resources/auth";

export default function Logout() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logout());
  }, []);
  return <Navigate to="/login" />;
}
