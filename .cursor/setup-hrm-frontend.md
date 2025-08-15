Project: HRM SaaS Frontend  
Tech stack: React (Vite), Tailwind CSS, JavaScript (no TypeScript), React Router v6

Goal:
Build a modern, multi-role HRM SaaS frontend UI based on existing Tailwind+React setup. The app will support role-based dashboards and navigation for:
- Platform roles: `super_admin`, `sales_consultant`, `platform_manager`
- Tenant roles: `admin`, `hr`, `staff`, `manager`, `finance`, `director`

---

🎯 Tasks for Cursor:

1. 🔧 **Folder Structure (src/):**
src/
├── assets/
├── components/
│   ├── Sidebar.jsx
│   ├── TopBar.jsx
│   ├── RoleGuard.jsx
├── hooks/
│   └── useAuth.js
├── layouts/
│   └── DashboardLayout.jsx
├── pages/
│   ├── auth/
│   │   ├── LoginPage.jsx
│   │   ├── OTPPage.jsx
│   │   └── ForgotPasswordPage.jsx
│   ├── platform/
│   │   ├── SuperAdminDashboard.jsx
│   │   └── SalesDashboard.jsx
│   ├── tenant/
│   │   ├── HRDashboard.jsx
│   │   └── StaffDashboard.jsx
│   └── SelectEmployerPage.jsx
├── router/
│   └── AppRouter.jsx
├── services/
│   └── api.js
├── App.jsx
└── main.jsx

2. ⚙️ **Create Tailwind theme overrides (tailwind.config.js):**
- Add custom font: `'Inter', sans-serif`
- Extend colors for primary (e.g. blue-600), background, sidebar

3. 🌐 **Set up `AppRouter.jsx` with role-based routing**
- Read user token + role from `useAuth()`
- Redirect based on role to appropriate dashboard

4. 📦 **Create `DashboardLayout.jsx`**
- Responsive Sidebar + TopBar
- Sidebar menus change based on role

5. 📋 **Create sample pages:**
- SuperAdminDashboard: "Welcome Super Admin"
- SalesDashboard: "Welcome Sales Consultant"
- HRDashboard: "Welcome HR"
- StaffDashboard: "Welcome Staff"
- LoginPage: Phone & password input
- OTPPage: OTP verification form

6. 🔐 **Implement `useAuth.js`**
- Handles JWT token from localStorage
- Decodes token to extract role and tenant

---

### 🔧 Vite Proxy and Environment Variable Setup

To enable the frontend to correctly communicate with the FastAPI backend, follow these steps:

#### 1. Configure `.env.local`
Create a file named `.env.local` in the root of the frontend project and add:
VITE_API_BASE_URL=/api

This value is used in frontend code (e.g., Axios) to reference the backend API base path.

> ❗️**Do NOT use the full backend URL** (e.g., http://localhost:8000). Just use `/api`.

---

#### 2. Configure Vite Proxy in `vite.config.js`

Update your `vite.config.js` to forward `/api` calls to your backend running at `http://localhost:8000`.

```js
// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": resolve(__dirname, "src") },
  },
  server: {
    host: "0.0.0.0",
    port: 3000,
    strictPort: true,
    hmr: {
      protocol: "ws",
      host: "localhost",
      clientPort: 3000,
    },
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

### 🔧 VITE_API_BASE_URL

If your FastAPI routes are mounted at `/api/v1`, make sure your `.env.local` is set as:
VITE_API_BASE_URL=/api/v1



📌 Notes:
- Use Vite routing with `BrowserRouter`
- Don’t use TypeScript
- Stick with TailwindCSS for all styles
- Use basic reusable `Button`, `Input`, and `Card` components

Generate boilerplate code for each component so we can quickly build upon them later.