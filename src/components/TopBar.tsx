import React from 'react';
import { Building2, Globe, ChevronDown, Bell, User } from 'lucide-react';

const TopBar: React.FC = () => {
  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4">
      {/* Company Section */}
      <div className="flex items-center space-x-2">
        <Building2 size={18} className="text-gray-600" />
        <span className="text-sm font-medium text-gray-900">Acme Corporation</span>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Language Selector */}
        <button className="flex items-center space-x-1.5 text-xs text-gray-700 hover:bg-gray-50 px-2 py-1 rounded-lg">
          <Globe size={14} />
          <span>English</span>
          <ChevronDown size={14} />
        </button>

        {/* Switch Company */}
        <button className="flex items-center space-x-1.5 text-xs text-gray-700 border border-gray-200 px-3 py-1 rounded-lg hover:bg-gray-50">
          <Building2 size={14} />
          <span>Switch Company</span>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button className="relative p-1.5 hover:bg-gray-50 rounded-lg">
            <Bell size={18} className="text-gray-600" />
            <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
              3
            </span>
          </button>
        </div>

        {/* User Profile */}
        <button className="flex items-center space-x-3 hover:bg-gray-50 px-2 py-1 rounded-lg">
          <div className="w-8 h-8 bg-gray-100 rounded-full overflow-hidden">
            <img
              src="/placeholder-avatar.png"
              alt="User avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-left">
            <p className="text-sm text-gray-900">John Doe</p>
            <p className="text-[10.5px] text-gray-500">HR Manager</p>
          </div>
          <ChevronDown size={14} className="text-gray-500" />
        </button>
      </div>
    </header>
  );
};

export default TopBar;