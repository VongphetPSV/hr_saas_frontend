import React from 'react';
import { IconType } from 'react-icons';

interface Activity {
  id: string;
  icon: IconType;
  iconColor: string;
  message: string;
  timestamp: string;
}

interface ActivityListProps {
  activities: Activity[];
}

const ActivityList: React.FC<ActivityListProps> = ({ activities }) => {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-3">
          <div className={`p-2 rounded-lg ${activity.iconColor} bg-white mt-1`}>
            <activity.icon className="w-4 h-4" />
          </div>
          <div>
            <p className="text-sm text-gray-900">{activity.message}</p>
            <p className="text-xs text-gray-500">{activity.timestamp}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityList;
