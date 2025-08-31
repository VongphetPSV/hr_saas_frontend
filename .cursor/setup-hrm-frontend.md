✅ Updated Setup Guide: setup-arm-frontend.md (TypeScript Version)

Project: HRM SaaS Frontend
Tech stack: React (Vite), Tailwind CSS, TypeScript, React Router v6

🎯 Goal

Build a modern, multi-role HRM SaaS frontend UI using React + TypeScript + Tailwind CSS. The app supports role-based dashboards and navigation for:
	•	Platform roles: super_admin, sales_consultant, platform_manager
	•	Tenant roles: admin, hr, staff, manager, finance, director

⸻

🧠 Cursor Instructions Summary

✅ Folder Structure (src/)
src/
├── assets/
├── components/
│   ├── Sidebar.tsx
│   ├── TopBar.tsx
│   ├── RoleGuard.tsx
├── hooks/
│   └── useAuth.ts
├── layouts/
│   └── DashboardLayout.tsx
├── pages/
│   ├── auth/
│   │   ├── LoginPage.tsx
│   │   ├── OTPPage.tsx
│   │   └── ForgotPasswordPage.tsx
│   ├── platform/
│   │   ├── SuperAdminDashboard.tsx
│   │   └── SalesDashboard.tsx
│   ├── tenant/
│   │   ├── HRDashboard.tsx
│   │   └── StaffDashboard.tsx
│   └── SelectEmployerPage.tsx
├── router/
│   └── AppRouter.tsx
├── services/
│   └── api.ts
├── App.tsx
└── main.tsx

✅ Use .tsx for components/pages and .ts for hooks/services.

⸻

⚙️ Tailwind Configuration (tailwind.config.js)

Add the following:
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#2563eb', // blue-600
        background: '#f9fafb',
        sidebar: '#1e293b',
      },
    },
  },
  plugins: [],
};
🌐 AppRouter Setup (src/router/AppRouter.tsx)
	•	Use BrowserRouter, Routes, Route, and Navigate.
	•	Implement ProtectedRoute and RoleGuard.
	•	Use useAuth() to redirect users based on their roles after login.

⸻

📦 Create DashboardLayout.tsx
	•	Responsive sidebar + topbar using Tailwind flex and grid
	•	Menu items should adapt based on platform_role or tenant_role
	•	Accept toggleSidebar prop for mobile support

⸻

📋 Sample Pages to Create (TypeScript + Tailwind)
	•	SuperAdminDashboard.tsx: "Welcome Super Admin"
	•	SalesDashboard.tsx: "Welcome Sales Consultant"
	•	HRDashboard.tsx: "Welcome HR"
	•	StaffDashboard.tsx: "Welcome Staff"
	•	LoginPage.tsx: Phone + password input
	•	OTPPage.tsx: OTP verification form

💡 Use interface Props and useState, useEffect with types.

⸻

🔐 Auth Hook (src/hooks/useAuth.ts)
	•	Read JWT from localStorage or cookie
	•	Decode with jwt-decode to extract:
	•	platform_role
	•	tenant_role
	•	tenant_id
	•	Return auth object with types:
  interface AuthData {
  token: string | null;
  isLoggedIn: boolean;
  platform_role?: string;
  tenant_role?: string;
  tenant_id?: string;
}

🧪 Vite + FastAPI Integration

1. .env.local
VITE_API_BASE_URL=/api/v1
❗ Do not use full URL like http://localhost:8000 in .env.local. Use relative path /api/v1.

⸻

2. vite.config.ts (Update from .js to .ts)
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      clientPort: 3000,
    },
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
✅ Component Conventions
	•	Use reusable components in /components: Button.tsx, Input.tsx, Card.tsx
	•	Use className for Tailwind styling
	•	Keep logic in hooks/services and UI in components

⸻

🧱 Starter Component Example (TypeScript)
// src/components/Button.tsx
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = '',
  type = 'button',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 bg-primary text-white rounded ${className}`}
    >
      {children}
    </button>
  );
};
📌 Notes
	•	✅ Use BrowserRouter (React Router v6)
	•	✅ Use .tsx and .ts across the entire app
	•	✅ Avoid inline styles and external CSS files
	•	✅ Use Tailwind CSS for styling
	•	✅ Add types for all props, state, hooks, API calls
	•	❌ Don’t use JavaScript files (.js, .jsx)S