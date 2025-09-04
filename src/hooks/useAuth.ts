// src/hooks/useAuth.ts
import { useState } from "react";
import { User, AuthState, UserRole } from "@/types/user";

// Development mock implementation
export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    token: null,
  });

  // Helper function to create a test user
  const createTestUser = (roles: UserRole[]): User => ({
    id: 1,
    email: "test@example.com",
    name: "Test User",
    roles,
    tenant_id: 1,
  });

  // Mock login methods for different role scenarios
  return {
    // Scenarios for testing
    loginHR: () =>
      setAuthState({
        user: createTestUser(["hr"]),
        isAuthenticated: true,
        token: "mock-hr-token",
      }),
    loginAdmin: () =>
      setAuthState({
        user: createTestUser(["admin"]),
        isAuthenticated: true,
        token: "mock-admin-token",
      }),
    loginManager: () =>
      setAuthState({
        user: createTestUser(["manager"]),
        isAuthenticated: true,
        token: "mock-manager-token",
      }),
    loginEmployee: () =>
      setAuthState({
        user: createTestUser(["employee"]),
        isAuthenticated: true,
        token: "mock-employee-token",
      }),
    logout: () =>
      setAuthState({
        user: null,
        isAuthenticated: false,
        token: null,
      }),

    // Standard auth state
    user: authState.user,
    isAuthenticated: authState.isAuthenticated,
    token: authState.token,
  };
};
