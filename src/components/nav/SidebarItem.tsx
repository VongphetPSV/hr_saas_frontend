import { LucideIcon } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import * as Tooltip from '@radix-ui/react-tooltip';

interface SidebarItemProps {
  to: string;
  icon: LucideIcon;
  label: string;
  collapsed?: boolean;
  badge?: number;
}

export const SidebarItem = ({ to, icon: Icon, label, collapsed, badge }: SidebarItemProps) => {
  const content = (
    <NavLink
      to={to}
      className={({ isActive }) => `
        group relative flex items-center gap-3 h-11 px-3 rounded-md text-slate-600 hover:bg-slate-50
        ${isActive ? 'bg-blue-50 text-blue-700' : ''}
      `}
    >
      {({ isActive }) => (
        <>
          {/* Active indicator */}
          {isActive && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-[3px] rounded-full bg-blue-600" />
          )}

          {/* Icon */}
          <Icon className={`h-5 w-5 text-slate-500 ${isActive ? 'text-blue-600' : ''}`} />

          {/* Label */}
          {!collapsed && (
            <span className="text-sm font-medium">{label}</span>
          )}

          {/* Badge */}
          {badge && !collapsed && (
            <span className="ml-auto rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
              {badge}
            </span>
          )}
        </>
      )}
    </NavLink>
  );

  if (collapsed) {
    return (
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          {content}
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side="right"
            className="z-50 rounded bg-slate-900 px-2 py-1 text-xs text-white"
            sideOffset={5}
          >
            {label}
            <Tooltip.Arrow className="fill-slate-900" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    );
  }

  return content;
};