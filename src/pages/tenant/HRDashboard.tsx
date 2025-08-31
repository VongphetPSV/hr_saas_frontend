import React from 'react';
import { Users, Calendar, Clock, Briefcase, Filter, Plus } from 'lucide-react';
import MetricCard from '../../components/MetricCard';
import PendingApprovals from '../../components/PendingApprovals';
import ActivityFeed from '../../components/ActivityFeed';
import { MetricCard as MetricCardType, PendingRequest, ActivityItem } from '../../types/dashboard';

const metrics: Omit<MetricCardType, 'color'>[] = [
  {
    title: 'Total Staff',
    value: 156,
    icon: <Users size={21} />,
    trend: '+2 from last month',
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    title: 'Pending Leave',
    value: 8,
    icon: <Calendar size={21} />,
    trend: 'awaiting approval',
    bgColor: 'bg-green-100',
    iconColor: 'text-green-600'
  },
  {
    title: 'Approved OT',
    value: 24,
    icon: <Clock size={21} />,
    trend: 'This Month',
    bgColor: 'bg-orange-100',
    iconColor: 'text-orange-600'
  },
  {
    title: 'Active Projects',
    value: 7,
    icon: <Briefcase size={21} />,
    trend: 'across all teams',
    bgColor: 'bg-purple-100',
    iconColor: 'text-purple-600'
  }
];

// Sample data for pending requests
const pendingRequests: PendingRequest[] = [
  {
    id: '1',
    type: 'leave',
    count: 5,
    employees: ['John Doe', 'Jane Smith', 'Bob Johnson', 'Alice Brown', 'Charlie Wilson'],
    status: 'pending'
  },
  {
    id: '2',
    type: 'overtime',
    count: 3,
    employees: ['Eve Anderson', 'Frank Thomas', 'Grace Lee'],
    status: 'pending'
  }
];

// Sample data for activities
const activities: ActivityItem[] = [
  {
    id: '1',
    icon: '/icons/leave.svg',
    title: 'Leave Request Approved',
    description: "John Doe's leave request has been approved by HR Manager",
    time: '2 hours ago'
  },
  {
    id: '2',
    icon: '/icons/overtime.svg',
    title: 'New Overtime Request',
    description: 'Alice Brown submitted an overtime request for review',
    time: '4 hours ago'
  },
  {
    id: '3',
    icon: '/icons/profile.svg',
    title: 'Profile Updated',
    description: 'Charlie Wilson updated their emergency contact information',
    time: '6 hours ago'
  }
];

const HRDashboard: React.FC = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[17.5px] font-medium text-gray-900">Good morning, John</h1>
          <p className="text-sm text-gray-500 mt-1">Here's what's happening in your organization</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-3 py-1.5 text-xs text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Filter size={14} />
            <span>Filter</span>
          </button>
          <button className="flex items-center space-x-2 px-3 py-1.5 text-xs text-white bg-gray-900 rounded-lg hover:bg-gray-800">
            <Plus size={14} />
            <span>Quick Add</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <PendingApprovals
            leaveRequests={pendingRequests.filter(r => r.type === 'leave')}
            otRequests={pendingRequests.filter(r => r.type === 'overtime')}
          />
        </div>
        <div className="col-span-1">
          <ActivityFeed activities={activities} />
        </div>
      </div>
    </div>
  );
};

export default HRDashboard;