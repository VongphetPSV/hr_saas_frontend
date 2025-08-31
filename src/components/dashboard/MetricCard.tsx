import React from 'react';
import { IconType } from 'react-icons';

interface MetricCardProps {
  icon: IconType;
  label: string;
  value: number | string;
  subtitle?: string;
  trend?: {
    value: string;
    isPositive?: boolean;
  };
  bgColor?: string;
  iconColor?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  icon: Icon,
  label,
  value,
  subtitle,
  trend,
  bgColor = 'bg-blue-50',
  iconColor = 'text-blue-500'
}) => {
  return (
    <div className={`p-4 rounded-xl ${bgColor} hover:bg-opacity-80 transition-colors`}>
      <div className="flex items-start">
        <div className={`p-2 rounded-lg ${iconColor} bg-white/80`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="ml-4 flex-1">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">{label}</p>
            {trend && (
              <span className={`text-xs ${trend.isPositive ? 'text-green-600' : 'text-gray-500'}`}>
                {trend.value}
              </span>
            )}
          </div>
          <p className="text-2xl font-semibold text-gray-900 mt-1">{value}</p>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MetricCard;