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

📌 Notes:
- Use Vite routing with `BrowserRouter`
- Don’t use TypeScript
- Stick with TailwindCSS for all styles
- Use basic reusable `Button`, `Input`, and `Card` components

Generate boilerplate code for each component so we can quickly build upon them later.