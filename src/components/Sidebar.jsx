import { Link, useLocation } from 'react-router-dom';
import { useCurrentUser } from '@/hooks/useAuth';

const MenuItem = ({ to, icon, children, isActive }) => (
  <Link
    to={to}
    className={`flex items-center px-4 py-2 text-sm rounded-lg ${
      isActive
        ? 'bg-primary-50 text-primary-700'
        : 'text-gray-700 hover:bg-gray-100'
    }`}
  >
    {icon}
    <span className="ml-3">{children}</span>
  </Link>
);

export function Sidebar() {
  const location = useLocation();
  const { data: user } = useCurrentUser();
  const platformRole = user?.platform_role?.toUpperCase();
  const tenantRole = user?.tenant_role?.toLowerCase();

  const isPlatformAdmin = platformRole === 'ADMIN' || platformRole === 'SUPER_ADMIN';
  const isHRAdmin = ['hr', 'admin'].includes(tenantRole);
  const isStaff = tenantRole === 'staff';

  const renderIcon = (path) => {
    const icons = {
      settings: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      dashboard: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
      staff: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      leave: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      overtime: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      payroll: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      announcements: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
        </svg>
      ),
      holidays: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      profile: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    };
    return icons[path] || icons.dashboard;
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-2 space-y-1">
            {/* Dashboard - Common for all */}
            <MenuItem
              to="/dashboard"
              icon={renderIcon('dashboard')}
              isActive={location.pathname === '/dashboard'}
            >
              Dashboard
            </MenuItem>

            {/* Platform Admin Menu Items */}
            {isPlatformAdmin && (
              <>
                <MenuItem
                  to="/super-admin-dashboard"
                  icon={renderIcon('dashboard')}
                  isActive={location.pathname === '/super-admin-dashboard'}
                >
                  Overview
                </MenuItem>
                <MenuItem
                  to="/tenants"
                  icon={renderIcon('staff')}
                  isActive={location.pathname.startsWith('/tenants')}
                >
                  Tenants
                </MenuItem>
                <MenuItem
                  to="/subscriptions"
                  icon={renderIcon('payroll')}
                  isActive={location.pathname.startsWith('/subscriptions')}
                >
                  Subscriptions
                </MenuItem>
                <MenuItem
                  to="/system-settings"
                  icon={renderIcon('settings')}
                  isActive={location.pathname.startsWith('/system-settings')}
                >
                  Settings
                </MenuItem>
              </>
            )}

            {/* HR/Admin Menu Items */}
            {isHRAdmin && (
              <>
                <MenuItem
                  to="/staff"
                  icon={renderIcon('staff')}
                  isActive={location.pathname.startsWith('/staff')}
                >
                  Staff
                </MenuItem>
                <MenuItem
                  to="/leave"
                  icon={renderIcon('leave')}
                  isActive={location.pathname.startsWith('/leave')}
                >
                  Leave Management
                </MenuItem>
                <MenuItem
                  to="/overtime"
                  icon={renderIcon('overtime')}
                  isActive={location.pathname.startsWith('/overtime')}
                >
                  Overtime
                </MenuItem>
                <MenuItem
                  to="/payroll"
                  icon={renderIcon('payroll')}
                  isActive={location.pathname.startsWith('/payroll')}
                >
                  Payroll
                </MenuItem>
                <MenuItem
                  to="/announcements"
                  icon={renderIcon('announcements')}
                  isActive={location.pathname.startsWith('/announcements')}
                >
                  Announcements
                </MenuItem>
                <MenuItem
                  to="/holidays"
                  icon={renderIcon('holidays')}
                  isActive={location.pathname.startsWith('/holidays')}
                >
                  Holidays
                </MenuItem>
              </>
            )}

            {/* Staff Menu Items */}
            {isStaff && (
              <>
                <MenuItem
                  to="/profile"
                  icon={renderIcon('profile')}
                  isActive={location.pathname === '/profile'}
                >
                  My Profile
                </MenuItem>
                <MenuItem
                  to="/my-leave"
                  icon={renderIcon('leave')}
                  isActive={location.pathname === '/my-leave'}
                >
                  My Leave
                </MenuItem>
                <MenuItem
                  to="/my-overtime"
                  icon={renderIcon('overtime')}
                  isActive={location.pathname === '/my-overtime'}
                >
                  My Overtime
                </MenuItem>
                <MenuItem
                  to="/announcements"
                  icon={renderIcon('announcements')}
                  isActive={location.pathname === '/announcements'}
                >
                  Announcements
                </MenuItem>
                <MenuItem
                  to="/calendar"
                  icon={renderIcon('holidays')}
                  isActive={location.pathname === '/calendar'}
                >
                  Calendar
                </MenuItem>
              </>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}