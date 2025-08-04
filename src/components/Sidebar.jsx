import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  Calendar, 
  DollarSign, 
  Settings, 
  Building2, 
  TrendingUp,
  FileText,
  LogOut,
  Menu,
  X
} from 'lucide-react';

const Sidebar = () => {
  const { user, logout, isPlatformRole, isTenantRole } = useAuth();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const platformMenuItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', roles: ['super_admin', 'sales_consultant', 'platform_manager'] },
    { path: '/tenants', icon: Building2, label: 'Tenants', roles: ['super_admin', 'platform_manager'] },
    { path: '/sales', icon: TrendingUp, label: 'Sales', roles: ['super_admin', 'sales_consultant'] },
    { path: '/analytics', icon: FileText, label: 'Analytics', roles: ['super_admin', 'platform_manager'] },
  ];

  const tenantMenuItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', roles: ['admin', 'hr', 'staff', 'manager', 'finance', 'director'] },
    { path: '/employees', icon: Users, label: 'Employees', roles: ['admin', 'hr', 'manager', 'director'] },
    { path: '/attendance', icon: UserCheck, label: 'Attendance', roles: ['admin', 'hr', 'staff', 'manager', 'director'] },
    { path: '/leave', icon: Calendar, label: 'Leave Management', roles: ['admin', 'hr', 'staff', 'manager', 'director'] },
    { path: '/payroll', icon: DollarSign, label: 'Payroll', roles: ['admin', 'hr', 'finance', 'director'] },
    { path: '/settings', icon: Settings, label: 'Settings', roles: ['admin', 'director'] },
  ];

  const menuItems = isPlatformRole() ? platformMenuItems : tenantMenuItems;
  const filteredMenuItems = menuItems.filter(item => item.roles.includes(user?.role));

  return (
    <div className={`bg-sidebar-bg text-white h-screen transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'} flex flex-col`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div>
              <h1 className="text-xl font-bold">HRM SaaS</h1>
              <p className="text-sm text-gray-400 capitalize">{user?.role?.replace('_', ' ')}</p>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded hover:bg-sidebar-hover"
          >
            {isCollapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {filteredMenuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-300 hover:bg-sidebar-hover hover:text-white'
                }`
              }
            >
              <Icon size={20} />
              {!isCollapsed && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* User Profile & Logout */}
      <div className="p-4 border-t border-gray-700">
        {!isCollapsed && (
          <div className="mb-3">
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-gray-400">{user?.email}</p>
            {isTenantRole() && user?.tenant && (
              <p className="text-xs text-gray-400">Tenant: {user.tenant}</p>
            )}
          </div>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 w-full p-2 rounded-lg text-gray-300 hover:bg-sidebar-hover hover:text-white transition-colors"
        >
          <LogOut size={20} />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;