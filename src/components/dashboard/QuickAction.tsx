import React from 'react';
import Card from '../Card';
import IconWrapper from '../shared/IconWrapper';

interface QuickActionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick?: () => void;
  bgColor?: string;
  iconColor?: string;
}

const QuickAction: React.FC<QuickActionProps> = ({
  title,
  description,
  icon,
  onClick,
  bgColor = 'bg-purple-100',
  iconColor = 'text-purple-600'
}) => {
  return (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-200" onClick={onClick}>
      <div className="p-6">
        <IconWrapper bgColor={bgColor} iconColor={iconColor} size="lg">
          {icon}
        </IconWrapper>
        <h3 className="mt-4 text-lg font-medium text-gray-900">{title}</h3>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>
    </Card>
  );
};

export default QuickAction;
