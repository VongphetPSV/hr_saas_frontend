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
   \`\`\`bash
   npm install
   \`\`\`

2. **Start development server**:
   \`\`\`bash
   npm run dev
   \`\`\`

3. **Build for production**:
   \`\`\`bash
   npm run build
   \`\`\`

## 🔑 Demo Credentials

### Admin Users
- **Phone**: +66123456789 | **Password**: admin123
- **Phone**: +66987654321 | **Password**: hr123

### Staff Users  
- **Phone**: +66555666777 | **Password**: staff123

### OTP Code
Use **123456** for OTP verification in demo mode.

## 📱 PWA Features

- **Offline Support** - Service worker caching
- **Install Prompt** - Add to home screen
- **App Shortcuts** - Quick access to Dashboard and Attendance
- **Push Notifications** - Real-time updates (when backend integrated)

## 🏗️ Project Structure

\`\`\`
src/
├── assets/           # Static assets
├── components/       # Reusable UI components
│   ├── Button.jsx
│   ├── Input.jsx
│   ├── Card.jsx
│   ├── Sidebar.jsx
│   ├── TopBar.jsx
│   └── RoleGuard.jsx
├── hooks/            # Custom React hooks
│   └── useAuth.js    # Authentication hook
├── layouts/          # Layout components
│   └── DashboardLayout.jsx
├── pages/            # Application pages
│   ├── auth/         # Authentication pages
│   ├── platform/     # Platform admin pages
│   └── tenant/       # Tenant user pages
├── router/           # Routing configuration
│   └── AppRouter.jsx
├── services/         # API services
│   └── api.js
├── App.jsx           # Main app component
└── main.jsx          # App entry point
\`\`\`

## 🎨 Design System

### Colors
- **Primary**: Blue (#2563eb)
- **Sidebar**: Dark gray (#1f2937)
- **Success**: Green
- **Warning**: Yellow
- **Error**: Red

### Typography
- **Font**: Inter (Google Fonts)
- **Sizes**: Responsive scale from text-xs to text-4xl

## 🔐 Authentication Flow

1. **Login Page** - Phone number and password
2. **OTP Verification** - SMS-based 2FA
3. **Role Detection** - Automatic role-based routing
4. **Dashboard Redirect** - Role-specific dashboard

## 📊 Dashboard Types

### Platform Dashboards
- **Super Admin**: Complete system overview, tenant management
- **Sales**: Lead tracking, revenue metrics, pipeline management

### Tenant Dashboards  
- **HR Admin**: Employee management, leave approvals, analytics
- **Staff**: Personal dashboard, tasks, attendance tracking

## 🛡️ Security Features

- **JWT Authentication** - Secure token-based auth
- **Role Guards** - Component-level access control
- **Route Protection** - Authenticated and role-based routing
- **Token Expiry** - Automatic logout on token expiration

## 🌐 PWA Configuration

### Manifest Features
- **App Name**: HRM SaaS Platform
- **Theme Color**: #2563eb
- **Display Mode**: Standalone
- **Orientation**: Portrait
- **Shortcuts**: Dashboard, Attendance

### Service Worker
- **Caching Strategy**: Cache-first for static assets
- **Offline Support**: Basic offline functionality
- **Push Notifications**: Ready for backend integration

## 🔧 Development

### Environment Variables
\`\`\`bash
VITE_API_URL=https://api.hrmsaas.com
\`\`\`

### Available Scripts
- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm run preview\` - Preview production build
- \`npm run lint\` - Run ESLint

## 📝 API Integration

The app includes a comprehensive API service (\`src/services/api.js\`) with endpoints for:

- Authentication (login, OTP, password reset)
- User management
- Employee management
- Attendance tracking
- Leave management
- Payroll processing
- Analytics and reporting

## 🚀 Deployment

1. **Build the application**:
   \`\`\`bash
   npm run build
   \`\`\`

2. **Deploy the \`dist\` folder** to your hosting platform

3. **Configure server** to serve \`index.html\` for all routes (SPA routing)

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Built with ❤️ for modern HR management**