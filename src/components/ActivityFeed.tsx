import React from 'react';
import { ActivityItem } from '../types/dashboard';

interface ActivityFeedProps {
  activities: ActivityItem[];
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities = [] }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-sm font-medium text-gray-900">Recent Activities</h2>
        <button className="text-xs text-gray-700 border border-gray-200 px-3 py-1 rounded-xl hover:bg-gray-50">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className="p-2 bg-gray-50 rounded-xl">
              <img
                src={activity.icon}
                alt=""
                className="w-4 h-4"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900 font-medium">{activity.title}</p>
              <p className="text-xs text-gray-500 mt-0.5">{activity.description}</p>
              <p className="text-[10.5px] text-gray-400 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}

        {activities.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-4">
            No recent activities
          </p>
        )}
      </div>
    </div>
  );
};

export default ActivityFeed;
