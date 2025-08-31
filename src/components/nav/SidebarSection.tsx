import React from 'react';

interface SidebarSectionProps {
  label: string;
  children: React.ReactNode;
  collapsed?: boolean;
}

const SidebarSection: React.FC<SidebarSectionProps> = ({
  label,
  children,
  collapsed = false
}) => {
  return (
    <div className="py-3 first:pt-2">
      {!collapsed && (
        <h3 className="px-4 mb-1 text-xs font-medium text-gray-400 uppercase">
          {label}
        </h3>
      )}
      <div className="space-y-0.5 px-2">
        {children}
      </div>
    </div>
  );
};

export default SidebarSection;