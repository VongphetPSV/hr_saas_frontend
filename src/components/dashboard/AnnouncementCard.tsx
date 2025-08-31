import React from 'react';
import Card from '../Card';

interface AnnouncementCardProps {
  title: string;
  content: string;
  timestamp: Date;
  isUrgent?: boolean;
}

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({
  title,
  content,
  timestamp,
  isUrgent = false
}) => {
  return (
    <Card>
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-900">{title}</h3>
            <p className="mt-1 text-sm text-gray-500 line-clamp-2">{content}</p>
            <p className="mt-2 text-xs text-gray-400">
              {timestamp.toLocaleString()}
            </p>
          </div>
          {isUrgent && (
            <span className="ml-4 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
              Urgent
            </span>
          )}
        </div>
      </div>
    </Card>
  );
};

export default AnnouncementCard;
