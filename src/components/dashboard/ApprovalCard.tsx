import React from 'react';
import { IconType } from 'react-icons';
import { Link } from 'react-router-dom';
import { HiChevronRight } from 'react-icons/hi';

interface ApprovalCardProps {
  icon: IconType;
  label: string;
  pendingCount: number;
  to: string;
}

const ApprovalCard: React.FC<ApprovalCardProps> = ({
  icon: Icon,
  label,
  pendingCount,
  to
}) => {
  return (
    <Link
      to={to}
      className="block p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg text-gray-600 bg-white">
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900">{label}</h3>
            <p className="text-sm text-gray-500">
              {pendingCount} {pendingCount === 1 ? 'employee' : 'employees'} waiting
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <span className="mr-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
            {pendingCount} Pending
          </span>
          <HiChevronRight className="w-5 h-5 text-gray-400" />
        </div>
      </div>
    </Link>
  );
};

export default ApprovalCard;