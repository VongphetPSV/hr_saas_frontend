import { useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ChevronLeft, ChevronRight, Menu, MoreVertical } from 'lucide-react';
import { platformNav } from './platformNav';
import { SidebarItem } from './SidebarItem';
import { useAuth } from '../../hooks/useAuth';

interface PlatformSidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

const STORAGE_KEY = 'platform_sidebar_collapsed';

export const PlatformSidebar = ({ mobileOpen, onMobileClose }: PlatformSidebarProps) => {
  const [collapsed, setCollapsed] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : false;
  });
  const { user } = useAuth();

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(collapsed));
  }, [collapsed]);

  const sidebarContent = (
    <div className={`flex h-full flex-col bg-white ${collapsed ? 'w-20' : 'w-[264px]'}`}>
      {/* Logo */}
      <div className="flex h-16 flex-col justify-center px-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded bg-primary-600 flex items-center justify-center text-white font-medium">
            P
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-sm font-semibold text-slate-900">Platform Admin</h1>
              <p className="text-xs text-slate-500">Management Console</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 space-y-1 px-3">
        {platformNav.map((section, idx) => (
          <div key={section.section} className={idx > 0 ? 'mt-6' : ''}>
            {!collapsed && (
              <h3 className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">
                {section.section}
              </h3>
            )}
            <div className={`space-y-1 ${!collapsed ? 'mt-3' : 'mt-1'}`}>
              {section.items.map((item) => (
                <SidebarItem
                  key={item.to}
                  {...item}
                  collapsed={collapsed}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* User Profile */}
      <div className="border-t border-slate-200 p-4">
        <div className="flex items-center gap-3">
          <div className="h-7 w-7 rounded-full bg-slate-200">
            {/* User avatar */}
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">
                {user?.full_name}
              </p>
              <p className="text-xs text-slate-500 truncate">
                {user?.role}
              </p>
            </div>
          )}
          {!collapsed && (
            <button className="text-slate-400 hover:text-slate-600">
              <MoreVertical className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* Collapse Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="h-12 flex items-center justify-center hover:bg-slate-50 border-t border-slate-200"
      >
        {collapsed ? (
          <ChevronRight className="h-5 w-5 text-slate-400" />
        ) : (
          <ChevronLeft className="h-5 w-5 text-slate-400" />
        )}
      </button>
    </div>
  );

  // Mobile drawer
  if (typeof window !== 'undefined' && window.innerWidth < 1024) {
    return (
      <>
        <button
          onClick={() => onMobileClose?.()}
          className="lg:hidden fixed top-4 left-4 z-40 rounded-md bg-white p-2 text-slate-400 shadow-md"
        >
          <Menu className="h-6 w-6" />
        </button>

        <Transition.Root show={mobileOpen} as="div">
          <Dialog
            as="div"
            className="fixed inset-0 z-40 lg:hidden"
            onClose={() => onMobileClose?.()}
          >
            <Transition.Child
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-slate-600 bg-opacity-75" />
            </Transition.Child>

            <Transition.Child
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              {sidebarContent}
            </Transition.Child>
          </Dialog>
        </Transition.Root>
      </>
    );
  }

  // Desktop sidebar
  return (
    <div className="hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 border-r border-slate-200">
      {sidebarContent}
    </div>
  );
};
