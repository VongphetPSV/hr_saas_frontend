import React from 'react';
import Card from '../Card';
import ProgressBar from '../shared/ProgressBar';
import IconWrapper from '../shared/IconWrapper';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  progress?: number;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  bgColor?: string;
  iconColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  progress,
  trend,
  bgColor = 'bg-purple-100',
  iconColor = 'text-purple-600'
}) => {
  return (
    <Card>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">{title}</h3>
            <p className="mt-2 text-2xl font-semibold text-gray-900">{value}</p>
          </div>
          <IconWrapper bgColor={bgColor} iconColor={iconColor}>
            {icon}
          </IconWrapper>
        </div>
        
        {progress !== undefined && (
          <div className="mt-4">
            <ProgressBar progress={progress} color={iconColor.replace('text-', 'bg-')} />
            <p className="mt-2 text-sm text-gray-500">{progress}% completed</p>
          </div>
        )}

        {trend && (
          <div className="mt-4">
            <span className={`text-sm ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {trend.isPositive ? '↑' : '↓'} {trend.value}%
            </span>
            <span className="text-sm text-gray-500 ml-1">vs last month</span>
          </div>
        )}
      </div>
    </Card>
  );
};

export default StatCard;
