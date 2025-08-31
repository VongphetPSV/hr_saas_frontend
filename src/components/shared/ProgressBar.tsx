import React from 'react';

interface ProgressBarProps {
  progress: number;
  color?: string;
  height?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  color = 'bg-purple-600', 
  height = 'h-2'
}) => {
  return (
    <div className={`w-full ${height} bg-gray-200 rounded-full overflow-hidden`}>
      <div 
        className={`${color} ${height} rounded-full transition-all duration-300 ease-in-out`}
        style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
      />
    </div>
  );
};

export default ProgressBar;
