// src/router/ProtectedRoute.tsx
import React, { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { UserRole } from "@/types/user";

interface ProtectedRouteProps {
  element: ReactElement;
  allowedRoles: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element,
  allowedRoles,
}) => {
  const { user, isAuthenticated } = useAuth();

  // Not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has allowed role
  const hasRequiredRole =
    user?.roles && allowedRoles.some((role) => user.roles.includes(role));

  // If no allowed role, redirect to unauthorized or dashboard
  if (!hasRequiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Render the protected component
  return element;
};

export default ProtectedRoute;
