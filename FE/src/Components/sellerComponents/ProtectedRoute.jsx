import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { TopLoader } from "./TopLoader";
import { toast } from "sonner";

export const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <TopLoader />;
  }

  if (!user) {
    toast.error("You must login first!");
    return <Navigate to="/auth" replace />;
  }

  // If user exists, render the children (protected component)
  return <Outlet />;
};
export const ProtectedSellerRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <TopLoader />;
  }

  if (user.role !== 'seller') {
    toast.error("You Are Not Allowed To visit This Route!"); 
    return <Navigate to="/" replace />;
  }

  // If user exists, render the children (protected component)
  return <Outlet />;
};
