import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IconType } from 'react-icons';
import * as Tooltip from '@radix-ui/react-tooltip';

interface SidebarItemProps {
  to: string;
  icon: IconType;
  label: string;
  badge?: number;
  collapsed?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  to,
  icon: Icon,
  label,
  badge,
  collapsed = false
}) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  const content = (
    <Link
      to={to}
      className={`
        flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors
        ${isActive 
          ? 'bg-gray-100 text-gray-900' 
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
      `}
    >
      <Icon className={`w-5 h-5 ${isActive ? 'text-gray-900' : 'text-gray-400'}`} />
      {!collapsed && (
        <>
          <span className="ml-3 flex-1">{label}</span>
          {badge !== undefined && (
            <span className="ml-auto bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">
              {badge}
            </span>
          )}
        </>
      )}
    </Link>
  );

  if (collapsed) {
    return (
      <Tooltip.Provider>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <div>{content}</div>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              side="right"
              className="bg-gray-900 text-white px-2 py-1 rounded text-sm"
              sideOffset={5}
            >
              {label}
              <Tooltip.Arrow className="fill-gray-900" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    );
  }

  return content;
};

export default SidebarItem;