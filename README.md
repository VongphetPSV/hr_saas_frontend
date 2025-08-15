# HRM SaaS Frontend

A modern, multi-role Human Resource Management SaaS platform built with React, Tailwind CSS, and Progressive Web App capabilities.

## 🚀 Features

### Multi-Role Support
- **Platform Roles**: `super_admin`, `sales_consultant`, `platform_manager`
- **Tenant Roles**: `admin`, `hr`, `staff`, `manager`, `finance`, `director`

### Modern UI/UX
- 📱 **Progressive Web App (PWA)** - Install on mobile devices
- 🌐 **Bilingual Support** - English and Thai languages
- 🎨 **Responsive Design** - Mobile-first approach
- 🔒 **Role-based Access Control** - Granular permissions

### Key Components
- **Authentication Flow** - Login, OTP verification, password reset
- **Dashboard Layouts** - Role-specific dashboards
- **Sidebar Navigation** - Dynamic menu based on user role
- **Modern Components** - Reusable Button, Input, Card components

## 🛠️ Tech Stack

- **Frontend**: React 19 + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Authentication**: JWT tokens
- **PWA**: Service Worker + Web App Manifest

## 📦 Installation

1. **Clone and install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment**:
   Create `.env.local` with:
   ```bash
   VITE_API_BASE_URL=/api
   ```
   This configures the API proxy to forward requests to your backend.

3. **Start development server**:
   ```bash
   npm run dev
   ```
   > **Note**: The development server runs on port 3000. If using a proxy/docker at port 3000, ensure it points to Vite.
   > **Important**: Service workers are automatically disabled in development to prevent caching issues. They are only enabled in production builds.

4. **Build for production**:
   ```bash
   npm run build
   ```

[Rest of the README content remains the same...]