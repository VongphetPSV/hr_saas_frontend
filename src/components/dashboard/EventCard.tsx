import React from 'react';
import Card from '../Card';

interface Attendee {
  name: string;
  avatar?: string;
}

interface EventCardProps {
  title: string;
  startTime: Date;
  endTime: Date;
  attendees: Attendee[];
  location?: string;
}

const EventCard: React.FC<EventCardProps> = ({
  title,
  startTime,
  endTime,
  attendees,
  location
}) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card>
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-900">{title}</h3>
        <div className="mt-2 flex items-center text-sm text-gray-500">
          <svg className="mr-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {formatTime(startTime)} - {formatTime(endTime)}
        </div>
        
        {location && (
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <svg className="mr-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {location}
          </div>
        )}

        <div className="mt-3 flex items-center">
          <div className="flex -space-x-2">
            {attendees.slice(0, 3).map((attendee, index) => (
              <div
                key={index}
                className="h-6 w-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs"
              >
                {attendee.avatar ? (
                  <img
                    src={attendee.avatar}
                    alt={attendee.name}
                    className="h-full w-full rounded-full"
                  />
                ) : (
                  attendee.name.charAt(0)
                )}
              </div>
            ))}
          </div>
          {attendees.length > 3 && (
            <span className="ml-1 text-xs text-gray-500">
              +{attendees.length - 3} more
            </span>
          )}
        </div>
      </div>
    </Card>
  );
};

export default EventCard;
