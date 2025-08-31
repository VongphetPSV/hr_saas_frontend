import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  Calendar,
  Clock,
  DollarSign,
  Newspaper,
  CalendarCheck,
  CreditCard,
  User,
} from "lucide-react";

const mainMenuItems = [
  { path: "/dashboard", label: "Dashboard", icon: <Home size={14} /> },
  { path: "/staff", label: "Staff", icon: <Users size={14} /> },
  { path: "/leave", label: "Leave", icon: <Calendar size={14} /> },
  { path: "/ot", label: "OT", icon: <Clock size={14} /> },
  { path: "/payroll", label: "Payroll", icon: <DollarSign size={14} /> },
  { path: "/news", label: "News", icon: <Newspaper size={14} /> },
  { path: "/holidays", label: "Holidays", icon: <CalendarCheck size={14} /> },
];

const bottomMenuItems = [
  {
    path: "/subscription",
    label: "Subscription",
    icon: <CreditCard size={14} />,
  },
  { path: "/profile", label: "Profile", icon: <User size={14} /> },
];

const Sidebar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const MenuItem = ({
    path,
    label,
    icon,
  }: {
    path: string;
    label: string;
    icon: React.ReactNode;
  }) => (
    <Link
      to={path}
      className={`flex items-center space-x-3 px-4 py-2.5 text-sm text-gray-700 ${
        isActive(path) ? "bg-gray-100" : "hover:bg-gray-50"
      }`}
    >
      <span className="text-gray-500">{icon}</span>
      <span>{label}</span>
    </Link>
  );

  return (
    <aside className="w-56 bg-white h-screen border-r border-gray-200 flex flex-col">
      {/* Logo Section */}
      <div className="h-16 px-6 flex items-center border-b border-gray-200">
        <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">H</span>
        </div>
        <h1 className="ml-3 text-sm font-semibold text-gray-900">
          HRM Platform
        </h1>
      </div>

      {/* Main Menu */}
      <nav className="flex-1 py-4">
        {mainMenuItems.map((item) => (
          <MenuItem key={item.path} {...item} />
        ))}
      </nav>

      {/* Divider */}
      <div className="mx-4 border-t border-gray-200" />

      {/* Bottom Menu */}
      <nav className="py-4">
        {bottomMenuItems.map((item) => (
          <MenuItem key={item.path} {...item} />
        ))}
      </nav>

      {/* Footer */}
      <footer className="p-4 border-t border-gray-200 text-center">
        <p className="text-xs text-gray-500 mb-1">HRM Platform v2.1.0</p>
        <p className="text-xs text-gray-400">© 2025 Your Company Ltd.</p>
      </footer>
    </aside>
  );
};

export default Sidebar;
