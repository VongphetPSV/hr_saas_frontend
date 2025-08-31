import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { PendingRequest } from '../types/dashboard';

interface PendingApprovalsProps {
  leaveRequests?: PendingRequest[];
  otRequests?: PendingRequest[];
}

const PendingApprovals: React.FC<PendingApprovalsProps> = ({ leaveRequests = [], otRequests = [] }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-sm font-medium text-gray-900">Pending Approvals</h2>
        <button className="text-xs text-gray-700 border border-gray-200 px-3 py-1 rounded-xl hover:bg-gray-50">
          View All
        </button>
      </div>

      {/* Leave Requests Card */}
      <div className="bg-gray-50 rounded-xl p-3.5 mb-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Calendar size={17.5} className="text-gray-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">Leave Requests</p>
              <p className="text-xs text-gray-500">
                {leaveRequests.length} employees waiting
              </p>
            </div>
          </div>
          <span className="bg-orange-100 text-orange-700 px-2.5 py-1 rounded-xl text-[10.5px]">
            {leaveRequests.length} Pending
          </span>
        </div>
      </div>

      {/* OT Requests Card */}
      <div className="bg-gray-50 rounded-xl p-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Clock size={17.5} className="text-gray-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">OT Requests</p>
              <p className="text-xs text-gray-500">
                {otRequests.length} employees waiting
              </p>
            </div>
          </div>
          <span className="bg-orange-100 text-orange-700 px-2.5 py-1 rounded-xl text-[10.5px]">
            {otRequests.length} Pending
          </span>
        </div>
      </div>
    </div>
  );
};

export default PendingApprovals;
