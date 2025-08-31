import React from 'react';

interface IconWrapperProps {
  children: React.ReactNode;
  bgColor?: string;
  iconColor?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'p-2',
  md: 'p-3',
  lg: 'p-4'
};

const IconWrapper: React.FC<IconWrapperProps> = ({ 
  children, 
  bgColor = 'bg-purple-100', 
  iconColor = 'text-purple-600',
  size = 'md'
}) => {
  return (
    <div className={`${bgColor} ${sizeClasses[size]} rounded-lg`}>
      <div className={`${iconColor}`}>
        {children}
      </div>
    </div>
  );
};

export default IconWrapper;
