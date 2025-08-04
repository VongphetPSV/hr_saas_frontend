const Card = ({ 
  children, 
  className = '',
  padding = 'md',
  shadow = 'default',
  ...props 
}) => {
  const baseClasses = 'bg-white rounded-lg border border-gray-200';
  
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const shadows = {
    none: '',
    sm: 'shadow-sm',
    default: 'shadow',
    md: 'shadow-md',
    lg: 'shadow-lg'
  };

  return (
    <div 
      className={`${baseClasses} ${paddings[padding]} ${shadows[shadow]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;