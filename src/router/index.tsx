// src/router/index.tsx
import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import RootLayout from "@/layouts/RootLayout";
import Spinner from "@/components/common/Spinner";

// Lazy loaded pages
const HRDashboard = lazy(() => import("@/pages/hr/Dashboard"));
const Unauthorized = lazy(() => import("@/pages/Unauthorized"));
const Login = lazy(() => import("@/pages/Login"));

// Define route structure
export const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "hr",
        children: [
          {
            path: "dashboard",
            element: (
              <Suspense fallback={<Spinner />}>
                <ProtectedRoute
                  element={<HRDashboard />}
                  allowedRoles={["hr", "admin", "manager"]}
                />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "unauthorized",
        element: (
          <Suspense fallback={<Spinner />}>
            <Unauthorized />
          </Suspense>
        ),
      },
      {
        path: "login",
        element: (
          <Suspense fallback={<Spinner />}>
            <Login />
          </Suspense>
        ),
      },
    ],
  },
];

// Create router
export const router = createBrowserRouter(routes);
